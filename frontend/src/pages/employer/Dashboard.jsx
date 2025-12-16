import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle, Briefcase, Edit, Trash2, Users, X, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployerDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [jobForm, setJobForm] = useState({
        title: '', description: '', location: '', salary: '', category: 'Retail', duration: ''
    });

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const res = await api.get('/employer/my-jobs');
            setJobs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchApplicants = async (jobId) => {
        try {
            const res = await api.get(`/employer/job/${jobId}/applicants`);
            setApplicants(res.data);
            setShowApplicantsModal(true);
        } catch (error) {
            alert('Failed to fetch applicants');
        }
    };

    const openPostModal = () => {
        setJobForm({ title: '', description: '', location: '', salary: '', category: 'Retail', duration: '' });
        setIsEditing(false);
        setShowPostModal(true);
    };

    const openEditModal = (job) => {
        // We'd ideally fetch full details first if listing doesn't have them all, but for now we assume listed fields + description if available
        // Note: The /my-jobs endpoint currently returns minimal info. We should update /my-jobs to return full info OR fetch singular job.
        // For simplicity, we'll pre-fill what we have.
        setJobForm({
            title: job.title,
            description: job.description || '', // Might be missing in list
            location: job.location,
            salary: job.salary,
            category: job.category || 'Retail',
            duration: job.duration || ''
        });
        setSelectedJob(job);
        setIsEditing(true);
        setShowPostModal(true);
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/employer/job/${selectedJob.id}`, jobForm);
                alert('Job updated successfully!');
            } else {
                await api.post('/employer/post-job', jobForm);
                alert('Job posted successfully!');
            }
            setShowPostModal(false);
            fetchMyJobs();
        } catch (error) {
            console.error(error);
            alert('Operation failed');
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure? This action cannot be undone.")) return;
        try {
            await api.delete(`/employer/job/${id}`);
            fetchMyJobs();
        } catch (error) {
            alert('Failed to delete job');
        }
    };

    const inputClasses = "w-full bg-soft-black/50 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors font-inter";

    return (
        <div className="min-h-screen bg-deep-black text-white p-6 pt-24 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-orbitron font-bold text-white tracking-wide">
                            COMMAND CENTER <span className="text-neon-green">v1.0</span>
                        </h1>
                        <p className="text-gray-400 mt-1">Manage active deployments and incoming personnel.</p>
                    </div>
                    <button
                        onClick={openPostModal}
                        className="flex items-center gap-2 bg-neon-green text-black px-6 py-3 rounded-lg font-bold font-orbitron hover:bg-neon-cyan transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                    >
                        <PlusCircle className="h-5 w-5" /> INITIATE NEW JOB
                    </button>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {jobs.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                            <Briefcase className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-500 text-xl font-orbitron">NO ACTIVE MISSIONS</p>
                        </div>
                    ) : (
                        <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-black/40 text-gray-400 font-orbitron text-sm uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Job Title</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4">Salary</th>
                                            <th className="px-6 py-4 text-center">Protocol</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {jobs.map((job) => (
                                            <tr key={job.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-bold text-white">{job.title}</td>
                                                <td className="px-6 py-4 text-gray-300">{job.location}</td>
                                                <td className="px-6 py-4 text-neon-green font-mono">{job.salary}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => fetchApplicants(job.id)}
                                                            className="flex items-center gap-1 text-xs bg-electric-purple/20 text-electric-purple border border-electric-purple/50 px-3 py-1.5 rounded hover:bg-electric-purple hover:text-white transition-all font-orbitron"
                                                        >
                                                            <Users className="w-3 h-3" /> APPLICANTS
                                                        </button>
                                                        <button
                                                            onClick={() => openEditModal(job)}
                                                            className="text-gray-400 hover:text-white transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="text-red-500/70 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Post/Edit Job Modal */}
            <AnimatePresence>
                {showPostModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-soft-black border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
                        >
                            <button onClick={() => setShowPostModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
                            <h2 className="text-2xl font-bold font-orbitron text-white mb-6">
                                {isEditing ? 'UPDATE PROTOCOLS' : 'INITIATE NEW MISSION'}
                            </h2>
                            <form onSubmit={handleSubmitJob} className="space-y-4">
                                <input className={inputClasses} placeholder="Mission Title" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} required />
                                <textarea className={`${inputClasses} h-24`} placeholder="Detailed Description" value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input className={inputClasses} placeholder="Sector (Location)" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} required />
                                    <input className={inputClasses} placeholder="Compensation" value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <select className={inputClasses} value={jobForm.category} onChange={e => setJobForm({ ...jobForm, category: e.target.value })}>
                                        <option value="Retail" className="bg-soft-black">Retail</option>
                                        <option value="Delivery" className="bg-soft-black">Delivery</option>
                                        <option value="Tutoring" className="bg-soft-black">Tutoring</option>
                                        <option value="Event" className="bg-soft-black">Event</option>
                                        <option value="Tech" className="bg-soft-black">Tech</option>
                                    </select>
                                    <input className={inputClasses} placeholder="Duration" value={jobForm.duration} onChange={e => setJobForm({ ...jobForm, duration: e.target.value })} />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="w-full bg-neon-green text-black font-bold font-orbitron py-3 rounded-lg hover:bg-neon-cyan transition-colors">
                                        {isEditing ? 'SAVE UPDATES' : 'LAUNCH MISSION'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Applicants Modal */}
            <AnimatePresence>
                {showApplicantsModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-soft-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[80vh] overflow-y-auto"
                        >
                            <button onClick={() => setShowApplicantsModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
                            <h2 className="text-2xl font-bold font-orbitron text-white mb-6">CANDIDATE LIST</h2>

                            {applicants.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">No applications received yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {applicants.map(app => (
                                        <div key={app.id} className="p-4 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-lg text-white">{app.student_name}</h3>
                                                <div className="text-sm text-gray-400 mt-1 space-y-0.5">
                                                    <p>{app.student_college} • {app.student_course}</p>
                                                    <p className="text-gray-500">{app.student_email}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 mb-2">
                                                    {app.status}
                                                </span>
                                                <p className="text-xs text-gray-600 font-mono">
                                                    {new Date(app.applied_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmployerDashboard;
