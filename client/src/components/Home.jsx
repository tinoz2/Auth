import { useLoading } from "@/context/LoadingContext"
import { useUsers } from "@/store/store"
import Loading from "@/utils/Loading"
import { useEffect } from "react"
import Navbar from "./Navbar"

const Home = () => {

    const { loading, stopLoading } = useLoading()
    const { fetchUsers, fetchUser, users, user } = useUsers()

    useEffect(() => {
        const loadUsers = async () => {
            await fetchUsers()
            await fetchUser()
            stopLoading()
        }
        loadUsers()
    }, [fetchUsers, fetchUser])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className="flex items-center">
                    <p className='text-zinc-50 mt-1 flex items-center'>
                        User: {user.username ? user.username : 'Not logged'}
                        {user.isVerified && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1D9BF0" className="size-6 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                        )}
                    </p>
                </div>
            </div>
            <div>
                <h2 className='text-zinc-50 mt-4'>Todos los usuarios registrados:</h2>
                {
                    users.length === 0 ? <p className="text-zinc-50">No hay usuarios registrados</p> :
                        users.map((user, i) => (
                            <div key={i}>
                                <p className="text-zinc-50 flex items-center">{user.username} {user.isVerified ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1D9BF0" className="size-6 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                </svg> : null}</p>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Home