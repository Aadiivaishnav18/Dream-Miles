export const getUserName = (email) => {
  if (!email) return "User";

  return email
    .split("@")[0]
    .replace(/[^a-zA-Z]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};