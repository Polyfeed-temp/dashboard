import React, {useState, useEffect} from "react";

import {HighlightFeed} from "./components/HighlightFeed";
import {NavBar} from "./components/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MultiSectionProgressBar} from "./components/ProgressBar";
import {AssignmentView} from "./components/AssignmentView";
import {UnitSummary} from "./components/UnitSummary";
import BarChartComponent from "./components/dataVis/BarChart";
import axios from "axios";
import {OverviewPage} from "./pages/OverviewPage";
import SignUpPage from "./pages/SignUpPage";
import {LoginPage} from "./pages/LoginPage";
import {UnitSummaryPage} from "./pages/UnitPage";
import {Feedback} from "./types";
import UserService from "./services/user.service";

function App() {
  const [unitFeedBacks, setUnitFeedBacks] = useState([]);
  const [feedbacks, setFeedback] = useState<Feedback[]>([]);
  const userService = new UserService();
  useEffect(() => {
    userService.getUserFeedbacks().then((res) => setFeedback(res));
  }, []);

  const groupedByUnitCode = feedbacks.reduce((acc, item) => {
    if (!acc[item.unitCode]) {
      acc[item.unitCode] = [];
    }
    acc[item.unitCode].push(item);
    return acc;
  }, {} as {[key: string]: Feedback[]});

  console.log(groupedByUnitCode);

  useEffect(() => {
    fetch("http://localhost:8000/api/annotation/all")
      .then((response) => response.json())
      .then((data) => {
        setUnitFeedBacks(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array ensures this runs once

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/login/users/me", {
      method: "GET",
      credentials: "include", // necessary to include HttpOnly cookies
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar unitCodes={Object.keys(groupedByUnitCode)}></NavBar>

        <Routes>
          <Route path="/" element={<OverviewPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route
            path="/feedback/:unitCode"
            element={<UnitSummaryPage groupedByUnitCode={groupedByUnitCode} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
