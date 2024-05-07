import axios from "./api.service";
import { addLogs, eventType, eventSource } from "./logs.serivce";

export async function getCommonThemeFromChatGpt() {
  addLogs({
    eventType: eventType[2],
    content: `common-theme`,
    eventSource: eventSource[11],
  });
  return await axios.get(`/api/openai/common-theme`);
}
