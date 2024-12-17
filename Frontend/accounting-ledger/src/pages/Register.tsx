import React from "react"
import { useNavigate } from "react-router-dom"
import {Button} from "../components/ui/Button"
import {Signature} from "lucide-react"
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
import { EncryptStorage } from "encrypt-storage"


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
      }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
      }),
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters.",
      }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
      }),
    phone: z.string().min(2, {
        message: "Phone number must be at least 2 characters.",
      }).max(15, {
        message: "Phone number must be at most 15 characters.",
      })
  })

const Register = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const secretKey = import.meta.env.VITE_SECRET_KEY
  const encryptStorage = new EncryptStorage(secretKey, {
    localStorage: 'localStorage'
  })
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            phone: "",
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)

      try {
        // const postUser = axios.post("api/v2/create-user", user)

        axios.post("api/v2/create-user", values)
        .then((response) => {
          console.log(response.data);
          toast({
            variant: "default",
            title: "Success",
            description: "User created successfully",
          })
          encryptStorage.setItem("token", response.data.token)
          console.log("Token From Server: " + response.data.token)
          console.log("Token: " + encryptStorage.getItem("token"))
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
          description: error.response.data.message,
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

<FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"><Signature />Submit</Button>
      </form>
    </Form>

        </div>

          <Toaster />
        </>
    )
}

export default Register