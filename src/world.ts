import { Display, RNG } from "../rotjs/index";
import Digger from "../rotjs/map/digger";
import { TileColor, BackgroundColor } from "./game";
import Point from "./point";

export default class World{
    private map: {[index:string]: string} = {};
    private freeCells: string[] = [];
    private display: Display;

    constructor(display: Display, digger: Digger){
        this.display = display;
        this.createWorld(digger);
    }

    private createWorld(digger: Digger){
        var digCallback = function(x, y, value) {
            if (value) { return; } /* do not store walls */
     
            const key = x+","+y;
            this.freeCells.push(key);
            this.map[key] = ".";
        }
        digger.create(digCallback.bind(this));
    }

    public IsPointFree(point: Point){
        return (point.toKey() in this.map);
    }

    public AddCharAtPoint(point: Point, char: string){
        this.map[point.toKey()] = char;
    }

    public AddCharToRandomPoint(char: string){
        const point = this.takeRandomFreePoint();
        this.AddCharAtPoint(point, char);
        return point;
    }

    public IsCharAtPoint(char:string, point:Point){
        return this.map[point.toKey()] == char;
    }

    public DrawCharAtPoint(char: string, point: Point, charColor: string = TileColor){
        this.display.draw(point.x, point.y, char, charColor, BackgroundColor);
    }

    public DrawPoint(point: Point) {
        this.display.draw(point.x,point.y,this.map[point.toKey()], TileColor, BackgroundColor);
    }

    public DrawWorld(){
        for (var key in this.map) {
            const point = Point.ParseKeyToPoint(key);
            this.DrawPoint(point);
        }
    }

    public takeRandomFreePoint() {
        const freeCellPos = this.getRandomFreeCell();
        const posKey = this.freeCells.splice(freeCellPos, 1)[0];
        return Point.ParseKeyToPoint(posKey);
    }

    private getRandomFreeCell()   { 
        return Math.floor(RNG.getUniform() * this.freeCells.length);
    }
}