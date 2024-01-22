import {UnitSummary} from "../components/UnitSummary";
import {AssignmentView} from "../components/AssignmentView";
import StackedBarChart from "../components/dataVis/BarChart";
import {useUserState} from "../store/UserContext";
import {ActionItemBarChart} from "../components/dataVis/ActionItemBarChart";
import {TemporalStrengthChart} from "../components/dataVis/TemporalStrenghtChart";
import {
  TemporalWeaknessChart,
  CommonThemeFromGPTAssessment,
} from "../components/dataVis/TemporalWeaknessChart";
import {CommonStrengthChart} from "../components/dataVis/CommonStrengths";
import {
  CommonThemeFromGPT,
  CommonWeaknessChart,
} from "../components/dataVis/CommonWeakness";
import {useEffect, useState} from "react";
import {UnitOverallProgressBar} from "../components/OverallProgressBar";
import {Feedback} from "../types";

export type Tab = "overview" | "strength" | "weakness" | "actions";
const commonThemesByUnitFunc = (unitsData: {[key: string]: Feedback[]}) => {
  return Object.keys(unitsData).map((unitCode) => {
    const feedbacks = unitsData[unitCode];
    let strengths: string[] = [];
    let weaknesses: string[] = [];

    feedbacks.forEach((feedback) => {
      feedback.highlights?.forEach((highlight) => {
        const {annotationTag, commonTheme} = highlight.annotation;
        if (commonTheme) {
          if (annotationTag === "Strength") {
            strengths.push(commonTheme);
          } else if (annotationTag === "Weakness") {
            weaknesses.push(commonTheme);
          }
        }
      });
    });

    return {
      Unit: unitCode,
      strengths: strengths,
      weakness: weaknesses,
    };
  });
};
const commonThemesByAssessmentFunc =
  (unitData: {[key: string]: Feedback[]}) => (unitCode: string) => {
    return unitData[unitCode].map((feedback) => {
      let strengths: string[] = [];
      let weaknesses: string[] = [];
      feedback.highlights?.forEach((highlight) => {
        const {annotationTag, commonTheme} = highlight.annotation;
        if (commonTheme) {
          if (annotationTag === "Strength") {
            strengths.push(commonTheme);
          } else if (annotationTag === "Weakness") {
            weaknesses.push(commonTheme);
          }
        }
      });
      return {
        assessmentName: feedback.assessmentName,
        strengths: strengths,
        weakness: weaknesses,
      };
    });
  };

export function OverviewPage({
  groupedByUnitCode,
}: {
  groupedByUnitCode: {[key: string]: Feedback[]};
}) {
  console.log(groupedByUnitCode);
  const user = useUserState();
  const [tab, setTab] = useState("overview" as Tab);
  const [selectedUnit, setSelectedUnit] = useState("Overview" as string);
  const [selectedUnitData, setSelectedUnitData] = useState(
    [] as CommonThemeFromGPTAssessment[]
  );
  const [commonThemesByUnit, setCommonThemesByUnit] = useState(
    [] as CommonThemeFromGPT[]
  );

  useEffect(() => {
    if (!user.login) {
      return;
    }
    const val = commonThemesByUnitFunc(groupedByUnitCode);
    setCommonThemesByUnit(commonThemesByUnitFunc(groupedByUnitCode));
  }, [user.login]);

  const commonThemesByAssessment = (unitCode: string) => {
    console.log(unitCode);
    setSelectedUnit(unitCode);
    const val = commonThemesByAssessmentFunc(groupedByUnitCode)(unitCode);
    setSelectedUnitData(val);
    return val;
  };
  console.log(selectedUnitData);
  return (
    <>
      {user.login ? (
        <div className="grid grid-cols-6 gap-4">
          <div className="pl-4 col-1">
            <UnitSummary
              unitCodes={Object.keys(groupedByUnitCode)}
              tab={tab}
              setTab={setTab}
              dataFunc={(x) => commonThemesByAssessment(x)}
            />
          </div>
          <div className="col-5">
            {
              <Graphs
                key={selectedUnit}
                unitsData={commonThemesByUnit}
                assessmentData={selectedUnitData}
                tab={tab}
              ></Graphs>
            }
          </div>
        </div>
      ) : (
        <div>Please Login </div>
      )}
    </>
  );
}

function Graphs({
  unitsData,
  assessmentData,
  tab,
}: {
  unitsData: CommonThemeFromGPT[];
  assessmentData: CommonThemeFromGPTAssessment[];
  tab: Tab;
}) {
  switch (tab) {
    case "actions":
      return <ActionItemBarChart />;
    case "overview":
      return (
        <>
          <h1>Strength Across Units</h1>
          <CommonStrengthChart data={unitsData} />
          <h1>Weaknesses Across Units</h1>
          <CommonWeaknessChart data={unitsData} />
        </>
      );
    case "strength":
      return (
        <>
          <h1>Strength Across Assessments</h1>
          <TemporalStrengthChart data={assessmentData} />
        </>
      );
    case "weakness":
      return (
        <>
          <h1>Weaknesses Across Assessments</h1>
          <TemporalWeaknessChart data={assessmentData} />
        </>
      );
    default:
      return null;
  }
}
