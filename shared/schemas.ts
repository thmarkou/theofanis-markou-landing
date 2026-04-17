import { z } from "zod";

/**
 * Shared validation schemas used by both the client form and the server tRPC
 * mutation. Keeping them in `shared/` guarantees the two sides stay in sync —
 * if we loosen or tighten a rule, both places pick up the change immediately.
 */

export const SUPPORTED_LOCALES = ["en", "de"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name must be at most 120 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address")
    .max(320, "Email is too long"),
  company: z
    .string()
    .trim()
    .max(200, "Organization name is too long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be at most 5000 characters"),
  locale: z.enum(SUPPORTED_LOCALES).default("en"),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
