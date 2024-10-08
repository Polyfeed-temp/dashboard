import { useContext, useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import React from "react";
import { UnitContext } from "../store/UnitContext";
import { addLogs, eventType, eventSource } from "../services/logs.serivce";

export function UnitDropdown({
  unitCodes,
  disabled,
}: {
  unitCodes: string[];
  disabled: boolean;
}) {
  const { unit, updateState } = useContext(UnitContext);
  const [selectedOption, setSelectedOption] = useState("");

  const [previousSelected] = useState(unit?.unitId || "");

  const handleOptionChange = (event: any) => {
    addLogs({
      eventType: eventType[9],
      content: JSON.stringify({ target: event }),
      eventSource: eventSource[16],
    });

    setSelectedOption(event);
  };

  // useEffect(() => {
  //   setSelectedOption(unit?.unitId || "");
  // }, [unit]);

  useEffect(() => {
    if (selectedOption.length != 0) {
      console.log("Selected Option:", selectedOption);
      updateState({ unit: { unitId: selectedOption } });
    }
  }, [selectedOption]);

  return (
    <div style={{ position: "relative", zIndex: 9999, listStyleType: "none" }}>
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
              "items-center opacity-100 px-0 gap-2 pointer-events-none",
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
