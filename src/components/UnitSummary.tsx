import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import { useState } from "react";
import { SideMenu } from "./SideMenu";
import { Tab } from "../pages/OverviewPage";
import { addLogs, eventType, eventSource } from "../services/logs.serivce";

/**
 * @deprecated
 */
export function UnitSummary({
  unitCodes,
  tab,
  setTab,
  dataFunc,
}: {
  unitCodes: string[];
  tab: string;
  setTab: (x: Tab) => void;
  dataFunc: (x: string) => void;
}) {
  const [selected, setSelected] = useState("Overview");
  return (
    <div className="flex flex-col space-y-4">
      <button
        className={` mt-5 text-white rounded-md p-1 ${
          selected == "Overview" ? "bg-black" : "bg-gray-300"
        }`}
        onClick={() => {
          addLogs({
            eventType: eventType[15],
            content: JSON.stringify({
              target: "Overview",
              tag: "overview",
            }),
            eventSource: eventSource[6],
          });
          setSelected("Overview");
          setTab("overview");
        }}
      >
        <Typography variant="lead" color="white" className="font-normal">
          Overall Summary
        </Typography>
      </button>
      <button
        className={` mt-5 text-white rounded-md p-1 ${
          selected == "UnitSummary" ? "bg-black" : "bg-gray-300"
        }`}
        onClick={() => {
          addLogs({
            eventType: eventType[15],
            content: JSON.stringify({
              target: "UnitSummary",
              tag: "strengthAU",
              unitCode: unitCodes[0],
            }),
            eventSource: eventSource[6],
          });
          setSelected("UnitSummary");
          setTab("strengthAU");
          dataFunc(unitCodes[0]);
        }}
      >
        <Typography variant="lead" color="white" className="font-normal">
          Unit Summary
        </Typography>
      </button>
      {selected == "UnitSummary" && (
        <SideMenu
          title={"Select a unit"}
          dropdownValues={unitCodes}
          list={["Strength Summary", "Weakness Summary", "Action Item"]}
          listFunc={[
            () => setTab("strengthAA"),
            () => setTab("weaknessAA"),
            () => setTab("actions"),
          ]}
          dropdownFunc={(x) => dataFunc(x)}
        />
      )}
    </div>
  );
}
