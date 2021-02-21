import { Display } from "../rotjs/index";
import AStar from "../rotjs/path/astar";
import { Actor, ASCIIDrawable, MoveActor } from "./actor";
import { BackgroundColor } from "./game";
import Point from "./point";
import point from "./point";

export class Twelvetoes implements Actor, ASCIIDrawable{
    symbol = "W";
    symbolColor ="red";

    constructor(private position: point, private moveTwelvetoes: MoveActor, private getPathToPlayer: () => AStar){};

    act(): Promise<any> {
        const pathToPlayer = this.getPathToPlayer();
        const path = [];
        let pathCallback = function(x,y){
            path.push([x,y]);
        }
        pathToPlayer.compute(this.position.x, this.position.y, pathCallback);
        path.shift(); // remove current postion
        if(path.length === 1){
            console.log("Twelvetoes found you");
            return Promise.resolve(false);
        }
        else{
            const newPosition = new Point(path[0][0],path[0][1]);
            this.moveTwelvetoes(this, newPosition);
        }
        return Promise.resolve(true);
    }

    draw(display: Display): void {
        display.draw(this.position.x, this.position.y, this.symbol, this.symbolColor, BackgroundColor);
    }

    setPosition(position: point): void {
        this.position = position;
    }

    getPosition(): point {
        return this.position;
    }
}