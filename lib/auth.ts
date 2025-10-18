// lib/auth.ts
import { currentUser } from "@clerk/nextjs/server";

export async function getAuthenticatedClerkUser() {
  const user = await currentUser();
  if (!user) return null;
  return { id: user.id, email: user.emailAddresses?.[0]?.emailAddress, name: user.firstName };
}
