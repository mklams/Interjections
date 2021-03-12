import { OutputHandler } from "../views/app";
import { GameStatus } from "./game";
import { InputHandler } from "./inputHandler";

export class YesNoInput {
    constructor(private outputHandler: OutputHandler){
        
    }
    getInput(textToShow?: string): Promise<any> {
        this.outputHandler.showMessage(textToShow);

        const handleUserInput = new InputHandler();
        return handleUserInput.setupHandler(this.handleKeyboardEvent.bind(this));
    }

    handleKeyboardEvent(event: KeyboardEvent): any {
        var code = event.key;
        
        if(code.toLocaleLowerCase() == "y"){
            console.log("new level")
            return GameStatus.NewLevel;
        }else if(code.toLocaleLowerCase() == "n"){
            console.log("game over")
            return GameStatus.GameOver;
        }

        return null;
    }
}