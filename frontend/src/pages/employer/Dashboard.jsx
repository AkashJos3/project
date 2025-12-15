import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle, Briefcase } from 'lucide-react';

const EmployerDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        category: 'Retail',
        duration: ''
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

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employer/post-job', newJob);
            setShowPostModal(false);
            setNewJob({ title: '', description: '', location: '', salary: '', category: 'Retail', duration: '' });
            fetchMyJobs();
        } catch (error) {
            alert('Failed to post job');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
                    <p className="text-gray-600">Manage your job postings and applicants.</p>
                </div>
                <button
                    onClick={() => setShowPostModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    <PlusCircle className="h-5 w-5" /> Post New Job
                </button>
            </div>

            <div className="grid gap-6">
                <h2 className="text-xl font-semibold text-gray-700">Your Active Jobs</h2>
                {jobs.length === 0 ? (
                    <p className="text-gray-500">You haven't posted any jobs yet.</p>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.salary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900">View Applicants</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Post Job Modal */}
            {showPostModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
                        <form onSubmit={handlePostJob} className="space-y-4">
                            <input
                                className="w-full border p-2 rounded"
                                placeholder="Job Title"
                                value={newJob.title}
                                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Description"
                                value={newJob.description}
                                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="border p-2 rounded"
                                    placeholder="Location"
                                    value={newJob.location}
                                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                    required
                                />
                                <input
                                    className="border p-2 rounded"
                                    placeholder="Salary (e.g. $15/hr)"
                                    value={newJob.salary}
                                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="border p-2 rounded"
                                    value={newJob.category}
                                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                                >
                                    <option value="Retail">Retail</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Tutoring">Tutoring</option>
                                    <option value="Event">Event</option>
                                </select>
                                <input
                                    className="border p-2 rounded"
                                    placeholder="Duration"
                                    value={newJob.duration}
                                    onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPostModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;
