import { useState, useRef, useEffect } from 'react'
import { UserAuth } from '../../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z]).{8,16}$/

export default function Signup() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const emailRef = useRef()

    const { createUser } = UserAuth()

    useEffect(() => {
        emailRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg("")
    },[email, password])

    const handleCreateUser = async (e) => {
        try {
            e.preventDefault()
            const validEmail = USER_REGEX.test(email)
            const validPwd = PWD_REGEX.test(password)

            if (!validEmail) {
                setErrMsg("Invalid Email Format")
                return
            } else if (!validPwd) {
                setErrMsg("Password Invalid Format. Passwords be 8-16 characters and must have letters and numbers.")
                return
            }

            await createUser(email, password)
            navigate("/loggedin/home")
        } catch(err) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setErrMsg("Email in use.")
            } else if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setErrMsg("Email in use.")
            } else {
                setErrMsg(err.message)
            }
            console.error(err)
        }
    }

    return (
        
        <div className="box-content flex flex-col gap-8 px-[40px] my-28 items-center">
            <div className="self-center font-bold text-4xl">Make an Account!</div>
            
            <form className="flex flex-col gap-6 px-[40px] w-[400px]" onSubmit={e => handleCreateUser(e)}>
                <input className="w-full h-12 rounded-lg pl-4 border-2 border-slate-500 outline-amber-200"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    ref={emailRef}
                ></input>
                <input className="w-full h-12 rounded-lg pl-4 border-2 border-slate-500 outline-amber-200"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                ></input>
                <button className="transition duration-200 ease-in-out w-full 
                    h-12 bg-amber-100 rounded-lg hover:bg-amber-200 font-[600]
                ">Sign Up</button>
            </form>

            {errMsg && <div className="text-center text-red-400 w-[400px]">{errMsg}</div>}

            <div className="text-sm flex row gap-2 justify-center">
                <div className="text-[length:inherit]">Already have an account?</div>
                <Link to={"/login"} className="transition duration-200 text-[length:inherit] text-yellow-400 
                font-semibold hover:cursor-pointer hover:text-yellow-300">Log in Here</Link>
            </div>
        </div>
    )
}
