import useWindowStore from '#store/window'
import { X, Minus, Square } from "lucide-react";
import React from 'react'

function WindowControls({ target }) {
    const { closeWindow } = useWindowStore();

    return (
        <div id="window-controls">

            <button className="minimize" onClick={() => console.log("minimize clicked")}>
                <Minus />
            </button>

            <button className="maximize" onClick={() => console.log("maximize clicked")}>
                <Square />
            </button>
            <button className="close" onClick={() => closeWindow(target)}>
                <X />
            </button>
        </div>
    )
}

export default WindowControls
