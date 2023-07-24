"use client";
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
// import { da } from 'date-fns/locale';


interface BillboardClientProps {
  data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();
  // console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage your store billboards"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data}/>
    </>
  )
}

export default BillboardClient
