import { NextResponse } from "next/server";
import { client } from "@/utils/client";

type Params = {
  phone_number: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const phoneNumber = params.phone_number.startsWith("+")
    ? params.phone_number.slice(1)
    : params.phone_number;

  const responseForCustomerId = await client.get("customers/search.json", {
    searchParams: {
      query: `phone:${phoneNumber}`,
      fields: "id",
    },
  });
  const dataForCustomerId = await responseForCustomerId.json();
  const customer_id = dataForCustomerId.customers[0].id;
  const responseForOrders = await client.get(
    `customers/${customer_id}/orders`,
    { searchParams: { status: "any" } }
  );
  const dataForOrders = await responseForOrders.json();
  return NextResponse.json({
    data: dataForOrders,
  });
}
