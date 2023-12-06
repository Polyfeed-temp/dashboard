import {UnitSummary} from "../components/UnitSummary";
import {AssignmentView} from "../components/AssignmentView";
import StackedBarChart from "../components/dataVis/BarChart";
import {useUserState} from "../store/UserContext";
import {ActionItemBarChart} from "../components/dataVis/ActionItemBarChart";
import {TemporalStrengthChart} from "../components/dataVis/TemporalStrenghtChart";
import {TemporalWeaknessChart} from "../components/dataVis/TemporalWeaknessChart";
import {CommonStrengthChart} from "../components/dataVis/CommonStrengths";
import {CommonWeaknessChart} from "../components/dataVis/CommonWeakness";
import {useState} from "react";

export function OverviewPage() {
  const user = useUserState();
  const [tab, setTab] = useState("strength");
  function graphs() {
    switch (tab) {
      case "actions":
        return <ActionItemBarChart />;
      case "strength":
        return (
          <>
            <h1>Strength Across Assessments</h1>
            <TemporalStrengthChart />
            <h1>Strength Across Units</h1>
            <CommonStrengthChart />
          </>
        );
      case "weakness":
        return (
          <>
            <h1>Weaknesses Across Assessments</h1>
            <TemporalWeaknessChart />
            <h1>Weaknesses Across Units</h1>
            <CommonWeaknessChart />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      {user.login ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="pl-4 col-1">
            <UnitSummary tab={tab} setTab={setTab} />
          </div>
          <div className="col-">{graphs()}</div>
        </div>
      ) : (
        <div>Please Login </div>
      )}
    </>
  );
}
