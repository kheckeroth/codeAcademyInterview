import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
@NgModule({
  declarations: [QuizComponent, QuestionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    QuizComponent,
    QuestionComponent
  ]
})
export class ComponentsModule { }
