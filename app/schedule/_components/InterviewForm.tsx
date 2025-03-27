// "use client";
// import { useState } from "react";
// import { saveInterview, hasConflict, Interview } from "@/lib/storage";

// export default function InterviewForm({ onSchedule }: { onSchedule: () => void }) {
//   const [candidate, setCandidate] = useState("");
//   const [interviewer, setInterviewer] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (hasConflict(date, time)) {
//       alert("This time slot is already booked. Choose another time.");
//       return;
//     }

//     const newInterview: Interview = { candidate, interviewer, date, time };
//     saveInterview(newInterview);
//     onSchedule(); // Refresh interview list
//     alert("Interview scheduled successfully!");

//     // Reset form
//     setCandidate("");
//     setInterviewer("");
//     setDate("");
//     setTime("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
//       <input 
//         type="text" placeholder="Candidate Name" value={candidate} 
//         onChange={(e) => setCandidate(e.target.value)} required
//         className="block w-full p-2 border mb-2"
//       />
//       <input 
//         type="text" placeholder="Interviewer Name" value={interviewer} 
//         onChange={(e) => setInterviewer(e.target.value)} required
//         className="block w-full p-2 border mb-2"
//       />
//       <input 
//         type="date" value={date} 
//         onChange={(e) => setDate(e.target.value)} required
//         className="block w-full p-2 border mb-2"
//       />
//       <input 
//         type="time" value={time} 
//         onChange={(e) => setTime(e.target.value)} required
//         className="block w-full p-2 border mb-2"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         Schedule Interview
//       </button>
//     </form>
//   );
// }
"use client";
import { useState } from "react";
import { saveInterview, hasConflict, Interview } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"; // For formatting the date

export default function InterviewForm({ onSchedule }: { onSchedule: () => void }) {
  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      alert("Please select a date.");
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd"); // Convert date to string

    if (hasConflict(formattedDate, time)) {
      alert("This time slot is already booked. Choose another time.");
      return;
    }

    const newInterview: Interview = {
      candidate,
      interviewer,
      date: formattedDate,
      time,
    };

    saveInterview(newInterview);
    onSchedule(); // Refresh interview list
    alert("Interview scheduled successfully!");

    // Reset form
    setCandidate("");
    setInterviewer("");
    setDate(undefined);
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Input 
        type="text" placeholder="Candidate Name" value={candidate} 
        onChange={(e) => setCandidate(e.target.value)} required
        className="mb-2"
      />
      <Input 
        type="text" placeholder="Interviewer Name" value={interviewer} 
        onChange={(e) => setInterviewer(e.target.value)} required
        className="mb-2"
      />

      {/* Calendar (Date Picker) */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full mb-2">
            {date ? format(date, "PPP") : "Select a Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>

      {/* Time Picker */}
      <Input 
        type="time" value={time} 
        onChange={(e) => setTime(e.target.value)} required
        className="mb-2"
      />

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        Schedule Interview
      </Button>
    </form>
  );
}
