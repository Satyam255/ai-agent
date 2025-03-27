import { NextApiRequest, NextApiResponse } from "next";
import { createCalendarEvent } from "@/lib/calendarAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { candidateEmail, interviewerEmail, dateTime } = req.body;

  if (!candidateEmail || !interviewerEmail || !dateTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const eventData = {
    summary: `Interview with ${candidateEmail}`,
    description: `Candidate: ${candidateEmail}\nInterviewer: ${interviewerEmail}`,
    start: { dateTime },
    end: { dateTime: new Date(new Date(dateTime).getTime() + 30 * 60000).toISOString() },
    attendees: [{ email: candidateEmail }, { email: interviewerEmail }],
  };

  try {
    const accessToken = "YOUR_GOOGLE_OAUTH_ACCESS_TOKEN"; // Replace with OAuth token
    const event = await createCalendarEvent(accessToken, eventData);
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, error: "Google Calendar API error" });
  }
}

