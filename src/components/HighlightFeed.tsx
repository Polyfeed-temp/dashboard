import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {ActionItemChecklist} from "./ActionItemChecklist";
import {ProgressBarSummary} from "./ProgressBar";
import {AnnotationData, AnnotationTag, AnnotationActionPoint} from "../types";
import {useState} from "react";
import {Notes} from "./Notes";
import ToDoCard from "./ToDoCard";
import {getIcons} from "../icons/icons";

export function HighlightFeed({
  Highlight,
  setActionItemFunc,
  deleteFunc,
  editFunc,
}: {
  Highlight: AnnotationData;
  setActionItemFunc: (id: number) => (complete: boolean) => void;
  deleteFunc: () => void;
  editFunc: (isActionItem: boolean) => (highlight: AnnotationData) => void;
}) {
  const [editing, setEditing] = useState(false);
  const savActionItemsFunc = (actionItems: AnnotationActionPoint[]) => {
    editFunc(true)({
      ...Highlight,
      actionItems: actionItems,
    });
    setEditing(false);
  };

  return (
    <Card className="mt-6 w-96 border border-solid border-gray-300 relative card">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center">
          <img
            src={getIcons(Highlight.annotation.annotationTag)}
            style={{width: 20, height: 20}}
          />
          <h3 className="ml-2">{Highlight.annotation.annotationTag}</h3>
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
          <hr className="my-4 h-1 bg-gray-400" />
          <div className=" w-full">
            {
              // always show notes if not aciton item
              editing && (Highlight.actionItems?.length ?? 0) === 0 ? (
                <Notes
                  key={Highlight?.annotation.id}
                  setNote={(input) => {
                    editFunc(false)({
                      ...Highlight,
                      annotation: {...Highlight.annotation, notes: input},
                    });
                    setEditing(false);
                  }}
                  notes={Highlight.annotation.notes || ""}
                  cancelFunc={() => setEditing(false)}
                ></Notes>
              ) : (
                editing &&
                (Highlight.actionItems?.length ?? 0) > 0 && (
                  <ToDoCard
                    key={Highlight?.annotation.id}
                    todoitems={Highlight.actionItems}
                    saveFunc={savActionItemsFunc}
                    cancelFunc={() => setEditing(false)}
                    viewOnly={false}
                  />
                )
              )
            }

            {
              // Render notes if not editing and notes exist
              !editing &&
              Highlight.annotation.notes &&
              Highlight.annotation.notes.length > 0 ? (
                <p className="break-words text-left">
                  {Highlight.annotation.notes}
                </p>
              ) : null
            }
            {
              // Check if there are action items to render the TodoCard component
              !editing &&
              Highlight.actionItems &&
              Highlight.actionItems.length > 0 ? (
                <ToDoCard
                  key={Highlight?.annotation.id}
                  saveFunc={savActionItemsFunc}
                  todoitems={Highlight.actionItems}
                  viewOnly={true}
                  cancelFunc={() => setEditing(false)}
                ></ToDoCard>
              ) : null
            }
          </div>
        </div>
      </CardBody>
      <div className="flex justify-end gap-x-2">
        <IconButton
          size="sm"
          variant="text"
          title="edit"
          ripple={true}
          onClick={() => setEditing(!editing)}
        >
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
        <IconButton
          size="sm"
          variant="text"
          title="delete"
          ripple={true}
          onClick={deleteFunc}
        >
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
    </Card>
  );
}
