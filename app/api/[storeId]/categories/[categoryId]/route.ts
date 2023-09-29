import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET
export async function GET(
    req: Request,
    { params }: { params: {  categoryId: string } }
  ) {
    try {
      // console.log('STORE_PATCH', params.storeId, req.body)
      
  
      const category = await prismadb.category.findUnique({
        where: {
          id: params.categoryId,
        },
        include: {
          billboard: true,
          
        },
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log("CAT_GET_ERROR", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

export async function PATCH(
  req: Request,
  { params }: { params: {storeId: string, categoryId: string } }
) {
  try {
    // console.log('STORE_PATCH', params.storeId, req.body)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name, billboardId } = body;
    if (!name) return new NextResponse("Missing name", { status: 400 });
    if (!billboardId) return new NextResponse("Missing id", { status: 400 });

    if (!params.storeId )
      return new NextResponse("Store id is nesscery", { status: 400 });

    if (!params.categoryId) return new NextResponse("category id is nesscery", { status: 400 });

    const storeByuserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    
    if(!storeByuserId) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CAT_PATCH_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete
export async function DELETE(
  req: Request,
  { params }: { params: {  categoryId: string, storeId: string, } }
) {
  try {
    // console.log(params.billboardId, params.storeId)

    // console.log('STORE_PATCH', params.storeId, req.body)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.categoryId)
      return new NextResponse("Billboard id is nesscery", { status: 400 });

      const storeByuserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    
    if(!storeByuserId) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CAT_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

