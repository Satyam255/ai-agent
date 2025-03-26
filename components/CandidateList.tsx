export default function CandidateList({ candidates }: { candidates: any[] }) {
  return (
    <ul className="list-disc p-4">
      {candidates.map((candidate, index) => (
        <li key={index}>{candidate.name} - Score: {candidate.score}</li>
      ))}
    </ul>
  )
}