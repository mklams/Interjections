import { DIRS } from "../../rotjs/index";
import { Actor, ASCIIDrawable } from "./actor";
import { GameStatus, QuestionSymbol, TeleporterSymbol } from "./game";
import { InputHandler } from "./inputHandler";
import Point from "./point";
import World from "./world";

export default class Player implements Actor, ASCIIDrawable {
    symbol = "V";
    symbolColor = "red";

    constructor(private world:World, private position: Point){
        this.drawPlayer();
    }

    public getPosition(){
        return this.position;
    }

    private drawPlayer(){
        this.world.DrawCharAtPoint(this.symbol, this.position, this.symbolColor);
    }

    act(): Promise<any>{
        const handleUserInput = new InputHandler();
        return handleUserInput.setupHandler(this.handleKeyboardEvent.bind(this));
    }

    handleKeyboardEvent(event: KeyboardEvent): any {
        var keyMap = {};
        keyMap[38] = 0;
        keyMap[33] = 1;
        keyMap[39] = 2;
        keyMap[34] = 3;
        keyMap[40] = 4;
        keyMap[35] = 5;
        keyMap[37] = 6;
        keyMap[36] = 7;
     
        //var code = event.code;
        var code = event.keyCode;

        let gameState = null;
        
        if(code == 13 || code == 32){
            return this.checkSpace();
        }

        if (code in keyMap) {  
            var diff = DIRS[8][keyMap[code]];
            let newPoint = new Point(this.position.x + diff[0],this.position.y + diff[1]);
            const playerMoved = this.movePlayer(newPoint);
            if(playerMoved) { gameState = GameStatus.Running; }
        }
        
        return gameState;
    }

    private movePlayer(newPosition: Point){
        if (!this.world.IsPointInWorld(newPosition)) { return false; } /* cannot move in this direction */
        const oldPosition = this.getPosition();
        this.world.DrawPoint(oldPosition);
        this.position = newPosition;
        this.drawPlayer();
        return true;
    }

    private checkSpace(){
        const pos = this.getPosition();
        
        if(this.world.IsCharAtPoint(QuestionSymbol, pos)){
            return GameStatus.AskQuestion;
        }
        else if(this.world.IsCharAtPoint(TeleporterSymbol,pos)){
            return GameStatus.NewLevel;
        }
        else{
            return null;
        }
    }
}