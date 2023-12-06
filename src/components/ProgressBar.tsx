import React, {useState} from "react";

export function MultiSectionProgressBar() {
  const [checklistItems, setChecklistItems] = useState([
    {label: "Item 1", completed: false},
    {label: "Item 2", completed: false},
    {label: "Item 3", completed: false},
    // Add more items as needed
  ]);

  const toggleItemCompletion = (index: number) => {
    const updatedItems = checklistItems.map((item, idx) =>
      idx === index ? {...item, completed: !item.completed} : item
    );
    setChecklistItems(updatedItems);
  };

  return (
    <div>
      {/* {checklistItems.map((item, index) => (
        <div key={index} className="mb-2">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleItemCompletion(index)}
          />
          {item.label}
        </div>
      ))} */}

      <div className="mb-2 flex ">
        {checklistItems.map((item, index) => (
          <span
            key={index}
            className={`mb-2 h-[15px] flex-1 rounded-xl ${
              item.completed ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
