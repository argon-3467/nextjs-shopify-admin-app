/**
 * Formats a phone number by removing the "+" prefix and any spaces or dashes.
 *
 * @param phoneNumber - The phone number to format.
 * @returns The formatted phone number.
 */
export function formatPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber.slice(1)
    : phoneNumber;
  return phoneNumber.replace(/[-\s]/g, "");
}
