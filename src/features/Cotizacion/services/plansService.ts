export async function fetchPlans() {
  const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json");
  if (!response.ok) throw new Error("Error al obtener los planes");
  return response.json();
}