import { Modal, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';

const ChatModal = ({ order, open, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    const newMessage = { text: message, sender: 'seller' };
    setChatHistory([...chatHistory, newMessage]);

    fetch(`/api/chat/${order.buyer.id}`, {
      method: 'POST',
      body: JSON.stringify({ message: newMessage }),
    });

    setMessage('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: '#fff' }}>
        <h3>Chat with {order.buyer.name}</h3>
        <Box>
          {chatHistory.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'seller' ? 'right' : 'left' }}>
              <p>{msg.text}</p>
            </div>
          ))}
        </Box>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          fullWidth
        />
        <Button onClick={sendMessage}>Send</Button>
      </Box>
    </Modal>
  );
};

export default ChatModal;
