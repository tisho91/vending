import {VendingMachine} from "./components/VendingMachine";
import {VendingMachineProvider} from "./context/Provider.tsx";


function App() {
    return (
        <VendingMachineProvider>
            <VendingMachine/>
        </VendingMachineProvider>
    )
}

export default App
