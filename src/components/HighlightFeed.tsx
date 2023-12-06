import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {ActionItemChecklist} from "./ActionItemChecklist";
import {AnnotationActionPoint} from "./ActionItemChecklist";
import {MultiSectionProgressBar} from "./ProgressBar";
import {AnnotationData} from "../types";
const icons = {
  strength: "/tag_icons/Strength_Col_Pos.svg",
  weakness: "/tag_icons/Weakness_Col_Neg.svg",
  Confused: "/tag_icons/Confused_Col_Neg.svg",
  Action: "/tag_icons/Action_Col_Pos.svg",
  Other: "/tag_icons/Other_Col_Neg.svg",
};

export function HighlightFeed({Highlight}: {Highlight: AnnotationData}) {
  return (
    <Card className="mt-6 w-96 border border-solid border-gray-300 relative">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center">
          <img
            src={icons.strength}
            style={{width: 20, height: 20}}
            alt="Strength Icon"
          />
          <h3 className="ml-2">Strength</h3>
        </div>
      </CardHeader>
      <hr style={{borderTop: "2px solid #bbb"}}></hr>
      <CardBody className="relative">
        <div className="flex flex-col justify-between h-full">
          <p className="text text-gray-700 italic">
            <span className="block text-sm text-gray-500 mb-1">
              {Highlight.annotation.text}
            </span>
          </p>

          {Highlight.annotation.notes ? (
            <div
              dangerouslySetInnerHTML={{__html: Highlight.annotation.notes}}
            />
          ) : null}
          {Highlight.actionItems
            ? Highlight.actionItems.map((actionItem: AnnotationActionPoint) => (
                <ActionItemChecklist
                  actionPointItem={actionItem}
                ></ActionItemChecklist>
              ))
            : null}
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
      </CardBody>
      {/* <CardFooter className="right pt-0"></CardFooter> */}
    </Card>
  );
}
