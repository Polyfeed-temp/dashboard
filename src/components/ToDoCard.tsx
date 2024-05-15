import React, { useState, useRef, useEffect } from "react";
import { AnnotationActionPoint, ActionPointCategory } from "../types";
import { Button, Typography, IconButton } from "@material-tailwind/react";
import { EditIcon, DeleteIcon } from "../icons/icons";
import {
  updateActionStatus,
  deleteActionItem,
} from "../services/actionItem.service";
import { toast } from "react-toastify";
import { addLogs, eventType, eventSource } from "../services/logs.serivce";

const ToDoActions: ActionPointCategory[] = [
  "Further Practice",
  "Contact Tutor",
  "Ask Classmates",
  "Refer Learning Resources",
  "Explore Online",
  "Other",
];

export function ToDoItems({
  actionItems,
  setActionItems,
  setSelectedActionItem,
  updateActionStatusFunc,
}: {
  actionItems: AnnotationActionPoint[];
  setActionItems: (actionItems: AnnotationActionPoint[]) => void;
  setSelectedActionItem: (actionItem: AnnotationActionPoint) => void;
  updateActionStatusFunc?: (complete: boolean) => void;
}) {
  const formatDateWithoutYear = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  return (
    <>
      {actionItems.map((actionPointItem, index) => {
        const handleOnChecked = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          if (actionItems[index].id) {
            const status = updateActionStatus(
              actionItems[index].id as number,
              event.target.checked
            );
            toast.promise(status, {
              pending: "Updating action item status...",
              success: "Action item status updated!",
              error: "Failed to update action item status",
            });
          }
          const newActionItems = [...actionItems];
          newActionItems[index].status = event.target.checked;
          setActionItems(newActionItems);

          //   updateActionStatusFunc(event.target.checked);
        };
        return (
          <div
            key={index}
            className="flex items-center mb-4 space-x-2 w-full rounded-md p-2"
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={actionPointItem.status}
              onChange={handleOnChecked}
            />
            <button
              className="flex items-center space-x-2 flex-grow text-left bg-white  text-gray-500 shadow-md hover:shadow-lg"
              onClick={() => setSelectedActionItem(actionPointItem)}
              title="Edit action item"
            >
              <div className="flex-grow flex">
                <h3 className="font-normal truncate flex-grow">
                  {actionPointItem.action.length > 10
                    ? actionPointItem.action.substring(0, 10) + "..."
                    : actionPointItem.action}
                </h3>
              </div>

              <h3 className="font-normal text-gray-500 break-words italic text-left flex-shrink-0">
                {actionPointItem.category}
              </h3>

              <h3 className="font-normal text-gray-500 whitespace-nowrap text-left flex-shrink-0">
                {formatDateWithoutYear(actionPointItem.deadline.toString())}
              </h3>
            </button>

            <IconButton
              variant="text"
              title="Delete Action Item"
              ripple={true}
              onClick={() => {
                if (actionItems[index].id) {
                  const status = deleteActionItem(
                    actionItems[index].id as number
                  );
                  toast.promise(status, {
                    pending: "Deleting action item...",
                    success: "Action item deleted!",
                    error: "Failed to delete action item",
                  });
                }

                const newActionItems = [...actionItems];
                newActionItems.splice(index, 1);
                setActionItems(newActionItems);
              }}
            >
              {DeleteIcon}
            </IconButton>
          </div>
        );
      })}
    </>
  );
}

function TodoCard({
  saveFunc,
  todoitems,
  viewOnly,
  cancelFunc,
}: {
  saveFunc: (
    actionItems: AnnotationActionPoint[],
    originalActionItems: AnnotationActionPoint[]
  ) => void;
  todoitems?: AnnotationActionPoint[];
  viewOnly?: boolean;
  cancelFunc: () => void;
}) {
  const [actionItems, setActionItems] = useState<AnnotationActionPoint[]>(
    todoitems ? todoitems : []
  );

  const [originalActionItems, setOriginalActionItems] = useState<
    AnnotationActionPoint[]
  >(todoitems ? todoitems : []);
  const [addToDo, setAddToDo] = useState<boolean>(false);
  const [selectedActionItem, setSelectedActionItem] =
    useState<AnnotationActionPoint | null>(null);

  const showAddAndDoneButtons =
    actionItems.length > 0 && !addToDo && !selectedActionItem;

  return (
    <div className="p-2 mb-4 bg-white shadow-md rounded-md">
      <ToDoItems
        actionItems={actionItems}
        setActionItems={setActionItems}
        setSelectedActionItem={setSelectedActionItem}
      />

      {showAddAndDoneButtons && !viewOnly && (
        <div className="flex justify-between my-2">
          <Button className="bg-black" onClick={() => setAddToDo(true)}>
            Add Another item
          </Button>
          <Button
            className="bg-black"
            onClick={() => saveFunc(actionItems, originalActionItems)}
          >
            Done
          </Button>
        </div>
      )}

      {(addToDo || actionItems.length === 0) && !selectedActionItem ? (
        <ToDoForm
          key={addToDo ? 1 : 0}
          hideFunc={() => setAddToDo(false)}
          saveFunc={(actionItem) =>
            setActionItems(actionItems.concat(actionItem))
          }
          cancelFunc={() => {}}
        />
      ) : (
        selectedActionItem && (
          <ToDoForm
            key={selectedActionItem.action}
            hideFunc={() => setSelectedActionItem(null)}
            saveFunc={(actionItem) => {
              const newActionItems = [...actionItems];
              const index = newActionItems.findIndex(
                (item) => item === selectedActionItem
              );
              newActionItems[index] = actionItem;
              setActionItems(newActionItems);
              setSelectedActionItem(null);
            }}
            cancelFunc={() => setSelectedActionItem(null)}
            defaultActionItem={selectedActionItem}
          />
        )
      )}
    </div>
  );
}

export default TodoCard;

function ToDoForm({
  hideFunc,
  saveFunc,
  cancelFunc,
  defaultActionItem,
}: {
  hideFunc: () => void;
  saveFunc: (actionItems: AnnotationActionPoint) => void;
  cancelFunc: () => void;
  defaultActionItem?: AnnotationActionPoint;
}) {
  const [todoText, setTodoText] = useState<string>(
    defaultActionItem?.action ?? ""
  );
  const [dueDate, setDueDate] = useState<string>(
    defaultActionItem?.deadline?.toString() || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<
    ActionPointCategory | undefined
  >(defaultActionItem?.category ?? undefined);
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value as ActionPointCategory);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveFunc({
      ...defaultActionItem,
      action: todoText,
      category: selectedCategory,
      deadline: new Date(dueDate),
    } as AnnotationActionPoint);

    hideFunc();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        To Do item
      </label>
      <textarea
        placeholder="Enter to do item here"
        className="p-2 border rounded-md w-full resize-none"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        required
      />

      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mt-4 mb-2"
      >
        Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border rounded-md w-full"
        required
      >
        <option value="" disabled selected>
          Select a category
        </option>
        {ToDoActions.map((action) => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>

      <label
        htmlFor="dueDate"
        className="block text-sm font-medium text-gray-700 mt-4 mb-2"
      >
        Expected to completed by:
      </label>
      <input
        type="date"
        min={dueDate ? dueDate : new Date().toISOString().split("T")[0]}
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 border rounded-md w-full"
        required
      />
      <div className="flex justify-between mt-4">
        <Button type="submit" className="full-width bg-black">
          Add item to the list
        </Button>
        <Button
          onClick={() => {
            addLogs({
              eventType: eventType[3],
              content: "",
              eventSource: eventSource[8],
            });
            cancelFunc();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
