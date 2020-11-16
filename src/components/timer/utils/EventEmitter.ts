import { EventEmitter as IE } from 'events';
import { EventKey, EventMap, EventReceiver } from "../types";
import IEmitter from "./IEmitter";

// Базовый класс для управления
export default abstract class  EventEmitter<T extends EventMap> implements IEmitter<T> {
    private emitter: IE = new IE();

    /**
     * Подписаться на событие
     * @param eventName название события
     * @param fn коллбэк при возникновении события
     */
    public on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
        this.emitter.on(eventName, fn as EventReceiver<any[]>);
    }

    /**
     * Выполнить fn один раз при возникновении события
     * @param eventName название события
     * @param fn коллбэк при возникновении события
     */
    public once<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
        this.emitter.once(eventName, fn as EventReceiver<any[]>);
    }

    /**
     * Удалить коллбэк, подписанный на событие
     * @param eventName название события
     * @param fn коллбэк при возникновении события
     */
    public off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
        this.emitter.off(eventName, fn as EventReceiver<any[]>);
    }

    /**
     * Вызов события
     * @param eventName имя события
     * @param params параметры, передающиеся в коллбэк функцию
     */
    public emit<K extends EventKey<T>>(eventName: K, ...params: T[K]): void {
        this.emitter.emit(eventName, ...params);
    }
}