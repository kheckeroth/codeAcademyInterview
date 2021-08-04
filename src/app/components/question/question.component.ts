import { Component, Output, EventEmitter,Input, OnInit } from '@angular/core';
import { Question, Option  } from 'src/app/static.properties';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})

export class QuestionComponent implements OnInit {

  constructor() { }
  @Input() question: Question;
  @Output() nextQuestionEmitter = new EventEmitter<boolean>();
  private questions: Option[] = [];
  private answered: boolean = false;
  private answeredText: string;
  private isCorrect: boolean;
  ngOnInit() {
    this.questions.push({c: true, text: this.question.correctAnswer, selected: false});
    this.question.incorrectAnswers.forEach(q => {
      this.questions.push({c: false, text: q, selected: false});
    });
    this.questions = this.shuffle(this.questions);
  }

  shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
  }

  answer(q: Option) {
    this.answered = true;
    q.selected = true;
    this.isCorrect = q.c;
    this.answeredText = q.c? 'Correct!':'Incorrect!';
  }

  nextQuestion() {
    this.nextQuestionEmitter.emit(this.isCorrect);
  }

}