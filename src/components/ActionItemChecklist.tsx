import {Checkbox, Typography} from "@material-tailwind/react";
export type ActionPointCategory =
  | "Further Practice"
  | "Contact Tutor"
  | "Ask Classmate"
  | "Refer Learning Resources"
  | "Explore Online"
  | "Other";
export interface AnnotationActionPoint {
  action: string;
  actionpoint: ActionPointCategory;
  deadline: Date;
}
export function ActionItemChecklist({
  actionPointItem,
}: {
  actionPointItem: AnnotationActionPoint;
}) {
  return (
    <Checkbox
      crossOrigin=""
      label={
        <div className="flex flex-col items-start">
          <Typography variant="small" color="gray" className="font-normal">
            {actionPointItem.action}
          </Typography>
          <div className="flex justify-between w-full">
            <Typography variant="small" color="gray" className="font-normal">
              {actionPointItem.actionpoint}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {actionPointItem.deadline.toLocaleDateString()}
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
