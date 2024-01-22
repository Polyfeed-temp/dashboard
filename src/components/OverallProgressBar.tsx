import {Feedback} from "../types";
import {ProgressBarSummary} from "./ProgressBar";
import {ActionItemsSummary} from "../types";

export function UnitOverallProgressBar({feedbacks}: {feedbacks: Feedback[]}) {
  //   const actionItemSummaryList = feedbacks.map((feedback) => {
  //     return (
  //       feedback.highlights?.reduce(
  //         (acc, item) => {
  //           if (item.actionItems) {
  //             const completed = item.actionItems.filter(
  //               (actionItem) => actionItem.completed
  //             );
  //             const incomplete = item.actionItems.length - completed.length;
  //             return {
  //               ...acc,
  //               completed: acc.completed + completed.length,
  //               incomplete: acc.incomplete + incomplete,
  //             };
  //           }
  //           return acc;
  //         },
  //         {
  //           completed: 0,
  //           incomplete: 0,
  //           assessmentName: feedback.assessmentName,
  //         } as ActionItemsSummary
  //       ) || {completed: 0, incomplete: 0}
  //     );
  //   });
  //   return (
  //     <div className="border-solid border-2">
  //       {/* {actionItemSummaryList.length > 0 &&
  //         actionItemSummaryList.map((actionItemSummary) => (
  //            actionItemSummary.completed + actionItemSummary.incomplete > 0)
  //             (<div>{actionItemSummary.assessmentName}</div>)
  //         ))} */}
  //     </div>
  //   );
}
