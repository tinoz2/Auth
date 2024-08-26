import { useLoading } from "@/context/LoadingContext"
import { useUsers } from "@/store/store"
import LayoutDataProfile, { LayoutDataProfileError } from "@/utils/LayoutDataProfile"
import Loading from "@/utils/Loading"
import { useEffect } from "react"

const Profile = () => {

    const { loading, stopLoading } = useLoading()
    const { fetchUser, user } = useUsers()

    useEffect(() => {
        const loadUser = async () => {
            await fetchUser()
            stopLoading()
        }
        loadUser()
    }, [fetchUser])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            {
                user.username && user.email ?
                    <LayoutDataProfile name={user.username} email={user.email} /> :
                    <LayoutDataProfileError />
            }
        </div>
    )
}

export default Profile