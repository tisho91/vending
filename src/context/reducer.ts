import {type Action, ActionTypes, type MachineState, type Product} from "../types";

export const initialState: MachineState = {
    products: [],
    change: null,
    insertedCoins: null,
    selectedProductId: null,
    adminMode: false
};

export const reducer = (state = initialState, action: Action): MachineState => {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS:
            return {...state, products: action.payload};

        case ActionTypes.SELECT_PRODUCT:
            return {...state, selectedProductId: action.payload};

        case ActionTypes.INSERT_COIN: {
            const currentCoins = {...state.insertedCoins};
            if (!currentCoins[action.payload]) {
                currentCoins[action.payload] = 0;
            }
            currentCoins[action.payload] += 1;
            return {
                ...state,
                insertedCoins: currentCoins
            }
        }
        case ActionTypes.BUY_PRODUCT: {
            return {
                ...state,
                selectedProductId: null,
                insertedCoins: null,
                change: action.payload.change,
                boughtProduct: state.products.find(product => product.id === action.payload.selectedProductId),
                products:
                    state.products.map((product: Product) => {
                        if (product.id === action.payload.selectedProductId) {
                            return {
                                ...product,
                                stock: product.stock - 1
                            }
                        }
                        return product;
                    })

            }
        }
        case ActionTypes.TAKE_PRODUCT: {
            return {
                ...initialState,
                products: state.products,
                adminMode: state.adminMode
            }
        }

        case ActionTypes.RETURN_COINS: {
            return {
                ...state,
                change: state.insertedCoins,
                insertedCoins: null
            }
        }

        case ActionTypes.TOGGLE_ADMIN: {
            return {
                ...state,
                adminMode: !state.adminMode
            }
        }

        case ActionTypes.RESTOCK_PRODUCT: {
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.id === action.payload){
                        return {
                            ...product,
                            stock: 15
                        }
                    }
                    return product;
                })
            }
        }
        case ActionTypes.REMOVE_PRODUCT: {
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            }
        }
        case ActionTypes.ADD_PRODUCT: {
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        }
        default:
            return state;
    }
}
