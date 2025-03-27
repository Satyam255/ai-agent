// export function generateInterviewQuestions(): string[] {
//   return [
//     "Tell me about yourself.",
//     "What are your key skills?",
//     "Describe a challenge you've faced at work.",
//     "Why do you want this job?",
//     "Where do you see yourself in 5 years?"
//   ];
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is loaded from environment variables
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
// Add this to verify API key is being loaded correctly
console.log("API Key Present:", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);
export async function generateInterviewQuestions(
  jobRole: string = 'Software Engineer'
): Promise<string[]> {
  try {
    // Use 'gemini-pro' for the latest stable version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 5 unique and insightful behavioral and technical interview questions for a ${jobRole} role. 
    Ensure the questions are:
    - Progressively more challenging
    - Cover different aspects of professional experience
    - Specific to the role
    - Designed to reveal the candidate's skills and personality

    Format the response as a numbered list of questions.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the questions from the response
    const questions = text
      .split('\n')
      .filter(q => q.trim() && q.includes('?'))
      .map(q => q.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 5); // Ensure we have exactly 5 questions

    return questions.length > 0 
      ? questions 
      : [
          "Tell me about yourself.",
          "What are your key skills?",
          "Describe a challenge you've faced at work.",
          "Why do you want this job?",
          "Where do you see yourself in 5 years?"
        ];
  } catch (error) {
    console.error("Detailed Gemini API Error:", JSON.stringify(error, null, 2));
    // Fallback to static questions if API fails
    return [
      "Tell me about yourself.",
      "What are your key skills?",
      "Describe a challenge you've faced at work.",
      "Why do you want this job?",
      "Where do you see yourself in 5 years?"
    ];
  }
}

export async function analyzeInterviewResponses(
  questions: string[], 
  responses: string[]
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Provide a comprehensive interview analysis based on the following:

Interview Details:
${questions.map((q, i) => `Question ${i+1}: ${q}\nResponse ${i+1}: ${responses[i]}`).join('\n\n')}

Please provide a detailed assessment that includes:
- Overall performance evaluation
- Strengths demonstrated
- Areas for potential improvement
- Alignment with job requirements
- Communication effectiveness

Format your response in a clear, professional manner.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text() || "No analysis available.";
  } catch (error) {
    console.error("Detailed Gemini API Analysis Error:", JSON.stringify(error, null, 2));
    return "An error occurred during analysis.";
  }
}