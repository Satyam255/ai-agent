// "use client";
// import { useEffect } from "react";

// interface InterviewBotProps {
//   question: string;
// }

// export default function InterviewBot({ question }: InterviewBotProps) {
//   useEffect(() => {
//     const speech = new SpeechSynthesisUtterance(question);
//     speech.lang = "en-US";
//     window.speechSynthesis.speak(speech);
//   }, [question]);

//   return (
//     <div className="p-4 mt-4 border rounded-lg bg-gray-200">
//       <h3 className="text-lg font-semibold">AI Interviewer</h3>
//       <p>{question}</p>
//     </div>
//   );
// }
"use client";
import { useEffect } from "react";

interface InterviewBotProps {
  question: string;
}

export default function InterviewBot({ question }: InterviewBotProps) {
  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(question);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }, [question]);

  return (
    <div className="p-4 mt-4 border rounded-lg bg-gray-200">
      <h3 className="text-lg font-semibold">AI Interviewer</h3>
      <p className="text-black">{question}</p>
    </div>
  );
}