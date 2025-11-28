

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

        const isPasswordOK = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordOK) return null;

        return {
          id: user._id.toString(),
          name: user.name || user.email,
          email: user.email,
          image: user.image || null,
          photoURL: user.image || null,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        try {
          const userCollection = connectToDatabase(collectionNamesObj.userCollection);
          const providerAccountId = account.providerAccountId || profile.sub || profile.id;
          const provider = account.provider;

          const existing = await userCollection.findOne({ providerAccountId, provider });

          if (!existing) {
            await userCollection.insertOne({
              providerAccountId,
              provider,
              email: user.email,
              image: user.image || profile.picture || null,
              name: user.name || profile.name || user.email,
              createdAt: new Date(),
            });
          }
        } catch (err) {
          console.error("Error saving OAuth user:", err);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.sub;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.photoURL = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.photoURL = token.photoURL;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET,
};
