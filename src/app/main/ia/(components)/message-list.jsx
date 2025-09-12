import { Message, MessageContent } from "@/components/ai-elements/message";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        <Message from={message.from} key={message.id}>
          <MessageContent>{message.content}</MessageContent>
        </Message>
      ))}
    </div>
  );
}
