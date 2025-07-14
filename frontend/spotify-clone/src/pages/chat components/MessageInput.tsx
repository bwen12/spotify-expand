import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, selectedUser } = useChatStore();
  const { user } = useUser();

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return;
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage(""); // Clear the input after sending
  };

  return (
    <div className="p-10 mt-auto border-t border-zinc-800">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-zinc-800 text-white placeholder:text-zinc-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className=" transition-all hover:bg-green-500 hover:scale-102 hover:shadow-md cursor-pointer"
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
