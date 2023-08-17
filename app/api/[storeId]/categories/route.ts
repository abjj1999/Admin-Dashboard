import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  {params} : {params: {storeId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!label) {
      return new NextResponse("lebal is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("image is required", { status: 400 });
    }

    if(!params.storeId) {
        return new NextResponse("storeId is required", { status: 400 });
    }

    const storeByuserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    
    if(!storeByuserId) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const billBoard = await prismadb.billBoard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(billBoard);
  } catch (error) {
    console.log('[BillBoard_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



export async function GET(
  req: Request,
  {params} : {params: {storeId: string}}
) {
  try {
    
    if(!params.storeId) {
        return new NextResponse("storeId is required", { status: 400 });
    }

    
    
   

    const billBoards = await prismadb.billBoard.findMany({
        where: {
            storeId: params.storeId
        }
    });
  
    return NextResponse.json(billBoards);
  } catch (error) {
    console.log('[BillBoard_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};