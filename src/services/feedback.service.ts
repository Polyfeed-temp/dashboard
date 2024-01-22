import axios from "./api.service";

export async function getFeedbackByAssessmentId(assessmentId: number) {
    return axios.get(`/api/feedback/assessment/${assessmentId}`)

}

export async function deleteHighlight(highlightId: string) {
    return axios.delete(`/api/highlight/${highlightId}`)
}

export async function updateHighlightNotes(highlightId: string, notes: string) {
    return axios.patch(`api/highlight/${highlightId}/notes`, null, {
        params: { notes },
        headers: {

            'Content-Type': 'application/json'
        }
    })
}