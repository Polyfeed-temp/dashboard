import {AssignmentView} from "../components/AssignmentView";

export function UnitSummaryPage() {
  return (
    <>
      <AssignmentView
        unitHighlight={{
          unitCode: "FIT2099",
          assignment: "Assignment 1",
          annotation: {
            id: "83257719-0008-435d-90ee-273ee1bd2f1e",
            startMeta: {
              parentTagName: "DIV",
              parentIndex: 78,
              textOffset: 102,
            },
            endMeta: {
              parentTagName: "DIV",
              parentIndex: 78,
              textOffset: 126,
            },
            text: "Test only odd N-bit prim",
            url: "https://lms.monash.edu/mod/assign/view.php?id=12092529#",
            annotationTag: "Strength",
            notes: "<p>test</p>",
          },
        }}
      ></AssignmentView>
    </>
  );
}
