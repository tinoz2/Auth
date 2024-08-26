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
import { codeSchema } from "@/utils/authSchema"
import { verifyEmail } from "@/api/fetchData"
import { useNavigate } from "react-router-dom"
import { toastError, toastSuccess } from "@/utils/toast"

const VerifyEmail = () => {

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await verifyEmail({ code: data.code });
            if (res.data) {
                toastSuccess({ title: 'Code valid!' });
                navigate('/');
            }
        } catch (err) {
            console.error('Error during submission:', err);
            toastError({ title: err.response?.data?.message || 'Invalid or expired token' });
        }
    };    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80 m-auto mt-8">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-zinc-50 font-semibold'>Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Code..." {...field} />
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

export default VerifyEmail