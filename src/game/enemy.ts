import AStar from "../../rotjs/path/astar";
import { Actor, ASCIIDrawable } from "./actor";
import { GameStatus } from "./game";
import Point from "./point";
import World from "./world";

export class Twelvetoes implements Actor, ASCIIDrawable{
    symbol = "8";
    symbolColor ="#6504FB";

    constructor(private world: World, private position: Point, private getPathToPlayer: () => AStar){
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
        if(path.length <= 1){
            return Promise.resolve(GameStatus.GameOver);
        }
        else{
            const newPosition = new Point(path[0][0],path[0][1]);
            this.moveEnemy(newPosition);
        }
        return Promise.resolve(GameStatus.Running);
    }

    private drawEnemy(): void {
        this.world.DrawCharAtPoint(this.symbol, this.position, this.symbolColor);
    }

    private setPosition(position: Point): void {
        this.position = position;
    }

    getPosition(): Point {
        return this.position;
    }

    private moveEnemy(newPosition: Point){
        if (!this.world.IsPointInWorld(newPosition)) { return false; } /* cannot move in this direction */
        const oldPosition = this.getPosition();
        this.world.DrawPoint(oldPosition);
        this.setPosition(newPosition);
        this.drawEnemy();
        return true;
    }
}