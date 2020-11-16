export type EventMap = Record<string, any[]>;
export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T extends readonly any[]> = (...params: T) => void;

// Типы событий связанный с цифрами
export type DigitEvents = {
    update: []
};