import { BaseStyles } from './modules/BaseStyles'
import { Rotation } from './widgets/rotation'
import { Space } from './widgets/space'
import { DVDScreen } from './widgets/dvdScreen'
import { Rain } from './widgets/rain'
import { Bezier } from './widgets/bezier'
import { Sin } from './widgets/sin'
import { IWidget } from './widgets/widget'

BaseStyles.apply()

const widgets: IWidget[] = []

widgets.push(new Rotation())
widgets.push(new Space())
widgets.push(new DVDScreen())
widgets.push(new Rain())
widgets.push(new Bezier())
widgets.push(new Sin())

for (const widget of widgets) {
  widget.start()
}
