import { describe, expect, it } from "vitest";
import { LoginFormSchema } from "./login.schema";

describe("LoginFormSchema", () => {
  it("accepts a valid email and password", () => {
    const result = LoginFormSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid emails", () => {
    const result = LoginFormSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Invalid email");
  });

  it("requires passwords to be at least 8 characters", () => {
    const result = LoginFormSchema.safeParse({
      email: "user@example.com",
      password: "short",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Password must be at least 8 characters"
    );
  });
});
