import { useState, useEffect, useRef } from 'react'
import './general.css'
import './headertitle.css'
import './main.css'
import './navbar.css'
import './tasks-ui.css'
import './tasks-ui__options-menu.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function TasksUIOptionsMenu(props) {
    const {checkedTodos,showOptionsMenuState,setShowOptionsMenuState} = props
    const [showCheckedTasksHistoryState,setShowCheckedTasksHistoryState] = useState(false)
    const optionsMenuRef = useRef(null)
    const checkedTasksHistoryRef = useRef(null)

    useEffect(() => {
        const optionMenu = document.getElementById("three-dots")
        
        const handleClickOutsideOptionsMenu = (event) => {
            if (!optionsMenuRef.current.contains(event.target) && !optionMenu.contains(event.target) && !checkedTasksHistoryRef.current.contains(event.target)) {
                setShowOptionsMenuState(false)
            }
        }

        window.addEventListener("click",handleClickOutsideOptionsMenu)
        return () => {window.removeEventListener("click",handleClickOutsideOptionsMenu)}
    })
    

    const showCheckedTasksHistory = () => {
        setShowCheckedTasksHistoryState(!showCheckedTasksHistoryState)
    }
    function CheckedTasksHistory() {
        return (
            <div className="checked-tasks-history-container" ref={checkedTasksHistoryRef}>
                {checkedTodos.map(checkedTodo => {
                    return (
                        <div className="checked-tasks-history-container__checkedTodo">{checkedTodo.name}</div>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            <div className="tasks-ui__options-menu" ref={optionsMenuRef}>
                <div className="tasks-ui__options-menu__button" onClick={showCheckedTasksHistory}>Tasks History</div>
            </div>
            {showCheckedTasksHistoryState && <CheckedTasksHistory/>}
        </>
    )
}

export function TodoCalendar(props) {
    const {todos, setTodos, todo} = props
    const calendarRef = useRef()
    
    const handleTodoDateChange = (id,value) => {
        const newTodos = todos.map(todo => {
            return todo.id === id ? {...todo, date:value.format('dddd, MMM D, YYYY')} : todo
        })
        setTodos(newTodos)
    }
    // removes calendar when click is outside
    useEffect(() => {
        const handleClickOutsideTodoCalendar = (event) => {
            const todoDateElement = document.getElementById(`date-${todo.id}`)
            
            if (!(calendarRef.current.contains(event.target)) && !todoDateElement.contains(event.target)) {
                const newTodos = todos.map(todoInTodos => {
                    return todoInTodos === todo ? {...todo, showTodoCalendarState:false} : todoInTodos
                })
                setTodos(newTodos)
            }
        }
        
        window.addEventListener('click',handleClickOutsideTodoCalendar)

        return () => {window.removeEventListener('click',handleClickOutsideTodoCalendar)}
    })
    // remove calendar when enter key is clicked
    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === "Enter") {
                const newTodos = todos.map(todo => {
                    return {...todo,showTodoCalendarState:false}
                })
                setTodos(newTodos)
            }
        }

        window.addEventListener("keydown",handleEnterKey)

        return () => {window.removeEventListener("keydown",handleEnterKey)}
    },[todo.showTodoCalendarState])


    return (
        <div ref={calendarRef}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                className={`tasks-ui__todo__date-calendar-${todo.showTodoCalendarState? "true" : "false"}`}
                id="todoCalendar"
                onChange={value => handleTodoDateChange(todo.id,value)}
                slotProps={{actionBar: {actions: []}}}
                />
            </LocalizationProvider>
        </div>
    )
}

