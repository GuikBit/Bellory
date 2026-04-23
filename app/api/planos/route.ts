import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET() {
  try {
    const apiKey = process.env.PAYMENT_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "PAYMENT_API_KEY não configurada", dados: [] },
        { status: 500 },
      )
    }

    const res = await fetch("https://pay-api.bellory.com.br/api/v1/plans", {
      method: "GET",
      headers: { "X-API-Key": apiKey },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: `Erro ${res.status} ao buscar planos`, dados: [] },
        { status: res.status },
      )
    }

    const json = await res.json()
    return NextResponse.json({
      success: true,
      message: "ok",
      errorCode: 0,
      dados: json.content ?? [],
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message ?? "Erro inesperado", dados: [] },
      { status: 500 },
    )
  }
}
