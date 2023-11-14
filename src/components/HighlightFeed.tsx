import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {ActionItemChecklist} from "./ActionItemChecklist";
import {AnnotationActionPoint} from "./ActionItemChecklist";
import {MultiSectionProgressBar} from "./ProgressBar";

export function HighlightFeed() {
  return (
    <Card className="mt-6 w-96 border border-solid border-gray-300 relative">
      <CardHeader floated={false} shadow={false}>
        <h2 className="text-2xl font-semibold">Highlight</h2>
      </CardHeader>
      <hr style={{borderTop: "3px solid #bbb"}}></hr>
      <CardBody className="relative">
        <div className="flex flex-col justify-between h-full">
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
          <ActionItemChecklist
            actionPointItem={
              {
                action: "need to define weapons coorectly in the code",
                actionpoint: "Contact Tutor",
                deadline: new Date(20 / 11 / 2023),
              } as AnnotationActionPoint
            }
          />
          <ActionItemChecklist
            actionPointItem={
              {
                action:
                  "need to define weapons coorectly in the code " +
                  `  The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.`,
                actionpoint: "Contact Tutor",
                deadline: new Date(20 / 11 / 2023),
              } as AnnotationActionPoint
            }
          />
          <ActionItemChecklist
            actionPointItem={
              {
                action: "need to define weapons coorectly in the code",
                actionpoint: "Contact Tutor",
                deadline: new Date(20 / 11 / 2023),
              } as AnnotationActionPoint
            }
          />
        </div>

        <div className="flex justify-end gap-x-2 pt-2">
          <IconButton size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </IconButton>
          <IconButton size="sm">
            <svg
              xmlns="http://www.w3.aorg/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </IconButton>
        </div>
        <MultiSectionProgressBar />
      </CardBody>
      {/* <CardFooter className="right pt-0"></CardFooter> */}
    </Card>
  );
}
