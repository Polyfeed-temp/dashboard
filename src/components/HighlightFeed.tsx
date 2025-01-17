import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { AnnotationData, AnnotationTag, AnnotationActionPoint } from "../types";
import { useState } from "react";
import { Notes } from "./Notes";
import ToDoCard from "./ToDoCard";
const getIcons = (tag: AnnotationTag) => {
  switch (tag) {
    case "Strength":
      return `${process.env.PUBLIC_URL}/tag_icons/Strength_Col_Pos.svg`;
    case "Weakness":
      return `${process.env.PUBLIC_URL}/tag_icons/Weakness_Col_Pos.svg`;
    case "Confused":
      return `${process.env.PUBLIC_URL}/tag_icons/Confused_Col_Pos.svg`;
    case "Action Item":
      return `${process.env.PUBLIC_URL}/tag_icons/Action_Col_Pos.svg`;
    case "Other":
      return `${process.env.PUBLIC_URL}/tag_icons/Other_Col_Pos.svg`;
  }
};

export function HighlightFeed({
  Highlight,
  setActionItemFunc,
  deleteFunc,
  editFunc,
}: {
  Highlight: AnnotationData;
  setActionItemFunc: (id: number) => (complete: boolean) => void;
  deleteFunc: () => void;
  editFunc: (
    isActionItem: boolean
  ) => (
    highlight: AnnotationData,
    originalActionItems?: AnnotationActionPoint[]
  ) => void;
}) {
  const [editing, setEditing] = useState(false);
  const savActionItemsFunc = (
    actionItems: AnnotationActionPoint[],
    originalActionItems: AnnotationActionPoint[]
  ) => {
    editFunc(true)(
      {
        ...Highlight,
        actionItems: actionItems,
      },
      originalActionItems
    );
    setEditing(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Tag and Actions */}
      <div className="flex items-center justify-between mb-3">
        {/* Tag Badge */}
        <div className="flex items-center gap-2">
          <img
            src={getIcons(Highlight.annotation.annotationTag)}
            alt={Highlight.annotation.annotationTag}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            {Highlight.annotation.annotationTag}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <IconButton
            size="sm"
            variant="text"
            title="edit"
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setEditing(!editing)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-600"
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
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            onClick={deleteFunc}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </IconButton>
        </div>
      </div>

      {/* Highlight Content */}
      <div className="flex-1">
        {/* Highlighted Text */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 italic bg-gray-100/50 p-3 rounded-lg">
            {Highlight.annotation.text}
          </p>
        </div>

        {/* Notes or Action Items */}
        <div className="mt-auto">
          {editing && (Highlight.actionItems?.length ?? 0) === 0 ? (
            <Notes
              key={Highlight?.annotation.id}
              setNote={(input) => {
                editFunc(false)({
                  ...Highlight,
                  annotation: { ...Highlight.annotation, notes: input },
                });
                setEditing(false);
              }}
              notes={Highlight.annotation.notes || ""}
              cancelFunc={() => setEditing(false)}
            />
          ) : editing && (Highlight.actionItems?.length ?? 0) > 0 ? (
            <ToDoCard
              key={Highlight?.annotation.id}
              todoitems={Highlight.actionItems}
              saveFunc={savActionItemsFunc}
              cancelFunc={() => setEditing(false)}
              viewOnly={false}
            />
          ) : null}

          {/* Display Notes */}
          {!editing &&
            Highlight.annotation.notes &&
            Highlight.annotation.notes.length > 0 && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 break-words">
                  {Highlight.annotation.notes}
                </p>
              </div>
            )}

          {/* Display Action Items */}
          {!editing &&
            Highlight.actionItems &&
            Highlight.actionItems.length > 0 && (
              <div className="mt-3">
                <ToDoCard
                  key={Highlight?.annotation.id}
                  saveFunc={savActionItemsFunc}
                  todoitems={Highlight.actionItems}
                  viewOnly={true}
                  cancelFunc={() => setEditing(false)}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
