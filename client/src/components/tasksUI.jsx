import { useState, useEffect, useRef } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { UID } from '../generateUID.js'
import '../tasks-ui.css'
import '../tasks-ui__options-menu.css'

export function TasksUIOptionsMenu(props) {
    const {tasksUIId,
        checkedTodos,showOptionsMenuState,setShowOptionsMenuState,
        showCheckedTasksHistoryState,setShowCheckedTasksHistoryState,
        tasksUITitleColor,setTasksUITitleColor
    } = props
    const optionsMenuRef = useRef(null)

    /*delete options menu popup when clicked outside*/
    useEffect(() => {
        const optionMenuButton = document.getElementById(`three-dots-button-${tasksUIId}`)
        
        const handleClickOutsideOptionsMenu = (event) => {
            if (!optionsMenuRef.current.contains(event.target) && !optionMenuButton.contains(event.target)) {
                setShowOptionsMenuState(false)
            }
        }

        window.addEventListener("click",handleClickOutsideOptionsMenu)
        return () => {window.removeEventListener("click",handleClickOutsideOptionsMenu)}
    },[showOptionsMenuState])
    /*delete options menu popup on enter keypress*/
    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === "Enter") {
                setShowOptionsMenuState(!showOptionsMenuState)
            }
        }

        window.addEventListener("keydown",handleEnterKey)
        return () => {window.removeEventListener("keydown",handleEnterKey)}
    },[showOptionsMenuState])

    const showCheckedTasksHistory = () => {
        setShowCheckedTasksHistoryState(!showCheckedTasksHistoryState)
    }



    return (
        <div className="tasks-ui__options-menu" ref={optionsMenuRef}>
            <div className="tasks-ui__options-menu__header-container">
            <div className="tasks-ui__options-menu__title">Options</div>
            <button className="tasks-ui__options-menu__delete-button" onClick={e => setShowOptionsMenuState(!showOptionsMenuState)}>
                <img className="tasks-ui__options-menu__delete-icon" src="delete icon.svg"></img>
            </button>
            </div>
            <div className={`tasks-ui__options-menu__button-${showCheckedTasksHistoryState ? "selected" : "unselected"}`} onClick={showCheckedTasksHistory}>Completed Tasks</div>
            <div className='tasks-ui__options-menu__button-unselected'>Change Color</div>
            <ColorPicker
                color={tasksUITitleColor}
                onChange={(color) => {
                    setTasksUITitleColor(color.hexa)
                }}
                presetColor={false} //why no work
            />
        </div>
    )
}

