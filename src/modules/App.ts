import { Rotation } from '../widgets/rotation'
import { Tunnel } from '../widgets/tunnel'
import { Space } from '../widgets/space'
import { DVDScreen } from '../widgets/dvdScreen'
import { Rain } from '../widgets/rain'
import { Bezier } from '../widgets/bezier'
import { Sin } from '../widgets/sin'

type TWidgetClass = (
  typeof Rotation |
  typeof Tunnel |
  typeof Space |
  typeof DVDScreen |
  typeof Rain |
  typeof Bezier |
  typeof Sin
)

type TWidget = {
  title: string;
  id: string;
  isActive: boolean;
  Widget: TWidgetClass
}

export class App {
  private readonly NODE_ID_APP: string = 'app'
  private readonly NODE_ID_NAV: string = 'app-nav'
  private readonly NODE_ID_WIDGET: string = 'app-widget'
  private appWrapper: HTMLElement
  private appNav: HTMLElement
  private appWidget: HTMLElement
  private widgets: TWidget[] = [
    {
      title: 'Rotation',
      id: 'rotation',
      isActive: false,
      Widget: Rotation
    },
    {
      title: 'Tunnel',
      id: 'tunnel',
      isActive: false,
      Widget: Tunnel
    },
    {
      title: 'Space',
      id: 'space',
      isActive: false,
      Widget: Space
    },
    {
      title: 'DVD Screen',
      id: 'dvd-screen',
      isActive: false,
      Widget: DVDScreen
    },
    {
      title: 'Rain',
      id: 'rain',
      isActive: false,
      Widget: Rain
    },
    {
      title: 'Bezier',
      id: 'bezier',
      isActive: false,
      Widget: Bezier
    },
    {
      title: 'Sin',
      id: 'sin',
      isActive: false,
      Widget: Sin
    }
  ]

  constructor () {
    this.applyBodyStyles()

    this.createAppWrapper()
    this.appWrapper = document.getElementById(this.NODE_ID_APP)!

    this.createNav()
    this.appNav = document.getElementById(this.NODE_ID_NAV)!
    this.addNavClickListener()

    this.createCanvasWrapper()
    this.appWidget = document.getElementById(this.NODE_ID_WIDGET)!
  }

  private applyBodyStyles () {
    document.body.style.margin = '0px'
    document.body.style.width = '100vw'
    document.body.style.height = '100vh'
    document.body.style.fontFamily = 'sans-serif'
  }

  private createAppWrapper () {
    const wrapper = document.createElement('div')

    wrapper.setAttribute('id', this.NODE_ID_APP)

    wrapper.style.display = 'flex'
    wrapper.style.width = '100%'
    wrapper.style.height = '100%'

    document.body.appendChild(wrapper)
  }

  private createNav () {
    const nav = document.createElement('nav')
    nav.setAttribute('id', this.NODE_ID_NAV)

    nav.style.width = '200px'
    nav.style.padding = '20px'
    nav.style.overflowY = 'scroll'
    nav.style.borderRight = '1px solid lightgray'

    this.appWrapper.appendChild(nav)
  }

  private addNavClickListener () {
    this.appNav.addEventListener('click', (e: MouseEvent) => {
      if ((e.target as HTMLSpanElement).tagName !== 'SPAN') return

      for (const widget of this.widgets) {
        widget.isActive = false

        if (widget.id === (e.target as HTMLSpanElement).id) {
          widget.isActive = true
        }
      }

      this.rerenderNav()
      this.rerenderWidget()
    })
  }

  private renderNavItems () {
    for (const widget of this.widgets) {
      const item = document.createElement('span')

      item.setAttribute('id', widget.id)

      item.innerHTML = widget.title

      item.style.display = 'block'
      item.style.textDecoration = 'none'
      item.style.marginBottom = '10px'
      item.style.color = 'black'
      item.style.cursor = 'pointer'

      if (widget.isActive) {
        item.style.fontWeight = 'bold'
      }

      this.appNav.appendChild(item)
    }
  }

  private removeNavItems () {
    this.appNav.innerHTML = ''
  }

  private rerenderNav () {
    this.removeNavItems()
    this.renderNavItems()
  }

  private createCanvasWrapper () {
    const wrapper = document.createElement('div')

    wrapper.setAttribute('id', this.NODE_ID_WIDGET)

    wrapper.style.flexGrow = '1'

    this.appWrapper.appendChild(wrapper)
  }

  private renderWidget () {
    for (const widget of this.widgets) {
      if (widget.isActive) {
        new widget.Widget(this.appWidget).start()
      }
    }
  }

  private removeWidget () {
    this.appWidget.innerHTML = ''
  }

  private rerenderWidget () {
    this.removeWidget()
    this.renderWidget()
  }

  public start () {
    this.renderNavItems()
    this.renderWidget()
  }
}
