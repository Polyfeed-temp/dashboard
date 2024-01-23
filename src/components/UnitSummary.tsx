import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import {useState} from "react";
import {SideMenu} from "./SideMenu";
import {Tab} from "../pages/OverviewPage";
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
          setSelected("UnitSummary");
          setTab("strength");
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
          list={["Strength Summary", "Weakness Summary"]}
          listFunc={[() => setTab("strength"), () => setTab("weakness")]}
          dropdownFunc={(x) => dataFunc(x)}
        />
      )}
    </div>
  );
}
