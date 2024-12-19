import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { CircleDollarSign } from "lucide-react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
} from "@/components/ui/Drawer"

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Name must be at least 4 characters.",
    })
    .max(4, {
      message: "Name must be at most 4 characters.",
    })
    .default("cash"),
  balance: z.coerce.number().min(1, {
    message: "Balance should be equals to or more than 1.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z
    .string()
    .min(6, {
      message: "Status must be at least 6 characters.",
    })
    .max(8, {
      message: "Status must be at most 8 characters.",
    }),
  token: z.string().optional(),
})

const CreateAccount = () => {
  const { toast } = useToast()


  // State for Drawer visibility and form values
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [submittedValues, setSubmittedValues] = useState<z.infer<typeof formSchema> | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "cash",
      balance: 0,
      description: "",
      status: "active",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem("token")

    if (!token) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You are not logged in",
      })
      return
    }

    // Add token to values
    values.token = token

    try {
      axios
        .post("/api/v2/easy-accounts", values)
        .then((response) => {
          console.log(response.data)
          toast({
            variant: "success",
            title: "Success",
            description: "Account created successfully",
          })

          // Store submitted values and open the drawer
          setSubmittedValues(values)
          setIsDrawerOpen(true)

          // Reset the form
          form.reset()
          form.setValue("name", "cash")
          form.setValue("balance", 0)
          form.setValue("description", "")
          form.setValue("status", "active")
        })
        .catch((error) => {
          console.log(error)
          toast({
            variant: "destructive",
            title: "Error",
            description: `Error while creating account: ${error.response?.data.message}`,
          })
        })
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
    <>
      <div className="container mx-auto flex items-center justify-center h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a name" />
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
                  <Select onValueChange={field.onChange}>
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

            <Button className="w-full" type="submit">
              <CircleDollarSign />
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* Drawer to display form values */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Account Created</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          {/* align to center */}
          <DrawerDescription className="space-y-2 text-center">
            {submittedValues && (
              <div className="space-y-2 text-center">
                <p className="font-bold text-lg"><strong>Name:</strong> {submittedValues.name}</p>
                <p className="font-bold text-lg"><strong>Balance:</strong> {submittedValues.balance}</p>
                <p className="font-bold text-lg"><strong>Description:</strong> {submittedValues.description}</p>
                <p className="font-bold text-lg"><strong>Status:</strong> <span className={submittedValues.status === "active" ? "text-green-500" : "text-red-500"}>{submittedValues.status}</span></p>
              </div>
            )}
          </DrawerDescription>
          <DrawerFooter>
            <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Toaster />
    </>
  )
}

export default CreateAccount
