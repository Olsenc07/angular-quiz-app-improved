export interface QuizQuestionsInterface {
  category: string;
  correctAnswer: string;
  difficulty: string;
  incorrectAnswers: Array<string>;
  question: string;
  type: string;
}
