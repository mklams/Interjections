import { Display, Map, Scheduler } from "../../rotjs/index";
import AStar from "../../rotjs/path/astar";
import  Simple from "../../rotjs/scheduler/simple";
import { Actor } from "./actor";
import { OutputHandler } from "../views/app";
import { Twelvetoes } from "./enemy";
import Player from "./player"
import Point from "./point";
import { Question } from "./question";
import World from "./world";
import { YesNoInput } from "./yesNoInputHandler";
import { MonitorGreen } from "../constants/colors";
import { TerminalFont } from "../constants/fonts";

type SimpleScheduler = Simple;

// TODO: Move these into game settings
export const QuestionSymbol = "?";
export const TeleporterSymbol = "@";
export const BackgroundColor = "black";
export const TileColor = MonitorGreen;

export const SETTINGS = {
    NumberOfInterjections: 4,
    NumberOfTeleporters: 3,
    PointsToWin: 10
}

export const DEBUGMODE = false;

const IsGameOver = (gameState: GameStatus) => gameState == GameStatus.GameOver || gameState == GameStatus.Won;

export enum GameStatus{
    Running,
    GameOver,
    NewLevel,
    NotStarted,
    AskQuestion,
    AnswerCorrect,
    AnswerWrong,
    Won
}

export class Game {
    private display: Display;
    private world: World;
    private player: Player;
    private enemy: Twelvetoes;
    private points = 0;
    private level = 1;
 
    constructor(private outputHandler: OutputHandler) {
        this.outputHandler = outputHandler;
        this.outputHandler.showMessage("Verb(V)! Answer the questions(?) and watch out for Little Twelvetoes(8)!");
        this.display = new Display({width: 40, height:40 });
        this.display.setOptions({
            fontSize: 15,
            fontStyle: "bold",
            bg: BackgroundColor
        });
        document.getElementById("game").appendChild(this.display.getContainer());

        const turnscheduler: SimpleScheduler = this.createNewWorld();
        this.gameLoop(turnscheduler);
    }

    async gameLoop(scheduler: SimpleScheduler){
        let gameState = GameStatus.Running
        while(!IsGameOver(gameState)){
            let actor: Actor = scheduler.next();
            if(!actor) {break}
            gameState = await actor.act();

            if(gameState == GameStatus.NewLevel){
                this.level++;
                this.outputHandler.showMessage("Knowledge is Power!");
                this,this.outputHandler.updateLevel(this.level);
                scheduler = this.createNewWorld();
                gameState = GameStatus.Running;
            }

            if(gameState == GameStatus.AskQuestion){
                const question = new Question(this.outputHandler);
                gameState = await question.ask();
            }

            if(gameState == GameStatus.AnswerCorrect){
                this.points++
                this.outputHandler.updatePoints(this.points);
                this.world.MakePointEmpty(this.player.getPosition())
                gameState = (this.points >= SETTINGS.PointsToWin) ? GameStatus.Won : GameStatus.Running
            }
            else if(gameState == GameStatus.AnswerWrong){
                this.outputHandler.showMessage("Awww! That's not right.")
            }

            // GAME OVER! Must be last check!
            if(IsGameOver(gameState)){
                if(gameState == GameStatus.GameOver){
                    this.outputHandler.showMessage("Twelvetoes found you! Game Over!");
                }else if(gameState == GameStatus.Won){
                    this.outputHandler.showMessage("INTERJECTION!!! HEY! YOU WON!");
                }
                
                const inputControl = new YesNoInput(this.outputHandler);
                const input = await inputControl.getInput("Try again? (y/n)")
                if(input == GameStatus.NewLevel){
                    this.points = 0;
                    this.outputHandler.updatePoints(0);
                    this.outputHandler.updateLevel(1);
                    scheduler = this.createNewWorld();
                    gameState = GameStatus.Running;
                }
            }
        }
        this.outputHandler.showMessage("BYE!")
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
        //TODO: Get rid of this win condition
        this.generateItem(QuestionSymbol, SETTINGS.NumberOfInterjections);
        this.generateItem(TeleporterSymbol, SETTINGS.NumberOfTeleporters);
        this.world.DrawWorld();
        this.createPlayer();
        this.createTwelvetoes();
    }

    private createPlayer(){
        const startingPoint = this.world.takeRandomFreePoint();
        this.player = new Player(this.world, startingPoint);
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
        return this.world.IsPointInWorld(point);
    }

    private generateMap() {
        this.display.clear();
        let digger = new Map.Digger(40,40);
        this.world = new World(this.display, digger);
    }

    private generateItem(itemSymbol: string, count = 1){
        for (let i=0;i<count; i++){
            const point = this.world.AddCharToRandomPoint(itemSymbol);
        }
    }
}



