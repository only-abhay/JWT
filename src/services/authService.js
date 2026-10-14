import axios from "axios";

function getAuthApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_CATEGORY_URL?.replace(/\/$/, "");

  if (!apiUrl) {
    throw new Error("The authentication API URL is not configured.");
  }

  return apiUrl;
}

export async function loginUser(credentials) {
  const response = await axios.post(
    `${getAuthApiUrl()}/auth/login`,
    credentials,
    { withCredentials: true },
  );

  return response.data;
}

export async function registerUser(userData) {
  const response = await axios.post(
    `${getAuthApiUrl()}/auth/signup`,
    userData,
    { withCredentials: true },
  );

  return response.data;
}

export async function verifyOtp(email, otp) {
  const response = await axios.post(
    `${getAuthApiUrl()}/auth/verify-otp`,
    { email: email.trim().toLowerCase(), otp },
    { withCredentials: true },
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await axios.get(`${getAuthApiUrl()}/auth/me`, {
    withCredentials: true,
  });

  if (!response.data.success || !response.data.user) {
    throw new Error(response.data.message || "Unable to load your account.");
  }

  return response.data.user;
}

export async function logoutUser() {
  const response = await axios.get(`${getAuthApiUrl()}/auth/logout/user`, {
    withCredentials: true,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Unable to log out.");
  }

  return response.data;
}

export function getAuthErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }

  return error instanceof Error
    ? error.message
    : "The request could not be completed.";
}
