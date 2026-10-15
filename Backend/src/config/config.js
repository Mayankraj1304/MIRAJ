import dotenv from "dotenv"
dotenv.config()


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables")
}

if(!process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environment variables")
}

const backendUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`;
const nodeEnvironment = process.env.NODE_ENV || "development";
const frontendUrl = process.env.FRONTEND_URL
    || (nodeEnvironment === "production" ? "https://miraj-three.vercel.app" : "http://localhost:5173");
const googleCallbackUrl = new URL(
    process.env.GOOGLE_CALLBACK_URL || `${backendUrl}/api/auth/google/callback`
);

if (nodeEnvironment === "production") {
    googleCallbackUrl.protocol = "https:";
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: googleCallbackUrl.toString().replace(/\/+$/, ""),
    FRONTEND_URL: frontendUrl.replace(/\/+$/, ""),
    NODE_ENV: nodeEnvironment,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}
