import { useState } from 'react';
import { useAtuh } from '../hooks/useAuth.jsx';
import { register } from '../api/auth.js';

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername]   = useState('');
    const [password, setPassword]   = useState('');
    const [mode, setMode]           = useState('login');
    const [error, setError]         = useState('');

    const handleSubmit = async (e)  => {
        e.preventDefault();
        setError('');
        try {
            if (mode === 'register') await register(username, password);
            await login(username, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSumit={handleSubmit}>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' />
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                <button type='submit'>{mode === 'login' ? 'Sign in' : 'Register'}</button>
            </form>
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? 'Need an account? Register' : 'HAve an account? Sign in'}
            </button>
        </div>
    );
}