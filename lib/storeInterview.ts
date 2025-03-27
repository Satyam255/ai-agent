export function saveInterviewSession(questions: string[], responses: string[]) {
  const interviewData = { questions, responses };
  localStorage.setItem("interview_session", JSON.stringify(interviewData));
}
