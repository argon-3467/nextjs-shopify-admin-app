"use client";
import Addresses from "@/app/ui/Addresses";
import Orders from "@/app/ui/Orders";
import OrderDetails from "@/app/ui/OrderDetails";
import OrderCancel from "@/app/ui/OrderCancel";
import AddressUpdate from "@/app/ui/AddressUpdate";
import { useState, useEffect } from "react";

export default function ShopPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shop Page</h1>
      <div className="mb-4">
        <h2 className="text-lg font-bold">Test Data:</h2>
        <p>:phone_number: +1 613-555-0135 or 1-613-555-0142 or 16135550127</p>
        <p>
          :address_id: 8690736201917 or 8690637668541 or 8688956375229 or
          8690652840125
        </p>
        <p>:order_id: 5434754072765 or 5434752991421</p>
      </div>

      <details className="mb-4" id="addresses">
        <summary className="text-xl font-bold cursor-pointer">
          GET /api/:phone_number/addresses
        </summary>
        <Addresses />
      </details>

      <details className="mb-4" id="addresses-update">
        <summary className="text-xl font-bold cursor-pointer">
          PUT /api/:phone_number/addresses/:address_id/update
        </summary>
        <AddressUpdate />
      </details>

      <details className="mb-4" id="orders">
        <summary className="text-xl font-bold cursor-pointer">
          GET /api/:phone_number/orders
        </summary>
        <Orders />
      </details>

      <details className="mb-4" id="order-details">
        <summary className="text-xl font-bold cursor-pointer">
          GET /order/:order_id
        </summary>
        <OrderDetails />
      </details>

      <details className="mb-4" id="order-cancel">
        <summary className="text-xl font-bold cursor-pointer">
          POST /order/:order_id/cancel
        </summary>
        <OrderCancel />
      </details>
    </div>
  );
}