export function MainTodos() {
    const [todos, setTodos] = useState([])

    const addTodo = () => {
      if (todos.length < 2) {
          const mainTodo = {
              id: Date.now(),
              name:"",
              showTodoCalendarState:false,
              date:""
          }
          setTodos([...todos,mainTodo])
      }
    }
    const deleteTodo = (id) => {
      const newTodos = []
      todos.map(todo => {
          if (todo.id !== id) {
              newTodos.push(todo)
          }
      })
      setTodos(newTodos)
    }
    const handleTodoChange = (id, value) => {
      const newTodos = todos.map(todo => {
          return todo.id === id ? {...todo, name:value} : todo
      })
      setTodos(newTodos)
    }
    const exitOnEnter = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }

    const showTodoCalendar = (id) => {
        const newTodos = todos.map(todo => {
            return todo.id === id ? {...todo, showTodoCalendarState:!todo.showTodoCalendarState} : todo
        })
        setTodos(newTodos)
    }

    const [checkedTodos,setCheckedTodos] = useState([])
    const checkTodo = (id) => {
        const newTodos = []
        todos.map(todo => {
            if (todo.id !== id) {
                newTodos.push(todo)
            } else {
                setCheckedTodos([...checkedTodos,todo])
            }
        })
        setTodos(newTodos)
    }

    const [showOptionsMenuState,setShowOptionsMenuState] = useState(false)
    const showOptionsMenu = () => {
        setShowOptionsMenuState(true)
    }

    return (
        <div className="main-tasks-ui">
            <button className="navbar__header-controls--three-dots__container" id={"three-dots"} onClick={showOptionsMenu}>
                <img className="navbar__header-controls--three-dots-svg" src="/WhatTodo/three dots.svg"/>
            </button>
            {showOptionsMenuState && <TasksUIOptionsMenu checkedTodos={checkedTodos} showOptionsMenuState={showOptionsMenuState} setShowOptionsMenuState={setShowOptionsMenuState} />}
            <div className="main-tasks-ui__title">
                Today's Main Tasks
            </div>
            <button className="main-tasks-ui__add-button" onClick={addTodo}>
                <img className="main-tasks-ui__add-icon" src="/WhatTodo/add icon.svg"></img>
            </button>
            <div className="tasks-ui__names-container">
                
                <div className="tasks-ui__names-container--title">Title</div>
                <div className="tasks-ui__names-container--date">Date</div>
            </div>
            <div className="tasks-ui__todos-container">
            {todos.map(todo => {
                return (
                    <div className="tasks-ui__todo" key={todo.id}>
                        <div className="tasks-ui__todo__checkbox-container" onClick={e => checkTodo(todo.id)}>
                            <div className="tasks-ui__todo__checkbox"></div>
                        </div>

                        <div className="tasks-ui__todo__title-container">
                            <input className="tasks-ui__todo__title" 
                            value={todo.name} 
                            onChange={(e) => handleTodoChange(todo.id, e.target.value)}
                            onKeyDown={exitOnEnter}
                            type="text" 
                            autoComplete="off">
                            </input>
                        </div>

                        <div className="tasks-ui__todo__date-container">
                            <div className="tasks-ui__todo__date" id={`date-${todo.id}`} onClick={e => showTodoCalendar(todo.id)}>{todo.date}</div>
                            {todo.showTodoCalendarState && <TodoCalendar todo={todo} todos={todos} setTodos={setTodos} />}
                        </div>

                        <button className="tasks-ui__todo__delete-button" onClick={e => deleteTodo(todo.id)}>
                            <img className="tasks-ui__todo__delete-icon" src="/WhatTodo/delete icon.svg"></img>
                        </button>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export function NormalTodos() {
    const [todos, setTodos] = useState([])
  
    const addTodo = () => {
      if (todos.length < 10) {
          const mainTodo = {
              id: Date.now(),
              name:""
          }
          setTodos([...todos,mainTodo])
      }
    }
  
    const deleteTodo = (id) => {
      const newTodos = []
      todos.map(todo => {
          if (todo.id !== id) {
              newTodos.push(todo)
          }
      })
      setTodos(newTodos)
    }
  
    /*updates the value of the todo that matches the id of the input experiencing onChange while creating a copy of existing todos then sets it*/
    /*returning ...todo preserves each todo's other values (like id)*/
    const handleTodoChange = (id, value) => {
      const newTodos = todos.map(todo => {
          return todo.id === id ? {...todo, name:value} : todo
      })
      setTodos(newTodos)
    }

    return (
        <div className="todos-tasks-ui">
            <button className="navbar__header-controls--three-dots__container">
                <img className="navbar__header-controls--three-dots-svg" src="/WhatTodo/three dots.svg"/>
            </button>
            <div className="todos-tasks-ui__title">
                To Do's
            </div>
            <button className="todos-tasks-ui__add-button" onClick={addTodo}>
                <img className="todos-tasks-ui__add-icon" src="/WhatTodo/add icon.svg"></img>
            </button>
            <div className="tasks-ui__names-container">
                <div className="tasks-ui__names-container--title">Title</div>
                <div className="tasks-ui__names-container--date">Date</div>
            </div>
            <div className="tasks-ui__todos-container">
            {todos.map(todo => {
                return (
                    <div className="tasks-ui__todo" key={todo.id}>
                        <div className="tasks-ui__todo__checkbox-container">
                            <div className="tasks-ui__todo__checkbox"></div>
                        </div>

                        <div className="tasks-ui__todo__title-container">
                            <input className="tasks-ui__todo__title" 
                            value={todo.name} 
                            onChange={(e) => handleTodoChange(todo.id, e.target.value)} 
                            type="text" 
                            id="tasks-ui__todo__title-id"
                            autocomplete="off" >
                            </input>
                        </div>

                        <div className="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                        
                        <button className="tasks-ui__todo__delete-button" onClick={e => deleteTodo(todo.id)}>
                            asdfasdf<img className="tasks-ui__todo__delete-icon" src="/WhatTodo/delete icon.svg"></img>
                        </button>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function App() {

  return (
    <>
      <header>
          <img className="header__hamburger-icon" src="/WhatTodo/hamburger.svg" alt="Hamburger" />
          <div className="header__title">Summer 2023</div>
          <button className="header__share-button">Share</button>
          <img className="header__profile-picture" src="/WhatTodo/profile.jpg"/>
      </header>
      <div className="title-container">
          <div className="wallpaper-image__gradient"></div>
          <img className="wallpaper-image" src="/WhatTodo/b64aa1258b6197b2fd037b6dab551aad.png"/>
          <h1>Summer 2023</h1>
      </div>
      <div className="quote-container">
          <p className="quote-container__quote">“Opportunities don't happen, you create them.”</p>
          <p className="quote-container__cite"> — Chris Grosser</p>
      </div>

      <main>
          <nav>
              <button className="navbar__header-controls--three-dots__container">
                  <img className="navbar__header-controls--three-dots-svg" src="/WhatTodo/three dots.svg"/>
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
                          <img className="navbar__profile-image" src="/WhatTodo/profile.jpg"/>
                          <div className="navbar__greeting">Hey, Joe!</div>
                      </div> 
                  </div>
                  <div className="navbar__section">
                      <div className="navbar__section-title">Menu</div>
                      <div className="navbar__section__buttons-section">
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/profile icon.svg"/>
                              <div className="navbar__section__buttons-section__button-text">Profile</div>
                          </button>
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/inbox.svg"/>
                              <div className="navbar__section__buttons-section__button-text">Inbox</div>
                          </button>
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/search.svg"/>
                              <div className="navbar__section__buttons-section__button-text">Search</div>
                          </button>
                      </div>
                  </div>
                  <div className="navbar__section">
                      <div className="navbar__section-title">Configuration</div>
                      <div className="navbar__section__buttons-section">
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/new page.svg"/>
                              <div className="navbar__section__buttons-section__button-text">New Page</div>
                          </button>
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/edit page.svg"/>
                              <div className="navbar__section__buttons-section__button-text">Edit Page</div>
                          </button>
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/settings.svg"/>
                              <div className="navbar__section__buttons-section__button-text">Settings</div>
                          </button>
                          <button className="navbar__section__buttons-section__button">
                              <img className="navbar__section__buttons-section__button-icon" src="/WhatTodo/updates.svg"/>
                              <div className="navbar__section__buttons-section__button-text">Updates</div>
                          </button>
                      </div>
                  </div>
              </div>
          </nav>
          <div className="tasks-column__first">
              <MainTodos />
              <NormalTodos />
              <MainTodos />
          </div>
          <div className="tasks-column__second">
              <div className="longterm-tasks-ui">
                  <button className="navbar__header-controls--three-dots__container">
                      <img className="navbar__header-controls--three-dots-svg" src="/WhatTodo/three dots.svg"/>
                  </button>
                  <div className="longterm-tasks-ui__title">
                      Long Term Tasks
                  </div>
                  <img className="longterm-tasks-ui__add-icon" src="/WhatTodo/add icon.svg"></img>
                  <div className="tasks-ui__names-container">
                      <div className="tasks-ui__names-container--title">Title</div>
                      <div className="tasks-ui__names-container--date">Date</div>
                  </div>
                  <div className="tasks-ui__todos-container">
                      <div className="tasks-ui__todo">
                          <div className="tasks-ui__todo__checkbox-container">
                              <div className="tasks-ui__todo__checkbox"></div>
                          </div>
                          <div className="tasks-ui__todo__title">Complete reading the book</div>
                          <div className="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                          <img className="tasks-ui__todo__delete-icon" src="/WhatTodo/delete icon.svg"></img>
                      </div>
                      <div className="tasks-ui__todo">
                          <div className="tasks-ui__todo__checkbox-container">
                              <div className="tasks-ui__todo__checkbox"></div>
                          </div>
                          <div className="tasks-ui__todo__title">Complete reading the book</div>
                          <div className="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                          <img className="tasks-ui__todo__delete-icon" src="/WhatTodo/delete icon.svg"></img>
                      </div>
                  </div>
              </div>
              <div className="gallery-container"></div>
          </div>
      </main>
    </>
  )
}