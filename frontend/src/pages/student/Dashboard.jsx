import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, DollarSign, Clock, Briefcase, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [applying, setApplying] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, [category]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/student/jobs${category ? `?category=${category}` : ''}`);
            setJobs(res.data);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        try {
            setApplying(jobId);
            await api.post(`/student/apply/${jobId}`);
            // Update local state to show applied status immediately
            setJobs(jobs.map(job =>
                job.id === jobId ? { ...job, has_applied: true } : job
            ));
        } catch (error) {
            alert('Failed to apply: ' + (error.response?.data?.error || 'Unknown error'));
        } finally {
            setApplying(null);
        }
    };

    const inputClasses = "bg-soft-black/50 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-neon-cyan transition-colors font-inter";

    return (
        <div className="min-h-screen bg-deep-black text-white p-6 pt-24 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-orbitron font-bold tracking-wide text-white">
                        AVAILABLE MISSIONS
                    </h1>
                    <p className="text-gray-400 mt-2">Select your next contract.</p>
                </div>

                {/* Filters */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4 items-center backdrop-blur-sm">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            className={`${inputClasses} w-full pl-10`}
                        />
                    </div>
                    <select
                        className={`${inputClasses} w-full md:w-48 appearance-none cursor-pointer`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" className="bg-soft-black">All Sectors</option>
                        <option value="Retail" className="bg-soft-black">Retail</option>
                        <option value="Delivery" className="bg-soft-black">Delivery</option>
                        <option value="Tutoring" className="bg-soft-black">Tutoring</option>
                        <option value="Event" className="bg-soft-black">Event</option>
                        <option value="Tech" className="bg-soft-black">Tech</option>
                    </select>
                </div>

                {/* Job List */}
                {loading ? (
                    <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-cyan"></div></div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-neon-green/50 transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.1)] group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-neon-green transition-colors">{job.title}</h3>
                                            <span className="text-xs text-electric-purple bg-electric-purple/10 border border-electric-purple/30 px-2.5 py-1 rounded mt-2 inline-block font-mono tracking-wide uppercase">{job.category || 'General'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm text-gray-400 mb-6 font-mono">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-neon-cyan" /> <span className="text-gray-300">{job.employer_name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-neon-cyan" /> {job.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-neon-cyan" /> <span className="text-white font-bold">{job.salary}</span>
                                        </div>
                                        {job.duration && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-neon-cyan" /> {job.duration}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-inter border-t border-white/5 pt-4">
                                        {job.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleApply(job.id)}
                                    disabled={job.has_applied || applying === job.id}
                                    className={`w-full py-3 rounded-lg font-bold font-orbitron transition-all relative overflow-hidden
                                        ${job.has_applied
                                            ? 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/5'
                                            : 'bg-gradient-to-r from-neon-green to-neon-cyan text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transform hover:-translate-y-1'
                                        }`}
                                >
                                    {job.has_applied ? (
                                        <span className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> APPLIED</span>
                                    ) : (
                                        applying === job.id ? 'PROCESSING...' : 'ACCEPT MISSION'
                                    )}
                                </button>
                            </motion.div>
                        ))}
                        {jobs.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500 font-orbitron">
                                NO MISSIONS FOUND IN THIS SECTOR
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
