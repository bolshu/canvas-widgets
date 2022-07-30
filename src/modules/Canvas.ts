export class Canvas {
  readonly element: HTMLCanvasElement
  readonly context: CanvasRenderingContext2D
  readonly centerX: number
  readonly centerY: number
  private animationId: number | null

  constructor (parentNode: HTMLElement) {
    this.addCanvas(parentNode)

    this.element = <HTMLCanvasElement>document.getElementsByTagName('CANVAS')[0]!
    this.context = this.element.getContext('2d')!
    this.centerX = this.element.width / 2
    this.centerY = this.element.height / 2
    this.animationId = null
  }

  private addCanvas (parentNode: HTMLElement) {
    const canvas = document.createElement('canvas')
    const { width, height } = parentNode.getBoundingClientRect()

    canvas.setAttribute('width', width.toString())
    canvas.setAttribute('height', height.toString())

    canvas.style.display = 'block'
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    parentNode.appendChild(canvas)
  }

  public startAnimation (callback: () => void) {
    this.animationId = requestAnimationFrame(() => this.startAnimation(callback))
    callback()
  }

  public stopAnimation () {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }

  public clear () {
    this.context.clearRect(0, 0, this.element.width, this.element.height)
  }
}
