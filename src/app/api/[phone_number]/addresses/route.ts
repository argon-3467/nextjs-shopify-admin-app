import { NextResponse } from "next/server";
import { client } from "@/utils/client";

type Params = {
  phone_number: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const phoneNumber = params.phone_number.startsWith("+")
    ? params.phone_number.slice(1)
    : params.phone_number;
  const response = await client.get("customers/search.json", {
    searchParams: {
      query: `phone:${phoneNumber}`,
      fields: "addresses",
    },
  });
  const data = await response.json();
  return NextResponse.json({
    data: data.customers[0].addresses,
  });
}
