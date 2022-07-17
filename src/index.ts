import { BaseStyles } from './modules/BaseStyles'
import { Bezier } from './widgets/bezier'
import { Sin } from './widgets/sin'
import { IWidget } from './widgets/widget'

BaseStyles.apply()

const widgets: IWidget[] = []

widgets.push(new Bezier())
widgets.push(new Sin())

for (const widget of widgets) {
  widget.start()
}
