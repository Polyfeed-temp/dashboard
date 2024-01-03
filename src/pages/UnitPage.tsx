import {AssignmentView} from "../components/AssignmentView";
import {Feedback} from "../types";
import {useEffect, useState} from "react";
import UserService from "../services/user.service";
import {useParams} from "react-router-dom";
import {SideMenu} from "../components/SideMenu";

export function UnitSummaryPage({
  groupedByUnitCode,
}: {
  groupedByUnitCode: {[key: string]: Feedback[]};
}) {
  const {unitCode} = useParams();
  const feedbacks = unitCode ? groupedByUnitCode[unitCode] : null;
  console.log(feedbacks);
  const assessments =
    feedbacks?.map((feedback) => feedback.assessmentName) || [];
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");
  console.log(selectedAssessment);
  const selectedFeedbacks =
    feedbacks?.filter(
      (feedbacks) => feedbacks.assessmentName === selectedAssessment
    ) || [];
  console.log(selectedFeedbacks);
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/4  flex-shrink-0">
        <SideMenu
          title="Assessment"
          list={assessments}
          listFunc={assessments.map((assessment) => () => {
            setSelectedAssessment(assessment);
          })}
        ></SideMenu>
      </div>

      <div className="flex-grow w-full sm:w-3/4">
        {unitCode ? (
          <div className="w-full">
            {selectedFeedbacks.map((feedback) => (
              <div key={feedback.assessmentId} className="w-full p-6">
                <AssignmentView feedback={feedback} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
