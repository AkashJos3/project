import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(email, password);
            if (success) {
                const role = localStorage.getItem('role');
                navigate(`/${role}/dashboard`);
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-deep-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-soft-black via-deep-black to-deep-black pt-16">
            <div className="absolute w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold font-orbitron text-white tracking-wider mb-2">WELCOME BACK</h2>
                    <p className="text-gray-400 font-inter text-sm">Enter the system protocol</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm font-inter text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-neon-green uppercase font-orbitron tracking-widest mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-soft-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all font-inter"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-neon-green uppercase font-orbitron tracking-widest mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-soft-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all font-inter"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-neon-green to-neon-cyan rounded-lg text-black font-bold font-orbitron tracking-wider hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all transform hover:-translate-y-0.5 relative overflow-hidden group"
                    >
                        <span className="relative z-10">ACCESS SYSTEM</span>
                    </button>
                    
                    <div className="text-center mt-6">
                        <Link to="/register" className="text-sm text-gray-400 hover:text-white transition-colors font-inter">
                            New user? <span className="text-neon-cyan hover:underline">Create an account</span>
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
