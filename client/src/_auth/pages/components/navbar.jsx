import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <div className="flex h-14 w-full items-center px-6 fixed top-0 
        transition duration-200 ease bg-[rgba(255,255,255,0.8)] backdrop-blur-sm border-b-[rgb(250,250,250)] border-b-[1px]" id="navbar">
            <Link className="p-4" to={"/"}>
                <img className="w-36 font-bold cursor-pointer" src="../../logo.svg"></img>
            </Link>
        </div>
    )
}