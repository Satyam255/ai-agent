export default function SkillMatcher({ skills }: { skills: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold">Matched Skills:</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="text-blue-500">{skill}</li>
        ))}
      </ul>
    </div>
  );
}
