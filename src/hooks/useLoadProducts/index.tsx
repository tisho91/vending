import { useEffect} from "react";
import {fetchProducts} from "../../handlers";
import {useVendingMachine} from "../../context/Provider.tsx";
import {ActionTypes} from "../../types";

export const useLoadProducts = () => {
    const { dispatch } = useVendingMachine();
    useEffect(() => {
        const load = async () => {
            const data = await fetchProducts();
            dispatch({
                type: ActionTypes.LOAD_PRODUCTS,
                payload: data,
            });
        };

        load();
    }, [dispatch]);
}