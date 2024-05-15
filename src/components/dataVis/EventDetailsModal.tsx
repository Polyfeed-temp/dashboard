import React from "react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Toast } from "react-toastify/dist/components";
import { updateHighlightActionItem } from "../../services/actionItem.service";
import { toast } from "react-toastify";

interface EventDetailsModalProps {
  event: any;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
}) => {
  // State for tracking edit modes and values
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [editedDate, setEditedDate] = useState(
    event.extendedProps?.actionItem?.deadline
  );
  const [editedStatus, setEditedStatus] = useState(
    event.extendedProps?.actionItem?.status
  );

  // Handler to toggle date edit mode
  const editDate = () => {
    setIsEditingDate(!isEditingDate);
  };

  // Handler to toggle status edit mode
  const editStatus = () => {
    setIsEditingStatus(!isEditingStatus);
  };

  // Update handlers for date and status
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDate(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(Number(e.target.value));
  };

  // Finalize the update
  const finalizeUpdate = () => {
    /*
    console.log("Updated Date:", editedDate);
    console.log("Updated Status:", editedStatus);
    console.log("action item id:", event.extendedProps?.actionItem?.id);
    console.log("annotation id :", event.extendedProps?.annotationId);
    console.log("action item as an single element array:", [event.extendedProps?.actionItem]);
   */
    const action_item = {
      id: event.extendedProps?.actionItem?.id,
      action: event.extendedProps?.actionItem?.action,
      category: event.extendedProps?.actionItem?.category,
      deadline: new Date(editedDate),
      status: !!editedStatus,
    };

    console.log("AnnotationActionPoint type array :", action_item);

    const status = updateHighlightActionItem(
      event.extendedProps?.annotationId,
      [action_item]
    );

    toast.promise(status, {
      pending: "updating...",
      success: "updated",
      error: "Error when updating",
    });
  };

  return (
    <div className="event-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-1000">
      <h2 className="text-lg font-large mb-1">To-do List Description</h2>

      <div className="event-details-section flex flex-col items-start mb-4">
        <p>
          <strong>To-do Item:</strong> {event.title}
        </p>
        <div className="flex items-center mb-2">
          {/* Use flex container */}
          <strong>Date:</strong> {/* Remove <p> tag */}
          {isEditingDate ? (
            <input
              type="date"
              value={editedDate}
              onChange={handleDateChange}
              className="ml-2"
            />
          ) : (
            <span className="ml-2">
              {new Date(event.start).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {/* Add margin-left */}
          <IconButton
            onClick={editDate} // Ensure to attach the event handler
            size="sm"
            variant="text"
            title="edit"
            ripple={true}
            className="ml-2" // Add margin-left
            hidden={
              renderStatus(event.extendedProps.actionItem) === "Completed"
            }
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
        </div>
        <p>
          <strong>Unit Code:</strong>{" "}
          {event.extendedProps?.unitCode || "No unit code"}
        </p>
        <p>
          <strong>Annotation Tag:</strong> {event.extendedProps?.annotationTag}
        </p>

        <p>
          <strong>Highlighted text:</strong> {event.extendedProps.text}
        </p>
        <p>
          <strong>Category:</strong> {event.extendedProps.actionItem.category}
        </p>
        {event.extendedProps?.actionItem && (
          <div className="flex items-center mb-2">
            <strong>Status:</strong>{" "}
            {isEditingStatus ? (
              <select
                value={editedStatus}
                onChange={handleStatusChange}
                className="ml-2"
              >
                <option value="0">Incomplete</option>
                <option value="1">Complete</option>
              </select>
            ) : (
              <span className="ml-2">
                {renderStatus(event.extendedProps.actionItem)}
              </span>
            )}
            <IconButton
              onClick={editStatus} // Ensure to attach the event handler
              size="sm"
              variant="text"
              title="edit"
              ripple={true}
              className="ml-2" // Add margin-left
              hidden={
                !(renderStatus(event.extendedProps.actionItem) === "Incomplete")
              }
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
          </div>
        )}
      </div>
      {event.extendedProps.actionItem.status ? (
        !"Complete"
      ) : (
        <button onClick={finalizeUpdate}>Update</button>
      )}
      <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const renderStatus = (actionItem: any) => {
  const today = new Date();
  const eventDeadline = new Date(actionItem.deadline);

  if (actionItem.status === 0 && eventDeadline < today) {
    return "Overdue";
  } else if (actionItem.status === 1) {
    return "Completed";
  } else if (actionItem.status === 0) {
    return "Incomplete";
  } else {
    return "Unknown Status";
  }
};

export default EventDetailsModal;
