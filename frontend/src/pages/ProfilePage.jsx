import { useState, useEffect } from 'react';
import { getUser, updateUser } from '../api/users.js';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ProfilePage() {
    const { user } = useAuth();
    const [form, setForm] = useState({ displayName: '', bio: '', avatarUrl: '' });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        getUser(user.id).then(data => setForm({
            displayName:    data.displayName    ||  '',
            bio:            data.bio            ||  '',
            avaterUrl:      data.avatarUrl      ||  ''
        }));
    }, [user.id]);

    const handleSave = async (e) => {
        e.preventDefault();
        await updateUser(user.id, form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <h2>My Profile</h2>
            {saved && <p>Saved!</p>}
            <form onSubmit={handleSave}>
                <input value={form.displayName} onChange={e => setForm({...form, dsiplayName: e.target.value})} placeholder='Display name' />
                <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder='Bio' />
                <input value={form.avatarUrl} onChange={e => setForm({...form, avatarUrl: e.target.value})} placeholder='Avatar URL' />
                <button type='submit'>Save changes</button>
            </form>
        </div>
    );
}