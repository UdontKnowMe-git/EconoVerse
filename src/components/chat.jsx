import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yourprojecturl.supabase.co';
const supabaseKey = 'yourprojectkeyhere';

const supabase = createClient(supabaseUrl, supabaseKey);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState(''); // For storing the username

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('chat').select('*');
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        console.log('Fetched messages:', data);
        setMessages(data || []);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel('public:chat')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat' }, (payload) => {
        console.log('New message:', payload.new);
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const sendMessage = async () => {
    const { error } = await supabase.from('chat').insert([{ message: newMessage, user: username }]);
    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="chat">
      <h1>Global chat</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.user}:</strong> {message.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
