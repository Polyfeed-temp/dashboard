import { createContext } from "react";

export interface UnitContract {
    unitId?: string;
}

export interface AppState {
    unit?: UnitContract;
    updateState: (newState: Partial<AppState>) => void;
}

const defaultState: AppState = {
    unit: {},
    updateState: (newState?: Partial<AppState>) => {},
};

export const UnitContext = createContext<AppState>(defaultState);