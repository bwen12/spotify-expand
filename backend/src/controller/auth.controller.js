import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // If user does not exist, create a new user
      const newUser = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error in /callback:", error);
    next(error);
  }
};
