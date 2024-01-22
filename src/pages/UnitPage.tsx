import {AssignmentView} from "../components/AssignmentView";
import {Feedback, AnnotationData} from "../types";
import {useEffect, useState} from "react";
import UserService from "../services/user.service";
import {useParams} from "react-router-dom";
import {SideMenu} from "../components/SideMenu";
import {
  getFeedbackByAssessmentId,
  deleteHighlight,
  updateHighlightNotes,
} from "../services/feedback.service";
import {toast} from "react-toastify";
import {updateHighlightActionItem} from "../services/actionItem.service";
export function UnitSummaryPage({
  groupedByUnitCode,
}: {
  groupedByUnitCode: {[key: string]: Feedback[]};
}) {
  const {unitCode} = useParams();
  const feedbacks = unitCode ? groupedByUnitCode[unitCode] : null;
  const assessmentDetails =
    feedbacks
      ?.map((feedback) => ({
        assessmentId: feedback.assessmentId,
        assessmentName: feedback.assessmentName,
      }))
      .sort((a, b) => a.assessmentId - b.assessmentId) || [];

  const [selectedAssessment, setSelectedAssessment] = useState<{
    assessmentId: number;
    assessmentName: string;
  }>(assessmentDetails[0]);

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback>();
  useEffect(() => {
    const status = getFeedbackByAssessmentId(selectedAssessment.assessmentId);
    toast.promise(status, {
      pending: "Loading...",
      success: "Loaded!",
      error: "Error when loading",
    });
    status.then((res) => setSelectedFeedback(res.data as Feedback));
  }, [selectedAssessment]);

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
