import { useEffect, useState } from "react";
import { fetchPlans } from "../services/plansService";
import { Plan } from "../types/plan";

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans()
      .then(data => setPlans(data.list))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { plans, loading, error };
}