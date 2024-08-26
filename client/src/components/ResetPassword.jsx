import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { passwordSchema } from "@/utils/authSchema"
import { resetPassword } from "@/api/fetchData"
import { useNavigate, useParams } from "react-router-dom"
import { toastError, toastSuccess } from "@/utils/toast"
import { useState } from "react"

const ResetPassword = () => {

    const navigate = useNavigate()
    const { token } = useParams()

    const [confirmPassword, setConfirmPassword] = useState('')

    const form = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = async (data) => {
        if (data.password !== confirmPassword) {
            toastError({ title: 'Passwords do not match!' });
            return;
        }

        try {
            const res = await resetPassword(token, { password: data.password });
            if (res.data) {
                toastSuccess({ title: 'Password changed successfully!' });
                navigate('/login');
            }
        } catch (err) {
            console.error('Error during submission:', err);
            toastError({ title: err.response?.data?.message || 'Invalid password' });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80 m-auto mt-8">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-zinc-50 font-semibold'>New Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password..." type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel className='text-zinc-50 font-semibold'>Confirm Password</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Confirm Password..."
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                </FormItem>
                <Button type="submit" className="bg-gray-500 hover:bg-white hover:text-black">Submit</Button>
            </form>
        </Form>
    )
}

export default ResetPassword
