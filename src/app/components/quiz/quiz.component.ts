import { Component, OnInit } from '@angular/core';
import * as Quizzes from '../../../data/quizzes.js';
import * as Encouragement from '../../../data/messages.js';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {

  constructor() { }
  private quizData: any = [];
  // with more time I would have created a class for quizData.
  private activeQuizIndex: number = 0;
  private activeQuestionIndex: number = 0;
  private quizFinished = false;
  private quizFinishedMsg: string;
  private correctQuestionCounter: number = 0;
  
  ngOnInit() {
    this.quizData = Quizzes.getQuizzes().then( (data) => {
      this.quizData = data;
      this.quizData.forEach( (quiz) => {
        quiz.allCorrect = false;
        quiz.attempts = 0;
      });
    });
  }

  nextQuestion(isCorrect) {
    if (isCorrect) {
      this.correctQuestionCounter++;
    }
    this.activeQuestionIndex++;
    if (this.activeQuestionIndex > this.quizData[this.activeQuizIndex].questions.length - 1) {
      this.quizCompleted();
    }
  }

  quizCompleted() {
    this.quizFinished = true;
    this.quizData[this.activeQuizIndex].attempts++;
    this.quizFinishedMsg = `
      There were ${this.quizData[this.activeQuizIndex].questions.length} questions in this quiz. <br>
      You answered ${this.correctQuestionCounter} correctly. <br>
      You've attempted this quiz ${this.quizData[this.activeQuizIndex].attempts} times. <br>
      ${Encouragement.getMessage()}
    `;
    if (this.correctQuestionCounter === this.quizData[this.activeQuizIndex].questions.length) {
      this.quizData[this.activeQuizIndex].allCorrect = true;
    } else {
      this.quizData[this.activeQuizIndex].allCorrect = false;
    }
  }

  restartQuiz() {
    let quizDataTmp = this.quizData;
    this.quizData = [];
    setTimeout( () => { // allows the digest cycle to run
      this.quizData = quizDataTmp;
      this.quizFinished = false;
      this.activeQuestionIndex = 0;
    }, 10);
    
  }

  startNextQuiz() {
    if (this.activeQuizIndex + 1 >= this.quizData.length) {
      // done with all quizzes.
      // Delighter A:
      let allCorrect = true;
      this.quizData.forEach( (quiz) => {
        if (!quiz.allCorrect) {
          allCorrect = false;
        }
      });
      if (allCorrect) {
        let quizDataTmp = this.quizData;
        this.quizData = []; // set loading message in UI
        Quizzes.getMoreQuizzes().then( (quizData) => {
          quizData.forEach( (extraQuiz) => {
            quizDataTmp.push(extraQuiz);
          });
          this.quizData = quizDataTmp;
          this.activeQuizIndex++;
        });
      } else {
        // restart
        this.activeQuizIndex = 0;
      }
    } else {
      this.activeQuizIndex++;
    }
    this.quizFinished = false;
    this.activeQuestionIndex = 0;
    this.correctQuestionCounter = 0;
  }

}
