"use client";
import { useState } from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";

export default function UpdateAddress() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const updatedAddress = Object.fromEntries(formData.entries());
    const { phoneNumber, addressId } = updatedAddress;
    const response = await fetch(
      `/api/${phoneNumber}/addresses/${addressId}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddress),
      }
    );
    const jsonData = await response.json();
    setData(jsonData);
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="my-4 space-y-4">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="addressId"
          className="block text-sm font-medium text-gray-700"
        >
          Address ID
        </label>
        <input
          id="addressId"
          name="addressId"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="address1"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          id="address1"
          name="address1"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="address2"
          className="block text-sm font-medium text-gray-700"
        >
          Apartment/Suite etc
        </label>
        <input
          id="address2"
          name="address2"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="province"
          className="block text-sm font-medium text-gray-700"
        >
          State
        </label>
        <input
          id="province"
          name="province"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country/Region
        </label>
        <input
          id="country"
          name="country"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          htmlFor="zip"
          className="block text-sm font-medium text-gray-700"
        >
          PinCode
        </label>
        <input
          id="zip"
          name="zip"
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {data && (
        <JsonView
          data={data}
          shouldExpandNode={allExpanded}
          style={darkStyles}
        />
      )}
    </div>
  );
}
