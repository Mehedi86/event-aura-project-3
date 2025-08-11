// import { loginUser } from "@/app/actions/auth/loginUser";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import dbConnect from "./dbConnect";

// export const authOptions = {
//     // Configure one or more authentication providers
//     providers: [
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. "Sign in with...")
//             name: "Credentials",
//             // `credentials` is used to generate a form on the sign in page.
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.
//             credentials: {
//                 email: { label: "Username", type: "text", placeholder: "enter email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//                 console.log(credentials)
//                 // Add logic here to look up the user from the credentials supplied
//                 const user = await loginUser(credentials)

//                 if (user) {
//                     // Any object returned will be saved in `user` property of the JWT
//                     return user
//                 } else {
//                     // If you return null then an error will be displayed advising the user to check their details.
//                     return null

//                     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//                 }
//             }
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         }),
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET
//         })
//     ],
//     pages: {
//         signIn: "/login"
//     },
//     callbacks: {
//         async signIn({ user, account, profile, email, credentials }) {
//             console.log({ user, account, profile, email, credentials })
//             if (account) {
//                 const { providerAccountId, provider } = account;
//                 const { email: user_email, image, name } = user;
//                 const userCollection = dbConnect('users');
//                 const isExist = await userCollection.findOne({ providerAccountId });
//                 if (!isExist) {
//                     const role = "user";
//                     const payload = { providerAccountId, provider, email: user_email, image, name, role };
//                     await userCollection.insertOne(payload)
//                 }
//             }
//             return true
//         }
//     }
// }

import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "./dbConnect";

export const authOptions = {
    providers: [
        // Email & Password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "enter email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await loginUser(credentials);

                // Ensure authorize() returns the full user object including role
                if (user) {
                    return {
                        _id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                }
                return null;
            }
        }),

        // Google Login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        // GitHub Login
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],

    pages: {
        signIn: "/login"
    },

    callbacks: {
        // Runs when user signs in
        async signIn({ user, account }) {
            if (account && account.provider !== "credentials") {
                const { providerAccountId, provider } = account;
                const { email: user_email, image, name } = user;

                const userCollection = dbConnect("users");
                const isExist = await userCollection.findOne({ providerAccountId });

                if (!isExist) {
                    const role = "user"; // default role
                    const payload = { providerAccountId, provider, email: user_email, image, name, role };
                    await userCollection.insertOne(payload);
                }
            }
            return true;
        },

        // Always enrich the session with DB data
        async session({ session }) {
            const userCollection = dbConnect("users");
            const dbUser = await userCollection.findOne({ email: session.user.email });

            if (dbUser) {
                session.user.role = dbUser.role;
                session.user._id = dbUser._id.toString();
            }

            return session;
        }
    }
};
