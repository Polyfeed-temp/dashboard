import {HighlightFeed} from "./HighlightFeed";
import {Typography} from "@material-tailwind/react";

export function AssignmentView() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-96 bg-black text-white rounded-md p-1">
        <Typography variant="lead" color="white" className="font-normal">
          Assignment
        </Typography>
      </div>

      <HighlightFeed></HighlightFeed>

      <div className="mt-4 flex items-centermt-4 w-96 bg-black text-white rounded-md p-1 justify-between ">
        <Typography variant="lead" color="white" className="font-normal">
          View Feedback
        </Typography>
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
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}
