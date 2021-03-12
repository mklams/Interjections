import React from "react";
import styled from 'styled-components';
import { MonitorGreen } from "../constants/colors";
import { TerminalFont } from "../constants/fonts";
import "../styles/screen.scss";

interface TerminalProps{
    messagesToShow: string[];
}

const Screen = styled.div`
    color: ${MonitorGreen};
    font-family: ${TerminalFont}, sans-serif;
`

export const Terminal = (props: TerminalProps) => {
    const {messagesToShow} = props;
    const numberToShow = 3;
    const mostRecentMessagePos = messagesToShow.length-1;

    const getPreviousMessagesStartPos = () => {
        let startPos = 0;
        if(messagesToShow.length > numberToShow){
            startPos = mostRecentMessagePos - numberToShow;
        }
        return startPos;
    }

    const mostRecentMessage = messagesToShow.slice(mostRecentMessagePos);
    const getPreviousMessages = messagesToShow.slice(getPreviousMessagesStartPos(),mostRecentMessagePos).map((message, index) =>
        <div key={index}>
            {message}
        </div>
    );
    const getMessageAtPos = (pos: number) => {
        return (messagesToShow.length > pos) ? messagesToShow[pos]: "";
    }

    return (
        <Screen className="screen">
            <h4>{}</h4>
            <h3>{getMessageAtPos(mostRecentMessagePos-1)}</h3>
            <h2>{mostRecentMessage}</h2>
        </Screen>
    );

    
}