import { useEffect, useState } from "react";
import { fetchUser } from "../services/userService";
import { User } from "../types/user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser()
      .then(setUser)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}