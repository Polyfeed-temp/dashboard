import {Feedback} from "../types";
import {HighlightFeed} from "./HighlightFeed";
import {Typography, Button} from "@material-tailwind/react";
import {ProgressBarSummary} from "./ProgressBar";
import {ActionItemsSummary} from "../types";
import {useState} from "react";
export function AssignmentView({feedback}: {feedback: Feedback}) {
  const actionItemSummary = feedback?.highlights?.reduce(
    (acc, item) => {
      if (item.actionItems) {
        const completed = item.actionItems.filter(
          (actionItem) => actionItem.completed
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
    {completed: 0, incomplete: 0} as ActionItemsSummary
  ) || {completed: 0, incomplete: 0};
  const [actionItemSummaryState, setActionItemSummaryState] =
    useState<ActionItemsSummary>(actionItemSummary);

  // console.log(feedback, feedback.assessmentName, actionItemSummaryState);
  const actionItemSummaryFunc = (complete: boolean) => {
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
    <div>
      <div className="w-full bg-black text-white rounded-md p-1">
        <Typography variant="lead" color="white" className="font-normal">
          {feedback.assessmentName}
        </Typography>
      </div>
      <div className="flex flex-wrap">
        {feedback.highlights?.map((highlight) => (
          <div key={highlight.annotation.id} className=" p-2">
            <HighlightFeed
              Highlight={highlight}
              setActionItemFunc={actionItemSummaryFunc}
            />
          </div>
        ))}
      </div>

      {actionItemSummaryState.completed + actionItemSummaryState.incomplete >
        0 && (
        <div className="w-full">
          <ProgressBarSummary
            actionItemSummary={actionItemSummaryState}
          ></ProgressBarSummary>
        </div>
      )}

      <Button
        onClick={() => (window.location.href = feedback.url)}
        className="mt-4 flex items-center mt-4 w-full bg-black text-white rounded-md p-1 justify-between"
      >
        <Typography variant="small" color="white" className="font-normal">
          View Full Feedback
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
    </div>
  );
}
