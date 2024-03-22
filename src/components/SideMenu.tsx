/**
 * @deprecated
 */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

export function SideMenu({
  title,
  dropdownValues,
  list,

  listFunc,
  dropdownFunc,
}: {
  title: string;
  dropdownValues?: string[];
  list: string[];

  listFunc: Array<() => void>;
  dropdownFunc?: (x: string) => void;
}) {
  return (
    <Card className="mt-6 w-full md:w-auto border border-solid border-gray-300 relative">
      <h1>Select Your Assessment</h1>
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
              onChange={(e) => dropdownFunc && dropdownFunc(e.target.value)}
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
