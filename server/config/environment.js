import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const development = {
    name:"Development",
    port:process.env.PORT || 5000,
    mongoUrl:process.env.MONGO_URL,
    jwtSecret:process.env.JWT_SECRET,
}
const production = {
    name:"Production",
    port:process.env.PORT || 5000,
    mongoUrl:process.env.MONGO_URL,
    jwtSecret:process.env.JWT_SECRET,
}
export default process.env.NODE_ENV === 'development' ? development : production;