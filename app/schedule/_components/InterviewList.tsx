"use client";
import { useState, useEffect } from "react";
import { getScheduledInterviews } from "@/lib/storage";

export default function InterviewList({ refresh }: { refresh: boolean }) {
  const [interviews, setInterviews] = useState(getScheduledInterviews());

  useEffect(() => {
    setInterviews(getScheduledInterviews());
  }, [refresh]);

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Scheduled Interviews</h2>
      {interviews.length === 0 ? (
        <p className="text-gray-500">No interviews scheduled.</p>
      ) : (
        <ul className="mt-2">
          {interviews.map((interview, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{interview.candidate}</strong> with <strong>{interview.interviewer}</strong>  
              on {interview.date} at {interview.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
