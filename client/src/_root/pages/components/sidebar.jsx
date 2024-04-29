import { useState } from "react"
import { Link } from "react-router-dom"
import Popup from "./popup"

export default function Sidebar(props) {
    const { sidebarStyles, addSpace, spaces, currentState, setCurrentState } = props

    const [showAddSpaceMenu, setShowAddSpaceMenu] = useState(false)
    function AddSpaceMenu () {
        const spacesTypesButtons = [
            {
                title:"Habit Tracker",
                description:"Organizes and tracks various habits. See your progress over time!",
                spaceType:"habit_tracker"
            },
            {
                title:"Blank",
                description:"A blank, editable page.",
                spaceType:"blank"
            }
        ]

        return (
            <Popup title="Add Space" setStateOfPopup={setShowAddSpaceMenu}>
                {spacesTypesButtons.map(spaceButton => {
                    return (
                        <div className="my-2 grid grid-cols-[auto,1fr] box-border rounded-2xl
                        hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button" 
                        onClick={() => {addSpace(spaceButton.spaceType); setShowAddSpaceMenu(false)}}
                        key={spaceButton.title}>
                            <img className="size-16 m-2 rounded-xl border-[1px] 
                            hover:bg-[rgba(0,119,255,0.055)] group-hover/button:brightness-[0.97]"
                            src={spaceButton.image}></img>
                            <div className="p-2 max-w-[200px] cursor-pointer flex flex-col gap-0.5">
                                <div className="cursor-pointer">{spaceButton.title}</div>
                                <div className="cursor-pointer text-xs text-gray-600">{spaceButton.description}</div>
                            </div>
                        </div>
                    )
                })}
            </Popup>
        )
    }

    const sidebarMenuSectionObj = [
        {
            title:"Search",
            image:"search.svg",
            function:() => {return null}
        },
        {
            title:"New Space",
            image:"new page.svg",
            function:() => {setShowAddSpaceMenu(true)}
        },
        {
            title:"Edit Page",
            image:"edit page.svg",
            function:() => {return null}
        }
    ]

    return (
        <div id="sidebar" style={sidebarStyles} className="fixed top-[20%] z-[110] 
        rounded-2xl rounded-l-none px-4 py-8 bg-[rgb(255,253,251)] shadow-[-1px_1px_10px_-1px_rgb(0,54,135,0.3)]
        hover:shadow-[2px_3px_17px_-1px_rgb(0,54,135,0.3)] transition duration-300 
        flex flex-col gap-6 text-[rgba(147,147,147,255)]">

            {showAddSpaceMenu && <AddSpaceMenu/>}
            
            <div className="">
                <div className="text-xs">Menu</div>
                    {sidebarMenuSectionObj.map(button => {
                        return (
                            <div className="w-[180px]" key={button.title} onClick={button.function}>
                                <div className="grid grid-cols-[auto,1fr] box-border rounded-2xl
                                    hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button">
                                        <img className="w-5 m-2"
                                        src={button.image}></img>
                                        <div className="p-2 cursor-pointer">
                                            <div className="cursor-pointer text-sm">{button.title}</div>
                                        </div>
                                </div>
                            </div>
                        )
                    })}
            </div>

            <div className="">
                <div className="text-xs">Spaces</div>
                    <>                        
                        {spaces.map(space => {
                            return (
                                <Link to={space.space_id} key={space.space_id} onClick={()=>setCurrentState(space)}>
                                    <div className="w-[180px]">
                                        <div className="grid grid-cols-[auto,1fr] box-border rounded-2xl
                                            hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button">
                                                <img className="w-5 m-2" src={space.space_image?? "dotted circle.svg"}></img>
                                                <div className="p-2 cursor-pointer">
                                                    <div className="cursor-pointer text-sm ">{space.space_title}</div>
                                                </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}    
                    </>
            </div>


        </div>
    )
}
