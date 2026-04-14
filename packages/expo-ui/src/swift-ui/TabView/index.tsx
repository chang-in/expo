import { requireNativeView } from 'expo';

import { type ViewEvent } from '../../types';
import { createViewModifierEventListener } from '../modifiers/utils';
import { type CommonViewModifierProps } from '../types';

export type TabViewProps = {
  /**
   * The index of the currently selected page (controlled mode). When
   * supplied, JavaScript owns the selection state — pair with
   * `onSelectionChange`.
   * Pass `initialSelection` to instead let the native view manage its own state.
   */
  selection?: number;
  /**
   * The page to start on when the component is uncontrolled (no `selection`
   * prop). Ignored if `selection` is provided.
   * @default 0
   */
  initialSelection?: number;
  /**
   * Called when the selected page changes — both from user swipes and (in
   * controlled mode) when the controlled prop is updated externally.
   */
  onSelectionChange?: (selection: number) => void;
  /**
   * Controls page indicator dot visibility.
   * @default 'automatic'
   */
  indexDisplayMode?: 'automatic' | 'always' | 'never';
  /**
   * Controls the translucent background behind the page indicator dots.
   * Useful when dots sit on top of dark or busy content.
   * @default 'automatic'
   */
  backgroundDisplayMode?: 'automatic' | 'always' | 'never' | 'interactive';
  /**
   * The pages to display. Each child becomes a separate page. Fragments are not supported —
   * wrap content in an `@expo/ui/swift-ui` view.
   */
  children: React.ReactElement | React.ReactElement[];
} & CommonViewModifierProps;

type NativeTabViewProps = Omit<TabViewProps, 'onSelectionChange'> &
  ViewEvent<'onSelectionChange', { selection: number }>;

const TabViewNativeView: React.ComponentType<NativeTabViewProps> = requireNativeView(
  'ExpoUI',
  'TabView'
);

/**
 * A SwiftUI `TabView` with page style. Each child becomes a swipeable page.
 *
 * @platform ios
 */
export function TabView(props: TabViewProps) {
  const { modifiers, onSelectionChange, ...restProps } = props;
  return (
    <TabViewNativeView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...restProps}
      onSelectionChange={
        onSelectionChange
          ? ({ nativeEvent: { selection } }) => onSelectionChange(selection)
          : undefined
      }
    />
  );
}
