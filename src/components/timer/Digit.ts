
import * as PIXI from 'pixi.js'
import {Container} from "pixi.js";
import EventEmitter from "./utils/EventEmitter";
import {DigitEvents} from "./types";

export default class Digit extends EventEmitter<DigitEvents> {
    private currentSymbol : PIXI.Text
    private newSymbol : PIXI.Text
    private _container : PIXI.Container
    private _mask : PIXI.Graphics

    constructor(text: string, pos: {x: number, y: number}) {
        super()
        this._container = new Container()

        this.container.position.set(pos.x, pos.y)
        // создаём два символа, один виден, другой висит за пределами маски
        this.currentSymbol = new PIXI.Text(text, { font: 'bold Arial', fontSize: 200, fill: '#000000', align: 'center', stroke: '#FFFFFF', strokeThickness: 15 })
        this.newSymbol = new PIXI.Text("",{ font: 'bold Arial', fontSize: 200, fill: '#000000', align: 'center', stroke: '#FFFFFF', strokeThickness: 15 })

        this._container.addChild(this.currentSymbol)
        this._container.addChild(this.newSymbol)
        // создаём маску размером с символ
        this._mask = new PIXI.Graphics()
        this._mask.beginFill(0xFFFFFF)
        this._mask.drawRect(0, 0, this.currentSymbol.width, this.currentSymbol.height);
        this._mask.endFill()
        this.container.addChild(this._mask)
        this.container.mask = this._mask
        // прячем один символ за маской
        this.newSymbol.y = -this._mask.height

    }

    get container() : PIXI.Container {
        return this._container
    }

    get width() : number {
        return this.currentSymbol.width
    }

    public changeTo(text: string) {
        // сбрасываем координаты на всякий
        // есть вероятность наложения анимации
        this.newSymbol.text = text
        this.newSymbol.y = -this.newSymbol.height
        this.currentSymbol.y = 0

        this._mask.width = this.newSymbol.width
        // подписываемся на событие, запускаем анимацию
        this.on('update', this.update)
    }

    update = () => {
        // проверяем встали ли фигуры на свои места
        if(this.currentSymbol.y >= this._mask.height) {
            // меняем местами символы, новая становиться текущей
            let tmp = this.currentSymbol
            this.currentSymbol = this.newSymbol
            this.newSymbol = tmp
            // отписываемся от события, анимация закончилась
            this.off('update', this.update)
            return
        }
        // двигаем символы одновременно
        this.currentSymbol.y += 12
        this.newSymbol.y += 12
    }
}