import axios from "./api.service";

export const eventType: string[] = [
  "create", //0
  "delete", //1
  "update", //2
  "login", //3
  "open", //4
  "close", //5
  "navigate", //6
  "rate", //7
];

export const eventSource: string[] = [
  "main_page", //0
  "auth", //1
  "highlight", //2
  "todo", //3
  "strength_units", //4
  "weakness_units", //5
  "strength_assessments", //6
  "weakness_assessments", //7
  "calendar", //8
  "feedback", //9
  "annotation", // 10
  "chatgpt", //11
  "action", //12
];

export async function addLogs(params: {
  eventType: string;
  content: string;
  eventSource: string;
}) {
  return await axios.post("/api/logs/", params);
}
