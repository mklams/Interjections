import { Display, DIRS } from "../rotjs/index";
import { Actor, MoveActor, ASCIIDrawable } from "./actor";
import { BackgroundColor } from "./game";
import Point from "./point";

export default class Player implements Actor, ASCIIDrawable {
    symbol = "V";
    symbolColor = "blue";
    movePlayer:MoveActor;
    checkSpace:(actor: Actor) => boolean;

    constructor(movePlayer:MoveActor, checkSpace:(actor: Actor)=>boolean, private position: Point){
        this.movePlayer = movePlayer;
        this.checkSpace = checkSpace;
        this.position = position;
    }

    getPosition(){
        return this.position;
    }

    setPosition(position){
        this.position = position;
    }

    draw(display: Display){
        display.draw(this.position.x, this.position.y, this.symbol, this.symbolColor, BackgroundColor);
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
            const interjectionFound = this.checkSpace(this),
                    stopGame = !interjectionFound;
            window.removeEventListener("keydown", this.keyEventHandler);
            this.keyEventResolve(stopGame);
            return;
        }

        if (!(code in keyMap)) { return; }
        var diff = DIRS[8][keyMap[code]];
        let newPoint = new Point(this.position.x + diff[0],this.position.y + diff[1]);
        this.movePlayer(this, newPoint);
        console.log("player moved");
        
        window.removeEventListener("keydown", this.keyEventHandler);
        this.keyEventResolve(true);
    }
}