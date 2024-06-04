interface Question {
  question: string;
  template: string;
  answerSearchParam: string;
  templateId: number;
}

interface GauntletState {
  question: Question;
  answer: string;
  timer: number;
  totalScore: number;
  gameOver: boolean;
  isCorrect: boolean | null;
  timerActive: boolean;
  isStarted: boolean;
  questionNumber: number;
}

export async function fetchQuestion(
  setState: React.Dispatch<React.SetStateAction<GauntletState>>,
  questionNumber: number,
  apiUrl = "/api/gauntletQuestion",
) {
  try {
    const res = await fetch(apiUrl, { method: "GET" });
    const newQuestion = await res.json();
    setState((s: GauntletState) => ({
      ...s,
      question: newQuestion,
      timer: 10,
      timerActive: true,
      questionNumber: questionNumber,
    }));
  } catch (error) {
    console.error("Failed to fetch new question", error);
    setState((s: GauntletState) => ({ ...s, timerActive: true }));
  }
}
