import { useLoading } from "@/context/LoadingContext"
import { useUsers } from "@/store/store"
import Loading from "@/utils/Loading"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRouteIsAuth = ({ children }) => {
    const { fetchUser, user, isAuthenticated } = useUsers()
    const { loading, stopLoading } = useLoading()

    useEffect(() => {
        const loadUser = async () => {
            await fetchUser()
            stopLoading()
        }
        loadUser()
    }, [fetchUser])

    if (loading) return <Loading />

    if (user.isVerified && isAuthenticated) {
        return <Navigate to='/' replace />
    }

    return children
}

export const ProtectedRouteIsNotAuth = ({ children }) => {
    const { fetchUser, user, isAuthenticated } = useUsers()
    const { loading, stopLoading } = useLoading()

    useEffect(() => {
        const loadUser = async () => {
            await fetchUser()
            stopLoading()
        }
        loadUser()
    }, [fetchUser])

    if (loading) return <Loading />

    if (!user.isVerified && !isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    return children
}

export default ProtectedRouteIsAuth