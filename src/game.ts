import { Display, Map, Scheduler } from "../rotjs/index";
import AStar from "../rotjs/path/astar";
import  Simple from "../rotjs/scheduler/simple";
import { Actor } from "./actor";
import { Twelvetoes } from "./enemy";
import Player from "./player"
import Point from "./point";
import World from "./world";

export const InterjectionSymbol = "!";
export const TeleporterSymbol = "?";
export const BackgroundColor = "black";
export const TileColor = "white";

type SimpleScheduler = Simple;

export enum GameState{
    Running,
    GameOver,
    NewLevel,
}

export const DEBUGMODE = false;

export class Game {
    display: Display;
    world: World;
    player: Player;
    enemy: Twelvetoes;
    interjectionLocation: Point;
 
    async gameLoop(scheduler: SimpleScheduler){
        let gameState = GameState.Running
        while(gameState != GameState.GameOver){
            let actor: Actor = scheduler.next();
            if(!actor) {break}
            gameState = await actor.act();
            if(gameState == GameState.NewLevel){
                scheduler = this.createNewWorld();
                gameState = GameState.Running;
            }

            if(DEBUGMODE){
                console.log(gameState)
            }
        }
        alert("Twelvetoes found you! Game Over!");
    }

    constructor() {
        this.display = new Display({width: 50, height:50 });
        this.display.setOptions({
            fontSize: 15,
            fontStyle: "bold",
            bg: "#a00"
        });
        document.body.appendChild(this.display.getContainer());

        const turnscheduler: SimpleScheduler = this.createNewWorld();
        this.gameLoop(turnscheduler);
    }

    private createNewWorld(){
        this.createWorld();
        const scheduler = new Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.enemy, true);
        return scheduler;
    }

    private createWorld(){
        this.generateMap();
        this.generateItem(InterjectionSymbol, 10, true);
        this.generateItem(TeleporterSymbol, 5);
        this.world.DrawWorld();
        this.createPlayer();
        this.createTwelvetoes();
    }

    private createPlayer(){
        const startingPoint = this.world.takeRandomFreePoint();
        this.player = new Player(this.world, startingPoint, this.interjectionLocation);
    }

    private createTwelvetoes(){
        const startingPoint = this.world.takeRandomFreePoint();
        this.enemy = new Twelvetoes(this.world, startingPoint, this.getPathToPlayer.bind(this));
    }

    private getPathToPlayer(): AStar{
        const playerPosition = this.player.getPosition();
        return new AStar(playerPosition.x, playerPosition.y, this.isPointFree.bind(this), {topology:4})
    }

    private isPointFree(x:string,y:string){
        const point = new Point(parseInt(x),parseInt(y));
        return this.world.IsPointFree(point);
    }

    private generateMap() {
        this.display.clear();
        let digger = new Map.Digger(40,40);
        this.world = new World(this.display, digger);
    }

    private generateItem(itemSymbol: string, count = 1, setWinPos = false){
        for (let i=0;i<count; i++){
            const point = this.world.AddCharToRandomPoint(itemSymbol);
            if(!i && setWinPos) { this.interjectionLocation = point; }
        }
    }
}



