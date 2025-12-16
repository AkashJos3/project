import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-deep-black/80 backdrop-blur-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-green/20 transition-colors">
                        <Briefcase className="h-6 w-6 text-neon-green" />
                    </div>
                    <span className="self-center text-2xl font-orbitron font-bold whitespace-nowrap text-white group-hover:text-neon-cyan transition-colors">
                        Stud<span className="text-neon-green">Work</span>
                    </span>
                </Link>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden md:inline font-inter text-gray-300">
                                {user.name} <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-neon-green uppercase border border-neon-green/30">{user.role}</span>
                            </span>
                             <button
                                onClick={handleLogout}
                                className="group flex items-center gap-2 text-red-500 hover:text-red-400 font-medium px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/10 transition-all font-orbitron text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>LOGOUT</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-white hover:text-neon-cyan transition-colors font-orbitron">
                                LOGIN
                            </Link>
                            <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-black bg-neon-green rounded-lg hover:bg-neon-cyan transition-colors shadow-[0_0_15px_rgba(57,255,20,0.4)] font-orbitron">
                                GET STARTED
                            </Link>
                        </div>
                    )}
                </div>
                
                {/* Mobile & Desktop Links wrapper could go here if we had more links */}
                 {user && (
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                            <li>
                                <Link to={`/${user.role}/dashboard`} className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-neon-cyan md:p-0 font-orbitron tracking-wide transition-colors">
                                    DASHBOARD
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
