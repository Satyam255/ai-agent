export async function scheduleInterview(data: {
  candidateEmail: string;
  interviewerEmail: string;
  dateTime: string;
}) {
  try {
    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: "Network error" };
  }
}
