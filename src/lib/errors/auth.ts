export const REGISTER_ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: "Email is already taken",
  INVALID_EMAIL: "Invalid email address",
  MISSING_FIELDS: "Email and password are required",
};

export const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  INVALID_JSON: "Invalid request. Please try again.",
  MISSING_FIELDS: "Please fill in all fields.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in.",
  INTERNAL: "Server error. Please try again later.",
};
