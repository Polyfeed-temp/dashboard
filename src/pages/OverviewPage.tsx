import { UnitSummary } from "../components/UnitSummary";
import { AssignmentView } from "../components/AssignmentView";
import StackedBarChart from "../components/dataVis/BarChart";
import { useUserState } from "../store/UserContext";
import { ActionItemBarChart } from "../components/dataVis/ActionItemBarChart";
import { TemporalStrengthChart } from "../components/dataVis/TemporalStrenghtChart";
import {
  TemporalWeaknessChart,
  CommonThemeFromGPTAssessment,
} from "../components/dataVis/TemporalWeaknessChart";
import { CommonStrengthChart } from "../components/dataVis/CommonStrengths";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CommonThemeFromGPT,
  CommonWeaknessChart,
} from "../components/dataVis/CommonWeakness";
import { useContext, useEffect, useState } from "react";
import { UnitOverallProgressBar } from "../components/OverallProgressBar";
import { Feedback } from "../types";
import Sidebar from "../components/SideBar";
import { CalendarView } from "../components/dataVis/CalendarView";
// import { CalendarList } from "../components/dataVis/CalendarList";
import { UnitSelection } from "../components/UnitSelection";
import { useUserAuth } from "../store/UserAuthContext";
import { onChange } from "react-toastify/dist/core/store";
import { UnitContext } from "../store/UnitContext";


export type Tab = "overview" | "actions" | "To-do list Calendar" | "strengthAA" | "weaknessAA" | "strengthAU" | "weaknessAU";
const commonThemesByUnitFunc = (unitsData: { [key: string]: Feedback[] }) => {
  return Object.keys(unitsData).map((unitCode) => {
    const feedbacks = unitsData[unitCode];
    let strengths: string[] = [];
    let weaknesses: string[] = [];

    feedbacks.forEach((feedback) => {
      feedback.highlights?.forEach((highlight) => {
        const { annotationTag, commonTheme } = highlight.annotation;
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
  (unitData: { [key: string]: Feedback[] }) => (unitCode: string) => {
    return unitData[unitCode].map((feedback) => {
      let strengths: string[] = [];
      let weaknesses: string[] = [];
      feedback.highlights?.forEach((highlight) => {
        const { annotationTag, commonTheme } = highlight.annotation;
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
  groupedByUnitCode: { [key: string]: Feedback[] };
}) {
  console.log(groupedByUnitCode);
  // const user = useUserState();
  const { user } = useUserAuth() || {};
  const [selectedTab, setSelectedTab] = useState("To-do list Calendar" as Tab);
  const [selectedUnit, setSelectedUnit] = useState("Overview" as string);
  const [selectedUnitData, setSelectedUnitData] = useState(
    [] as CommonThemeFromGPTAssessment[]
  );
  const [commonThemesByUnit, setCommonThemesByUnit] = useState(
    [] as CommonThemeFromGPT[]
  );

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab as Tab);
  };

  const {unit} = useContext(UnitContext)

  useEffect(() => {
    if (!user?.emailVerified) {
      return;
    }
    setCommonThemesByUnit(commonThemesByUnitFunc(groupedByUnitCode));
  }, [user?.emailVerified]);

  const commonThemesByAssessment = (unitCode: string) => {
    console.log(unitCode);
    setSelectedUnit(unitCode);
    const val = commonThemesByAssessmentFunc(groupedByUnitCode)(unitCode);
    setSelectedUnitData(val);
    return val;
  };

  useEffect(() => {
    if (unit?.unitId) {
      commonThemesByAssessment(unit?.unitId);
    }
  }, [unit?.unitId]);

  
  console.log(selectedUnitData);
  return (
    <>
      {user?.emailVerified ? (
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-2 mr-1" 
              style={{paddingRight: '0px', marginRight: '0px'}}>
              {selectedTab === "strengthAU" || selectedTab === "weaknessAU" ? (
                <>
                <UnitSelection unitCodes={Object.keys(groupedByUnitCode)} disabled={true} />
                <br></br>
              </>
              ) : (
                <>
                  <UnitSelection unitCodes={Object.keys(groupedByUnitCode)} disabled={false} />
                  <br></br>
                </>
              )}
              <br></br>
              <Sidebar onTabChange={handleTabChange}></Sidebar>
            </div>
            <div className="col-10">
              {
                <Graphs
                  key={selectedUnit}
                  unitsData={commonThemesByUnit}
                  assessmentData={selectedUnitData}
                  tab={selectedTab}
                ></Graphs>
              }
            </div>
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
    case "strengthAA":
      return (
        <>
          <h1>Strength Across Assessments</h1>
          <TemporalStrengthChart data={assessmentData} />
        </>
      );
      case "weaknessAA":
      return (
        <>
          <h1>Weakness Across Assessments</h1>
          <TemporalWeaknessChart data={assessmentData} />
        </>
      );
      case "strengthAU":
      return (
        <>
          <h1>Strength Across Units</h1>
          <CommonStrengthChart data={unitsData} />
        </>
      );
    case "weaknessAU":
      return (
        <>
          <h1>Weaknesses Across Units</h1>
          <CommonWeaknessChart data={unitsData} />
        </>
      );
    case "To-do list Calendar":
      return (
        <>
          <CalendarView/>
        </>
      );
    default:
      return null;
  }
}
