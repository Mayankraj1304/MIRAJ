import { useState } from "react";
import { useAuth } from "../features/auth/hook/useAuth";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isBuyer, setIsBuyer] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { handleRegisterUser, loading, error } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");

    try {
      const result = await handleRegisterUser(email, phoneNumber, password, isBuyer);
      setSuccessMessage(`${result.message}. Account role: ${result.user.role}.`);
    } catch {
      // The hook stores the error message for display below.
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Create an account</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          Email
          <input
            className="rounded border p-2"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Phone number
          <input
            className="rounded border p-2"
            type="tel"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input
            className="rounded border p-2"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Are you a buyer?
          <select
            className="rounded border p-2"
            value={isBuyer}
            onChange={(event) => setIsBuyer(event.target.value)}
            required
          >
            <option value="" disabled>
              Choose Yes or No
            </option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </label>
        <button
          className="rounded bg-blue-600 p-2 font-semibold text-white disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600" role="alert">{error}</p>}
      {successMessage && <p className="mt-4 text-green-700" role="status">{successMessage}</p>}
    </main>
  );
}

export default App;
