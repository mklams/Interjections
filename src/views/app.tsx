import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import { Game } from "../game/game";
import { Terminal } from "./terminal";
import "../styles/main.scss";
import { Scoreboard } from "./scoreboard";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(1);

    useEffect(() => {
        const outputHandler  = { showMessage: outputMessage, updatePoints: outputPoint, updateLevel: outputLevel }
        const game = new Game(outputHandler);
    }, []);

    function outputMessage(message:string)
    {
        setMessages(currentMessages => {
            let newMessages = [...currentMessages]
            newMessages.push(message);
            return newMessages;
        });
    }

    function outputPoint(newPoints:number){
        setPoints(newPoints);
    }

    function outputLevel(newLevel:number){
        setLevel(newLevel)
    }

    

    return ( 
        <div>
            <Scoreboard points={points} level={level} />
            <GameContainer />
            <Terminal messagesToShow={messages} />
        </div>
    )
}

const GameContainer = () => {
    return (
        <div id="game">
        </div>
    )
}

export interface OutputHandler{
    showMessage: (message:string) => void;
    updatePoints: (newPoints:number) => void;
    updateLevel: (newLevel: number) => void;
}

render(<App />, document.getElementById("app"));