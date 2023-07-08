import { useState } from 'react'
import './general.css'
import './headertitle.css'
import './main.css'
import './navbar.css'
import './tasks-ui.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

export default function Web() {
  const [mainTaskTodos, setMainTaskTodos] = useState([])
  const [mainTaskTodoValue, setMainTaskTodoValue] = useState("")

  const addMainTaskTodo = () => {
    if (mainTaskTodos.length < 2) {
        const mainTodo = {
            id: Date.now(),
            name:""
        }
        setMainTaskTodos([...mainTaskTodos,mainTodo])
    }
  }

  const deleteMainTaskTodo = (id) => {
    const newMainTaskTodos = []
    mainTaskTodos.map(todo => {
        if (todo.id !== id) {
            newMainTaskTodos.push(todo)
        }
    })
    setMainTaskTodos(newMainTaskTodos)
  }

  /*updates the value of the todo that matches the id of the input experiencing onChange while creating a copy of existing todos then sets it*/
  /*returning ...todo preserves each todo's other values (like id)*/
  const handleMainTaskTodoChange = (id, value) => {
    const newMainTaskTodos = mainTaskTodos.map(todo => {
        return todo.id === id ? {...todo, name:value} : todo
    })
    setMainTaskTodos(newMainTaskTodos)
  }

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}><DateCalendar /></LocalizationProvider>
      <header>
          <img className="header__hamburger-icon" src="/images/hamburger.svg" alt="Hamburger" />
          <div className="header__title">Summer 2023</div>
          <button class="header__share-button">Share</button>
          <img class="header__profile-picture" src="/images/profile.jpg"/>
      </header>
      <div class="title-container">
          <div class="wallpaper-image__gradient"></div>
          <img class="wallpaper-image" src="/images/b64aa1258b6197b2fd037b6dab551aad.png"/>
          <h1>Summer 2023</h1>
      </div>
      <div class="quote-container">
          <p class="quote-container__quote">“Opportunities don't happen, you create them.”</p>
          <p class="quote-container__cite"> — Chris Grosser</p>
      </div>

      <main>
          <nav>
              <button class="navbar__header-controls--three-dots__container">
                  <img class="navbar__header-controls--three-dots-svg" src="/images/three dots.svg"/>
              </button>
              <div class="navbar__header-controls">
                  <div class="navbar__header-controls__sizing-buttons">
                      <button class="navbar__header-controls--red"></button>
                      <button class="navbar__header-controls--yellow"></button>
                      <button class="navbar__header-controls--green"></button>
                  </div>
              </div>
              <div class="navbar__container">
                  <div class="navbar__profile-greeting-section">
                      <div class="navbar__profile-greeting-container">
                          <img class="navbar__profile-image" src="/images/profile.jpg"/>
                          <div class="navbar__greeting">Hey, Joe!</div>
                      </div> 
                  </div>
                  <div class="navbar__section">
                      <div class="navbar__section-title">Menu</div>
                      <div class="navbar__section__buttons-section">
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/profile icon.svg"/>
                              <div class="navbar__section__buttons-section__button-text">Profile</div>
                          </button>
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/inbox.svg"/>
                              <div class="navbar__section__buttons-section__button-text">Inbox</div>
                          </button>
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/search.svg"/>
                              <div class="navbar__section__buttons-section__button-text">Search</div>
                          </button>
                      </div>
                  </div>
                  <div class="navbar__section">
                      <div class="navbar__section-title">Configuration</div>
                      <div class="navbar__section__buttons-section">
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/new page.svg"/>
                              <div class="navbar__section__buttons-section__button-text">New Page</div>
                          </button>
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/edit page.svg"/>
                              <div class="navbar__section__buttons-section__button-text">Edit Page</div>
                          </button>
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/settings.svg"/>
                              <div class="navbar__section__buttons-section__button-text">Settings</div>
                          </button>
                          <button class="navbar__section__buttons-section__button">
                              <img class="navbar__section__buttons-section__button-icon" src="/images/updates.svg"/>
                              <div class="navbar__section__buttons-section__button-text">Updates</div>
                          </button>
                      </div>
                  </div>
              </div>

          </nav>
          <div class="tasks-column__first">
              <div class="main-tasks-ui">
                  <button class="navbar__header-controls--three-dots__container">
                      <img class="navbar__header-controls--three-dots-svg" src="/images/three dots.svg"/>
                  </button>
                  <div class="main-tasks-ui__title">
                      Today's Main Tasks
                  </div>
                  <button className="main-tasks-ui__add-button" onClick={addMainTaskTodo}>
                    <img class="main-tasks-ui__add-icon" src="/images/add icon.svg"></img>
                  </button>
                  <div class="tasks-ui__names-container">
                      <div class="tasks-ui__names-container--title">Title</div>
                      <div class="tasks-ui__names-container--date">Date</div>
                  </div>
                  <div class="tasks-ui__todos-container">
                    {mainTaskTodos.map(mainTask => {
                        return (
                            <div class="tasks-ui__todo" key={mainTask.id}>
                                <div class="tasks-ui__todo__checkbox-container">
                                    <div class="tasks-ui__todo__checkbox"></div>
                                </div>

                                <input class="tasks-ui__todo__title" 
                                value={mainTask.name} 
                                onChange={(e) => handleMainTaskTodoChange(mainTask.id, e.target.value)} 
                                type="text" 
                                id="tasks-ui__todo__title-id">
                                </input>

                                <div class="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                                
                                <button className="tasks-ui__todo__delete-button" onClick={e => deleteMainTaskTodo(mainTask.id)}>
                                    <img class="tasks-ui__todo__delete-icon" src="/images/delete icon.svg"></img>
                                </button>
                            </div>
                            )
                        })}
                  </div>
              </div>
              <div class="todos-tasks-ui">
                  <button class="navbar__header-controls--three-dots__container">
                      <img class="navbar__header-controls--three-dots-svg" src="/images/three dots.svg"/>
                  </button>
                  <div class="todos-tasks-ui__title">
                      To Do's
                  </div>
                  <img class="todos-tasks-ui__add-icon" src="/images/add icon.svg"></img>
                  <div class="tasks-ui__names-container">
                      <div class="tasks-ui__names-container--title">Title</div>
                      <div class="tasks-ui__names-container--date">Date</div>
                  </div>
                  <div class="tasks-ui__todos-container">
                      <div class="tasks-ui__todo">
                          <div class="tasks-ui__todo__checkbox-container">
                              <div class="tasks-ui__todo__checkbox"></div>
                          </div>
                          <div class="tasks-ui__todo__title">Complete reading the book</div>
                          <div class="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                          <img class="tasks-ui__todo__delete-icon" src="/images/delete icon.svg"></img>
                      </div>
                      <div class="tasks-ui__todo">
                          <div class="tasks-ui__todo__checkbox-container">
                              <div class="tasks-ui__todo__checkbox"></div>
                          </div>
                          <div class="tasks-ui__todo__title">Complete reading the book</div>
                          <div class="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                          <img class="tasks-ui__todo__delete-icon" src="/images/delete icon.svg"></img>
                      </div>
                  </div>
              </div>
          </div>
          <div class="tasks-column__second">
              <div class="longterm-tasks-ui">
                  <button class="navbar__header-controls--three-dots__container">
                      <img class="navbar__header-controls--three-dots-svg" src="/images/three dots.svg"/>
                  </button>
                  <div class="longterm-tasks-ui__title">
                      Long Term Tasks
                  </div>
                  <img class="longterm-tasks-ui__add-icon" src="/images/add icon.svg"></img>
                  <div class="tasks-ui__names-container">
                      <div class="tasks-ui__names-container--title">Title</div>
                      <div class="tasks-ui__names-container--date">Date</div>
                  </div>
                  <div class="tasks-ui__todos-container">
                      <div class="tasks-ui__todo">
                          <div class="tasks-ui__todo__checkbox-container">
                              <div class="tasks-ui__todo__checkbox"></div>
                          </div>
                          <div class="tasks-ui__todo__title">Complete reading the book</div>
                          <div class="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                          <img class="tasks-ui__todo__delete-icon" src="/images/delete icon.svg"></img>
                      </div>
                      <div class="tasks-ui__todo">
                          <div class="tasks-ui__todo__checkbox-container">
                              <div class="tasks-ui__todo__checkbox"></div>
                          </div>
                          <div class="tasks-ui__todo__title">Complete reading the book</div>
                          <div class="tasks-ui__todo__date">Friday, Sep 3, 2023</div>
                          <img class="tasks-ui__todo__delete-icon" src="/images/delete icon.svg"></img>
                      </div>
                  </div>
              </div>
              <div class="gallery-container"></div>
          </div>
      </main>
    </>
  )
}