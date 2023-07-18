import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!name) return new NextResponse("Name is required", { status: 400 })

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const store = await prismadb.store.update({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_PATCH", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const store = await prismadb.store.delete({
      where: {
        id: params.storeId,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_DELETE", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
