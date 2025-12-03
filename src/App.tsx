import {VendingMachine} from "./components/VendingMachine";
import {VendingMachineProvider} from "./context/Provider.tsx";
import {useLoadProducts} from "./hooks/useLoadProducts";
import {useVendingMachineFlow} from "./hooks/useVendingMachineFlow";


function App() {
    return (
        <VendingMachineProvider>
            <VendingMachineRoot/>
        </VendingMachineProvider>
    );
}

const VendingMachineRoot = () => {
    useLoadProducts();
    useVendingMachineFlow();
    return <VendingMachine/>;
}

export default App
