import { Button } from "@/components/ui/button"
import { toastError, toastSuccess } from "./toast"
import { logoutRequest } from "@/api/fetchData"
import { useNavigate } from "react-router-dom"

const Logout = () => {

    const navigate = useNavigate()

    const logoutUser = async () => {
        try {
            const res = await logoutRequest()
            if (res.data) {
                toastSuccess({ title: 'Account unlogged successfully' })
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
            toastError({ title: error.response?.data?.message || 'Error in trying to logout' })
        }
    }    

    return (
        <Button
            type="submit"
            className="bg-gray-500 hover:bg-white hover:text-black w-fit"
            onClick={logoutUser}>
            Logout
        </Button>
    )
}

export default Logout