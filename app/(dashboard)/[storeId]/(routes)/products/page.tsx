import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { ProductColumn } from "./components/columns";
import {format} from "date-fns";
import { formatter } from "@/lib/utils";

const ProductPage = async ({
    params
}: {
    params: {
        storeId: string;
    };
}) => {
    const products =  await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            color: true,
            size: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        color: item.color.value,
        size: item.size.name,

        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      }));

    //   console.log(formattedProducts)

    return ( 
        <div className="flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedProducts}/>
            </div>
        </div>
     );
}
 
export default ProductPage;