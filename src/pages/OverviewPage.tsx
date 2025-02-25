import { ActionItemBarChart } from "../components/dataVis/ActionItemBarChart";
import { TemporalStrengthChart } from "../components/dataVis/TemporalStrenghtChart";
import {
  TemporalWeaknessChart,
  CommonThemeFromGPTAssessment,
} from "../components/dataVis/TemporalWeaknessChart";
import { CommonStrengthChart } from "../components/dataVis/CommonStrengths";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CommonThemeFromGPT,
  CommonWeaknessChart,
} from "../components/dataVis/CommonWeakness";
import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { Feedback } from "../types";
import Sidebar from "../components/SideBar";
import { CalendarView } from "../components/dataVis/CalendarView";
import { UnitSelection } from "../components/UnitSelection";
import { useUserAuth } from "../store/UserAuthContext";
import { UnitContext } from "../store/UnitContext";
import { Button, Spinner } from "@material-tailwind/react";
import { getCommonThemeFromChatGpt } from "../services/chatgpt-service";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

export type Tab =
  | "overview"
  | "actions"
  | "To-do list Calendar"
  | "strengthAA"
  | "weaknessAA"
  | "strengthAU"
  | "weaknessAU";
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
  fetchData,
}: {
  groupedByUnitCode: { [key: string]: Feedback[] };
  fetchData: Function;
}) {
  const { user } = useUserAuth() || {};
  const [selectedTab, setSelectedTab] = useState("To-do list Calendar" as Tab);
  const [selectedUnit, setSelectedUnit] = useState("Overview" as string);
  const [selectedUnitData, setSelectedUnitData] = useState(
    [] as CommonThemeFromGPTAssessment[]
  );
  const [commonThemesByUnit, setCommonThemesByUnit] = useState(
    [] as CommonThemeFromGPT[]
  );
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab as Tab);
  };

  const { unit } = useContext(UnitContext);

  useEffect(() => {
    if (!user?.emailVerified) {
      return;
    }
    setCommonThemesByUnit(commonThemesByUnitFunc(groupedByUnitCode));
  }, [user?.emailVerified, groupedByUnitCode]);

  const commonThemesByAssessment = (unitCode: string) => {
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

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const sidebarWidth = isMobile ? "w-[280px]" : "w-[300px]";

  return (
    <div className="min-h-screen bg-gray-50">
      {user?.emailVerified ? (
        <div className="flex relative">
          {/* Mobile Header */}
          <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 px-4">
            <div className="flex items-center justify-between h-full">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isSidebarOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || !isMobile) && (
              <>
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className={`
                    fixed md:sticky top-0 left-0 h-screen bg-white shadow-lg
                    ${sidebarWidth} z-50 overflow-hidden
                    flex flex-col
                    ${isMobile ? "mt-16" : ""}
                  `}
                >
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                    <div className="p-6 space-y-8">
                      {/* Unit Selection */}
                      <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          Unit Selection
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <UnitSelection
                            unitCodes={Object.keys(groupedByUnitCode)}
                            disabled={false}
                          />
                        </div>
                      </section>

                      {/* Analytics Navigation */}
                      <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          Analytics
                        </h2>
                        <div className="bg-gray-50 rounded-lg">
                          <Sidebar onTabChange={handleTabChange} />
                        </div>
                      </section>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Overlay */}
                {isMobile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                  />
                )}
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main
            className={`
            flex-1 
            transition-all duration-300 ease-in-out
            ${isMobile ? "mt-16" : ""}
            ${isSidebarOpen && !isMobile ? `ml-[${sidebarWidth}]` : "ml-0"}
          `}
          >
            <div className="p-4 lg:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
              >
                <GraphsContainer
                  key={selectedUnit}
                  unitsData={commonThemesByUnit}
                  assessmentData={selectedUnitData}
                  tab={selectedTab}
                  fetchData={fetchData}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              </motion.div>
            </div>
          </main>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-screen p-4"
        >
          <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full mx-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600">Please login to access this page</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function GraphsContainer({
  unitsData,
  assessmentData,
  tab,
  fetchData,
  isMobile,
  isTablet,
}: {
  unitsData: CommonThemeFromGPT[];
  assessmentData: CommonThemeFromGPTAssessment[];
  tab: Tab;
  fetchData: Function;
  isMobile: boolean;
  isTablet: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const initialLoadRef = useRef(false);

  const updateCommonTheme = async () => {
    setLoading(true);
    await getCommonThemeFromChatGpt();
    await fetchData();
    setLoading(false);
    toast.success("Common Theme Updated Successfully");
  };

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      updateCommonTheme();
    }
  }, []);

  const renderHeader = (title: string) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
      <Button
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
        onClick={updateCommonTheme}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner className="h-4 w-4" />
            <span>Updating...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh Graph</span>
          </>
        )}
      </Button>
    </motion.div>
  );

  const renderGraphContainer = (content: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6"
    >
      {content}
    </motion.div>
  );

  switch (tab) {
    case "actions":
      return renderGraphContainer(
        <>
          {renderHeader("Action Items Overview")}
          <ActionItemBarChart />
        </>
      );

    case "overview":
      return renderGraphContainer(
        <>
          {renderHeader("Performance Overview")}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Strengths Across Units
              </h2>
              <CommonStrengthChart data={unitsData} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Weaknesses Across Units
              </h2>
              <CommonWeaknessChart data={unitsData} />
            </div>
          </div>
        </>
      );

    case "To-do list Calendar":
      return renderGraphContainer(
        <>
          {renderHeader("To-do Calendar")}
          <CalendarView />
        </>
      );

    case "strengthAA":
      return renderGraphContainer(
        <>
          {renderHeader("Strengths Across Assessments")}
          <TemporalStrengthChart data={assessmentData} />
        </>
      );

    case "weaknessAA":
      return renderGraphContainer(
        <>
          {renderHeader("Weaknesses Across Assessments")}
          <TemporalWeaknessChart data={assessmentData} />
        </>
      );

    case "strengthAU":
      return renderGraphContainer(
        <>
          {renderHeader("Strengths Across Units")}
          <CommonStrengthChart data={unitsData} />
        </>
      );

    case "weaknessAU":
      return renderGraphContainer(
        <>
          {renderHeader("Weaknesses Across Units")}
          <CommonWeaknessChart data={unitsData} />
        </>
      );

    default:
      return null;
  }
}
