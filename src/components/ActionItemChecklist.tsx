import {Checkbox, Typography} from "@material-tailwind/react";
import React, {useState} from "react";
import {AnnotationActionPoint} from "../types";

export function ActionItemChecklist({
  actionPointItem,
  completeActionItemFunc,
}: {
  actionPointItem: AnnotationActionPoint;
  completeActionItemFunc: (checked: boolean) => void;
}) {
  if (actionPointItem.action == null) {
    return null;
  }

  console.log(actionPointItem);
  const [checked, setChecked] = useState(actionPointItem.status);
  return (
    <Checkbox
      crossOrigin=""
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        completeActionItemFunc(event.target.checked);
      }}
      label={
        <div className="flex flex-col items-start">
          <Typography variant="small" color="gray" className="font-normal">
            {actionPointItem.action}
          </Typography>
          <div className="flex justify-between w-full">
            <Typography variant="small" color="gray" className="font-normal">
              {actionPointItem.action}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {actionPointItem.deadline.toString()}
            </Typography>
          </div>
        </div>
      }
      containerProps={{
        className: "-mt-5",
      }}
    />
  );
}
