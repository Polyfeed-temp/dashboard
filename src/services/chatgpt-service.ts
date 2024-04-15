import axios from "./api.service";

export async function getCommonThemeFromChatGpt() {
  return await axios.get(`/api/openai/common-theme`);
}
