import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET
export async function GET(
    req: Request,
    { params }: { params: {  sizeId: string } }
  ) {
    try {
      // console.log('STORE_PATCH', params.storeId, req.body)
      
  
      const size = await prismadb.size.findUnique({
        where: {
          id: params.sizeId,
        },
      });
  
      return NextResponse.json(size);
    } catch (error) {
      console.log("SIZE_GET", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

export async function PATCH(
  req: Request,
  { params }: { params: {storeId: string, sizeId: string } }
) {
  try {
    // console.log('STORE_PATCH', params.storeId, req.body)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name, value } = body;
    if (!name) return new NextResponse("Missing name", { status: 400 });
    if (!value) return new NextResponse("Missing value", { status: 400 });

    if (!params.storeId )
      return new NextResponse("Store id is nesscery", { status: 400 });

    if (!params.sizeId) return new NextResponse("size id is nesscery", { status: 400 });

    const storeByuserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    
    if(!storeByuserId) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete
export async function DELETE(
  req: Request,
  { params }: { params: {  sizeId: string, storeId: string, } }
) {
  try {
    // console.log(params.sizeId, params.storeId)

    // console.log('STORE_PATCH', params.storeId, req.body)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.sizeId)
      return new NextResponse("size id is nesscery", { status: 400 });

      const storeByuserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    
    if(!storeByuserId) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

