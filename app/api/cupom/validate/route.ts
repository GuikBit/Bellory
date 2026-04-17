import { NextResponse } from "next/server"

interface CupomBody {
  couponCode: string
  planCode: string
  cycle: "MONTHLY" | "ANNUAL"
}

export async function POST(request: Request) {
  try {
    const companyId = process.env.PAYMENT_COMPANY_ID
    if (!companyId) {
      return NextResponse.json(
        { success: false, message: "PAYMENT_COMPANY_ID não configurado", dados: null },
        { status: 500 },
      )
    }

    const body = (await request.json()) as Partial<CupomBody>
    if (!body.couponCode || !body.planCode || !body.cycle) {
      return NextResponse.json(
        { success: false, message: "Parâmetros obrigatórios ausentes", dados: null },
        { status: 400 },
      )
    }

    const res = await fetch(
      "https://pay-api.bellory.com.br/api/v1/coupons/validate/public",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Company-Id": companyId,
        },
        body: JSON.stringify({
          couponCode: body.couponCode.toUpperCase(),
          scope: "SUBSCRIPTION",
          planCode: body.planCode,
          cycle: body.cycle,
        }),
      },
    )

    const json = await res.json().catch(() => null)

    if (!res.ok || !json) {
      return NextResponse.json(
        {
          success: false,
          message: json?.message ?? `Erro ${res.status} ao validar cupom`,
          dados: json ?? null,
        },
        { status: res.ok ? 500 : res.status },
      )
    }

    return NextResponse.json({
      success: true,
      message: json.message ?? "ok",
      errorCode: 0,
      dados: json,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message ?? "Erro inesperado", dados: null },
      { status: 500 },
    )
  }
}
