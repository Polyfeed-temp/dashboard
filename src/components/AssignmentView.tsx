import { AnnotationData, Feedback, AnnotationActionPoint } from "../types";
import { HighlightFeed } from "./HighlightFeed";
import { Typography, Button } from "@material-tailwind/react";
import { ProgressBarSummary } from "./ProgressBar";
import { ActionItemsSummary } from "../types";
import { useState } from "react";
import { updateActionStatus } from "../services/actionItem.service";
import { toast } from "react-toastify";
export function AssignmentView({
  feedback,
  deleteHighlightFunc,
  editFunc,
}: {
  feedback: Feedback;
  deleteHighlightFunc: (id: string) => void;
  editFunc: (
    isAction: boolean
  ) => (
    highlight: AnnotationData,
    originalActionItems?: AnnotationActionPoint[]
  ) => void;
}) {
  const actionItemSummary = feedback?.highlights?.reduce(
    (acc, item) => {
      if (item.actionItems) {
        const completed = item.actionItems.filter(
          (actionItem) => actionItem.status
        );
        const incomplete = item.actionItems.length - completed.length;

        return {
          ...acc,
          completed: acc.completed + completed.length,
          incomplete: acc.incomplete + incomplete,
        };
      }
      return acc;
    },
    { completed: 0, incomplete: 0 } as ActionItemsSummary
  ) || { completed: 0, incomplete: 0 };
  const [actionItemSummaryState, setActionItemSummaryState] =
    useState<ActionItemsSummary>(actionItemSummary);

  // console.log(feedback, feedback.assessmentName, actionItemSummaryState);
  const actionItemSummaryFunc = (id: number) => (complete: boolean) => {
    if (id) {
      const status = updateActionStatus(id, complete);
      toast.promise(status, {
        pending: "Changing status...",
        success: "Updated",
        error: "Error when updating",
      });
    }

    const updatedState = {
      ...actionItemSummaryState,
      completed: complete
        ? actionItemSummaryState.completed + 1
        : actionItemSummaryState.completed - 1,
      incomplete: complete
        ? actionItemSummaryState.incomplete - 1
        : actionItemSummaryState.incomplete + 1,
    };
    setActionItemSummaryState(updatedState);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 sticky top-0 z-10">
        <Typography variant="lead" color="white" className="font-medium">
          {feedback.assessmentName}
        </Typography>
      </div>

      <div className="p-6">
        {actionItemSummaryState.completed + actionItemSummaryState.incomplete >
          0 && (
          <div className="mb-8 bg-blue-50 p-5 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-blue-900">
                Progress Overview
              </h3>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {actionItemSummaryState.completed} of{" "}
                {actionItemSummaryState.completed +
                  actionItemSummaryState.incomplete}{" "}
                completed
              </span>
            </div>
            <ProgressBarSummary
              actionItemSummary={actionItemSummaryState}
            ></ProgressBarSummary>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Feedback Highlights
            </h3>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              {feedback.highlights?.length || 0} items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2">
            {feedback.highlights?.map((highlight) => (
              <div
                key={highlight.annotation.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 border border-gray-200/50"
              >
                <HighlightFeed
                  Highlight={highlight}
                  setActionItemFunc={actionItemSummaryFunc}
                  deleteFunc={() =>
                    deleteHighlightFunc(highlight.annotation.id)
                  }
                  editFunc={editFunc}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => {
            window.location.href = feedback.url;
          }}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl p-4 transition-all duration-200 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            <Typography variant="small" color="white" className="font-medium">
              View Full Feedback
            </Typography>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
