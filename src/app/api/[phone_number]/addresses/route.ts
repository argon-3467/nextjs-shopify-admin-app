import { NextResponse } from "next/server";
import { client } from "@/utils/client";
import { formatPhoneNumber } from "@/utils/formatInputData";

// Define the type for the phone number parameter
type Params = {
  phone_number: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  // Format the phone number
  const formattedPhone = formatPhoneNumber(params.phone_number);

  try {
    // Make a GET request to the Shopify API to search for customers by phone number
    const response = await client.get("customers/search.json", {
      searchParams: {
        query: `phone:${formattedPhone}`,
        fields: "addresses",
      },
    });

    // If the response is not ok, throw an error with the status code and message
    if (!response.ok) {
      throw {
        message: response.statusText,
        code: response.status,
        data: await response.json(),
      };
    }

    // Parse the response data
    const data = await response.json();

    // Get the addresses of the first customer in the response, or an empty array if no addresses are found
    const addresses = data.customers[0]?.addresses || [];

    // Determine the success message based on whether a customer and addresses were found
    const message = data.customers[0]
      ? addresses.length > 0
        ? "Addresses fetched successfully"
        : "No addresses found for the customer"
      : "No customer found";

    // Return the addresses and success message in the response
    return NextResponse.json({
      message,
      data: { addresses },
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
