export interface Message {
  _id: string;
  senderId: string; // ID of the user who sent the message
  receiverId: string; // ID of the user who received the message
  content: string; // The content of the message
  createdAt: string; // Timestamp of when the message was created
  updatedAt: string; // Timestamp of when the message was last updated
}
