import { NextResponse } from "next/server";
import { client } from "@/utils/client";

type Params = {
  order_id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const response = await client.get(`orders/${params.order_id}`);
  const data = await response.json();
  return NextResponse.json({
    data: data,
  });
}
