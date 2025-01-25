import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../lib/mongodb";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "691436364074-pjlh42p11cbao0pddqmrsiftfh7u8gvv.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    callbacks: {
        async signIn({credentials,profile,email,account,user}) {
        /*
        if (!profile.email.endsWith('@purdue.edu')) {
            return false;
        }*/
        const client = await clientPromise;
        const db = client.db("users");
        const userCollection = db.collection("profiles");
        const existingUser = await userCollection.findOne({ mail: profile.email });
        if (!existingUser) {
            const newUserProfile = {
                firstName: profile.given_name,
                lastName: profile.family_name,
                mail: profile.email,
                img: profile.picture,
            };
            await userCollection.insertOne(newUserProfile);
        }
        return true
    }}
});
export { handler as GET, handler as POST };