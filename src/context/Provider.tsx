import {createContext, type ReactNode, useContext, useReducer} from "react";
import {initialState, reducer} from "./reducer.ts";
import type {Action, MachineState} from "../types";


const Context = createContext<{
    state: MachineState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: ()=> null
})

export const VendingMachineProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{state, dispatch}}>
        {children}
    </Context.Provider>
}

export const useVendingMachine = () => useContext(Context)