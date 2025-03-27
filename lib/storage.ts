export interface Interview {
  candidate: string;
  interviewer: string;
  date: string;
  time: string;
}

// Get all scheduled interviews from local storage
export function getScheduledInterviews(): Interview[] {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("interviews") || "[]");
  }
  return [];
}

// Save interviews to local storage
export function saveInterview(interview: Interview) {
  const interviews = getScheduledInterviews();
  interviews.push(interview);
  localStorage.setItem("interviews", JSON.stringify(interviews));
}

// Check for time conflicts
export function hasConflict(date: string, time: string): boolean {
  const interviews = getScheduledInterviews();
  return interviews.some(
    (i) => i.date === date && i.time === time
  );
}
