import React from "react";
import {HighlightFeed} from "./components/HighlightFeed";
import {NavBar} from "./components/NavBar";
import {MultiSectionProgressBar} from "./components/ProgressBar";
import {AssignmentView} from "./components/AssignmentView";
import {UnitSummary} from "./components/UnitSummary";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="grid grid-cols-3 gap-4">
        <div className="pl-4 col-1">
          <UnitSummary />
        </div>
        <div className="col-2-span-2">
          <AssignmentView></AssignmentView>
        </div>
      </div>
    </div>
  );
}

export default App;
