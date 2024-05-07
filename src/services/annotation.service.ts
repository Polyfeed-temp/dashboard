import { AnnotationData, Feedback, AnnotationActionPoint } from "../types";
import axios from "./api.service";
import { addLogs, eventType, eventSource } from "./logs.serivce";

class AnnotationService {
  public async getAnnotations(): Promise<AnnotationData[]> {
    const highlights = await axios
      .get("/api/annotation")
      .then((res) => res.data);
    return highlights as AnnotationData[];
  }

  public async getCurrentPageFeedback(): Promise<Feedback | null> {
    try {
      const highlights = await axios
        .get(
          "/api/feedback/highlights?url=" +
            encodeURIComponent(window.location.href)
        )
        .then((res) => res.data);
      return highlights as Feedback;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public addAnnotations(highlight: AnnotationData) {
    addLogs({
      eventType: eventType[0],
      content: JSON.stringify(highlight),
      eventSource: eventSource[10],
    });

    return axios.post("/api/highlight/", highlight, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteAnnotation(annotationId: string) {
    addLogs({
      eventType: eventType[1],
      content: JSON.stringify({ annotationId }),
      eventSource: eventSource[10],
    });

    return axios.delete("/api/highlight/" + annotationId);
  }

  public async createFeedback(feedback: Feedback): Promise<Feedback> {
    addLogs({
      eventType: eventType[0],
      content: JSON.stringify({ feedback }),
      eventSource: eventSource[9],
    });

    const response = await axios.post("/api/feedback/", feedback);
    return response.data as Feedback;
  }

  public async updateFeedbackAssessment(
    feedbackId: number,
    assessmentId: number
  ) {
    addLogs({
      eventType: eventType[2],
      content: JSON.stringify({ feedbackId, assessmentId }),
      eventSource: eventSource[9],
    });

    return axios.patch(
      `/api/feedback/assessment/${feedbackId}/${assessmentId}`
    );
  }
  public async updateHighlightNotes(highlightId: string, notes: string) {
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
  public async getAllFeedack(): Promise<Feedback[]> {
    const response = await axios.get("/api/feedback/all");
    console.log(response.data);
    return response.data as Feedback[];
  }

  public async deleteAllHighlights(feedbackId: number) {
    addLogs({
      eventType: eventType[1],
      content: JSON.stringify({ feedbackId }),
      eventSource: eventSource[2],
    });

    return axios.delete(`/api/feedback/all/${feedbackId}`);
  }

  public async deleteFeedback(feedbackId: number) {
    addLogs({
      eventType: eventType[1],
      content: JSON.stringify({ feedbackId }),
      eventSource: eventSource[9],
    });

    return axios.delete(`/api/feedback/${feedbackId}`);
  }

  public async addActionItem(
    highlightId: string,
    actionItem: AnnotationActionPoint
  ) {
    addLogs({
      eventType: eventType[0],
      content: JSON.stringify({ highlightId, actionItem }),
      eventSource: eventSource[2],
    });

    return axios.post(`/api/action /${highlightId}/action`, actionItem);
  }

  public async updateHighlightActionItem(
    highlightId: string,
    actionItem: AnnotationActionPoint[]
  ) {
    addLogs({
      eventType: eventType[2],
      content: JSON.stringify({ highlightId, actionItem }),
      eventSource: eventSource[2],
    });

    return axios.patch(`/api/action/${highlightId}/action`, actionItem);
  }
  public async rateGptResponse(feedbackId: number, rating: number) {
    addLogs({
      eventType: eventType[0],
      content: JSON.stringify({ feedbackId, rating }),
      eventSource: eventSource[11],
    });

    return axios.post(`/api/feedback/rate/gpt/${feedbackId}`, null, {
      params: { rating },
    });
  }

  public async updateActionStatus(actionId: number, status: boolean) {
    addLogs({
      eventType: eventType[2],
      content: JSON.stringify({ actionId, status }),
      eventSource: eventSource[12],
    });

    return axios.patch(`/api/action/${actionId}/status`, null, {
      params: { status },
    });
  }
}

export default AnnotationService;
