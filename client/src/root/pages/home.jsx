import { useState, useEffect } from 'react'
import '../../general.css'
import '../../headertitle.css'
import '../../main.css'
import '../../navbar.css'
import { TasksUI } from '../../components/tasksUI.jsx'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
    const [tasksModules, setTasksModules] = useState([])

    const userEmail = 'grasspatch1@gmail.com'
    
    const getData = async () => {
        try{
            const response = await fetch(`http://localhost:8000/tasksModules/${userEmail}`, {
                method: 'GET',
            })
            const json = await response.json()
            setTasksModules(json)
            console.log('gotten')
        } catch(err) {
            console.error(err)
        }
    }
    useEffect(()=>{getData()},[])
    
    const postData = async () => {
        try {
            const response = await fetch(`${process.env.WHATTODO_SERVERURL}/tasksModules/`, {
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
        postData() //shit stops sending again after like 10s
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

    return (
        <>
        <header>
            <img onClick={e => postData()} className="header__hamburger-icon" src="hamburger.svg" alt="Hamburger" />
            <div className="header__title">Summer 2023</div>
            <button className="header__share-button" onClick={e => getData()}>Share</button>
            <img className="header__profile-picture" src="profile.jpg"/>
        </header>
        <div className="title-container">
            <div className="wallpaper-image__gradient"></div>
            <img className="wallpaper-image" src="b64aa1258b6197b2fd037b6dab551aad.png"/>
            <h1 onClick={e => addTaskModule()}>Summer 2023</h1>
        </div>
        <div className="quote-container">
            <p className="quote-container__quote">“Opportunities don't happen, you create them.”</p>
            <p className="quote-container__cite"> — Chris Grosser</p>
        </div>

        <main>
            <nav>
                <div className="navbar__header-controls">
                    <div className="navbar__header-controls__sizing-buttons">
                        <button className="navbar__header-controls--red"></button>
                        <button className="navbar__header-controls--yellow"></button>
                        <button className="navbar__header-controls--green"></button>
                    </div>
                    <button className="navbar__header-controls--three-dots__container">
                        <img className="navbar__header-controls--three-dots-svg" src="three dots.svg"/>
                    </button>
                </div>
                <div className="navbar__container">
                    <div className="navbar__profile-greeting-section">
                        <div className="navbar__profile-greeting-container">
                            <img className="navbar__profile-image" src="profile.jpg"/>
                            <div className="navbar__greeting">Hey, Joe!</div>
                        </div> 
                    </div>
                    <div className="navbar__section">
                        <div className="navbar__section-title">Menu</div>
                        <div className="navbar__section__buttons-section">
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="profile icon.svg"/>
                                <div className="navbar__section__buttons-section__button-text">Profile</div>
                            </button>
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="inbox.svg"/>
                                <div className="navbar__section__buttons-section__button-text">Inbox</div>
                            </button>
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="search.svg"/>
                                <div className="navbar__section__buttons-section__button-text">Search</div>
                            </button>
                        </div>
                    </div>
                    <div className="navbar__section">
                        <div className="navbar__section-title">Configuration</div>
                        <div className="navbar__section__buttons-section">
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="new page.svg"/>
                                <div className="navbar__section__buttons-section__button-text">New Page</div>
                            </button>
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="edit page.svg"/>
                                <div className="navbar__section__buttons-section__button-text">Edit Page</div>
                            </button>
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="settings.svg"/>
                                <div className="navbar__section__buttons-section__button-text">Settings</div>
                            </button>
                            <button className="navbar__section__buttons-section__button">
                                <img className="navbar__section__buttons-section__button-icon" src="updates.svg"/>
                                <div className="navbar__section__buttons-section__button-text">Updates</div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="tasks-modules-container">
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
        </main>
        </>
    )
}