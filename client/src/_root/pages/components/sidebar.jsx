export default function Sidebar() {

    const sidebarButtons = [
        {
            title:"Menu",
            buttons:[
                {
                    title:"Search",
                    image:"search.svg",
                    function:() => {return null}
                },
                {
                    title:"New Page",
                    image:"new page.svg",
                    function:() => {return null}
                },
                {
                    title:"Edit Page",
                    image:"edit page.svg",
                    function:() => {return null}
                },
            ]
        },
        {
            title:"Spaces",
            buttons:[
                {
                    title:"Search",
                    image:"search.svg",
                    function:() => {return null}
                },
                {
                    title:"New Page",
                    image:"new page.svg",
                    function:() => {return null}
                },
                {
                    title:"Edit Page",
                    image:"edit page.svg",
                    function:() => {return null}
                }
            ]
        }
    ]


    return (
        <div id="sidebar" className="fixed left-[-300px] top-[20%] z-[110] rounded-2xl rounded-l-none px-4 py-8 bg-[rgb(245,243,242)] shadow-[-1px_1px_10px_-1px_rgb(0,54,135,0.3)]
        hover:shadow-[2px_3px_17px_-1px_rgb(0,54,135,0.3)] transition duration-300 flex flex-col gap-6 text-[rgb(147,147,147)]">

            <div className="flex items-center gap-4">
                <img className="rounded-full size-12" src="profile.jpg"></img>
                <div className="text-lg font-medium text-gray-500 w-[120px] overflow-ellipsis overflow-hidden leading-none">joe  asdfasdfasaasdfasdfasdfsadfsd</div>
            </div>

            {sidebarButtons.map(section => {
                return (
                    <div className="" key={section.title}>
                        <div className="text-sm">{section.title}</div>
                        {section.buttons.map(button => {
                            return (
                                <div className="w-[200px]" onClick={() => button.function()} key={button.title}>
                                    <div className="grid grid-cols-[auto,1fr] box-border rounded-2xl
                                        hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button">
                                            <img className="w-5 m-2"
                                            src={button.image}></img>
                                            <div className="p-2 cursor-pointer">
                                                <div className="cursor-pointer">{button.title}</div>
                                            </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}

        </div>
    )
}
