"use client";
import { useState } from "react";
import { scheduleInterview } from "@/lib/scheduleInterview";

export default function InterviewScheduler() {
  const [candidateEmail, setCandidateEmail] = useState("");
  const [interviewerEmail, setInterviewerEmail] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSchedule = async () => {
    if (!candidateEmail || !interviewerEmail || !dateTime) {
      alert("Please fill in all fields.");
      return;
    }

    const response = await scheduleInterview({
      candidateEmail,
      interviewerEmail,
      dateTime,
    });

    if (response.success) {
      alert("Interview scheduled successfully!");
    } else {
      alert("Error scheduling interview: " + response.error);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Schedule an Interview</h2>
      <input
        type="email"
        placeholder="Candidate Email"
        value={candidateEmail}
        onChange={(e) => setCandidateEmail(e.target.value)}
        className="block mb-2 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Interviewer Email"
        value={interviewerEmail}
        onChange={(e) => setInterviewerEmail(e.target.value)}
        className="block mb-2 p-2 border rounded"
      />
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="block mb-2 p-2 border rounded"
      />
      <button
        onClick={handleSchedule}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Schedule Interview
      </button>
    </div>
  );
}
