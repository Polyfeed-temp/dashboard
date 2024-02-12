import { useContext, useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import React from "react";
import { UnitContext } from "../store/UnitContext";

export function UnitDropdown({unitCodes, disabled}:{unitCodes: string[], disabled:boolean}) {
  const {unit, updateState} = useContext(UnitContext)
  const [selectedOption, setSelectedOption] = useState("");

  const [previousSelected] = useState(unit?.unitId || "");

  const handleOptionChange = (event: any) => {
    
    setSelectedOption(event);
  };

    // useEffect(() => {
  //   setSelectedOption(unit?.unitId || "");
  // }, [unit]);

  useEffect(() => {
    // Log the updated state after the component re-renders
    console.log("Previous Selected Option:", previousSelected);
    
    if (selectedOption.length != 0) {
      console.log("Selected Option:", selectedOption);
    updateState({unit:{unitId: selectedOption}})
    }
  }, [selectedOption]);



  return (
    <div style={{position: 'relative', zIndex: 9999}}>
      <style>
        {`
          #dropdown:hover {
            background-color: white;
          }
          #dropdown {
            color: black;
          }
        `}
      </style>
      <Select
        id="dropdown"
        label="Select Unit"
        value={previousSelected}
        disabled={disabled}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
        onChange={handleOptionChange}
      >
        {unitCodes.map((option: string) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>

    </div>
  );
}
