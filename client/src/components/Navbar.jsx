import { Link } from "react-router-dom"
import {
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
    return (
        <header>
            <nav className="flex space-x-4 mt-2 items-center justify-center">
                <li><Link to='/register' className={navigationMenuTriggerStyle()}>Register</Link></li>
                <li><Link to='/login' className={navigationMenuTriggerStyle()}>Login</Link></li>
                <li><Link to='/profile' className={navigationMenuTriggerStyle()}>Profile</Link></li>
            </nav>
        </header>
    )
}

export default Navbar