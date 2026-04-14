// Copyright 2025-present 650 Industries. All rights reserved.

import SwiftUI
import ExpoModulesCore

internal enum IndexDisplayMode: String, Enumerable {
  case automatic
  case always
  case never
}

internal enum BackgroundDisplayMode: String, Enumerable {
  case automatic
  case always
  case never
  case interactive
}

internal final class TabViewProps: UIBaseViewProps {
  @Field var selection: Int?
  @Field var initialSelection: Int?
  @Field var indexDisplayMode: IndexDisplayMode?
  @Field var backgroundDisplayMode: BackgroundDisplayMode?
  var onSelectionChange = EventDispatcher()
}

internal struct TabView: ExpoSwiftUI.View {
  @ObservedObject var props: TabViewProps
  // Backing storage for uncontrolled mode (when `props.selection` is nil).
  // Seeded once from `props.initialSelection` and then owned by the native
  // view; ignored when `props.selection` is non-nil.
  @State private var internalSelection: Int = 0
  @State private var didApplyInitialSelection = false

  init(props: TabViewProps) {
    self.props = props
  }

  var body: some View {
    let children = props.children ?? []

    SwiftUI.TabView(selection: selectionBinding) {
      ForEach(0..<children.count, id: \.self) { index in
        let view: any View = children[index].childView
        AnyView(view)
          .tag(index)
      }
    }
    .tabViewStyle(.page(indexDisplayMode: resolvedIndexDisplayMode))
    .indexViewStyle(.page(backgroundDisplayMode: resolvedBackgroundDisplayMode))
    .onAppear {
      guard !didApplyInitialSelection else { return }
      didApplyInitialSelection = true
      if props.selection == nil, let initial = props.initialSelection {
        internalSelection = initial
      }
    }
  }

  // Two modes, picked per-render from whether `props.selection` is supplied:
  //
  //  • Controlled (props.selection != nil): JS owns the truth. The binding
  //    getter always returns the latest prop so the SwiftUI TabView never
  //    flashes page 0 before catching up; the setter only fires
  //    onSelectionChange when SwiftUI is trying to change to a value JS
  //    didn't already send down (echo gate).
  //  • Uncontrolled (props.selection == nil): native owns the truth in
  //    `internalSelection`. Setter updates internal state and notifies JS so
  //    the parent can observe changes without controlling them.
  //
  // Mirrors the React `<input value | defaultValue>` pattern.
  private var selectionBinding: Binding<Int> {
    if props.selection != nil {
      return Binding(
        get: { props.selection ?? 0 },
        set: { newValue in
          if props.selection != newValue {
            props.onSelectionChange(["selection": newValue])
          }
        }
      )
    }
    return Binding(
      get: { internalSelection },
      set: { newValue in
        internalSelection = newValue
        props.onSelectionChange(["selection": newValue])
      }
    )
  }

  private var resolvedIndexDisplayMode: PageTabViewStyle.IndexDisplayMode {
    switch props.indexDisplayMode ?? .automatic {
    case .automatic: .automatic
    case .always: .always
    case .never: .never
    }
  }

  private var resolvedBackgroundDisplayMode: PageIndexViewStyle.BackgroundDisplayMode {
    switch props.backgroundDisplayMode ?? .automatic {
    case .automatic: .automatic
    case .always: .always
    case .never: .never
    case .interactive: .interactive
    }
  }
}
