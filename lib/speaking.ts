export const TIME_SLOTS = ["Morning (8am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–9pm)"] as const;
export const PLATFORMS = ["Zoom", "Google Meet", "WhatsApp call"] as const;
export type SpeakingStatus = "requested" | "confirmed" | "completed" | "cancelled";

export type SpeakingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** Preferred day, YYYY-MM-DD, in the user's timezone. */
  date: string;
  timeSlot: string;
  timezone: string;
  platform: string;
  notes: string;
  status: SpeakingStatus;
  /** True while the request is requested or confirmed; a user can have only one. */
  active: boolean;
  /** Set by staff when confirming, in the user's timezone. */
  confirmedTime?: string;
  meetingLink?: string;
  createdAt: string;
};

export type SpeakingInput = Pick<SpeakingRequest, "name" | "email" | "phone" | "date" | "timeSlot" | "timezone" | "platform" | "notes">;

const day = (offset: number) => new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);
/** Earliest and latest days a test can be requested for, checked by both the form and the server. */
export const dateRange = () => ({ min: day(1), max: day(90) });

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s()-]{5,24}$/;

/** Returns cleaned input, or an error message the user can act on. */
export function parseSpeakingInput(body: unknown): SpeakingInput | string {
  if (!body || typeof body !== "object") return "Please fill in the form.";
  const b = body as Record<string, unknown>;
  const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  const name = text(b.name, 80);
  const email = text(b.email, 120);
  const phone = text(b.phone, 25);
  const date = text(b.date, 10);
  const timezone = text(b.timezone, 60);
  const notes = text(b.notes, 500);

  if (name.length < 2) return "Enter your full name.";
  if (!EMAIL.test(email)) return "Enter a valid email address.";
  if (!PHONE.test(phone)) return "Enter a phone or WhatsApp number, including the country code.";
  const { min, max } = dateRange();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < min || date > max) return "Choose a day within the next 90 days, starting tomorrow.";
  if (!(TIME_SLOTS as readonly string[]).includes(b.timeSlot as string)) return "Choose a time of day.";
  if (!(PLATFORMS as readonly string[]).includes(b.platform as string)) return "Choose how you want to meet.";
  if (!timezone) return "We could not detect your timezone.";

  return { name, email, phone, date, timeSlot: b.timeSlot as string, timezone, platform: b.platform as string, notes };
}
