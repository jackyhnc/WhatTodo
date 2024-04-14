import { useState, useRef, useEffect } from 'react'
import { UserAuth } from '../../../contexts/AuthContext'
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const emailRef = useRef()

    const { login } = UserAuth()

    useEffect(() => {
        emailRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg("")
    },[email, password])

    const handleLogin = async (e) => {
        try {
            e.preventDefault()

            await login(email, password);
            navigate("/loggedin/home")
        } catch(err) {
            setErrMsg(err.message)
            console.error(err)
        }
    }

    return (
        <div className="box-content flex flex-col gap-8 px-[40px] my-28">
            <div className="self-center font-bold text-4xl">Log In</div>
            
            <form className="flex flex-col gap-6 px-[40px] w-[400px]" onSubmit={e => handleLogin(e)}>
                <input className="w-full h-12 rounded-lg pl-4 border-2 border-slate-400 outline-amber-200 transition"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    ref={emailRef}
                ></input>
                <input className="w-full h-12 rounded-lg pl-4 border-2 border-slate-400 outline-amber-200"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                ></input>
                <button className="transition duration-200 ease-in-out w-full 
                    h-12 bg-amber-100 rounded-lg hover:bg-amber-200 font-[600]
                ">Login</button>
            </form>

            {errMsg && <div className="text-center text-red-400 w-[400px]">{errMsg}</div>}

            <div className="text-sm flex row gap-2 justify-center">
                <div className="text-[length:inherit]">Don't have an account?</div>
                <Link  to={"/signup"} className="transition duration-200 text-[length:inherit] text-yellow-400 
                font-semibold hover:cursor-pointer hover:text-yellow-300">Sign up Here</Link>
            </div>
        </div>
    )
}
