export async function registerUser({ email, phoneNumber, password, isBuyer }) {
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, phoneNumber, password, isBuyer }),
  });
  const data = await response.json();

  if (!response.ok) {
    const validationErrors = data.errors
      ?.map(({ field, message }) => `${field}: ${message}`)
      .join(", ");
    throw new Error(validationErrors || data.message || "Registration failed");
  }

  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    const validationErrors = data.errors
      ?.map(({ field, message }) => `${field}: ${message}`)
      .join(", ");
    throw new Error(validationErrors || data.message || "Login failed");
  }
  return data;
}
