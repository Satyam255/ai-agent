"use client";
import { useState, useEffect, useCallback } from "react";
import { generateInterviewQuestions } from "@/lib/generateScript";
import { saveInterviewSession } from "@/lib/storeInterview";
import InterviewBot from "./InterviewBot";
import SpeechRecognition from "./SpeechRecognition";

export default function InterviewUI() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // Dynamically generate questions when interview starts
  const startInterview = useCallback(async () => {
    try {
      const dynamicQuestions = await generateInterviewQuestions();
      setQuestions(dynamicQuestions);
      setIsInterviewActive(true);
      setCurrentQuestionIndex(0);
      setResponses([]);
    } catch (error) {
      console.error("Failed to generate interview questions:", error);
      alert("Failed to start interview. Please try again.");
    }
  }, []);

  const handleResponse = useCallback((text: string) => {
    // Add the response to the list
    setResponses(prev => [...prev, text]);
    
    // Move to next question or end interview
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsWaitingForResponse(false);
    } else {
      // Interview is complete
      setIsInterviewActive(false);
      saveInterviewSession(questions, [...responses, text]);
      alert("Interview completed! Your responses have been saved.");
    }
  }, [currentQuestionIndex, questions, responses]);

  // Automatically start listening after each question
  useEffect(() => {
    if (isInterviewActive && !isWaitingForResponse) {
      // Small delay to ensure speech synthesis is complete
      const timer = setTimeout(() => {
        setIsWaitingForResponse(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInterviewActive, currentQuestionIndex, isWaitingForResponse]);

  return (
    <div className="p-6 border rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center">AI Interview Assistant</h2>

      {!isInterviewActive ? (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full"
          onClick={startInterview}
        >
          Start AI Interview
        </button>
      ) : (
        <>
          <InterviewBot question={questions[currentQuestionIndex]} />
          {isWaitingForResponse && (
            <SpeechRecognition 
              onResult={handleResponse} 
              autoStart={true}
            />
          )}
        </>
      )}
    </div>
  );
}
