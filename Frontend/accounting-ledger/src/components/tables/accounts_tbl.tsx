import { ColumnDef } from "@tanstack/react-table"

export type Accounts = {
  _id: string
  name: string
  title: string
  balance: number
  description: string
  status: string
}

export const columns: ColumnDef<Accounts>[] = [
    {
        accessorKey: "_id",
        header: "Id",
    },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
