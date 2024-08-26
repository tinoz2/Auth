import Logout from "./Logout"

const LayoutDataProfile = ({ name, email }) => {
    return (
        <div className="flex flex-col space-y-1">
            <p className="text-zinc-50">Name: {name}</p>
            <small className="text-zinc-50">Email: {email}</small>
            <Logout />
        </div>
    )
}

export const LayoutDataProfileError = () => {
    return (
        <div>
            <p className="text-zinc-50">Name: Not found</p>
            <small className="text-zinc-50">Email: Not found</small>
        </div>
    )
}

export default LayoutDataProfile