import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/utils/authSchema"
import { loginRequest } from "@/api/fetchData"
import { Link, useNavigate } from "react-router-dom"
import { toastError } from "@/utils/toast"

const Login = () => {

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await loginRequest(data)
            if (res) {
                navigate('/profile')
            }
        }
        catch (err) {
            console.error(err)
            toastError({ title: err.response?.data?.message || 'Could not log in' })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80 m-auto mt-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-zinc-50 font-semibold'>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-zinc-50 font-semibold'>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col">
                    <Link to='/forgot-password' className="text-zinc-50 text-sm font-semibold w-fit mb-4">Forgot password?</Link>
                    <Button type="submit" className="bg-gray-500 hover:bg-white hover:text-black w-fit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default Login