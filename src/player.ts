import { Display, DIRS } from "../rotjs/index";
import { Actor, MoveActor, ASCIIDrawable } from "./actor";
import { BackgroundColor, GameState, InterjectionSymbol, TeleporterSymbol } from "./game";
import Point from "./point";
import World from "./world";

export default class Player implements Actor, ASCIIDrawable {
    symbol = "V";
    symbolColor = "red";

    // TODO: Player shouldn't be getting passed winning position
    constructor(private world:World, private position: Point, private winningPos: Point){
        this.drawPlayer();
    }

    public getPosition(){
        return this.position;
    }

    private drawPlayer(){
        this.world.DrawCharAtPoint(this.symbol, this.position, this.symbolColor);
    }

    keyEventResolve: (value:any) => void;
    keyEventHandler: (event: KeyboardEvent) => boolean;

    act(): Promise<any>{
        return new Promise(resolve => {
            this.keyEventResolve = resolve;
            this.keyEventHandler = this.handleInput.bind(this);
            window.addEventListener("keydown", this.keyEventHandler);
        })
    }

    // TODO: Move input handling to its own class
    private handleInput(event: KeyboardEvent): boolean {
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
        
        if(code == 13 || code == 32){
            window.removeEventListener("keydown", this.keyEventHandler);
            this.keyEventResolve(this.checkSpace());
            return;
        }

        if (!(code in keyMap)) { return; }
        var diff = DIRS[8][keyMap[code]];
        let newPoint = new Point(this.position.x + diff[0],this.position.y + diff[1]);
        this.movePlayer(newPoint);
        
        window.removeEventListener("keydown", this.keyEventHandler);
        this.keyEventResolve(GameState.Running);
    }

    private movePlayer(newPosition: Point){
        if (!this.world.IsPointFree(newPosition)) { return false; } /* cannot move in this direction */
        const oldPosition = this.getPosition();
        this.world.DrawPoint(oldPosition);
        this.position = newPosition;
        this.drawPlayer();
        return true;
    }

    private checkSpace(){
        const pos = this.getPosition();
        
        if(this.world.IsCharAtPoint(InterjectionSymbol, pos)){
            alert("HEY! Find the Teleporter!");
            return GameState.Running;
        }
        else if(this.world.IsCharAtPoint(TeleporterSymbol,pos)){
            alert("HEY! Time to move on!");
            return GameState.NewLevel;
        }
        else if(pos.equals(this.winningPos)){
            alert("HEY! YOU WON!");
            return GameState.GameOver;
        }
        else{
            alert("AWWW! Nothing here...");
            return GameState.Running;
        }
    }
}