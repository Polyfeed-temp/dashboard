import axios from "./api.service";
import { AnnotationActionPoint } from "../types";
import { addLogs, eventType, eventSource } from "./logs.serivce";

export async function updateActionStatus(actionId: number, status: boolean) {
  addLogs({
    eventType: eventType[2],
    content: JSON.stringify({ actionId, status }),
    eventSource: eventSource[3],
  });
  return axios.patch(`/api/action/${actionId}/status`, null, {
    params: { status },
  });
}

export async function deleteActionItem(actionId: number) {
  addLogs({
    eventType: eventType[1],
    content: `${actionId}`,
    eventSource: eventSource[3],
  });

  return axios.delete(`/api/action/${actionId}`);
}

export async function updateHighlightActionItem(
  highlightId: string,
  actionItem: AnnotationActionPoint[]
) {
  addLogs({
    eventType: eventType[2],
    content: JSON.stringify({ highlightId, actionItem }),
    eventSource: eventSource[3],
  });

  return axios.patch(`/api/action/${highlightId}/action`, actionItem);
}
