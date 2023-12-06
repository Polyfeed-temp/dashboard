export type AnnotationTag = "Strength" | "Weakness" | "Action Item" | "Confused" | "Other"

export interface Annotation {
    feedbackId: number;
    text: string;
    id: string;
    annotationTag: AnnotationTag;
    notes?: string
    gptResponse?: string
}
export interface AnnotationData {
    annotation: Annotation;
    actionItems?: AnnotationActionPoint[]
}
export type ActionPointCategory =
    | "Further Practice"
    | "Contact Tutor"
    | "Ask Classmate"
    | "Refer Learning Resources"
    | "Explore Online"
    | "Other";
export interface AnnotationActionPoint {
    action: string;
    actionpoint: ActionPointCategory;
    deadline: Date;
    completed: boolean;
}
export interface Feedback {
    id?: number
    assessmentId: number
    assessmentName: string;
    unitCode: string;
    mark: number;
    clarity?: number
    personalise?: number
    usability?: number
    emotion?: number
    highlights?: AnnotationData[];
    marker: string;
    url: string
}

type role = "Student" | "Tutor" | "Admin" | "Chief Examiner"

export interface User {
    firstName: string;
    monashId?: string;
    monashObjectId: string | null
    authcate: string
    email: string
    lastName: string;
    role: role
    faculty: string;
}

export interface UserState {
    login: boolean;
    access_token?: string;
    user: User | null;
}