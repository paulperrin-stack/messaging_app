import { useState, useEffect, useRef } from 'react';
import { getConversation, sendMessage } from '../api/messages.js';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ConversationPage({ userId }) {
    const { user } = useAuth();
    const [messages, setMessages]   = useState([]);
    const [text, setText]           = useState('');
    const bottomRef                 = useRef(null);

    const load = () =>
        getConversation(userId).then(setMessages).catch(console.error);

    useEffect(() => { load(); }, [userId]);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavoir: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        await sendMessage(userId, text);
        setText('');
        load();
    };

    return (
        <div>
            <div style={{ height: '400px', overflowY: 'auto '}}>
                {messages.map(m => {
                    <p key={m.id} style={{ textAlign: m.senderId === user.id ? 'right' : 'left' }}>
                        <strong>{m.sender.displayName || m.sender.username}:</strong>
                        {m.content}
                    </p>
                })}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSend}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder='Type a message...' />
            </form>
        </div>
    );
}