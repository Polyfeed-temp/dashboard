import React, {useState, useEffect, useContext} from "react";
import {NavBar} from "./NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Feedback} from "../types";
import UserService from "../services/user.service";
// import {useUserState} from "./store/UserContext";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import { useAuth } from "../store/AuthContext";


function GetUserFeedback() {
  const [feedbacks, setFeedback] = useState<Feedback[]>([]);
  // const user = useUserState();
  const {user, isAuthenticated} = useAuth();
  const userService = new UserService();
  const [groupedByUnitCode, setGroupedByUnitCode] = useState<{
    [key: string]: Feedback[];
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated || !user) {
        console.log("User not authenticated");
        return;
      }
      if (!(await userService.checkUserExists(user?.email || " "))) {
        console.log("User does not exist");
        return;
      }
      console.log(user);
      userService.getUserFeedbacks().then((res) => setFeedback(res));
    }

    fetchData();
  }, [user, isAuthenticated]);

  
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
    }, {} as {[key: string]: Feedback[]});
    setGroupedByUnitCode(mapped);
  }, [feedbacks]);

  console.log(feedbacks);
  return feedbacks;
}

export default GetUserFeedback;
