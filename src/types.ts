export type AnnotationTag = "Strength" | "Weakness" | "Action Item" | "Confused" | "Other"

export interface Annotation {
    feedbackId: number;
    text: string;
    id: string;
    annotationTag: AnnotationTag;
    notes?: string
    gptResponse?: string
    commonTheme?: string
}
export interface AnnotationData {
    annotation: Annotation;
    actionItems?: AnnotationActionPoint[]
}
export type ActionPointCategory =
    | "Further Practice"
    | "Contact Tutor"
    | "Ask Classmates"
    | "Refer Learning Resources"
    | "Explore Online"
    | "Other";

export interface AnnotationActionPoint {
    id?: number;
    action: string;
    category: ActionPointCategory;
    deadline: Date;
    status: boolean;
}

export interface Assessment {
    assessmentId: number,
    assessmentName: string,
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

export type Role = "Student" | "Tutor" | "Admin" | "Chief Examiner"

export interface User {
    firstName: string;
    monashId?: string;
    monashObjectId: string | null
    authcate: string
    email: string
    lastName: string;
    role: Role
    faculty: string;
}
/**
 * @deprecated
 */
export interface UserState {
    login: boolean;
    access_token?: string;
    user: User | null;
}

export interface ActionItemsSummary {
    completed: number
    incomplete: number
    assessmentName?: string
}

export type Faculty = "Information Technology" | "Engineering" | "Arts" | "Business and Economics" | "Science" | "Medicine, Nursing and Health Sciences" | "Education" | "Law" | "Pharmacy" | "Art, Design and Architecture" | "Pharmacy and Pharmaceutical Sciences"
