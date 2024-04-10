import { NextResponse } from "next/server";
import { client } from "@/utils/client";

// Define the type for the order id parameter
type Params = {
  order_id: string;
};

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    // Make a POST request to the Shopify API to cancel the order
    const response = await client.post(`orders/${params.order_id}/cancel`);

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

    // Check if the order exists in the response
    if (!data.order) {
      return NextResponse.json({
        message: "No order found or the order could not be cancelled",
        data: {},
      });
    }

    // Return the order details and success message in the response
    return NextResponse.json({
      message: "Order cancelled successfully",
      data: { order: data.order },
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
