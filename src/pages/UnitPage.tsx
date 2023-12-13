import {AssignmentView} from "../components/AssignmentView";
import {Feedback} from "../types";
import {useEffect, useState} from "react";
import UserService from "../services/user.service";
import {useParams} from "react-router-dom";

export function UnitSummaryPage({
  groupedByUnitCode,
}: {
  groupedByUnitCode: {[key: string]: Feedback[]};
}) {
  const {unitCode} = useParams();
  if (unitCode) {
    console.log(groupedByUnitCode[unitCode]);
  }

  return (
    <>
      {unitCode ? (
        <div className="flex overflow-x-auto py-2 gap-x-4">
          {groupedByUnitCode[unitCode].map((feedback) => (
            <AssignmentView key={feedback.assessmentId} feedback={feedback} />
          ))}
        </div>
      ) : null}
    </>
  );
}
