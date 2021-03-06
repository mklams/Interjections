
type inputHandler = (event: KeyboardEvent) => boolean;

export class InputHandler{
    keyEventResolve: (value:any) => void;
    keyEventHandler: inputHandler;
    private response: inputHandler;

    setupHandler(handleInput: inputHandler): Promise<any>{
        return new Promise(resolve => {
            this.keyEventResolve = resolve;
            this.keyEventHandler = handleInput;
            this.response = this.respondToInput.bind(this);
            window.addEventListener("keydown", this.response);
        })
    }

    respondToInput(event: KeyboardEvent){
        const result = this.keyEventHandler(event);
        if(result == null) return;
        this.resolveHandler(result);
    }

    resolveHandler(result:any){
        window.removeEventListener("keydown", this.response);
        this.keyEventResolve(result);
    }
}
