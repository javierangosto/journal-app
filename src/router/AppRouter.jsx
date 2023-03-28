import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth"
import { JournalRoutes } from "../journal"
import { CheckingAuth } from "../UI"

export const AppRouter = () => {

    const { status } = useSelector( state => state.auth );

    if ( status === 'checking') return <CheckingAuth />

    return (

        <Routes>

            {/* Login y Registro */}
            <Route path="auth/*" element={ <AuthRoutes /> } />

            {/* JournalApp */}
            <Route path="/*" element={ <JournalRoutes /> } />

        </Routes>
        
    )
}

