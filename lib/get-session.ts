import { auth } from "@/auth";

export async function getAuthenticatedUser() {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Authentication required');
    }
    return session.user;
}