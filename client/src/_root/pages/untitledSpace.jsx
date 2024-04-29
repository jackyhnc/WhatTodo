import { useState, useEffect, memo } from 'react'

import TasksUI from './components/tasksUI'
import Popup from './components/popup'

import { v4 as uuidv4 } from 'uuid'
import { UserAuth } from '../../contexts/AuthContext'

export default memo(function UntitledSpace(props) {
    const { space } = props
    const spaceContent = space.space_content


    const { user, logout } = UserAuth()
    console.log(user)

    const [blocks, setBlocks] = useState([])

    const getData = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/blocks/${user.email}`, {
                method: 'GET',
            })
            const json = await response.json()
            setBlocks(json)
            console.log("gotten")
        } catch(err) {
            console.error(err)
        }
    }
    useEffect(()=>{getData()},[])
    
    const postData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/blocks/`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(blocks)
            })
            console.log('posted')
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(()=>{
        postData()
    },[blocks])
    
    const addBlock = (blockType) => {
        const blockTypeToContentPairs = {
            taskModule:{
                id: uuidv4(),
    
                title:"",
                todos_count_limit:10,
                color:"rgb(227, 227, 227)",
    
                todos: []
            },
        }

        const newBlock = {
            block_id:uuidv4(),
            spaces_id:"", //get form page
            block_type:blockType,
            content:blockTypeToContentPairs[blockType]
        }
        setBlocks([...blocks, newBlock])
    }

    const [showAddBlocksMenuState, setShowAddBlocksMenuState] = useState(false)
    function AddBlocksMenu() {
        const buttons = [
            {
                title:"Add Tasks Module",
                description:"Neatly track tasks using modules",
                function:() => {addBlock("taskModule")},
                image:"add tasksmodules icon.png"
            }
        ]

        return (
            <Popup title={"Add Blocks"} setStateOfPopup={setShowAddBlocksMenuState}>
                {buttons.map(button => {
                    return (
                        <div className="my-2 grid grid-cols-[auto,1fr] box-border rounded-2xl
                        hover:bg-[rgba(0,119,255,0.055)] items-center cursor-pointer group/button" 
                        onClick={e => {button.function(); setShowAddBlocksMenuState(false)}}
                        key={button.title}>
                            <img className="w-16 m-2 rounded-xl border-[1px] 
                            hover:bg-[rgba(0,119,255,0.055)] group-hover/button:brightness-[0.97]"
                            src={button.image}></img>
                            <div className="p-2 max-w-[200px] cursor-pointer flex flex-col gap-0.5">
                                <div className="cursor-pointer">{button.title}</div>
                                <div className="cursor-pointer text-xs text-gray-600">{button.description}</div>
                            </div>
                        </div>
                    )
                })}
            </Popup>
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
    },[])

    const blockTypeToBlockComponentPairs = {
        taskModule: TasksUI
    }
    //b64aa1258b6197b2fd037b6dab551aad.png

    let randomQuoteFromSpace = {}
    useEffect(function chooseRandomQuote() {
        const randomQuoteIndex = Math.floor(Math.random() * spaceContent.quotes.length)
        const randomQuote = spaceContent.quotes[randomQuoteIndex]

        randomQuoteFromSpace = randomQuote
    },[])

    return (
        <div className="overscroll-none w-full bg-white">
            {spaceContent.banner_img ?
                <img className="w-full object-cover object-center h-[250px]" src={spaceContent.banner_img}/>
                : null
            }

            <div className="px-[70px] pt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-3 size-fit text-center">
                    <div className="text-3xl font-bold size-fit">{space.title?? "Untitled"}</div>
                    {/* quote adder, make it a popup, can make page a folder and add this comp to folder */}
                    {spaceContent.quotes.length ? 
                        <div className="flex flex-col">
                            <div className="">{`${randomQuoteFromSpace.quote}`}</div>
                            <div className="self-end">{`${randomQuoteFromSpace.author}`}</div>
                        </div>
                        : null
                    }
                </div>

                <main className="flex flex-col h-full group/blocks-container gap-10 pb-[40vh]">
                    {/* Blocks container */}
                    {blocks.length ? 
                        <div className="flex flex-wrap gap-10 w-full">
                            {blocks.map(block => {
                                const BlockComponent = blockTypeToBlockComponentPairs[block.block_type]
                                return (
                                    <div key={block.content.id}>
                                        <BlockComponent
                                            blockId={block.block_id}
                                            content={block.content}

                                            blocks={blocks}
                                            setBlocks={setBlocks}
                                        />
                                    </div>
                                )
                            })}
                        </div> 
                        : null
                    }

                    {/* Add blocks button */}
                    {showAddBlocksMenuState && <AddBlocksMenu/>}
                    <div className="group-hover/blocks-container:opacity-100 group/add-block py-2 px-4 w-fit 
                        rounded-3xl transition duration-200 bg-[rgb(247,247,247)] flex flex-row gap-2
                        items-center text-[rgba(147,147,147,255)] opacity-40 cursor-pointer hover:bg-[rgb(241,241,241)]"
                        onClick={() => setShowAddBlocksMenuState(!showAddBlocksMenuState)}>
                        <div className="cursor-pointer">Add block</div>
                        <i className="fa-regular fa-plus"></i>
                    </div>
                </main>

            </div>
        </div>
    )
})