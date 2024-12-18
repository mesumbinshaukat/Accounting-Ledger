import React from "react"
import { useNavigate } from "react-router-dom"
import {Button} from "../components/ui/Button"
import {LogIn} from "lucide-react"
import axios from "axios"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Toaster } from "@/components/ui/Toaster"
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
      }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
      }),
   
  })

const Login = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)

      try {
        axios.post("/api/v2/login-user", values)
        .then((response) => {
          console.log(response.data);
          toast({
            variant: "default",
            title: "Success",
            description: "User created successfully",
          })
          localStorage.setItem("token", response.data.token)
          console.log("Token From Server: " + response.data.token)
          console.log("Token: " + localStorage.getItem("token"))
          navigate("/home")
        })
        .catch((error) => {
          console.log(error);
        });

      
       } catch (error) {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data.message,
        })
       }

    }

     

    return (
        <>
        <div className="container mx-auto flex items-center justify-center h-screen">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                Use an email which is never been registered on this site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit"><LogIn />Login</Button>
      </form>
    </Form>

        </div>

          <Toaster />
        </>
    )
}

export default Login