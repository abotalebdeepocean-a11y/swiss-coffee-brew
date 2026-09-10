import { Email } from "@convex-dev/auth/providers/Email";
import axios from "axios";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15, // 15 minutes
  // This function can be asynchronous
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes: Uint8Array) {
        crypto.getRandomValues(bytes);
      },
    };
    const alphabet = "0123456789";
    return generateRandomString(random, alphabet, 6);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    try {
      const apiKey = import.meta.env.VITE_FREEBUFF_API_KEY;

      if (!apiKey) {
        throw new Error(
          "VITE_FREEBUFF_API_KEY is not configured. Check your .env file."
        );
      }

      await axios.post(
        "https://auth.freebuff.app/send_otp",
        {
          to: email,
          otp: token,
          appName: import.meta.env.VITE_VLY_APP_NAME || "ROVENTO Coffee",
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
          timeout: 10000, // 10 second timeout
        },
      );
    } catch (error) {
      console.error("[Email OTP] Failed to send verification email:", {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      });

      throw new Error(
        error instanceof Error
          ? `Failed to send verification email: ${error.message}`
          : "Failed to send verification email. Please try again.",
      );
    }
  },
});
