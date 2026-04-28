import { useState, useEffect } from 'react';
import { getUsers } from '../api/users.js';
import { useAuth } from '../hooks/useAuth.jsx';

export default function UsersPage({ onOpenChat }) {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <div>
            <button onClick={logout}>Log out</button>
            <h2>Users</h2>
            <ul>
                {users.filter(u => u.id !== user.id).map(u => {
                    <li key={u.id}>
                        {u.displayName || u.username}
                        <button onClick={() => onOpenChat(u.id)}>Message</button>
                    </li>
                })}
            </ul>
        </div>
    );
}