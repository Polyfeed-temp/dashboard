import axios from "./api.service";
import { addLogs, eventType, eventSource } from "./logs.serivce";

export async function getFeedbackByAssessmentId(assessmentId: number) {
  return axios.get(`/api/feedback/assessment/${assessmentId}`);
}

export async function deleteHighlight(highlightId: string) {
  addLogs({
    eventType: eventType[1],
    content: JSON.stringify({ highlightId }),
    eventSource: eventSource[2],
  });

  return axios.delete(`/api/highlight/${highlightId}`);
}

export async function updateHighlightNotes(highlightId: string, notes: string) {
  addLogs({
    eventType: eventType[2],
    content: JSON.stringify({ highlightId, notes }),
    eventSource: eventSource[2],
  });

  return axios.patch(`api/highlight/${highlightId}/notes`, null, {
    params: { notes },
    headers: {
      "Content-Type": "application/json",
    },
  });
}
