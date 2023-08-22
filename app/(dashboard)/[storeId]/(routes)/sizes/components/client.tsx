"use client";
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { SizeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';
// import { da } from 'date-fns/locale';


interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();
  // console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage Sizes"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data}/>
      <Heading 
        title= "API"
        description= "API calls for Sizes"
      />
      <Separator />
      <ApiList
        entityName="Size"
        entityIdName="sizeId"
      />
    </>
  )
}

export default SizeClient
