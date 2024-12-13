import { useState } from "react"
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
      }),
  })

const Register = () => {
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

      
       } catch (error) {
        console.log(error)
        throw new Error("Error while creating user")
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
          name="Phone Number"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>

        </div>


        </>
    )
}

export default Register