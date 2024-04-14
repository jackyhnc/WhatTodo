import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import '../headertitle.css'
import '../main.css'
import '../navbar.css'
import TasksUI from './components/tasksUI'
import Popup from './components/popup'
import { v4 as uuidv4 } from 'uuid'
import { UserAuth } from '../../contexts/AuthContext'


export default function Home() {
    const { user, logout } = UserAuth()
    console.log(user)

    const [tasksModules, setTasksModules] = useState([])

    const userEmail = "user.email"

    const getData = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/tasksModules/${userEmail}`, {
                method: 'GET',
            })
            const json = await response.json()
            setTasksModules(json)
            console.log("gotten")
        } catch(err) {
            console.error(err)
        }
    }
    useEffect(()=>{getData()},[])
    
    const postData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/tasksModules/`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(tasksModules)
            })
            console.log('posted')
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(()=>{
        postData()
    },[tasksModules])
    
    const addTaskModule = () => {
        const newTaskModule = {
            id: uuidv4(),
            user_email: userEmail,

            title:"",
            todos_count_limit:10,
            color:"rgb(227, 227, 227)",

            todos: []
        }
        setTasksModules([...tasksModules, newTaskModule])
    }

    const [showAddBlocksMenuState, setShowAddBlocksMenuState] = useState(false)
    function AddBlocksMenu() {
        const buttons = [
            {
                title:"Add Tasks Module",
                description:"Neatly track tasks using modules",
                function:addTaskModule,
                image:"add tasksmodules icon.png"
            }
        ]

        return (
            <Popup title={"Add Blocks"} setStateOfPopup={setShowAddBlocksMenuState}>
                {/* buttons */}
                {buttons.map(button => {
                    return (
                        <div className="grid grid-cols-[auto,1fr] box-border rounded-2xl
                        hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button" 
                        onClick={e => {button.function(); setShowAddBlocksMenuState(false)}}
                        key={button.title}>
                            <img className="w-16 m-2 rounded-xl border-[1px] 
                            hover:bg-[rgba(0,119,255,0.055)] group-hover/button:brightness-[0.97]"
                            src={button.image}></img>
                            <div className="p-2 max-w-[200px] cursor-pointer flex flex-col gap-0.5">
                                <div className="cursor-pointer">{button.title}</div>
                                <div className="cursor-pointer text-xs text-gray-600">{button.description}</div>
                            </div>
                        </div>
                    )
                })}
            </Popup>
        )
    }
    useEffect(()=>{
        const handleCommand = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "j") {
                setShowAddBlocksMenuState(!showAddBlocksMenuState)
            }
        }

        document.addEventListener("keydown",handleCommand)
        return () => {document.removeEventListener("keydown",handleCommand)}
    })

    return (
        <div className="mt-[48px] overscroll-none w-full">
            <div className='h-12 w-full grid grid-cols-[0.25fr_5fr_0.2fr_0.25fr] bg-white z-[100] border-b-2
             border-b-[rgb(241,241,241)] bg-[rgb(255,255,255] items-center text-lg font-medium fixed top-0 '>
                <img className="header__hamburger-icon" src="hamburger.svg" alt="Hamburger" />
                <div className="header__title">Summer 2023</div>
                <button className="header__share-button" >Share</button>
                <img className="header__profile-picture" src="profile.jpg"/>
            </div>

            <img className="overflow-clip w-full object-cover object-center h-[250px]" src="b64aa1258b6197b2fd037b6dab551aad.png"/>

            <div className="px-[70px] flex flex-col gap-14">
                <div className="grid grid-cols-[] gap-3 my-3 w-fit">
                    <div className="text-3xl font-bold w-fit">Summer 2023</div>
                    <div className="flex flex-col">
                        <div className="">“Opportunities don't happen, you create them.”</div>
                        <div className="self-end">—Chris Grosser</div>
                    </div>
                </div>

                <main className="flex flex-col h-full group/blocks-container gap-10 pb-[40vh]">

                    {/* Blocks container */}
                    <div className="flex flex-wrap gap-10 w-full">
                        {tasksModules.map(module => {
                            return (
                                <div key={module.id}>
                                    <TasksUI>
                                        {{
                                            tasksUIId: module.id,
                                            importedTodos: module.todos,
                                            tasksModules: tasksModules,
                                            setTasksModules: setTasksModules,
                                            custom: {
                                                tasksUITitle: module.title,
                                                tasksUITodosCountLimit: module.todos_count_limit,
                                                tasksUIColor: module.color
                                            }
                                        }}
                                    </TasksUI>
                                </div>
                            )
                        })}
                    </div>

                    {/* Add blocks button */}
                    {showAddBlocksMenuState && <AddBlocksMenu/>}
                    <div className="group-hover/blocks-container:opacity-100 group/add-block py-2 px-4 w-fit 
                        rounded-3xl transition duration-200 bg-[rgb(247,247,247)] flex flex-row gap-2
                        items-center text-[rgba(147,147,147,255)] opacity-40 cursor-pointer hover:bg-[rgb(241,241,241)]"
                        onClick={() => setShowAddBlocksMenuState(!showAddBlocksMenuState)}>
                        <div className="cursor-pointer">Add block</div>
                        <i className="fa-regular fa-plus"></i>
                    </div>
                </main>

            </div>
        </div>
    )
}