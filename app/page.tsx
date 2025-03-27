"use client";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/ResumeUpload";

export default function Home() {
  const router = useRouter();

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Recruitment Assistance AI</h1>
      <p className="text-gray-600">Upload resumes and match candidates to jobs.</p>

      <ResumeUpload />

      {/* Navigate using router.push() */}
      <button 
        onClick={() => router.push("/interview")}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Go to Interview
      </button>

      <button 
        onClick={() => router.push("/schedule")}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Go to Schedule
      </button>
    </div>
  );
}
