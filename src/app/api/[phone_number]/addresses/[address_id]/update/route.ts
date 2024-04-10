import { NextResponse } from "next/server";
import { client } from "@/utils/client";
import { formatPhoneNumber } from "@/utils/formatInputData";

// Define the type for the phone number and address id parameters
type Params = {
  phone_number: string;
  address_id: string;
};

export async function PUT(request: Request, { params }: { params: Params }) {
  // Format the phone number
  const formattedPhoneNumber = formatPhoneNumber(params.phone_number);

  // Get the updated address from the request body
  // We should validate the input data but Shopify have implemented that already
  const updatedAddress = await request.json();

  // Make the current address default as well
  // I don't know Why we are hardcoding this. The frontend should send if they want to make the address default
  updatedAddress.default = true;

  try {
    // Make a GET request to the Shopify API to search for customers by phone number
    const customerResponse = await client.get("customers/search.json", {
      searchParams: {
        query: `phone:${formattedPhoneNumber}`,
        fields: "id",
      },
    });

    // If the response is not ok, throw an error with the status code and message
    if (!customerResponse.ok) {
      throw {
        message: customerResponse.statusText,
        code: customerResponse.status,
        data: await customerResponse.json(),
      };
    }

    // Parse the response data
    const customerData = await customerResponse.json();

    // Check if customers exist in the response
    if (!customerData.customers || customerData.customers.length === 0) {
      return NextResponse.json({
        message: "No customer found",
        data: {},
      });
    }

    // Get the customer id of the first customer in the response
    const customerId = customerData.customers[0].id;

    // Make a PUT request to the Shopify API to update the customer's address
    const addressUpdateResponse = await client.put(
      `customers/${customerId}/addresses/${params.address_id}`,
      { data: { customer_address: updatedAddress } }
    );

    // If the response is not ok, throw an error with the status code and message
    if (!addressUpdateResponse.ok) {
      throw {
        message: addressUpdateResponse.statusText,
        code: addressUpdateResponse.status,
        data: await addressUpdateResponse.json(),
      };
    }

    // Parse the response data
    const addressUpdateData = await addressUpdateResponse.json();

    // Return the updated address and success message in the response
    return NextResponse.json({
      message: "Address updated successfully",
      data: { address: addressUpdateData },
    });
  } catch (error: any) {
    // Log the error and return a response with the error message and status code
    console.error(error);
    return NextResponse.json(
      {
        message:
          error.message ||
          "An error occurred while processing your request. Please try again later",
        errors: error.data?.errors || "Internal Server Error",
      },
      { status: error.code || 500 }
    );
  }
}
