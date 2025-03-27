const GOOGLE_CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3";

export async function createCalendarEvent(
  accessToken: string,
  eventData: any
) {
  const response = await fetch(
    `${GOOGLE_CALENDAR_API_URL}/calendars/primary/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }
  );

  return response.json();
}
