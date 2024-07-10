// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

interface Message {
  id: number;
  user: string;
  message: string;
  created_at: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(10);

      if (error) {
        console.error(error);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    const messageSubscription = supabase
    .channel('public:chat')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload: {new: Message}) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, payload.new];
          return updatedMessages.slice(-10);
        });})
      .subscribe();

    return () => {
      messageSubscription.unsubscribe();
    };
  }, []);

  const handleMessageSend = async () => {
    const user = 'idk';
    const { error } = await supabase
      .from('chat')
      .insert([{ user, message: newMessage }]);

    if (error) {
      console.error(error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="chat">
      <h1>World Chat</h1>
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleMessageSend();
        }}
      />
      <button className="send-button" onClick={handleMessageSend}></button>
    </div>
  );
};

export default Chat;
