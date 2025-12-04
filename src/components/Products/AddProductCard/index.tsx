import {type ChangeEvent, useMemo, useState} from "react";
import styles from "./styles.module.css";
import {ActionTypes, type Product} from "../../../types";
import {useVendingMachine} from "../../../context/Provider.tsx";

export const AddProductCard = () => {
    const {state, dispatch} = useVendingMachine();
    const [error, setError] = useState({});
    const [product, setProduct] = useState<Product>({
        stock: 0,
        name: '',
        price: 0,
        id: 0
    });

    const changeName = (name: string) => {
        setProduct(prev => ({
            ...prev,
            name
        }));
    }
    const changePrice = (price: string) => {
        setProduct(prev => ({
            ...prev,
            price: Number(price)
        }))
        if (!Number.isInteger(Number(price) * 10)) {
            setError(prev => ({
                ...prev,
                price: 'Incorrect Price'
            }))
        }
    }
    const changeId = (id: string) => {
        setProduct((prev) => ({
            ...prev,
            id: Number(id)
        }))
        if (state.products.find(prod => prod.id === Number(id))) {
            setError(prev => ({
                ...prev,
                id: `Product with id ${id} exists`
            }))
        }
    }

    const changeStock = (stock: string) => {
        setProduct((prev) => ({...prev, stock: Number(stock)}))
    }


    const isValid = useMemo(() => {
        const idExists = state.products.find(prod => {
            return Number(prod.id) === Number(product.id)
        });
        if (product.id < 10 || product.id > 99 || idExists) {
            return false;
        }
        if (product.name.trim().length < 2) {
            return false;
        }

        if (!Number.isInteger(Number(product.price) * 10)) {
            return false;
        }

        return !(product.stock < 1 || product.stock > 15);


    }, [product.id, product.name, product.price, product.stock, state.products])

    const addProduct = () => {
        console.log(error)

        if (isValid) {
            dispatch({
                type: ActionTypes.ADD_PRODUCT,
                payload: product
            })
        }
    }

    return (
        <div className={styles.card}>
            <h4 className={styles.header}>Add New Product</h4>
            <label className={styles.label}>
                ID
                <input
                    className={styles.input}
                    type="text"
                    value={product.id || ''}
                    placeholder={'Double digits > 10'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        changeId(e.target.value)
                    }}
                />
            </label>
            <label className={styles.label}>
                Name
                <input
                    className={styles.input}
                    type="text"
                    placeholder={'Name'}
                    value={product.name || ''}
                    onChange={(e) => changeName(e.target.value)}
                />
            </label>

            <label className={styles.label}>
                Price (€)
                <input
                    className={styles.input}
                    type="number"
                    step={0.1}
                    min={0.1}
                    placeholder={'Price'}
                    value={product.price || ''}
                    onChange={(e) => changePrice(e.target.value)}
                />
            </label>

            <label className={styles.label}>
                Stock
                <input
                    className={styles.input}
                    type="number"
                    min={0}
                    max={15}
                    value={product.stock}
                    placeholder={'Stock'}
                    onChange={(e) => {
                        changeStock(e.target.value)
                    }}
                />
            </label>

            <button
                disabled={!isValid}
                className={styles.addBtn}
                onClick={addProduct}
            >
                Add
            </button>
        </div>
    );
};
