import { AssignmentView } from "../components/AssignmentView";
import { Feedback, AnnotationData, Assessment } from "../types";
import { useContext, useEffect, useState } from "react";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import { SideMenu } from "../components/SideMenu";
import {
  getFeedbackByAssessmentId,
  deleteHighlight,
  updateHighlightNotes,
} from "../services/feedback.service";
import { toast } from "react-toastify";
import { updateHighlightActionItem } from "../services/actionItem.service";
import { UnitContext } from "../store/UnitContext";
import { UnitSelection } from "../components/UnitSelection";
export function UnitSummaryPage({
  groupedByUnitCode,
}: {
  groupedByUnitCode: { [key: string]: Feedback[] };
}) {
  // const {unitCode} = useParams();
  const { unit } = useContext(UnitContext);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback>();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment>();
  const [assessmentDetails, setAssessmentDetails] = useState<Assessment[]>([]);

  useEffect(() => {
    if (unit) {
      const unitCode = unit?.unitId;
      const feedbacks = unitCode ? groupedByUnitCode[unitCode] : null;
      const temp_data =
        feedbacks
          ?.map((feedback) => ({
            assessmentId: feedback.assessmentId,
            assessmentName: feedback.assessmentName,
          }))
          .sort((a, b) => a.assessmentId - b.assessmentId) || [];
          setAssessmentDetails(temp_data);
    }
    if (unit && selectedAssessment) {
      const status = getFeedbackByAssessmentId(selectedAssessment.assessmentId);
      toast.promise(status, {
        pending: "Loading...",
        success: "Loaded!",
        error: "Error when loading",
      });
      status.then((res) => setSelectedFeedback(res.data as Feedback));
    }
  }, [unit, selectedAssessment]);

  const deleteHighlightFunc = (id: string) => {
    const status = deleteHighlight(id);
    toast.promise(status, {
      pending: "Deleting...",
      success: "Deleted",
      error: "Error when deleting",
    });

    status.then(() =>
      setSelectedFeedback((feedback) => {
        if (feedback) {
          return {
            ...feedback,
            highlights: feedback.highlights?.filter(
              (highlight) => highlight.annotation.id !== id
            ),
          };
        }
        return feedback;
      })
    );
  };

  const editFunc = (isAction: boolean) => (highlight: AnnotationData) => {
    const status = isAction
      ? updateHighlightActionItem(
          highlight.annotation.id,
          highlight.actionItems || []
        )
      : updateHighlightNotes(
          highlight.annotation.id,
          highlight.annotation.notes || ""
        );
    toast.promise(status, {
      pending: "Saving...",
      success: "Saved",
      error: "Error when saving",
    });
    status.then(() =>
      setSelectedFeedback((feedback) => {
        if (feedback) {
          return {
            ...feedback,
            highlights: feedback.highlights?.map((item) =>
              item.annotation.id === highlight.annotation.id ? highlight : item
            ),
          };
        }
        return feedback;
      })
    );
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/4  flex-shrink-0">
        <UnitSelection unitCodes={Object.keys(groupedByUnitCode)} disabled={false} />
        <SideMenu
          title="Assessment"
          list={assessmentDetails.map(
            (assessment) => assessment.assessmentName
          )}
          listFunc={assessmentDetails.map((assessment) => () => {
            setSelectedAssessment(assessment);
          })}
        ></SideMenu>
      </div>

      <div className="flex-grow w-full sm:w-3/4">
        {selectedFeedback ? (
          <div className="w-full">
            <div key={selectedFeedback?.id ?? 0} className="w-full p-6">
              <AssignmentView
                feedback={selectedFeedback}
                deleteHighlightFunc={deleteHighlightFunc}
                editFunc={editFunc}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
