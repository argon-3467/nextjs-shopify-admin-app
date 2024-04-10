import { NextResponse } from "next/server";
import { client } from "@/utils/client";
import { formatPhoneNumber } from "@/utils/formatInputData";

// Define the type for the phone number parameter
type Params = {
  phone_number: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  // Format the phone number
  const formattedPhoneNumber = formatPhoneNumber(params.phone_number);

  try {
    // Make a GET request to the Shopify API to search get customer's Id by phone number
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
        data: [],
      });
    }

    // Get the customer id of the first customer in the response
    const customerId = customerData.customers[0].id;

    // Make a GET request to the Shopify API to fetch all orders of the customer
    const ordersResponse = await client.get(`customers/${customerId}/orders`, {
      searchParams: { status: "any" },
    });

    // If the response is not ok, throw an error with the status code and message
    if (!ordersResponse.ok) {
      throw {
        message: ordersResponse.statusText,
        code: ordersResponse.status,
        data: await ordersResponse.json(),
      };
    }

    // Parse the response data
    const ordersData = await ordersResponse.json();
    // Get the addresses of the first customer in the response, or an empty array if no addresses are found
    const orders = ordersData.orders || [];

    // Determine the success message based on whether a customer and addresses were found
    const message =
      orders.length > 0
        ? "Orders fetched successfully"
        : "No orders found for the customer";

    // Return the orders and success message in the response
    return NextResponse.json({
      message,
      data: { orders },
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
