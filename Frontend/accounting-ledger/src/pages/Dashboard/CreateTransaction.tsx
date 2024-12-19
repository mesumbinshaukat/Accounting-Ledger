import React, { useState, useEffect } from "react"
import { Button } from "../../components/ui/Button"
import { CircleDollarSign } from "lucide-react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
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
import { Skeleton } from "@/components/ui/Skeleton"

const formSchema = z.object({
  accountId: z.string().min(1, {
    message: "Please select an account.",
  }),
  userId: z.string().optional(),
  amount: z.coerce.number().min(1, {
    message: "Amount must be at least 1.",
  }),
  transactionType: z.enum(["credit", "debit"], {
    errorMap: () => ({ message: "Please select a transaction type." }),
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

const CreateTransaction = () => {
  const { toast } = useToast()
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountId: "",
      userId: "",
      amount: 0,
      transactionType: "credit",
      description: "",
    },
  })

  // const fetchAccounts = async () => {
  //   const token = localStorage.getItem("token")

  //   if (!token) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "You are not logged in.",
  //     })
  //     return
  //   }

  //   setIsLoading(true)
  //   try {
  //     const userId = token // Assuming the token is userId; adapt if different
  //     const response = await axios.get(`/api/v2/easy-accounts/${userId}`)
  //     console.log(response.data)
  //     setAccounts(response.data.accounts || [])
  //   } catch (error) {
  //     console.error("Error fetching accounts:", error)
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Unable to fetch accounts. Please try again.",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }


  useEffect(() => {   
    ;(async () => {
      setIsLoading(true)
        const token = localStorage.getItem("token")

    if (!token) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You are not logged in.",
      })
      return
    }

   
    try {
      const userId = token // Assuming the token is userId; adapt if different
      const response = await axios.get(`/api/v2/easy-accounts/${userId}`)
      console.log(response.data)
      setAccounts(response.data.accounts || [])
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching accounts:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to fetch accounts. Please try again.",
      })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
      
      
    })()
  }, [toast])

  if(isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center h-screen">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token")

    if (!token) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You are not logged in.",
      })
      return
    }
    
    values.userId = token

    try {
      await axios.post("/api/v2/easy-transaction", {
        ...values,
        token,
      })
      .then((response) => {
        console.log("Transaction created:", response.data.message);
        toast({
            variant: "success",
            title: "Success",
            description: "Transaction created successfully.",
          })
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Unable to create transaction. Please try again.",
        })
      });

      form.reset()
      // fetchAccounts()
    } catch (error) {
      console.error("Error creating transaction:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to create transaction. Please try again.",
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
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <Select onValueChange={field.onChange} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((account: any) => (
                        <SelectItem key={account._id} value={account._id}>
                          {account.name} - Balance: {account.balance}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="debit">Debit</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Textarea placeholder="Enter transaction description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              <CircleDollarSign />
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <Toaster />
    </>
  )
}

export default CreateTransaction
