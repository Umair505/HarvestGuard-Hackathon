// /app/actions/auth/registerUser.js
export async function registerUser(payload) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error || "Registration failed" };
    }
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || "Network error" };
  }
}
