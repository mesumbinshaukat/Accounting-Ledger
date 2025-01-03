import React, { useEffect, useState } from "react"
import { Payment, columns } from "@/components/tables/columns"
import { DataTable } from "@/components/tables/data-table"

// Fetch data function
async function getData(): Promise<Payment[]> {
  return [
    {
      _id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // Add more mock data or fetch from an API
  ]
}

const Page = () => {
  const [data, setData] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">

    <div className="container mx-auto py-10">
      {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
            <DataTable columns={columns} data={data} />
        )}
    </div>
        </div>
    </>
  )
}

export default Page
