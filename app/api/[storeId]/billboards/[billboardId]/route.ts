import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET
export async function GET(
    req: Request,
    { params }: { params: {  billBoardId: string } }
  ) {
    try {
      // console.log('STORE_PATCH', params.storeId, req.body)
      
  
      const billBoard = await prismadb.billBoard.findUnique({
        where: {
          id: params.billBoardId,
        },
      });
  
      return NextResponse.json(billBoard);
    } catch (error) {
      console.log("BB_GET_ERROR", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

export async function PATCH(
  req: Request,
  { params }: { params: {storeId: string, billboardId: string } }
) {
  try {
    // console.log('STORE_PATCH', params.storeId, req.body)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { label, imageUrl } = body;
    if (!label) return new NextResponse("Missing label", { status: 400 });
    if (!imageUrl) return new NextResponse("Missing image", { status: 400 });

    if (!params.storeId )
      return new NextResponse("Store id is nesscery", { status: 400 });

    if (!params.billboardId) return new NextResponse("Billboard id is nesscery", { status: 400 });

    const storeByuserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    
    if(!storeByuserId) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const billBoard = await prismadb.billBoard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billBoard);
  } catch (error) {
    console.log("BILLBOARD_PATCH_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, billBoardId: string } }
) {
  try {
    // console.log('STORE_PATCH', params.storeId, req.body)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.billBoardId)
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

    const billBoard = await prismadb.billBoard.deleteMany({
      where: {
        id: params.billBoardId,
      },
    });

    return NextResponse.json(billBoard);
  } catch (error) {
    console.log("BB_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

