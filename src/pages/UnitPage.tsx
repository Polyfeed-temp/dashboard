import {AssignmentView} from "../components/AssignmentView";
import {Feedback} from "../types";
import {useEffect, useState} from "react";
import UserService from "../services/user.service";
const feedback: Feedback = {
  assessmentId: 1,
  assessmentName: "Assignment 1",
  unitCode: "FIT2099",
  mark: 80,
  marker: "John Smith",
  url: "https://lms.monash.edu/mod/assign/view.php?id=12092529#",
  highlights: [
    {
      annotation: {
        feedbackId: 1,
        id: "83257719-0008-435d-90ee-273ee1bd2f1e",
        text: "Test only odd N-bit prim",
        annotationTag: "Strength",
        notes: "<p>test</p>",
      },
    },
    {
      annotation: {
        feedbackId: 1,
        id: "83257719-0008-435d-90ee-273ee1bd2f1e",
        text: "Test only odd N-bit prim",
        annotationTag: "Strength",
        notes: "<p>test</p>",
      },
      actionItems: [
        {
          action: "need to define weapons coorectly in the code",
          actionpoint: "Contact Tutor",
          deadline: new Date(20 / 11 / 2023),
          completed: false,
        },
        {
          action: "action point2 ",
          actionpoint: "Contact Tutor",
          deadline: new Date(20 / 11 / 2023),
          completed: true,
        },
        {
          action: "need to define weapons coorectly in the code",
          actionpoint: "Contact Tutor",
          deadline: new Date(20 / 11 / 2023),
          completed: false,
        },
      ],
    },
  ],
};
export function UnitSummaryPage() {
  const [feedbacks, setFeedback] = useState<Feedback[]>([]);
  const userService = new UserService();
  useEffect(() => {
    userService.getUserFeedbacks().then((res) => setFeedback(res));
  }, []);

  console.log(feedbacks);

  return (
    <>
      {feedbacks.map((feedback) => (
        <AssignmentView feedback={feedback} />
      ))}
    </>
  );
}
