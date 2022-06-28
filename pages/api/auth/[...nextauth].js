import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({session, token}) {
      session.user.tag = session.user.name.split(" ").join("").toLocaleLowerCase()
      session.user.uid = token.sub
      return session
    },
  },
  secret:process.env.NEXTAUTH_SECRET
})