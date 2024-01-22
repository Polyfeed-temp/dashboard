import axios from "./api.service";
import { AnnotationActionPoint } from "../types"
export async function updateActionStatus(actionId: number, status: boolean) {
    return axios.patch(`/api/action/${actionId}/status`, null, { params: { status }, })
}

export async function deleteActionItem(actionId: number) {
    return axios.delete(`/api/action/${actionId}`)
}

export async function updateHighlightActionItem(highlightId: string, actionItem: AnnotationActionPoint[]) {
    return axios.patch(`/api/action/${highlightId}/action`, actionItem)
}