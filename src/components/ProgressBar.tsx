import React, {useState} from "react";
import {ActionItemsSummary} from "../types";
import {Progress} from "@material-tailwind/react";

export function ProgressBarSummary({
  actionItemSummary,
}: {
  actionItemSummary: ActionItemsSummary;
}) {
  const total = actionItemSummary.completed + actionItemSummary.incomplete;
  console.log("totoal", total);
  const percentage = (actionItemSummary.completed / total) * 100;
  // const fixed = percentage.toFixed(2);
  console.log(actionItemSummary.completed / total);
  return (
    <div>
      <Progress value={percentage} label="completed" size="lg" />
    </div>
  );
}
