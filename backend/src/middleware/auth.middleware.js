import { clerkClient } from "@clerk/express";

export const protectRoute = (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ error: "Unauthorized - You must Login" });
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ error: "Forbidden - Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
