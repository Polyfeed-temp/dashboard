import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import {Tab} from "../pages/OverviewPage";

export function SideMenu({
  title,
  dropdownValues,
  list,

  listFunc,
}: {
  title: string;
  dropdownValues?: string[];
  list: string[];

  listFunc: Array<() => void>;
}) {
  return (
    <Card className="mt-6 w-full md:w-auto border border-solid border-gray-300 relative">
      <CardHeader floated={false} shadow={false}>
        {dropdownValues && (
          <>
            <label htmlFor="label-dropdown" className="mr-2">
              {title}
            </label>
            <select
              id="label-dropdown"
              // value={selectedLabel}
              // onChange={handleLabelChange}
            >
              {dropdownValues.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </>
        )}
      </CardHeader>
      <CardBody>
        <List>
          {list.map((item, index) => (
            <ListItem onClick={() => listFunc[index]()}>{item}</ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
}
