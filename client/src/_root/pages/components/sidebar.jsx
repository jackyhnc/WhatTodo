import { useState } from 'react'

export default function Sidebar() {
    const [sidebarState, setSidebarState] = useState("full")


    function FullSidebar() {
        return (
            <nav>
                <div className="navbar__header-controls">
                    <div className="navbar__header-controls__sizing-buttons">
                        <button className="navbar__header-controls--red"></button>
                        <button className="navbar__header-controls--yellow" onClick={() => setSidebarState("minimized")}></button>
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
        )
    }
    const button = [
        {
            title:"asdf"

        }
    ]

    function MinimizedSidebar() {
        return (
            <nav>
                <div className="navbar__header-controls">
                    <div className="navbar__header-controls__sizing-buttons">
                        <button className="navbar__header-controls--red"></button>
                        <button className="navbar__header-controls--yellow" onClick={() => setSidebarState("minimized")}></button>
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
                    <div className="grid grid-cols-[auto,1fr] box-border rounded-2xl
                            hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button" 
                            onClick={e => {button.function(); setStateOfPopup(false)}}
                            key={button.title}>
                                <img className="w-16 m-2 rounded-xl border-[1px] 
                                hover:bg-[rgba(0,119,255,0.055)] group-hover/button:brightness-[0.97]"
                                src={button.image}></img>
                                <div className="p-2 max-w-[200px] cursor-pointer">
                                    <div className="cursor-pointer">{button.title}</div>
                                    <div className="cursor-pointer text-xs text-gray-600">{button.description}</div>
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
                                <div className="navbar__section__buttons-section__button-text ">Updates</div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    
    return sidebarState === "full" ? <FullSidebar/> :
        sidebarState === "minimized" ? <MinimizedSidebar/> :
        null
}
