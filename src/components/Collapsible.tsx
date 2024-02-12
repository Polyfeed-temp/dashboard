import { useCollapse } from "react-collapsed";

const Collapsible = (props: any) => {
  const config = {
    duration: 2000,
    onExpandStart: () => {
      console.log("INFO: onExpandStart triggered.");
    },
    onExpandEnd: () => {
      console.log("INFO: onExpandEnd triggered.");
    },
    onCollapseStart: () => {
      console.log("INFO: onCollapseStart triggered.");
    },
    onCollapseEnd: () => {
      console.log("INFO: onCollapseEnd triggered.");
    },
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({defaultExpanded:true})

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <div className="label">{props.label}</div>
        <div className="icon">
          <i
            className={"fas fa-chevron-circle-" + (isExpanded ? "up" : "down")}
          ></i>
        </div>
      </div>
      <div {...getCollapseProps(config)}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};
export default Collapsible;
