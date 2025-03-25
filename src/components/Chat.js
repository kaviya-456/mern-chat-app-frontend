import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            const userMessage = { user: 'You', text: message };
            setMessage('');

            try {
                const response = await axios.post('http://localhost:5000/api/chat', { message });
                const botMessage = { user: 'AI', text: response.data.reply };

                setChat((prevChat) => [...prevChat, userMessage, botMessage]);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div style={{ width: "50%", margin: "20px auto", textAlign: "center" }}>
            <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
                {chat.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "60%", padding: "8px", marginRight: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "8px 12px", cursor: "pointer" }}>
                Send
            </button>
        </div>
    );
};

export default Chat;

