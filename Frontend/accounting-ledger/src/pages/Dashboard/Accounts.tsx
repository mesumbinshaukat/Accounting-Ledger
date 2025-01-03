import React, {useState, useEffect} from 'react'
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
import { Accounts as  Account, columns } from "@/components/tables/accounts_tbl"
import { DataTable } from "@/components/tables/data-table"


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
const Accounts = () => {
    const [data, setData] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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
      setData(response.data.accounts || [])
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

  return (
    <>
   <div className="flex flex-col items-center justify-center h-screen">
   
       <div className="container mx-auto py-10">
         {isLoading ? (
             <div className="text-center">Loading...</div>
           ) : (
               <DataTable columns={columns} data={data} />
           )}
       </div>
           </div>
    </>
  )
}

export default Accounts