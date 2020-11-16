import * as PIXI from 'pixi.js'
import Clocks from "./Clocks";

export default class Engine {
    private app : PIXI.Application

    private _clocks! : Clocks

    constructor(app: PIXI.Application) {
        this.app = app
    }

    public init(timestamp :number) : void {
        this._clocks = new Clocks({x: this.app.renderer.width / 2, y: this.app.renderer.height / 3}, timestamp)

        let topLabel = new PIXI.Text('Time have been wasted:',
            { font: 'bold Arial', fontSize: 50, fill: '#FFFFFF', align: 'center' })
        topLabel.position.set(this.app.renderer.width / 2 - topLabel.width / 2, 0)

        this.app.stage.addChild(this._clocks.container)
        this.app.stage.addChild(topLabel)
        this.app.ticker.add(
            this._update.bind(this)
        )
        this.app.ticker.maxFPS = 60
    }

    private _update(delta: number) : void {
        this._clocks.update()

    }
}
