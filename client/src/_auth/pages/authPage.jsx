import Navbar from './components/navbar'

export default function AuthPage({children}) {

    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center h-full -mt-14">
                {children}
            </div>
        </>
    )
}