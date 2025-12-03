import {useVendingMachine} from "../../context/Provider.tsx";
import {useEffect} from "react";
import {fetchProducts} from "../../handlers";
import {ActionTypes} from "../../types";

export const useLoadProducts = () => {
    const { dispatch } = useVendingMachine();

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            const data = await fetchProducts();
            if (mounted) {
                dispatch({
                    type: ActionTypes.LOAD_PRODUCTS,
                    payload: data
                });
            }
        };

        load();
        return () => { mounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};