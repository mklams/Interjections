import styled from 'styled-components';
import React from "react";
import { MonitorGreen } from '../constants/colors';
import {TerminalFont} from '../constants/fonts'

export const Scoreboard = (props: any) => {


    const Board = styled.div`
        color: ${MonitorGreen};
        font-family: ${TerminalFont};
    `

    const Label = styled.span`
        padding-right:20px;
    `
    return (
        <Board>
            <Label>Points: {props.points}</Label>
            <Label>Level: {props.level}</Label>
        </Board>
    );
}