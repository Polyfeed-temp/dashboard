import {Feedback} from "../types";
import {UnitAssignmentSummary} from "../components/SummaryCard";
export function AllUnitsPage({feedbacks}: {feedbacks: Feedback[]}) {
  return (
    <div>
      {feedbacks.map((feedback) => {
        return <UnitAssignmentSummary feedback={feedback} />;
      })}
    </div>
  );
}
