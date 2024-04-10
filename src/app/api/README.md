# API Documentation

## Overview

This document provides information about the API endpoints

## API Response Structure

Successfull API responses will have the following format:

```json
{
  "message": "Description of what happened",
  "data": "Object varies depending on the endpoint"
}
```

Failed API response (status code >= 400) will have the following format:

```json
{
  "message": "Error status text",
  "errors": "Error details (either a string or an array of strings)"
}
```

## Parameters for demo purposes

### `:phone_number`

- `+1 613-555-0135` or `1-613-555-0142` or `16135550127`

### `:address_id`

- `8690736201917` or `8690637668541` or `8688956375229` or `8690652840125`

### `:order_id`

- `5434754072765` or `5434752991421`

## Shopify Related things

I am using [this](https://github.com/Shopify/shopify-api-js/tree/main/packages/admin-api-client) admin-api-client library provided by Shopify to make requests to the Shopify Admin API. It fails to fetch with a probabilty of 0.1 :sweat_smile:

Check out shopify [Shopify Status and error codes](https://shopify.dev/docs/api/admin-rest#status_and_error_codes)

## Endpoints

### GET /api/:phone_number/addresses

Fetches all addresses for a customer.

**Parameters:**

- `phone_number`: The phone number of the customer with the country code prefixed (e.g. +1-555-123-4567). The + and space and dashes are formatted out and are optional.

**Response:**

- `200 OK`: Returns a JSON object containing a message and the addresses of the customer.
- `404 Not Found`: No customer found with the provided phone number.
- `500 Internal Server Error`: An error occurred while processing the request.

### PUT /api/:phone_number/addresses/:address_id/update

Updates the address of a customer and sets it as the default address.

- Provide the updated address details in the request body in json format. Refer to Shopify's address documentation for the address format (Which may not exist or maybe I couldn't find it. :sweat_smile:) Just don't put conflicting fields inside the request body for example `name` as well as `first_name` and `last_name`.

**Parameters:**

- `phone_number`: The phone number of the customer with the country code prefixed (e.g. +1-555-123-4567). The + and space and dashes are formatted out and are optional. Use `+1 613-555-0135` for a demo.
- `address_id`: The ID of the address. Use `+1 613-555-0135` for a demo.

**Request Body:**

- A JSON object containing the updated address. Example:

```json
{
  "first_name": "Russ",
  "last_name": "Winfield",
  "company": "NA",
  "address1": "105 Victoria St",
  "address2": null,
  "city": "Toronto",
  "province": "Ontario",
  "country": "Canada",
  "zip": "M5C 1N7",
  "phone": null,
  "name": "Russ Winfield",
  "province_code": "ON",
  "country_code": "CA",
  "country_name": "Canada",
  "default": false
}
```

**Response:**

- `200 OK`: Returns a JSON object containing a message and the updated address.
- `404 Not Found`: No customer or address found with the provided phone number and address ID.
- `500 Internal Server Error`: An error occurred while processing the request.

### GET /api/:phone_number/orders

Fetches all orders for a customer.

**Parameters:**

- `phone_number`: The phone number of the customer with the country code prefixed (e.g. +1-555-123-4567). The + and space and dashes are formatted out and are optional. Use `+1 613-555-0135` for a demo.

**Response:**

- `200 OK`: Returns a JSON object containing a message and the orders of the customer.
- `404 Not Found`: No customer or orders found with the provided phone number.
- `500 Internal Server Error`: An error occurred while processing the request.

### GET /order/:order_id

Fetches the details of an order.

**Parameters:**

- `order_id`: The ID of the order.

**Response:**

- `200 OK`: Returns a JSON object containing a message and the details of the order.
- `404 Not Found`: No order found with the provided order ID.
- `500 Internal Server Error`: An error occurred while processing the request.

### POST /order/:order_id/cancel

Cancels an order.

**Parameters:**

- `order_id`: The ID of the order.

**Response:**

- `200 OK`: Returns a JSON object containing a message and the details of the cancelled order.
- `404 Not Found`: No order found with the provided order ID.
- `500 Internal Server Error`: An error occurred while processing the request.
