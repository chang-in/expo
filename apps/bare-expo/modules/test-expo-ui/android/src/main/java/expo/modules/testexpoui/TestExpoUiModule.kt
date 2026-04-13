package expo.modules.testexpoui

import android.graphics.Color
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.records.recordFromMap
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.ComposableScope
import expo.modules.kotlin.views.FunctionalComposableScope
import expo.modules.ui.ExpoUIView
import expo.modules.ui.ModifierList
import expo.modules.ui.ModifierRegistry
import expo.modules.ui.compose

data class MyCustomViewProps(
  val title: String = "",
  val modifiers: ModifierList = emptyList()
) : ComposeProps

data class CustomBorderParams(
  @Field val color: Color? = null,
  @Field val width: Int = 2,
  @Field val cornerRadius: Int = 0
) : Record

class TestExpoUiModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TestExpoUi")

    OnCreate {
      ModifierRegistry.register("customBorder") { map, _, _, _ ->
        val params = recordFromMap<CustomBorderParams>(map)
        params.color?.let { color ->
          Modifier.border(
            BorderStroke(params.width.dp, color.compose),
            RoundedCornerShape(params.cornerRadius.dp)
          )
        } ?: Modifier
      }
    }

    OnDestroy {
      ModifierRegistry.unregister("customBorder")
    }

    ExpoUIView("MyCustomView") { props: MyCustomViewProps ->
      MyCustomViewContent(props)
    }
  }
}

@Composable
fun FunctionalComposableScope.MyCustomViewContent(props: MyCustomViewProps) {
  Column(
    modifier = ModifierRegistry.applyModifiers(props.modifiers, appContext, composableScope, globalEventDispatcher)
  ) {
    Text(
      text = props.title,
      style = MaterialTheme.typography.titleMedium
    )
    Children(ComposableScope())
  }
}
