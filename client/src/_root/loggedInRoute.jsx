import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Sidebar from './pages/components/sidebar'
import Navbar from './pages/components/navbar'

import UntitledSpace from './pages/untitledSpace'
import HabitTracker from "./pages/habitTracker"

import { v4 as uuidv4 } from 'uuid'
import { UserAuth } from '../contexts/AuthContext'
import ProtectedRoutes from './protectedRoutes'

export default function LoggedInRoute() {
    const { user } = UserAuth()
    const navigate = useNavigate()

    const [showSidebar, setShowsidebar] = useState(false)
    const [absoluteShowSidebar, setAbsoluteShowSidebar] = useState(false)
    const openSidebarSidebarStyles = {
        overflowY:"hidden"
    }
    const closedSidebarSidebarStyles = {
        transform:"translateX(-300px)",
    }
    const openSidebarPageStyles = {
        paddingLeft:"212px" //sidebar width
    }
     
    useEffect(function handleHoveringSidebarActivatorAndSidebarTriggerButton() {
        const sidebarActivator = document.getElementById("sidebar-activator")
        const sidebar = document.getElementById("sidebar")

        const handleSidebarActivation = (e) => {
            if (sidebarActivator.contains(e.target) || sidebar.contains(e.target)) {
                setShowsidebar(true)
            } else {
                setShowsidebar(false)
            }
        }

        if (absoluteShowSidebar) {
            setShowsidebar(true)
        } else {
            setShowsidebar(false)
            document.addEventListener("mouseover",handleSidebarActivation)
        }
        return (() => {document.removeEventListener("mouseover",handleSidebarActivation)})    
    },[absoluteShowSidebar])

    const [spaces, setSpaces] = useState([])
    const addSpace = (spaceType) => {
        const newSpace = {
            space_id:uuidv4(),
            email:user.email,

            space_title:"Untitled",
            space_icon:"blank document.svg",
            space_type:spaceType,
            space_content:{
                banner_img:"",
                quotes:[]
            }
        }
        setSpaces([...spaces,newSpace])
    }

    const spaceTypeToSpaceComponentPairs = {
        habit_tracker:HabitTracker,
        blank:UntitledSpace
    }

    const [currentState,setCurrentState] = useState([])

    function SpacesScreen() {        
        function NotifyUserToClickOnSpaceAlertScreen() {
            return (
                <>
                    <i className="fa-solid fa-arrow-left text-[30px]"></i>
                    <div className="max-w-[400px] text-center">Open a Space the sidebar on your left.</div>
                </>
            )
        }
        
        return (
            <div className="flex flex-col h-full items-center justify-center gap-4 transition">
                <ProtectedRoutes>
                    <Routes>
                        <Route path={"*"} element={<NotifyUserToClickOnSpaceAlertScreen/>}/>

                        {spaces.map(space => {
                            const SpaceComponent = spaceTypeToSpaceComponentPairs[space.space_type]

                            return (
                                <Route path={`/${space.space_id}`} 
                                    element={<SpaceComponent space={space}/>} 
                                    key={space.space_id}
                                />
                            )
                        })}
                    </Routes>       
                </ProtectedRoutes>
            </div>
        )
    }

    function NoSpacesScreen() {
        return (
            <div className="flex flex-col h-full items-center justify-center gap-2">
                <div className="text-[70px]">🤔</div>
                <div className="max-w-[400px] text-center">No Spaces yet. Add a Space by opening the sidebar on your left!</div>
            </div>
        )
    }

    return (
        <div className="">
            <div id="sidebar-activator" className="fixed w-[60px] z-[200] h-full"></div>
            <Sidebar 
                sidebarStyles={showSidebar ? openSidebarSidebarStyles : closedSidebarSidebarStyles}

                addSpace={addSpace} 
                spaces={spaces}

                currentState={currentState}
                setCurrentState={setCurrentState}
                />
            <Navbar 
                absoluteShowSidebar={absoluteShowSidebar} 
                setAbsoluteShowSidebar={setAbsoluteShowSidebar} 

                currentState={currentState}
            />

            <div id="screensContainer" className="pt-12" style={absoluteShowSidebar ? openSidebarPageStyles : {}}>
                {spaces.length ? <SpacesScreen/> : <NoSpacesScreen/>}
            </div>
        </div>
    )
}