import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }
  return new Date(date).toLocaleString("en-US", options)
}

const ChatWindow = () => {
  const { messages, selectedUser } = useChatStore()
  const { user } = useUser()

  // ref to the scrolling container
  const scrollRef = useRef<HTMLDivElement>(null)
  // ref to dummy element at bottom
  const bottomRef = useRef<HTMLDivElement>(null)

  // utility to smooth‐scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" })
    }
  }, [])

  // scroll down on new messages
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  return (
    <ScrollArea className="flex-1 h-full" onClick={scrollToBottom}>
      <div ref={scrollRef} className="p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const mine = message.senderId === user?.id
            return (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`flex items-start gap-4 ${
                  mine ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage
                    src={mine ? user.imageUrl : selectedUser?.imageUrl}
                    className="w-8 h-8 rounded-full"
                  />
                  <AvatarFallback>
                    {mine
                      ? user?.firstName?.[0]
                      : selectedUser?.fullName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    mine ? "bg-green-500" : "bg-zinc-700"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-zinc-300 mt-1 block">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        {/* Dummy div to scroll into view */}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}

export default ChatWindow
