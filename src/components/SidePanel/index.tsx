import {Coins} from "./Coins";
import {Display} from "./Display";
import {Keypad} from "./Keypad";
import {ChangeBox} from "./ChangeBox";
import {ResetButton} from "./ResetButton";

export const SidePanel = () =>{
    return (
        <>
            <Display/>
            <Coins/>
            <ResetButton/>
            <Keypad/>
            <ChangeBox/>
        </>
    )
}