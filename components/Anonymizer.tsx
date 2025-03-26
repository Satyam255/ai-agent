import { anonymizeData } from "@/lib/anonymizeData";

export default function Anonymizer({ resume }: { resume: any }) {
  const anonymizedResume = anonymizeData(resume);
  return <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(anonymizedResume, null, 2)}</pre>;
}