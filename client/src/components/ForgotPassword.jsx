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
import { emailSchema } from "@/utils/authSchema"
import { forgotPassword } from "@/api/fetchData"
import { useNavigate } from "react-router-dom"
import { toastError, toastSuccess } from "@/utils/toast"

const ForgotPassword = () => {

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = async (email) => {
        try {
            const res = await forgotPassword(email)
            if (res.data) {
                toastSuccess({ title: 'Code sent to your email successfully!' });
                navigate('/');
            }
        } catch (err) {
            console.error('Error during submission:', err);
            toastError({ title: err.response?.data?.message || 'Invalid email' });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80 m-auto mt-8">
                <p className="text-zinc-50 text-sm font-semibold">Did you forget your password?</p>
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
                <Button type="submit" className="bg-gray-500 hover:bg-white hover:text-black">Submit</Button>
            </form>
        </Form>
    )
}

export default ForgotPassword