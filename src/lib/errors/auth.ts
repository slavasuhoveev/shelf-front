export const REGISTER_ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: "Email is already taken",
  INVALID_EMAIL: "Invalid email address",
  MISSING_FIELDS: "Email and password are required",
  PASSWORD_EMPTY: "Password cannot be empty",
  PASSWORD_HASH_ERROR: "Error hashing password. Please try again.",
  PASSWORD_HAS_SPACE: "Password cannot contain spaces",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long",
  PASSWORD_NO_UPPERCASE: "Password must contain at least one uppercase letter",
  PASSWORD_NO_LOWERCASE: "Password must contain at least one lowercase letter",
  PASSWORD_NO_SYMBOL: "Password must contain at least one symbol",
  PASSWORD_NO_DIGIT: "Password must contain at least one digit",
  INTERNAL: "Server error. Please try again later.",
};

export const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  INVALID_JSON: "Invalid request. Please try again.",
  MISSING_FIELDS: "Please fill in all fields.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in.",
  INTERNAL: "Server error. Please try again later.",
};
