/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";
import axios from "axios";
import crypto from "crypto";

const duoHost = "api-103321e5.duosecurity.com";
const duoIkey = "DIGAL2SGN9DJKN3E5LQE";
const duoSkey = "GiksJpIyInm6liMHW1t2aQVGBLu1gqHr0c4YOF3G";

const verifyDuoAuthentication = async (email) => {
    const path = "/admin/v1/users";
    const url = `https://${duoHost}${path}`;
    
    const params = { username: email };
    const headers = sign("GET", path, params, duoIkey, duoSkey);
    
    try {
        const response = await axios.get(url, { headers });
        const users = response.data.response;

        if (users.length === 0) {
            console.log("User not found in Duo. Enrolling...");
            await enrollUser(email, duoIkey, duoSkey); 
        }

        const pushId = await sendVerificationPush(response.data.response[0].user_id, duoSkey);
        const result = await listenForPushResponse(response.data.response[0].user_id, pushId, duoSkey);
        
        return result === "approved";  
    } catch (error) {
        console.error("Duo authentication error:", error);
        return false;
    }
};

const sign = (method, path, params, ikey, skey) => {
    const now = new Date().toUTCString();
    let canon = `${now}\n${method}\n${duoHost}\n${path}\n`;

    const args = Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    canon += args.join("&");

    const signature = calculateHMAC(canon, skey);
    const auth = `${ikey}:${signature}`;
    const encodedAuth = Buffer.from(auth).toString("base64");

    return {
        Date: now,
        Authorization: `Basic ${encodedAuth}`,
    };
};

const calculateHMAC = (data, secretKey) => {
    const hmac = crypto.createHmac("sha1", secretKey);
    hmac.update(data);
    return hmac.digest("hex");
};

const enrollUser = async (email, ikey, skey) => {
    const path = "/admin/v1/users/enroll";
    const url = `https://${duoHost}${path}`;
    
    const params = { email };
    const headers = sign("POST", path, params, ikey, skey);
    const postData = new URLSearchParams(params).toString();

    try {
        await axios.post(url, postData, { headers });
        console.log("User enrolled in Duo");
    } catch (error) {
        console.error("Duo enrollment failed:", error);
    }
};

const sendVerificationPush = async (userId, skey) => {
    const path = `/admin/v1/users/${userId}/send_verification_push`;
    const url = `https://${duoHost}${path}`;
    
    const params = { phone_id: "default" }; 
    const headers = sign("POST", path, params, duoIkey, duoSkey);
    const postData = new URLSearchParams(params).toString();
    
    try {
        const response = await axios.post(url, postData, { headers });
        return response.data.response.push_id;  
    } catch (error) {
        console.error("Failed to send push:", error);
    }
};

const listenForPushResponse = async (userId, pushId, skey) => {
    const path = `/admin/v1/users/${userId}/verification_push_response`;
    const url = `https://${duoHost}${path}`;
    
    const params = { push_id: pushId };
    const headers = sign("GET", path, params, duoIkey, duoSkey);
    const urlWithParams = `${url}?push_id=${pushId}`;

    const timeout = 60000; 
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        try {
            const response = await axios.get(urlWithParams, { headers });
            const result = response.data.response.result;

            if (result === "approve") {
                return "approved";  
            } else if (result === "deny") {
                return "denied";  
            } else if (result === "fraud") {
                return "fraud"; 
            }

            console.log("Push still waiting...");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (error) {
            console.error("Error listening for push response:", error);
        }
    }

    return "timeout";  
};

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "691436364074-pjlh42p11cbao0pddqmrsiftfh7u8gvv.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            const client = await clientPromise;
            if (!client) {
                console.error("Failed to connect to MongoDB");
                return false;
            }

            const db = client.db("users");
            const userCollection = db.collection("profiles");

            const existingUser = await userCollection.findOne({ mail: profile.email });

            if (!existingUser) {
                const newUserProfile = {
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    mail: profile.email,
                    img: profile.picture,
                    groups: [],
                };
                await userCollection.insertOne(newUserProfile);
            }

            const isDuoAuthenticated = await verifyDuoAuthentication(profile.email);

            if (!isDuoAuthenticated) {
                console.log("User failed Duo authentication");
                return false; 
            }

            return true;
        },
    },
});

export { handler as GET, handler as POST };
*/

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
        const client = await clientPromise;
        if (!client) {
            console.error('Failed to connect to MongoDB');
        } else {
            console.log('MongoDB connection successful');
        }
        const db = client.db("profiles");
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