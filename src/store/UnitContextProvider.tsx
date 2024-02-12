import { useState } from "react";
import { UnitContext } from "./UnitContext";


interface Props {
  children: React.ReactNode;
}

export const UnitContextProvider: React.FC<Props> = (
  props: Props
  ) : JSX.Element => {

    const [unit, setUnit] = useState({});

    const updateState = (newState: Partial<any>) => {
      setUnit({...unit, ...newState});
    };

    return (
      <UnitContext.Provider value={{...unit, updateState}}>
        {props.children}
      </UnitContext.Provider>
    );
  }