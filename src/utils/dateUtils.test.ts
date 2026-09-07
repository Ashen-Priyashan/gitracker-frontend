import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatRelativeTime, formatExactDateTime } from "./dateUtils";

describe("dateUtils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-08T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("formatRelativeTime", () => {
    it("returns 'Unknown date' when dateString is null or undefined", () => {
      expect(formatRelativeTime(null)).toBe("Unknown date");
      expect(formatRelativeTime(undefined)).toBe("Unknown date");
      expect(formatRelativeTime("")).toBe("Unknown date");
    });

    it("returns 'Invalid date' for malformed date strings", () => {
      expect(formatRelativeTime("not-a-valid-date")).toBe("Invalid date");
    });

    it("returns seconds ago for dates less than 60 seconds ago", () => {
      const now = new Date("2026-09-08T11:59:45Z").toISOString();
      expect(formatRelativeTime(now)).toBe("15s ago");
    });

    it("returns minutes ago correctly", () => {
      const fiveMinsAgo = new Date("2026-09-08T11:55:00Z").toISOString();
      expect(formatRelativeTime(fiveMinsAgo)).toBe("5m ago");

      const oneMinAgo = new Date("2026-09-08T11:59:00Z").toISOString();
      expect(formatRelativeTime(oneMinAgo)).toBe("1m ago");
    });

    it("returns hours ago correctly", () => {
      const twoHoursAgo = new Date("2026-09-08T10:00:00Z").toISOString();
      expect(formatRelativeTime(twoHoursAgo)).toBe("2h ago");

      const oneHourAgo = new Date("2026-09-08T11:00:00Z").toISOString();
      expect(formatRelativeTime(oneHourAgo)).toBe("1h ago");
    });

    it("returns days ago and yesterday correctly", () => {
      const threeDaysAgo = new Date("2026-09-05T12:00:00Z").toISOString();
      expect(formatRelativeTime(threeDaysAgo)).toBe("3 days ago");

      const oneDayAgo = new Date("2026-09-07T12:00:00Z").toISOString();
      expect(formatRelativeTime(oneDayAgo)).toBe("yesterday");
    });

    it("returns months and years ago correctly", () => {
      const twoMonthsAgo = new Date("2026-07-08T12:00:00Z").toISOString();
      expect(formatRelativeTime(twoMonthsAgo)).toBe("2mo ago");

      const twoYearsAgo = new Date("2024-09-08T12:00:00Z").toISOString();
      expect(formatRelativeTime(twoYearsAgo)).toBe("2y ago");
    });
  });

  describe("formatExactDateTime", () => {
    it("returns 'N/A' when dateString is null or undefined", () => {
      expect(formatExactDateTime(null)).toBe("N/A");
      expect(formatExactDateTime(undefined)).toBe("N/A");
      expect(formatExactDateTime("")).toBe("N/A");
    });

    it("returns 'Invalid date' for malformed date strings", () => {
      expect(formatExactDateTime("invalid-date-string")).toBe("Invalid date");
    });

    it("formats a valid ISO date string cleanly", () => {
      const result = formatExactDateTime("2026-09-08T12:00:00Z");
      expect(result).toBeDefined();
      expect(result).toContain("2026");
    });
  });
});
