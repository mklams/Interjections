import { OutputHandler } from "../views/app";
import { GameStatus } from "./game";
import { InputHandler } from "./inputHandler";
import { MultipleChoiceQuestion, QuestionBank } from "../constants/multipleChoiceQuestions";


const getRandomQuestion = () => {
    return QuestionBank[Math.floor(Math.random() * QuestionBank.length)];
}

const addOptionToString = (outputMessage: string, option: string, optionIndex: number) => {
    return outputMessage + " (" + (optionIndex+1) + ")" + option;
}

const formatOptions = (options:string[]) => options.reduce(addOptionToString,"") //TODO: Why does this need an empty string

const translateAnswersIntoIndex = (options: string[], answers: string[]): number[] => {
    return answers.map(answer => options.indexOf(answer))
}

const translateIndexIntoInputCode = (array: any[]):string[] => array.map(value => (value+1).toString())

const tranlsateAnswersIntoInputCode = (options: string[], answers: string[]) => translateIndexIntoInputCode(translateAnswersIntoIndex(options, answers));

const getInputCodes = (options:any[]) => options.map((_,index) => `${(index+1)}`)

export class Question{
    private question: MultipleChoiceQuestion;
    
    constructor(private outputHandler: OutputHandler){
        this.question = getRandomQuestion();
    }

    ask(): Promise<any> {
        this.outputHandler.showMessage(this.question.Question);
        this.outputHandler.showMessage(formatOptions(this.question.Options))

        const handleUserInput = new InputHandler();
        return handleUserInput.setupHandler(this.handleKeyboardEvent.bind(this));
    }
    
    handleKeyboardEvent(event: KeyboardEvent): any {
        var code = event.key;

        const answerInputCode = tranlsateAnswersIntoInputCode(this.question.Options, this.question.Answers)
        
        if(getInputCodes(this.question.Options).includes(code)){

            if(answerInputCode.includes(code)){
                const responseToAnswer = this.question.Response ?? "That's what happening!";
                this.outputHandler.showMessage(responseToAnswer)
                return GameStatus.AnswerCorrect
            }
            return GameStatus.AnswerWrong;
        }

        return null;
    }
}