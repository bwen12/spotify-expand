import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow requests from this origin
      credentials: true,
    },
  });

  const userSockets = new Map(); // {userId: socketId}
  const userActivities = new Map(); // {userId: activity}

  io.on("connection", (socket) => {
    /* Log the connection */
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // Notify other users or all connected sockets that this user has connected
      io.emit("user_connected", userId);

      //send the list of online users to the newly connected user who just got on
      //which will be an array of the userSockets keys which are the userIds
      socket.emit("users_online", Array.from(userSockets.keys()));

      //show the user activity to all users (what songs they're listenting to)
      io.emit("activities", Array.from(userActivities.entries()));
    });

    
    /*The user activity  */
    socket.on("update_activity", (userId, activity) => {
      console.log("Activity update received:", userId, activity);
      //Basically updating the map with the new activity
      userActivities.set(userId, activity);
      // Notify all users about the updated activity
      io.emit("activity_updated", { userId, activity });
    });

    
    /* Sending message */
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;
        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        const receiverSocketId = userSockets.get(receiverId);
        //if we can receive the receiver's socketId, then we can emit the message to them
        //as they are online
        if (receiverSocketId) {
          // Emit the message to the receiver
          io.to(receiverSocketId).emit("recieve_message", message);
        }
        // Dont emit to all users, just the sender so use socket.emit
        socket.emit("message_sent", message); 
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("message_error", { error: "Failed to send message" });
      }
    });

   
    /* Disconnecting the user */
    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        //find the userId of the socket or user that disconnected
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        // Notify all users that this user has disconnected
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  
  });
};