export function TodoCalendar(props) {
    const {todos, setTodos, todo} = props
    const calendarRef = useRef()
    
    const handleTodoDateChange = (id,value) => {
        const newTodos = todos.map(todo => {
            return todo.id === id ? {...todo, date:value} : todo
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
    })


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

export function TasksUI(props) {
    const {todos, setTodos, postData, deleteData} = props
    const { tasksUITitle, tasksUILimit } = props.custom

    const [tasksUIId] = useState(UID()) //its in usestate bc it wont reassign value on rerender with just date.now()
    //send this modules id to database

    const [tasksUITitleId] = useState(UID())
    const [tasksUITitleColor, setTasksUITitleColor] = useState('rgb(227, 227, 227)')

    //changes title color
    useEffect(() => {
        const tasksUITitleObj = document.getElementById(tasksUITitleId)
        tasksUITitleObj.style.background = tasksUITitleColor
    }, [tasksUITitleColor])

    const [tasksUITodos, setTasksUITodos] = useState([])
    //sorts tasksUITodos by date
    useEffect(() => {
        setTasksUITodos(
            todos.filter(todo => todo.moduleId == tasksUIId)
        )
    },[todos])

    const tasksUIStyleInitialLength = 176
    const [tasksUIStyleLength, setTasksUIStyleLength] = useState(tasksUIStyleInitialLength)
    //updates length of module when todo added
    useEffect(() => {
        if (tasksUITodos.length > 1) {
            setTasksUIStyleLength(140 + (tasksUITodos.length - 1) * 36)
        }
    },[tasksUITodos])
    useEffect(() => {
        const tasksUIObj = document.getElementById(tasksUIId)
        if (tasksUIObj) {
            tasksUIObj.style.height = `${tasksUIStyleLength}px`
        }
    },[tasksUIStyleLength])

    
    const addTodo = () => {
        if (tasksUITodos.length < tasksUILimit) {
            const todo = {
                id: UID(),
                name:"",
                date:"",
                user_email:"",
                moduleId:tasksUIId
            }
            postData(todo)
            setTodos([...todos,todo])
        }
    }
    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => {
                return todo.id !== id
        })
        setTodos(newTodos)
        deleteData(id)
    }
    const deleteCheckedTodo = (id) => {
        const newCheckedTodos = []
        checkedTodos.map(newCheckedTodo => {
            if (newCheckedTodo.id !== id) {
                newCheckedTodos.push(newCheckedTodo)
            }
        })
        setCheckedTodos(newCheckedTodos)
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
    const [showCheckedTasksHistoryState,setShowCheckedTasksHistoryState] = useState(false)
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
        setShowOptionsMenuState(!showOptionsMenuState)
    }

    return (
        <div className='tasks-ui' id={tasksUIId}>
            <button className="navbar__header-controls--three-dots__container" id={`three-dots-button-${tasksUIId}`} onClick={showOptionsMenu}>
                <img className="navbar__header-controls--three-dots-svg" src="three dots.svg"/>
            </button>
            {showOptionsMenuState && 
            <TasksUIOptionsMenu 
                tasksUIId={tasksUIId}

                checkedTodos={checkedTodos} 
                showOptionsMenuState={showOptionsMenuState} 
                setShowOptionsMenuState={setShowOptionsMenuState} 

                showCheckedTasksHistoryState={showCheckedTasksHistoryState}
                setShowCheckedTasksHistoryState={setShowCheckedTasksHistoryState}

                tasksUITitleColor={tasksUITitleColor}
                setTasksUITitleColor={setTasksUITitleColor}
            />}

            <div className='tasks-ui__title-add-container'>
                <div className='tasks-ui__title' id={tasksUITitleId}>
                    {showCheckedTasksHistoryState ? `${tasksUITitle} | Completed` : tasksUITitle }
                </div>
                {!showCheckedTasksHistoryState && 
                <button className='tasks-ui__add-button' onClick={addTodo}>
                    <img className='tasks-ui__add-icon' src="add icon.svg"></img>
                </button>
                }
            </div>

            <div className="tasks-ui__names-container">
                <div className="tasks-ui__names-container--title">Title</div>
                <div className="tasks-ui__names-container--date">Date</div>
            </div>

            {!tasksUITodos.length && <div className="tasks-ui__main-container">
                {!showCheckedTasksHistoryState ? 
                    !tasksUITodos.length && <div className="tasks-ui__no-todos-alert">No Todos</div> : 
                    !checkedTodos.length && <div className="tasks-ui__no-todos-alert">No Completed Todos</div>
                }
            </div> }
            <div className="tasks-ui__todos-container">
            {!showCheckedTasksHistoryState && tasksUITodos.map(todo => {
                return (
                    <div className="tasks-ui__todo" key={todo.id}>
                        <button className="tasks-ui__todo__checkbox-container" onClick={e => checkTodo(todo.id)}>
                            <div className="tasks-ui__todo__checkbox"></div>
                        </button>

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
                            <div className="tasks-ui__todo__date" id={`date-${todo.id}`} onClick={e => showTodoCalendar(todo.id)}>
                                {todo.date ? dayjs(todo.date).format('dddd, MMM D, YYYY') : " empty"}
                            </div>
                            {todo.showTodoCalendarState && <TodoCalendar todo={todo} todos={todos} setTodos={setTodos} />}
                        </div>

                        <div className="tasks-ui__todo__delete-button-container">
                            <button className="tasks-ui__todo__delete-button" onClick={e => deleteTodo(todo.id)}>
                                <img className="tasks-ui__todo__delete-icon" src="delete icon.svg"></img>
                            </button>
                        </div>
                    </div>
                    )
                })}
            {showCheckedTasksHistoryState && checkedTodos.map(todo => {
                return (
                    <div className="tasks-ui__todo" key={todo.id}>
                        <button className="tasks-ui__todo__checkbox-container"></button>

                        <div className="tasks-ui__todo__title-container">
                            <input className="tasks-ui__todo__title" 
                            value={todo.name} 
                            onKeyDown={exitOnEnter}
                            type="text" 
                            autoComplete="off">
                            </input>
                        </div>

                        <div className="tasks-ui__todo__date-container">
                            <div className="tasks-ui__todo__date" id={`date-${todo.id}`}>{todo.date ? dayjs(todo.date).format('dddd, MMM D, YYYY') : ""}</div>
                        </div>

                        <button className="tasks-ui__todo__delete-button" onClick={e => deleteCheckedTodo(todo.id)}>
                            <img className="tasks-ui__todo__delete-icon" src="delete icon.svg"></img>
                        </button>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}