// Sidebar.js
import React, { useState } from "react";
import Collapsible from "./Collapsible";
import './styling/Sidebar.css'; // Import your styles if needed

interface SidebarProps {
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange }) => {
  const [activeButton, setActiveButton] = useState<string>("To-do list Calendar");

  const handleButtonClick = (tab: string) => {
    onTabChange(tab);
    setActiveButton(tab);
  };

  const isButtonActive = (tab: string) => tab === activeButton;

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        {/* <p onClick={handleOverallSummaryClick}>Overall Summary</p> */}
        <Collapsible label="Overall Summary">
          <p>
            <button
              className={isButtonActive("To-do list Calendar") ? "active" : ""}
              onClick={() => handleButtonClick("To-do list Calendar")}
            >
              To-do list Calendar
            </button>
            <br></br>
            <button
              className={isButtonActive("strengthAU") ? "active" : ""}
              onClick={() => handleButtonClick("strengthAU")}
            >
              Strength Across Units
            </button>
            {/* AU refers to the meaning of "Across Units" */}
            <br></br>
            <button
              className={isButtonActive("weaknessAU") ? "active" : ""}
              onClick={() => handleButtonClick("weaknessAU")}
            >
              Weakness Across Units
            </button>
            <br></br>
            <button
              className={isButtonActive("calendarList") ? "active" : ""}
              onClick={() => handleButtonClick("calendarList")}
            >
              Weakness Across Units
            </button>
          </p>
        </Collapsible>
        <br></br>
        <Collapsible label="Unit Summary">
          <p>
            <button
              className={isButtonActive("strengthAA") ? "active" : ""}
              onClick={() => handleButtonClick("strengthAA")}
            >
              Strength Across Assessments
            </button>
            {/* AU refers to the meaning of "Across Assessments" */}
            <br></br>
            <button
              className={isButtonActive("weaknessAA") ? "active" : ""}
              onClick={() => handleButtonClick("weaknessAA")}
            >
              Weakness Across Assessments
            </button>
          </p>
        </Collapsible>
      </div>
      {/* Add more sidebar items as needed */}
    </div>
  );
};

export default Sidebar;
