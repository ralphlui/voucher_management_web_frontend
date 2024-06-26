import { loginUser } from "@/app/service/authentication";
import { User } from "@/next-auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "CredentialsProvider",
      credentials: {
        email: {label: "email",type: "email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const emailCredentials : string = credentials?.email || '';
        const passwordCredentials : string = credentials?.password || '';
        
        const apiResponse = await loginUser(emailCredentials, passwordCredentials);
        const res = apiResponse.result[0];
        const message = apiResponse.message;

        if (!message.includes('success')) {
          throw new Error(apiResponse.message);
        }
        if (message.includes('success') && apiResponse.result.length>0) {
          return {
            id: res.role,
            email: res.email,
            name : res.username,
            role : res.role,
            image : res.image,
            token: res.token
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/components/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
callbacks: {
    async jwt({token, user}) {
      // If there's a user, add it to the token
      if (user) {
        token.user = user
        // Add other user properties as needed
      }
      return token;
    },
    async session({session, token}) {
      
      session.user = token.user as User || '';
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);