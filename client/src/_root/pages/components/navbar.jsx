
export default function Navbar(props) {
    const { absoluteShowSidebar, setAbsoluteShowSidebar, currentState } = props

    const absoluteShowSidebarStyles = {
        transform:"rotate(180deg)"
    }

    return (
        <div className="w-full h-12 bg-white fixed z-[200] px-4 flex flex-row items-center border-b-2
        border-b-[rgb(241,241,241)] justify-between">
            <div className="flex gap-4 items-center">
                <div onClick={() => setAbsoluteShowSidebar(!absoluteShowSidebar)}
                className="transition p-2 rounded-full cursor-pointer hover:bg-[rgb(241,241,241)]">
                    <img className="size-5 transition" style={absoluteShowSidebar ? absoluteShowSidebarStyles : null} 
                    src="hamburger.svg"></img>
                </div>
                <div className="font-medium">{currentState.title}</div>
            </div>

            <div className="flex flex-row gap-4">
                <div className="py-1 px-3 bg-[rgb(247,247,247)] cursor-pointer text-[rgba(147,147,147,255)] 
                rounded-3xl hover:bg-[rgb(241,241,241)] ">Share</div>
                <img className="size-8 rounded-full cursor-pointer hover:brightness-90 transition" src="profile.jpg"></img>
            </div>
        </div>
    )
}