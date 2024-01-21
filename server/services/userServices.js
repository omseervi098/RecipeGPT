import User from "../models/User.js"
export const createUser = async (user) => {
  return user.save();
};
export const getUserByEmail = async (email) => {
    const user=await User.findOne({email})
    return user;
}
export const getUserById = async (id) => {
    const user=await User.findById(id)
    return user;
}
export const getUserByUsername = async (username) => {
    const user=await User.findOne({username})
    return user;
}
