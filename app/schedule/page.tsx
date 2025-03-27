"use client";

import { useState } from "react";

import InterviewForm from "./_components/InterviewForm";
import InterviewList from "./_components/InterviewList";

export default function SchedulePage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Interview Scheduling</h1>
      <InterviewForm onSchedule={() => setRefresh(!refresh)} />
      <InterviewList refresh={refresh} />
    </div>
  );
}
