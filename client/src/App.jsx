import { useState, useEffect, useRef } from 'react'
import './general.css'
import './headertitle.css'
import './main.css'
import './navbar.css'
import { TasksUI } from './components/tasksUI.jsx'

export default function App() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        setTodos(
            todos?.sort((a,b) => {new Date(a.date) - new Date(b.date)})
        )
    },[todos])
    const [taskModules, setTaskModules] = useState([])

    const userEmail = "grasspatch@gmail.com"
    
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
            const json = await response.json()
            setTodos(json)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const postData = async (todo) => {
        try {
            const response = await fetch(`http://localhost:8000/todos`, {
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(todo)
            })
        }
        catch {
            console.error(error)
        }
    }

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/DeleteTodos/${id}`, {
                method:'DELETE'
            })
        }
        catch {
            console.error(error)
        }
    }

return (
    <>
    <header>
        <img className="header__hamburger-icon" src="hamburger.svg" alt="Hamburger" />
        <div className="header__title">Summer 2023</div>
        <button className="header__share-button">Share</button>
        <img className="header__profile-picture" src="profile.jpg"/>
    </header>
    <div className="title-container">
        <div className="wallpaper-image__gradient"></div>
        <img className="wallpaper-image" src="b64aa1258b6197b2fd037b6dab551aad.png"/>
        <h1>Summer 2023</h1>
    </div>
    <div className="quote-container">
        <p className="quote-container__quote">“Opportunities don't happen, you create them.”</p>
        <p className="quote-container__cite"> — Chris Grosser</p>
    </div>

    <main>
        <nav>
            <button className="navbar__header-controls--three-dots__container">
                <img className="navbar__header-controls--three-dots-svg" src="three dots.svg"/>
            </button>
            <div className="navbar__header-controls">
                <div className="navbar__header-controls__sizing-buttons">
                    <button className="navbar__header-controls--red"></button>
                    <button className="navbar__header-controls--yellow"></button>
                    <button className="navbar__header-controls--green"></button>
                </div>
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
            <TasksUI 
                todos={todos} 
                setTodos={setTodos} 
                
                postData={postData} 
                deleteData={deleteData}

                custom={{
                    tasksUITitle: "Today's Main Tasks",
                    tasksUILimit: 2,
                    tasksUIColor: 'rgba(158, 246, 178, 1)'
                }}
            />
            <TasksUI 
                todos={todos} 
                setTodos={setTodos} 
                
                postData={postData} 
                deleteData={deleteData}

                custom={{
                    tasksUITitle: "To Do's",
                    tasksUILimit: 10
                }}
            />
        </div>
    </main>
    </>
)
}