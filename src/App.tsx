import React, { useState, useEffect, useContext, useCallback } from "react";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { OverviewPage } from "./pages/OverviewPage";

import "bootstrap/dist/css/bootstrap.min.css";
import SignUpPage from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { UnitSummaryPage } from "./pages/UnitPage";
import { Feedback } from "./types";
import UserService from "./services/user.service";
// import {useUserState} from "./store/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AllUnitsPage } from "./pages/AllUnitsPage";
import { useUserAuth } from "./store/UserAuthContext";

function App() {
  const [unitFeedBacks, setUnitFeedBacks] = useState([]);
  const [feedbacks, setFeedback] = useState<Feedback[]>([]);
  // const user = useUserState();
  const { user } = useUserAuth() || {};
  const userService = new UserService();
  const [groupedByUnitCode, setGroupedByUnitCode] = useState<{
    [key: string]: Feedback[];
  } | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.emailVerified) {
      return;
    }
    if (!(await userService.checkUserExists(user?.email || " "))) {
      console.log("User exists from app");
      return;
    }
    const result = await userService.getUserFeedbacks();
    setFeedback(result || []);
  }, [user, setFeedback]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (feedbacks.length === 0) {
      return;
    }
    const mapped = feedbacks.reduce((acc, item) => {
      if (!acc[item.unitCode]) {
        acc[item.unitCode] = [];
      }
      acc[item.unitCode].push(item);
      return acc;
    }, {} as { [key: string]: Feedback[] });
    setGroupedByUnitCode(mapped);
  }, [feedbacks]);

  //iterate grouped by unit code then each highlight and only get the common theme

  return (
    <div>
      <BrowserRouter>
        <NavBar unitCodes={Object.keys(groupedByUnitCode || {})}></NavBar>

        <Routes>
          {/* <Route path="/signup" element={<SignUpPage />}></Route> */}
          <Route path="/login" element={<LoginPage />}></Route>
          {groupedByUnitCode && (
            <>
              <Route
                path="/dashboard"
                element={
                  <OverviewPage
                    groupedByUnitCode={groupedByUnitCode}
                    fetchData={fetchData}
                  />
                }
              ></Route>
              <Route
                path="/feedback"
                element={
                  <UnitSummaryPage groupedByUnitCode={groupedByUnitCode} />
                }
              ></Route>
              <Route
                path="/feedback/all"
                element={<AllUnitsPage feedbacks={feedbacks} />}
              ></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
