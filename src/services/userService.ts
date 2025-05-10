import { User } from "../types/user";

export async function fetchUser(): Promise<User> {
  const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
  if (!response.ok) throw new Error("Error al obtener el usuario");
  return response.json();
}