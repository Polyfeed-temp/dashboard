import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {useState} from "react";

export function UnitSummary() {
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value: number) => setSelected(value);
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-96 bg-black text-white rounded-md p-1">
        <Typography variant="lead" color="white" className="font-normal">
          Overall Summary
        </Typography>
      </div>

      <Card className="mt-6 w-96 border border-solid border-gray-300 relative">
        <CardHeader floated={false} shadow={false}>
          <Typography> Unit Summary</Typography>

          <label htmlFor="label-dropdown" className="mr-2">
            Select a unit
          </label>
          <select
            id="label-dropdown"
            // value={selectedLabel}
            // onChange={handleLabelChange}
          >
            <option value="">FIT2099</option>
            <option value="label1">Strength</option>
            <option value="label2">Weakness</option>
            <option value="label3"> To-Do</option>
            <option value="other">Other</option>
          </select>
        </CardHeader>
        <CardBody>
          <List>
            <ListItem
              selected={selected === 1}
              onClick={() => setSelectedItem(1)}
            >
              Strength Summary
            </ListItem>
            <ListItem
              selected={selected === 2}
              onClick={() => setSelectedItem(2)}
            >
              Weakness Summary
            </ListItem>
            <ListItem
              selected={selected === 3}
              onClick={() => setSelectedItem(3)}
            >
              Progress on feedback implementation
            </ListItem>
            <ListItem
              selected={selected === 4}
              onClick={() => setSelectedItem(4)}
            >
              Interaction with Learning Activities
            </ListItem>
          </List>
        </CardBody>
      </Card>
    </div>
  );
}
