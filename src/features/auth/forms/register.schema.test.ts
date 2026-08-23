import { describe, expect, it } from "vitest";
import { RegisterFormSchema } from "./register.schema";

const validRegistration = {
  email: "user@example.com",
  password: "Password1!",
  confirmPassword: "Password1!",
};

describe("RegisterFormSchema", () => {
  it("accepts a valid registration payload", () => {
    expect(RegisterFormSchema.safeParse(validRegistration).success).toBe(true);
  });

  it("requires password confirmation to match", () => {
    const result = RegisterFormSchema.safeParse({
      ...validRegistration,
      confirmPassword: "Different1!",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["confirmPassword"],
          message: "Passwords do not match",
        }),
      ])
    );
  });

  it.each([
    ["lowercase letter", "PASSWORD1!", "Must contain a lowercase letter"],
    ["uppercase letter", "password1!", "Must contain an uppercase letter"],
    ["digit", "Password!", "Must contain a digit"],
    ["symbol", "Password1", "Must contain a symbol"],
  ])("requires a %s", (_requirement, password, message) => {
    const result = RegisterFormSchema.safeParse({
      ...validRegistration,
      password,
      confirmPassword: password,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ message })])
    );
  });
});
