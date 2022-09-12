import { IWidget } from './types'
import { WithCanvas } from './withCanvas'

type TMountain = {
  edges: {
    x: number;
    y: number;
  }[];
  color: string;
  speed: number;
  edgeDistance: number;
}

export class Mountains extends WithCanvas implements IWidget {
  private readonly COUNT_OFFSET = 2
  private readonly COLOR_WHITE = 'white'
  private mountains: TMountain[];

  constructor (parentNode: HTMLElement) {
    super(parentNode)

    this.mountains = []
    this.createMountain(750, 225, '#FFEAF6', 0.05)
    this.createMountain(700, 175, '#FFB5DE', 0.15)
    this.createMountain(650, 130, '#FF77C3', 0.25)
    this.createMountain(600, 100, '#FE259E', 0.5)
    this.createMountain(550, 75, '#E80F88', 0.75)
    this.createMountain(500, 45, '#AF0171', 1.25)
    this.createMountain(450, 25, '#790252', 1.75)
    this.createMountain(350, 15, '#4C0033', 3)

    this.tick = this.tick.bind(this)
  }

  private createMountain (height: number, edgesCount: number, color: string, speed: number) {
    const edgeDistance = Math.ceil(this.canvas.element.width / edgesCount)

    const edges = Array.from(Array(edgesCount + this.COUNT_OFFSET)).map((_, i) => ({
        x: edgeDistance * i,
        y: (edgeDistance * Math.random() * Math.PI) + this.canvas.element.height - height
    }))

    const mountain = {
      edges,
      color,
      speed,
      edgeDistance,
    }

    this.mountains.push(mountain)
  }

  private updateMountain () {
    for (const mountain of this.mountains) {
      for (const edge of mountain.edges) {
        edge.x -= mountain.speed

        if (edge.x < mountain.edgeDistance * -1) {
          const [firstEdge, ...rest] = mountain.edges

          mountain.edges = [...rest, {
            x: this.canvas.element.width + mountain.edgeDistance,
            y: firstEdge.y,
          }]
        }
      }
    }
  }

  private drawMountain () {
    for (const mountain of this.mountains) {
      this.canvas.context.fillStyle = mountain.color
      this.canvas.context.moveTo(0, 0);
      this.canvas.context.beginPath()

      const preparedEdges = [
        { x: 0, y: this.canvas.element.height },
        ...mountain.edges,
        { x: this.canvas.element.width, y: this.canvas.element.height },
      ]

      for (const edge of preparedEdges) {
        this.canvas.context.lineTo(edge.x, edge.y)
      }

      this.canvas.context.closePath()
      this.canvas.context.fill();
    }

  }

  private tick (): void {
    this.canvas.context.fillStyle = this.COLOR_WHITE
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)

    this.updateMountain()
    this.drawMountain()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
