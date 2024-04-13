import { useEffect } from "react"
import React from 'react'

function Popup(props) {
    const { title, setStateOfPopup, buttons } = props
    
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
        <div id="overlay-background" className="overlay-background">
            <div id="popup" className="absolute top-1/2 left-1/2 box-border py-2 px-4 
            -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl">
                {/*header*/}
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
                    {buttons.map(button => {
                        return (
                            <div className="grid grid-cols-[auto,1fr] box-border rounded-2xl
                            hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button" 
                            onClick={e => {button.function(); setStateOfPopup(false)}}
                            key={button.title}>
                                <img className="w-16 m-2 rounded-xl border-[1px] 
                                hover:bg-[rgba(0,119,255,0.055)] group-hover/button:brightness-[0.97]"
                                src={button.image}></img>
                                <div className="p-2 max-w-[200px] cursor-pointer">
                                    <div className="cursor-pointer">{button.title}</div>
                                    <div className="cursor-pointer text-xs text-gray-600">{button.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default React.memo(Popup)