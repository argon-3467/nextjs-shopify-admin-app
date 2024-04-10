import { NextResponse } from "next/server";
import { client } from "@/utils/client";

type Params = {
  phone_number: string;
  address_id: string;
};

export async function PUT(request: Request, { params }: { params: Params }) {
  const updatedAddress = await request.json();
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
  const responseForAddressUpdate = await client.put(
    `customers/${customer_id}/addresses/${params.address_id}`,
    { data: { customer_address: updatedAddress } }
  );
  return NextResponse.json({
    data: await responseForAddressUpdate.json(),
  });
}
