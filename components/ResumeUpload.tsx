"use client";
import { useState, useEffect } from "react";
import { parseResume, ResumeData } from "@/lib/parseResume";

export default function ResumeUpload() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [rankedCandidates, setRankedCandidates] = useState<ResumeData[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      setRankedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const text = e.target.result.toString();
          const parsedData: ResumeData = parseResume(text);
          console.log("Parsed Resume Data:", parsedData);
          setResumeData(parsedData);
        }
      };
      reader.readAsText(file);
    }
  };

  const rankCandidates = (candidates: ResumeData[]): ResumeData[] => {
    return candidates.sort((a, b) => b.skills.length - a.skills.length);
  };

  const handleSubmit = () => {
    if (resumeData) {
      const isDuplicate = rankedCandidates.some(
        (candidate) => candidate.email === resumeData.email
      );

      if (!isDuplicate) {
        const updatedCandidates = [...rankedCandidates, resumeData];
        const ranked = rankCandidates(updatedCandidates);
        setRankedCandidates(ranked);
        localStorage.setItem("candidates", JSON.stringify(ranked));
        console.log("Updated Ranked Candidates:", ranked);
        alert("Resume submitted successfully!");
      } else {
        alert("This resume has already been submitted.");
      }
    }
  };

  const handleClear = () => {
    setResumeData(null);
  };

  return (
    <div className="p-4 border rounded-lg">
      <input type="file" onChange={handleUpload} className="mb-4" />
      {resumeData && (
        <>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(resumeData, null, 2)}
          </pre>
          <button 
            onClick={handleSubmit} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button 
            onClick={handleClear} 
            className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </>
      )}
      <h2 className="mt-4 font-semibold">Ranked Candidates:</h2>
      <ul className="bg-gray-100 p-2 rounded">
        {rankedCandidates.map((candidate, index) => (
          <li key={index} className="border-b py-2 text-black">
            {candidate.name} - {candidate.skills.length} skills
          </li>
        ))}
      </ul>
    </div>
  );
}
