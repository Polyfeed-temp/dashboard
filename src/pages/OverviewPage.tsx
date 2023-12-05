import {UnitSummary} from "../components/UnitSummary";
import {AssignmentView} from "../components/AssignmentView";

export function OverviewPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="pl-4 col-1">
        <UnitSummary />
      </div>
      <div className="col-2"></div>
    </div>
  );
}
