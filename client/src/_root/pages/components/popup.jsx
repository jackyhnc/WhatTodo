import { useEffect } from "react"
import React from 'react'
import { createPortal } from 'react-dom'

function Popup(props) {
    const { title, setStateOfPopup, children } = props
    console.log(props)
    
    useEffect(() => {
        const popupObj = document.getElementById("popup")

        const handleClickingOverlay = (e) => {
            if (!(popupObj.contains(e.target))) {
                setStateOfPopup(false)
            }
        }

        window.addEventListener("mousedown",handleClickingOverlay)
        return () => {window.removeEventListener("mousedown",handleClickingOverlay)}

    },[])
    
    return (
        createPortal(
            <div className="overlay-background">
                <div id="overlay-background" className="overlay-background">
                    <div id="popup" className="absolute top-1/2 left-1/2 box-border py-2 px-5 
                    -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl">
                        {/* header */}
                        <div className="grid grid-cols-[1fr_auto] items-center border-b-2 border-b-[rgb(230,230,230)] 
                        py-[6px] pt-[2px] mb-1">
                            <div className="font-semibold">{title}</div>
                            <div className="p-2 hover:bg-[rgb(243,243,243)] rounded-full hover:cursor-pointer"
                            onClick={() => setStateOfPopup(false)}>
                                <img className="w-5" src="delete icon.svg"></img>
                            </div>
                        </div>

                        {/* buttons */}
                        <div className="py-2 max-h-[350px] overflow-scroll">
                            {children}
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById("overlays")
        )
    )
}

export default React.memo(Popup)