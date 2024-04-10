import { createAdminRestApiClient } from "@shopify/admin-api-client";

export const client = createAdminRestApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || "",
  apiVersion: "2024-04",
  accessToken: process.env.ADMIN_API_ACCESS_TOKEN || "",
});
