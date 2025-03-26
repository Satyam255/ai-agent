export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience?: string;
  education?: string;
}

export function parseResume(text: string): ResumeData {
  // Extract name (assumes first line is name)
  const name = text.split('\n')[0]?.trim() || "Unknown";

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "Not found";

  // Extract phone number
  const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : "Not found";

  // Extract skills (basic predefined skill matching)
  const skillKeywords = ["React", "Next.js", "TypeScript", "JavaScript", "Python", "Node.js", "CSS", "HTML", "Machine Learning", "SQL"];
  const foundSkills = skillKeywords.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));

  // Extract experience (basic detection)
  const experienceMatch = text.match(/\b(?:experience|work history)\b[\s\S]*?(?=\b(?:education|skills)\b)/i);
  const experience = experienceMatch ? experienceMatch[0].trim() : "Not found";

  // Extract education (basic detection)
  const educationMatch = text.match(/\b(?:education|degree)\b[\s\S]*?(?=\b(?:skills|experience)\b)/i);
  const education = educationMatch ? educationMatch[0].trim() : "Not found";

  return {
    name,
    email,
    phone,
    skills: foundSkills,
    experience,
    education,
  };
}
