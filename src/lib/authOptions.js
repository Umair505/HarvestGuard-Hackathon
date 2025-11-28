// /lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const userCollection = connectToDatabase(collectionNamesObj.userCollection);
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) return null;

        // bcrypt.compare(plainPassword, hashedPassword)
        const isPasswordOK = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordOK) return null;

        // return a safe user object (NextAuth will store into JWT)
        return {
          id: user._id.toString(),
          name: user.name || user.email,
          email: user.email,
          image: user.image || null,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/login", // your login route
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // if signing in via OAuth (Google), ensure user saved in DB
      if (account?.provider && account.provider !== "credentials") {
        try {
          const userCollection = connectToDatabase(collectionNamesObj.userCollection);
          const providerAccountId = account.providerAccountId || profile.sub || profile.id;
          const provider = account.provider;

          // Look for existing provider identity
          const existing = await userCollection.findOne({ providerAccountId, provider });

          if (!existing) {
            const payload = {
              providerAccountId,
              provider,
              email: user.email,
              image: user.image || profile.picture || null,
              name: user.name || profile.name || user.email,
              // you can add createdAt
              createdAt: new Date(),
            };
            await userCollection.insertOne(payload);
          }
        } catch (err) {
          console.error("Error saving OAuth user:", err);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // On initial sign in, user object is available
      if (user) {
        token.id = user.id || token.sub;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
