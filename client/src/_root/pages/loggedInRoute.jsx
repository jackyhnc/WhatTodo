import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Home from './home'

export default function LoggedInRoute() {

    useEffect(() => {
        const sidebarActivator = document.getElementById("sidebar-activator")
        const sidebar = document.getElementById("sidebar")

        const handleSidebarActivation = (e) => {
            if (sidebarActivator.contains(e.target) || sidebar.contains(e.target)) {
                sidebar.style.transform = "translateX(300px)"
                document.body.style.overflowY = "hidden"
            } else {
                sidebar.style.transform = "translateX(-300px)"
                document.body.style.overflowY = "scroll"
            }
        }

        document.addEventListener("mouseover",handleSidebarActivation)
        return (() => {document.removeEventListener("mouseover",handleSidebarActivation)})
    },[])

    return (
        <div className="flex h-full">
            <div id="sidebar-activator" className="fixed w-[60px] z-[200] h-full"></div>
            <Sidebar/>

            <Routes element={<Sidebar/>}>
                <Route path="/home" element={<Home/>}/>
            </Routes>

        </div>
    )
}