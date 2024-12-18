import React from "react"
import { useNavigate } from "react-router-dom"
import {Button} from "../../components/ui/Button"
import {CircleDollarSign} from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"


const formSchema = z.object({
  name: z.string().min(4, {
      message: "Name must be at least 4 characters.",
    }).max(4, {
      message: "Name must be at most 4 characters.",
    }).default("cash"),
    balance: z.coerce.number().min(1, {
      message: "Balance should be equals to or more than 1.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    status: z.string().min(6, {
      message: "Status must be at least 6 characters.",
    }).max(8, {
      message: "Status must be at most 8 characters."
    }),
    token: z.string().optional()
})


const CreateAccount = () => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
              name: "cash",
              balance: 0,
              description: "",
              status: "active"
          }
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
            // I will post the values to backend api at `/api/v2/easy-accounts`
            // then If I get a success response I will open drawer automatically
            console.log(values)

            const token = localStorage.getItem("token")

            if (!token) {
              toast({
                variant: "destructive",
                title: "Error",
                description: "You are not logged in",
              })
              return
            }

            // push the token to values
            values.token = token

            try {
              axios.post("/api/v2/easy-accounts", values)
              .then((response) => {
                console.log(response.data);
                toast({
                  variant: "default",
                  title: "Success",
                  description: "Account created successfully",
                })
                form.reset()
                form.setValue("name", "cash")
                form.setValue("balance", 0)
                form.setValue("description", "")
                form.setValue("status", "active")
               
              })
              .catch((error) => {
                console.log(error);
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: `Error while creating account: ${error.response?.data.message}`, 
                })
              });
            } catch (error) {
              console.log(error)
              toast({
                variant: "destructive",
                title: "Error",
                description: "Error while creating account",
              })
            }

      }

  return (
    <> <div className="container mx-auto flex items-center justify-center h-screen">
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cash">CASH</SelectItem>
                      <SelectItem value="bank">BANK</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
    
    <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Balance</FormLabel>
                  <FormControl>
                    <Input placeholder="129345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
    <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
    
    <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">ACTIVE</SelectItem>
                    <SelectItem value="inactive">INACTIVE</SelectItem>
                  </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
    
  
            <Button className="w-full" type="submit"><CircleDollarSign />Submit</Button>
          </form>
        </Form>



            </div>

              
    
              <Toaster /></>
  )
}

export default CreateAccount