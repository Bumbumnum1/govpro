import { API_ROUTES } from "./routes";

export interface ReportPayload {
  is_anonymous: boolean;
  name: string | null;
  email: string | null;
  issue_type: string;
  urgency: string;
  url: string;
  description: string;
}

export async function submitReport(payload: ReportPayload) {
  const res = await fetch(API_ROUTES.CREATE_REPORT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit report");
  }

  return await res.json();
}
