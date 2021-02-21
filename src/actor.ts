import { Display } from "../rotjs/index";
import Point from "./point";

export interface Actor{
    act(): Promise<any>;
    draw(display: Display): void;
    setPosition(position: Point): void;
    getPosition(): Point;
}

export type MoveActor = (actor: Actor, point: Point) => void;

export interface ASCIIDrawable{
    symbol: string;
    symbolColor: string;
}