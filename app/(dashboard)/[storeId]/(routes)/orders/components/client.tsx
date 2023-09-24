"use client";
import { Heading } from '@/components/Heading';
import { Separator } from '@/components/ui/separator';
import React from 'react'
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';


interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
 
  // console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage your store Orders"
        />
        
      </div>
      <Separator />
      <DataTable searchKey='products' columns={columns} data={data}/>
      
    </>
  )
}

export default OrderClient
