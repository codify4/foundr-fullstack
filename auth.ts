import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "user",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async (credentials, req) => {
        if(!credentials.username || !credentials.password) return null
        const { username, email, password } = credentials
        const res = await fetch(`${process.env.API_URL}/local/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        })
        
        if(res.status === 401) {
          console.log(res.statusText);
          return null
        }

        const user = await res.json();
        return user;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.accessToken = user.accessToken;
  //       token.refreshToken = user.refreshToken;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.accessToken = token.accessToken;
  //     session.user.refreshToken = token.refreshToken;
  //     return session;
  //   }
  // },
  // pages: {
  //   signIn: '/auth/signin',
  // }
})