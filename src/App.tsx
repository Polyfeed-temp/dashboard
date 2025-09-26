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
import { useAuth } from "./store/AuthContext";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  const [, setUnitFeedBacks] = useState([]);
  const [feedbacks, setFeedback] = useState<Feedback[]>([]);
  const { user, isAuthenticated } = useAuth();
  const userService = new UserService();
  const [groupedByUnitCode, setGroupedByUnitCode] = useState<{
    [key: string]: Feedback[];
  }>({});

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !user) {
      return;
    }
    try {
      const result = await userService.getUserFeedbacks();
      setFeedback(result || []);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  }, [user, isAuthenticated, setFeedback]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
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
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          {isAuthenticated && (
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
          {!isAuthenticated && (
            <Route path="*" element={<LoginPage />} />
          )}
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
