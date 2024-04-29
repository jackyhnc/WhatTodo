import { Navigate } from "react-router-dom"
import { UserAuth } from "../contexts/AuthContext"

export default function ProtectedRoutes({children}) {
    const { user } = UserAuth()

    if (!user) {
        console.log("Not authenticated.")
        return <Navigate to="/login"/>
    }

    return (
        children
    )
}