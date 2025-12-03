import {type Action, ActionTypes, type MachineState} from "../types";

export const initialState: MachineState = {
    products: [],
    loading: false,
    // selectedProduct:
};

export const reducer = (state = initialState, action: Action): MachineState => {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.SET_LOADING:
            return {...state, loading: payload};

        case ActionTypes.LOAD_PRODUCTS:
            return {...state, products: payload, loading: false};
        default:
            return state;
    }
}