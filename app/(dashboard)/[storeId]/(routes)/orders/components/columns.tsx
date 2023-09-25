"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "../../billboards/components/cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string
  phone: string
  address: string
  products: string
  totalPrice: string
  createdAt: string
  isPaid: boolean
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: 'actions',
    cell: ({row}) => <CellAction data={row.original} />,
  }
]
