import {User} from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const currentUserId = req.auth.userId; 
    // Exclude the current user from the list
    const users = await User.find({clerkId: {$ne: currentUserId}});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
}

