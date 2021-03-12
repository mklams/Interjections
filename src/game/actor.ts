import Point from "point";

export interface Actor{
    act(): Promise<any>;
}

export type MoveActor = (actor: Actor, point: Point) => boolean;

export interface ASCIIDrawable{
    symbol: string;
    symbolColor: string;
}

export interface ActorResult{
    GameOver: boolean;
    NewLevel: boolean;
}