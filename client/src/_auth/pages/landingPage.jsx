import { Link } from "react-router-dom"

import Navbar from "./components/navbar"

export default function LandingPage(){

    return (
        <>
            <Navbar/>

            <main className="flex flex-col px-24 mt-14 gap-12">
                <div className="flex flex-col justify-center items-center gap-14 my-40">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="font-bold text-6xl w-fit">Get shit done.</div>
                        <div className="font-semibold text-4xl text-zinc-600 inline w-fit">Plan, track, progress, thrive.</div>
                    </div>
                    <Link to={"signup"}>
                        <div className="p-3 bg-amber-100 rounded-lg flex gap-2 items-center 
                            cursor-pointer text-lg font-medium hover:bg-amber-200 transition duration-200">
                            Sounds good
                            <i className="fa-solid fa-arrow-right h-fit"></i>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-[1.5fr,1fr] w-full gap-6">
                    <div className="m-auto p-12 flex flex-col gap-2">
                        <div className="font-bold text-3xl">tasks</div>
                        <div className="text-lg">organize all the messy pile of tasks in your head into neat 
                            boxes! box related tasks together, modularly add and place theses boxes, and put important ones near the top!
                        </div>
                    </div>

                    <div className="box-border p-4">
                        <img src="graphic1.svg"></img>
                    </div>
                </div>

                <div className="grid grid-cols-[1.5fr,1fr] w-full gap-6">
                    <div className="m-auto p-12 flex flex-col gap-2">
                        <div className="font-bold text-3xl">tasks</div>
                        <div className="text-lg">organize all the messy pile of tasks in your head into neat 
                            boxes! box related tasks together, modularly add and place theses boxes, and put important ones near the top!
                        </div>
                    </div>

                    <div className="box-border p-4">
                        <img src="graphic1.svg"></img>
                    </div>
                </div>


            </main>
        </>
    )
}