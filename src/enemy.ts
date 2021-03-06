import { Display } from "../rotjs/index";
import AStar from "../rotjs/path/astar";
import { Actor, ASCIIDrawable, MoveActor } from "./actor";
import { BackgroundColor, Game, GameState } from "./game";
import Point from "./point";
import point from "./point";
import World from "./world";

export class Twelvetoes implements Actor, ASCIIDrawable{
    symbol = "W";
    symbolColor ="blue";

    constructor(private world: World, private position: point, private getPathToPlayer: () => AStar){
        this.drawEnemy();
    };

    act(): Promise<any> {
        const pathToPlayer = this.getPathToPlayer();
        const path = [];
        let pathCallback = function(x,y){
            path.push([x,y]);
        }
        pathToPlayer.compute(this.position.x, this.position.y, pathCallback);
        path.shift(); // remove current postion
        if(path.length === 1){
            return Promise.resolve(GameState.GameOver);
        }
        else{
            const newPosition = new Point(path[0][0],path[0][1]);
            this.moveEnemy(newPosition);
        }
        return Promise.resolve(GameState.Running);
    }

    private drawEnemy(): void {
        this.world.DrawCharAtPoint(this.symbol, this.position, this.symbolColor);
    }

    private setPosition(position: point): void {
        this.position = position;
    }

    getPosition(): point {
        return this.position;
    }

    private moveEnemy(newPosition: Point){
        if (!this.world.IsPointFree(newPosition)) { return false; } /* cannot move in this direction */
        const oldPosition = this.getPosition();
        this.world.DrawPoint(oldPosition);
        this.setPosition(newPosition);
        this.drawEnemy();
        return true;
    }
}