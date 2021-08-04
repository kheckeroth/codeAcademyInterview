export class Option {
    c: boolean;
    text: string;
    selected: boolean;
}
  
export class Question {
    text: string;
    incorrectAnswers: string[];
    correctAnswer: string;
}