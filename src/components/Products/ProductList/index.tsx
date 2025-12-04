import {useVendingMachine} from "../../../context/Provider.tsx";
import styles from './styles.module.css'
import {ProductItem} from "../ProductItem";
import {AddProductCard} from "../AddProductCard";

export const ProductList = () => {
    const {state} = useVendingMachine();
    const {products} = state
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductItem key={product.id} {...product}/>
            ))}
            {
                state.adminMode ? <AddProductCard /> : null
            }
        </div>
    );
};
