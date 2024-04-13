import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import '../headertitle.css'
import '../main.css'
import '../navbar.css'
import TasksUI from './components/tasksUI'
import Popup from './components/popup'
import Sidebar from './components/sidebar'
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

            title:" ",
            todos_count_limit:10,
            color:"rgb(227, 227, 227)",

            todos: []
        }
        setTasksModules([...tasksModules, newTaskModule])
    }

    const [showAddBlocksMenuState, setShowAddBlocksMenuState] = useState(false)
    function AddBlocksMenu(props) {
        const { addTaskModule } = props

        return (
            createPortal(
                <div className="overlay-background">
                    <Popup title="Add Blocks" setStateOfPopup={setShowAddBlocksMenuState} buttons={[
                        {
                            title:"Add Tasks Module",
                            description:"Neatly track tasks using modules",
                            function:addTaskModule,
                            image:"add tasksmodules icon.png"
                        },
                        {
                            title:"Add Tasks Module",
                            description:"Neatly track tasks using modules",
                            function:addTaskModule,
                            image:"add tasksmodules icon.png"
                        },
                        {
                            title:"Add Tasks Module",
                            description:"Neatly track tasks using modules",
                            function:addTaskModule,
                            image:"add tasksmodules icon.png"
                        },
                        {
                            title:"Add Tasks Module",
                            description:"Neatly track tasks using modules",
                            function:addTaskModule,
                            image:"add tasksmodules icon.png"
                        },
                        {
                            title:"Add Tasks Module",
                            description:"Neatly track tasks using modules",
                            function:addTaskModule,
                            image:"add tasksmodules icon.png"
                        }
                    ]}>

                    </Popup>
                </div>,
                document.getElementById("overlays")
            )
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
        <>
            <div className='home-header'>
                <img onClick={e => postData()} className="header__hamburger-icon" src="hamburger.svg" alt="Hamburger" />
                <div className="header__title">Summer 2023</div>
                <button className="header__share-button" onClick={e => getData()}>Share</button>
                <img className="header__profile-picture" src="profile.jpg"/>
            </div>
            <div className="title-container">
                <div className="absolute bottom-0 left-[110px] m-0 text-5xl font-bold z-10" onClick={e => addTaskModule()}>Summer 2023</div>
                <div className="wallpaper-image__gradient"></div>
                <img className="wallpaper-image" src="b64aa1258b6197b2fd037b6dab551aad.png"/>
            </div>
            <div className="quote-container">
                <p className="quote-container__quote">“Opportunities don't happen, you create them.”</p>
                <p className="quote-container__cite"> — Chris Grosser</p>
            </div>

            <main>
                <Sidebar/>
                {/* Blocks container */}
                <div className="group/main flex flex-col gap-10 w-full px-12">
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

                    {/* Add blocks button */}
                    {showAddBlocksMenuState && <AddBlocksMenu addTaskModule={addTaskModule}/>}
                    <div className="group/add-blocks-button group-hover/main:opacity-100 ml-2 py-2 px-4 w-fit 
                    rounded-3xl transition duration-200 bg-[rgb(247,247,247)] flex flex-row gap-2
                    items-center text-[rgba(147,147,147,255)] opacity-40 cursor-pointer hover:bg-[rgb(241,241,241)]"
                    onClick={() => setShowAddBlocksMenuState(!showAddBlocksMenuState)}>
                        <div className="cursor-pointer">Add block</div>
                        <i className="fa-regular fa-plus"></i>
                    </div>

                </div>
            </main>
        </>
    )
}