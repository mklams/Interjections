import { Display, Map, Scheduler, RNG } from "../rotjs/index";
import AStar from "../rotjs/path/astar";
import Path from "../rotjs/path/path";
import { Actor } from "./actor";
import { Twelvetoes } from "./enemy";
import Player from "./player"
import Point from "./point";

const InterjectionSymbol = "!";
export const BackgroundColor = "black";
export const TileColor = "white";

export class Game {
    display: Display;
    map = {};
    freeCells: string[] = [];
    player: Player;
    enemy: Twelvetoes;
    interjectionLocation: Point;
 
    async mainLoop(){
        const scheduler = new Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.enemy, true);
        
        let go = true;
        while(go){
            let actor = scheduler.next();
            if(!actor) {break}
            go = await actor.act();
        }
        console.log("game over")
    }

    constructor() {
        this.display = new Display({width: 40, height:40 });
        document.body.appendChild(this.display.getContainer());

        this.generateMap();
        this.generateInterjections();
        this.drawWholeMap();
        this.createPlayer();
        this.createTwelvetoes();

        this.mainLoop();
    }

    private createPlayer(){
        const startingPoint = this.takeRandomFreePoint();
        this.player = new Player(this.moveActor.bind(this), this.checkInterjection.bind(this), startingPoint);
        this.player.draw(this.display);
    }

    private createTwelvetoes(){
        const startingPoint = this.takeRandomFreePoint();
        this.enemy = new Twelvetoes(startingPoint, this.moveActor.bind(this), this.getPathToPlayer.bind(this));
        this.enemy.draw(this.display);
    }

    private getPathToPlayer(): AStar{
        const playerPosition = this.player.getPosition();
        return new AStar(playerPosition.x, playerPosition.y, this.isPointFree.bind(this), {topology:4})
    }

    private isPointFree(x:string,y:string){
        return (x+","+y in this.map);
    }

    private generateMap() {
        let digger = new Map.Digger(40,40);
     
        var digCallback = function(x, y, value) {
            if (value) { return; } /* do not store walls */
     
            const key = x+","+y;
            this.freeCells.push(key);
            this.map[key] = ".";
        }
        digger.create(digCallback.bind(this));
    }

    private generateInterjections(){
        for (let i=0;i<10; i++){
            const point = this.takeRandomFreePoint();
            this.map[point.toKey()] = InterjectionSymbol;
            if(!i) { this.interjectionLocation = point; }
        }
    }

    private drawWholeMap() {
        for (var key in this.map) {
            const point = Point.ParseKeyToPoint(key);
            this.drawPoint(point);
        }
    }

    private drawPoint(point: Point) {
        this.display.draw(point.x,point.y,this.map[point.toKey()], TileColor, BackgroundColor);
    }

    private takeRandomFreePoint() {
        const freeCellPos = this.getRandomFreeCell();
        const posKey = this.freeCells.splice(freeCellPos, 1)[0];
        return Point.ParseKeyToPoint(posKey);
    }

    private getRandomFreeCell()   { 
        return Math.floor(RNG.getUniform() * this.freeCells.length);
    }

    private moveActor(actor: Actor, newPosition: Point){
        if (!(newPosition.toKey() in this.map)) { return; } /* cannot move in this direction */
        const oldPosition = actor.getPosition();
        this.drawPoint(oldPosition);
        actor.setPosition(newPosition);
        actor.draw(this.display);
    }

    private checkInterjection(actor:Actor){
        const pos = actor.getPosition();
        const posKey = pos.toKey();
        
        if(this.map[posKey] !== InterjectionSymbol){
            //alert("No interjection here!");
            return false;
        }
        else if(pos.equals(this.interjectionLocation)){
            alert("HEY! YOU WON!");
            return true;
        }
        else{
            alert("AWWW! Nothing here...");
            return false;
        }
    }
}

