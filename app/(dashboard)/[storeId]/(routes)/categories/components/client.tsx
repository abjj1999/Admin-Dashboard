"use client";
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { CategoryColumns, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';
// import { da } from 'date-fns/locale';


interface CategoryClientProps {
  data: CategoryColumns[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();
  // console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage your store categories here."
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data}/>
      <Heading 
        title= "API"
        description= "API calls for Categories"
      />
      <Separator />
      <ApiList
        entityName="categories"
        entityIdName="categoryId"
      />
    </>
  )
}

export default CategoryClient
