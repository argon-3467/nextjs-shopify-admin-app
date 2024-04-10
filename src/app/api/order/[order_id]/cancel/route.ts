import { NextResponse } from "next/server";
import { client } from "@/utils/client";

type Params = {
  order_id: string;
};

export async function POST(request: Request, { params }: { params: Params }) {
  const response = await client.post(`orders/${params.order_id}/cancel`);
  const data = await response.json();
  return NextResponse.json({
    data: data,
  });
}
