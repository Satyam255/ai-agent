import ResumeUpload from "@/components/ResumeUpload";

export default function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Recruitment Assistance AI</h1>
      <p className="text-gray-600">Upload resumes and match candidates to jobs.</p>

      <ResumeUpload />
    </div>
  );
}