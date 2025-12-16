import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        course: '',
        college: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.error || `Error: ${err.message} (Status: ${err.response?.status || 'Unknown'})`;
            setError(errorMsg);
        }
    };

    const inputClasses = "w-full bg-soft-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric-purple focus:shadow-[0_0_15px_rgba(188,19,254,0.2)] transition-all font-inter";
    const labelClasses = "block text-xs font-bold text-electric-purple uppercase font-orbitron tracking-widest mb-2 ml-1";

    return (
        <div className="flex items-center justify-center min-h-screen bg-deep-black bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-soft-black via-deep-black to-deep-black pt-20 pb-10">
            {/* Ambient Background */}
            <div className="absolute w-full h-full overflow-hidden pointer-events-none top-0 left-0">
                <div className="absolute top-20 right-1/4 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-electric-purple/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold font-orbitron text-white tracking-wider mb-2">INITIALIZE USER</h2>
                    <p className="text-gray-400 font-inter text-sm">Join the network</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm font-inter text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                             <label className={labelClasses}>Identity Type</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={inputClasses}
                            >
                                <option value="student" className="bg-soft-black">Student</option>
                                <option value="employer" className="bg-soft-black">Employer</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Full Designation</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Comms Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Access Key</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    {formData.role === 'student' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-5"
                        >
                            <div>
                                <label className={labelClasses}>Academy / Base</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Specialization</label>
                                <input
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3.5 px-4 mt-4 bg-gradient-to-r from-electric-purple to-pink-500 rounded-lg text-white font-bold font-orbitron tracking-wider hover:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all transform hover:-translate-y-0.5 relative overflow-hidden"
                    >
                        REGISTER UNIT
                    </button>

                    <div className="text-center mt-6">
                         <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors font-inter">
                            Already registered? <span className="text-electric-purple hover:underline">Access Login</span>
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
