Hello :).

My code consists of two components. 
  A quiz component, which I probably should have named quizzes.
  A question component, which handles each question in a quiz.
  The question component will emit to the parent when it is answered. 
  The quiz component handles all of the logic for changing questions and quizzes.

  In hindsight, I would have gone with the following architecture:
    QuizzesController:
      QuizComponent:
        QuestionComponent: