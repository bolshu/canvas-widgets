import { IWidget } from './types'
import { WithCanvas } from './withCanvas'

type TCoordinates = {
  x: number
  y: number
}

type TParticle = {
  position: TCoordinates
  velocity: TCoordinates
  radius: number
  color: string
  ttl: number
}

export class Tunnel extends WithCanvas implements IWidget {
  private readonly SIDEBAR_WIDTH: number = 241
  private readonly PARTICLES_COUNT: number = 80
  private readonly PARTICLES_SPAWN_TIME: number = 300
  private readonly PARTICLE_RADIUS: number = 5
  private readonly PARTICLE_VELOCITY: number = 5
  private readonly COLOR_BG: string = 'black'
  private readonly HUE_INC: number = 0.05
  private particles: TParticle[] = []
  private mouse: TCoordinates
  private hue: number = 0
  private color: string = `hsl(${Math.abs(this.hue * 360)}, 50%, 50%)`

  constructor (parentNode: HTMLElement) {
    super(parentNode)

    this.mouse = {
      x: this.canvas.centerX,
      y: this.canvas.centerY
    }

    this.createParticles()
    this.addMouseMoveListener()
    this.spawnRing = this.spawnRing.bind(this)
    this.spawnRing()

    this.tick = this.tick.bind(this)
  }

  private addMouseMoveListener (): void {
    this.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouse.x = e.x - this.SIDEBAR_WIDTH
      this.mouse.y = e.y
    })
  }

  private spawnRing () : void {
    setTimeout(this.spawnRing, this.PARTICLES_SPAWN_TIME)

    this.color = `hsl(${Math.abs(this.hue * 360)}, 50%, 50%)`

    if (this.hue > 1) {
      this.hue = 0
    }

    this.createParticles()

    this.hue += this.HUE_INC
  }

  private createParticles () :void {
    for (let i = 1; i <= this.PARTICLES_COUNT; i++) {
      const radian = (Math.PI * 2) / this.PARTICLES_COUNT

      this.particles.push({
        position: {
          x: this.mouse.x,
          y: this.mouse.y
        },
        velocity: {
          x: Math.cos(radian * i) * this.PARTICLE_VELOCITY,
          y: Math.sin(radian * i) * this.PARTICLE_VELOCITY
        },
        radius: this.PARTICLE_RADIUS,
        color: this.color,
        ttl: this.PARTICLES_SPAWN_TIME
      })
    }
  }

  private drawParticles () : void {
    for (const particle of this.particles) {
      this.canvas.context.fillStyle = particle.color

      this.canvas.context.beginPath()
      this.canvas.context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2)
      this.canvas.context.fill()
      this.canvas.context.closePath()
    }
  }

  private updateParticles () : void {
    this.particles.forEach((particle, i) => {
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.color = this.color
      particle.ttl--

      if (particle.ttl < 0) {
        setTimeout(() => {
          this.particles.splice(i, 1)
        })
      }
    })
  }

  private tick (): void {
    this.canvas.clear()

    this.canvas.context.fillStyle = this.COLOR_BG
    this.canvas.context.beginPath()
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)
    this.canvas.context.closePath()

    this.drawParticles()
    this.updateParticles()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
