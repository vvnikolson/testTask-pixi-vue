import * as PIXI from 'pixi.js'
import Digit from "./Digit";

export default class Clocks {
    private _startStamp: number // время от которого считаем
    private _container : PIXI.Container
    private _hh : Array<Digit> = [] // Цифры отображающие часы
    private _mm : Array<Digit> = [] // Цифры отображающие минуты
    private _ss : Array<Digit> = [] // Цифры отображающие секунды
    private _displayedTime: {ss: number, mm: number, hh: number} //
    private _separators : Array<PIXI.Text> = [] // мигающие точки между часами : минутами : секундами

    get container() {
        return this._container
    }

    constructor(pos: {x: number, y: number}, timeOffset : number = 0) {


        this._startStamp = timeOffset
        this._displayedTime = this._timestampToTime(timeOffset)
        this._container = new PIXI.Container()


        let offset = 40 // Расстояние между цифрами временных интервалов

        // Часы
        this._hh.push(new Digit(Math.floor(this._displayedTime.hh/10).toString(), {x: 0, y: 0}))
        this._hh.push(new Digit(Math.floor(this._displayedTime.hh%10).toString(), {x: this._hh[0].width, y: 0}))

        // Точки
        let sep = new PIXI.Text(":", { font: 'bold Arial', fontSize: 200, fill: '#FFFFFF', align: 'center'})
        sep.position.set(this._hh[0].width * 2, 0)
        sep.width = offset
        this._separators.push(sep)
        sep = new PIXI.Text(":", { font: 'bold Arial', fontSize: 200, fill: '#FFFFFF', align: 'center'})
        sep.position.set(this._hh[0].width * 4 + offset, 0)
        sep.width = offset
        this._separators.push(sep)

        // Минуты
        this._mm.push(new Digit(Math.floor(this._displayedTime.mm/10).toString(), {x: 2*this._hh[0].width + offset, y: 0}))
        this._mm.push(new Digit(Math.floor(this._displayedTime.mm%10).toString(), {x: 3*this._hh[0].width + offset, y: 0}))

        // секунды
        this._ss.push(new Digit(Math.floor(this._displayedTime.ss/10).toString(), {x: 4*this._hh[0].width + 2* offset, y: 0} ))
        this._ss.push(new Digit(Math.floor(this._displayedTime.ss%10).toString(), {x: 5*this._hh[0].width + 2* offset, y: 0}) )

        // добавляем всё в контейнер
        let all = [...this._hh, ...this._mm, ...this._ss]
        all.forEach((d: Digit) => this.container.addChild(d.container))
        this._separators.forEach(s => this.container.addChild(s))

        // центрируем
        this._container.position.set(pos.x - this.container.width/2, pos.y)


    }

    update() {
        // Каждый шар проверяется изменились ли временные интервалы:
        // секунды минуты и часы соответственно, если да, то вызываем анимацию смены цифры

        let newDate = new Date()
        let newStamp = newDate.getTime()
        let diff = Math.round((newStamp-this._startStamp));

        let newTime = this._timestampToTime(diff)

        if(this._displayedTime.ss !== newTime.ss) {
            if(Math.floor(this._displayedTime.ss / 10) !== Math.floor(newTime.ss / 10))
                this._ss[0].changeTo(Math.floor(newTime.ss / 10).toString())
            this._ss[1].changeTo(Math.floor(newTime.ss % 10).toString())

            this._separators.forEach(s => s.alpha = this._displayedTime.ss % 2 )
        }

        if(this._displayedTime.mm !== newTime.mm) {
            if(Math.floor(this._displayedTime.mm / 10) !== Math.floor(newTime.mm / 10))
                this._mm[0].changeTo(Math.floor(newTime.mm / 10).toString())
            this._mm[1].changeTo(Math.floor(newTime.mm % 10).toString())
        }

        if(this._displayedTime.hh !== newTime.hh) {
            if(Math.floor(this._displayedTime.hh / 10) !== Math.floor(newTime.hh / 10))
                this._hh[0].changeTo(Math.floor(newTime.hh / 10).toString())
            this._hh[1].changeTo(Math.floor(newTime.hh % 10).toString())
        }

        // обновляем время на предыдущем шаге
        this._displayedTime = newTime
        // вызываем события обновления у дочерних объектов контейнера
        {[...this._hh, ...this._mm, ...this._ss].forEach(d => d.emit('update')) }
    }

    private _timestampToTime(timestamp: number) {
        return  {
            hh: Math.floor(timestamp / 1000 / 60 / 60 % 24),
            mm: Math.floor(timestamp / 1000 / 60 % 60),
            ss: Math.floor(timestamp / 1000 % 60)
        }
    }

}