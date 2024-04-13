import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import './tasks-ui.css'
import './tasks-ui__options-menu.css'

export function TasksUIOptionsMenu(props) {
    let {tasksUIId,tasksModules,setTasksModules,showOptionsMenuState,
        setShowOptionsMenuState,showCheckedTasksHistoryState,
        setShowCheckedTasksHistoryState, title, setTitle 
    } = props

    const showCheckedTasksHistory = () => {
        setShowCheckedTasksHistoryState(!showCheckedTasksHistoryState)
    }

    const [tasksUIColorPickerState, setTasksUIColorPickerState] = useState(false)
    const [tasksUITitleChangerState, setTasksUITitleChangerState] = useState(false)

    function TasksUIColorPicker() {
        const updateTasksUIColor = (selectedColor) => {
            const newTasksModules = tasksModules.map(module => {
                return module.id === tasksUIId ? {...module, color:selectedColor} : module
            })
            setTasksModules(newTasksModules)
        }

        const accentColors = {
            'Blue':'rgba(182, 233, 255, 1)',
            'Green':'rgba(158, 246, 178, 1)',
            'Yellow':'rgba(250, 250, 171, 1)',
            'Orange':'rgba(255,224,180,1)',
            'Red':'rgba(255, 192, 201, 1)',
            'Pink':'rgba(255,213,226,1)',
            'Purple':'rgba(237, 223, 255, 1)'
        }

        return (
            createPortal(
                <div className="overlay-background">
                    <div className="tasks-ui__options-menu__popup">
                        <div className="tasks-ui__options-menu__header-container">
                            <div className="tasks-ui__options-menu__title">Colors</div>
                            <button className='tasks-ui__options-menu__back-button' onClick={e => setTasksUIColorPickerState(!tasksUIColorPickerState)}>
                                <img className="tasks-ui__options-menu__back-icon" src='../back icon.svg'></img>
                            </button>
                        </div>
                        <div className="change-accent-color-menu">
                            {Object.keys(accentColors).map(color => {
                                return (
                                    <div className="change-accent-color-menu__button" onClick={e => updateTasksUIColor(accentColors[color])} key={color}>
                                        <div className="change-accent-color-menu__button__color-icon" style={{ background: accentColors[color] }}></div>
                                        <div className="change-accent-color-menu__button__text">{color}</div>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                </div>,
                document.getElementById("overlays")
            )
        )
    }

    function TasksUITitleChanger() {
        const [titleInInputBox, setTitleInInputBox] = useState(title)

        useEffect(() => {
            const handleEnterKey = (e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    setTitle(titleInInputBox)
                }
            }
    
            window.addEventListener("keydown",handleEnterKey)
            return () => {window.removeEventListener("keydown",handleEnterKey)}
        })

        return (
            createPortal(
                <div className="overlay-background">
                    <div className="tasks-ui__options-menu__popup">
                        <div className="tasks-ui__options-menu__header-container">
                            <div className="tasks-ui__options-menu__title">Title</div>
                            <button className='tasks-ui__options-menu__back-button' onClick={e => setTasksUITitleChangerState(!tasksUITitleChangerState)}>
                                <img className="tasks-ui__options-menu__back-icon" src='../back icon.svg'></img>
                            </button>
                        </div>
                        <div className="title-changer-menu-input-button-wrapper">
                            <input className="title-changer-menu-input-box" 
                                type="text" 
                                autoFocus 
                                maxLength="35"
                                value={titleInInputBox}
                                onChange={e => setTitleInInputBox(e.target.value)}>
                            </input>
                            <button className="title-changer-menu-enter-button" onClick={e => setTitle(titleInInputBox)}>Enter</button>
                        </div>
                    </div>
                </div>,
                document.getElementById("overlays")
            )
        )
    }

    return (
        <>
            {tasksUIColorPickerState && <TasksUIColorPicker/>}
            {tasksUITitleChangerState && <TasksUITitleChanger/>}
            <div className="tasks-ui__options-menu" id={`tasks-ui__options-menu-${tasksUIId}`}>
                    <div className="tasks-ui__options-menu__header-container">
                        <div className="tasks-ui__options-menu__title">Options</div>
                        <button className="tasks-ui__options-menu__delete-button" onClick={e => setShowOptionsMenuState(!showOptionsMenuState)}>
                            <img className="tasks-ui__options-menu__delete-icon" src="delete icon.svg"></img>
                        </button>
                    </div>
                    <div 
                        className={`tasks-ui__options-menu__button-${showCheckedTasksHistoryState ? "selected" : "unselected"}`} 
                        onClick={e => showCheckedTasksHistory()}>
                        Completed Tasks
                    </div>
                    <div 
                        className='tasks-ui__options-menu__button-unselected' 
                        onClick={e => setTasksUIColorPickerState(!tasksUIColorPickerState)}>
                        Change Accent Color
                    </div>
                    <div 
                        className='tasks-ui__options-menu__button-unselected' 
                        onClick={e => setTasksUITitleChangerState(!tasksUITitleChangerState)}>
                        Change Title
                    </div>
            </div>
        </>
    )
}

export function TodoCalendar(props) {
    const {todos, setTodos, todo } = props
    const calendarRef = useRef()
    
    const handleTodoDateChange = (todo,value) => {
        const newTodos = todos.map(item => {
            return item.id === todo.id ? {...todo, date:value} : item
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
                onChange={value => handleTodoDateChange(todo,value)}
                slotProps={{actionBar: {actions: []}}}
                />
            </LocalizationProvider>
        </div>
    )
}

export default function TasksUI(props) {
    const { tasksUIId, importedTodos, tasksModules, setTasksModules } = props.children
    const { tasksUITitle, tasksUITodosCountLimit, tasksUIColor } = props.children.custom
    
    const [todos, setTodos] = useState([])
    useEffect(()=>{setTodos(importedTodos)},[])
    useEffect(()=>{
        const updatedTasksModules = tasksModules.map(module => {
            return module.id === tasksUIId ?
                {...module, todos:todos} : module
        })
        
        setTasksModules(updatedTasksModules)
    },[todos])

    const [title, setTitle] = useState("")
    useEffect(()=>{setTitle(tasksUITitle)},[])
    useEffect(()=>{
        const updatedTasksModules = tasksModules.map(module => {
            return module.id === tasksUIId ?
                {...module, title:title} :
                module
        })
        setTasksModules(updatedTasksModules)
    },[title])
    
    const tasksUITitleObj = useRef()
    useEffect(() => {
        tasksUITitleObj.current.style.background = tasksUIColor
    },[tasksUIColor])
        
    const addTodo = () => {
        if (todos.length < tasksUITodosCountLimit) {
            const newTodo = {
                id: uuidv4(),
                isChecked: false,
                name: "",
                date: "",
            }
            setTodos([...todos, newTodo])
        }
    }
    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => {
                return todo.id !== id
        })
        setTodos(newTodos)
    }
    const handleTodoTitleChange = (todo, value) => {
        const newTodos = todos.map(item => {
            return item.id === todo.id ? {...todo, name:value} : item
        })
        setTodos(newTodos)
    }
    const todoExitOnEnter = (e) => {
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

    const [uncheckedTodos, setUncheckedTodos] = useState([])
    useEffect(() => {
        const updatedUncheckedTodos = todos.filter(todo => {
            return todo.isChecked === false
        })
        const dateSortedUpdatedUncheckedTodos = updatedUncheckedTodos.sort((a,b) => {
            return new Date(a.date) - new Date(b.date)
        })

        setUncheckedTodos(dateSortedUpdatedUncheckedTodos)
    },[todos])

    const [checkedTodos, setCheckedTodos] = useState([])
    useEffect(() => {
        const updatedCheckedTodos = todos.filter(todo => {
            return todo.isChecked === true
        })
        const dateSortedUpdatedCheckedTodos = updatedCheckedTodos.sort((a,b) => {
            return new Date(a.date) - new Date(b.date)
        })

        setCheckedTodos(dateSortedUpdatedCheckedTodos)
    },[todos])

    const [showCheckedTasksHistoryState, setShowCheckedTasksHistoryState] = useState(false)
    const checkTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            return todo.id === id ?
                {...todo, isChecked:true} :
                todo
        })
        setTodos(updatedTodos)
    }
    const uncheckTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            return todo.id === id ?
                {...todo, isChecked:false} :
                todo
        })
        setTodos(updatedTodos)
    }

    const tasksUIInitialHeight = 176
    const [tasksUIHeight, setTasksUIHeight] = useState(tasksUIInitialHeight)
    useEffect(() => {
        if (!showCheckedTasksHistoryState && uncheckedTodos.length > 2) {
            setTasksUIHeight(tasksUIInitialHeight + ((uncheckedTodos.length - 2) * 36))
        } else if (showCheckedTasksHistoryState && checkedTodos.length > 2) {
            setTasksUIHeight(tasksUIInitialHeight + ((checkedTodos.length - 2) * 36))
        } else {
            setTasksUIHeight(tasksUIInitialHeight)
        }
    },[uncheckedTodos,checkedTodos,showCheckedTasksHistoryState])
    useEffect(() => {
        const tasksUIObj = document.getElementById(tasksUIId)
        tasksUIObj.style.height = `${tasksUIHeight}px`
    },[tasksUIHeight])

    const [showOptionsMenuState,setShowOptionsMenuState] = useState(false)
    const showOptionsMenu = () => {
        setShowOptionsMenuState(!showOptionsMenuState)
    }

    return (
        <div className='tasks-ui' id={tasksUIId}>
            <div className='tasks-ui__header-container'>
                <div className="tasks-ui__title-add-wrapper">
                    <div className={title ? "tasks-ui__title" : "tasks-ui__no-title"} ref={tasksUITitleObj}>
                        {showCheckedTasksHistoryState ? (title ? `${title} | Completed` : "No title | Completed") : (title ? title : "No title")}
                    </div>
                    {!showCheckedTasksHistoryState && 
                        <button className='tasks-ui__add-button' onClick={e => addTodo()}>
                            <img className='tasks-ui__add-icon' src="add icon.svg"></img>
                        </button>
                    }
                </div>

                <button className="navbar__header-controls--three-dots__container" id={`three-dots-button-${tasksUIId}`} onClick={showOptionsMenu}>
                    <img className="navbar__header-controls--three-dots-svg" src="three dots.svg"/>
                </button>
                {showOptionsMenuState && 
                <TasksUIOptionsMenu 
                    tasksUIId={tasksUIId}
                    tasksModules={tasksModules}
                    setTasksModules={setTasksModules}

                    showOptionsMenuState={showOptionsMenuState} 
                    setShowOptionsMenuState={setShowOptionsMenuState} 

                    showCheckedTasksHistoryState={showCheckedTasksHistoryState}
                    setShowCheckedTasksHistoryState={setShowCheckedTasksHistoryState}

                    title={title}
                    setTitle={setTitle}
                />}
            </div>

            <div className="tasks-ui__names-container">
                <div className="tasks-ui__names-container--title">Title</div>
                <div className="tasks-ui__names-container--date">Date</div>
            </div>

            {!showCheckedTasksHistoryState && !uncheckedTodos.length &&
                <div className="tasks-ui__main-container">
                    <div className="tasks-ui__no-todos-alert">No Todos</div>
                </div>
            }
            {showCheckedTasksHistoryState && !checkedTodos.length &&
                <div className="tasks-ui__main-container">
                    <div className="tasks-ui__no-todos-alert">No Completed Todos</div>
                </div>
            }

            <div className="tasks-ui__todos-container">
                {!showCheckedTasksHistoryState && uncheckedTodos.map(todo => {
                    return (
                        <div className="tasks-ui__todo" key={todo.id}>
                            <button className="tasks-ui__todo__checkbox-container" onClick={e => checkTodo(todo.id)}>
                                <div className="tasks-ui__todo__checkbox"></div>
                            </button>

                            <div className="tasks-ui__todo__title-container">
                                <input className="tasks-ui__todo__title"
                                    value={todo.name} 
                                    onChange={(e) => handleTodoTitleChange(todo, e.target.value)}
                                    onKeyDown={todoExitOnEnter}
                                    type="text" 
                                    autoComplete="off">
                                </input>
                            </div>

                            <div className="tasks-ui__todo__date-container">
                                <div className={todo.date ? "tasks-ui__todo__date" : "tasks-ui__todo__no-date"} id={`date-${todo.id}`} onClick={e => showTodoCalendar(todo.id)}>
                                    {todo.date ? dayjs(todo.date).format('dddd, MMM D, YYYY') : "No date"}
                                </div>
                                {todo.showTodoCalendarState && 
                                    <TodoCalendar 
                                        todo={todo} 
                                        todos={todos} 
                                        setTodos={setTodos} 
                                />}
                            </div>

                            <div className="tasks-ui__todo__delete-button-container">
                                <button className="tasks-ui__todo__delete-button" onClick={e => deleteTodo(todo.id)}>
                                    <img className="tasks-ui__todo__delete-icon" src="delete icon.svg"></img>
                                </button>
                            </div>
                        </div>
                    )
                })}

                {/*checked */}
                {showCheckedTasksHistoryState && checkedTodos.map(todo => {
                    return (
                        <div className="tasks-ui__todo" key={todo.id}>
                            <div className="tasks-ui__todo__uncheckbox-container">
                                <button className="tasks-ui__todo__uncheckbox" onClick={e => uncheckTodo(todo.id)}>
                                    <img className="tasks-ui__todo__uncheckbox-img" src="updates.svg"></img>
                                </button>
                            </div>

                            <div className="tasks-ui__todo__title-container">
                                <div className="tasks-ui__todo__title">
                                    <div className="tasks-ui__completed-todo__title-text">{todo.name}</div>
                                </div>
                            </div>

                            <div className="tasks-ui__todo__date-container">
                                <div className={todo.date ? "tasks-ui__todo__date" : "tasks-ui__todo__no-date"} id={`date-${todo.id}`}>
                                    {todo.date ? dayjs(todo.date).format('dddd, MMM D, YYYY') : "No date"}
                                </div>
                            </div>

                            <div className="tasks-ui__todo__delete-button-container">
                                <button className="tasks-ui__todo__delete-button" onClick={e => deleteTodo(todo.id)}>
                                    <img className="tasks-ui__todo__delete-icon" src="delete icon.svg"></img>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}