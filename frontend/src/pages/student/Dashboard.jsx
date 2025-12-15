import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, DollarSign, Clock } from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');

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

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Find a Part-time Job</h1>
                <p className="text-gray-600">Browse opportunities curated for students.</p>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4 items-center">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by keywords..."
                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <select
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Retail">Retail</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Event">Event</option>
                </select>
            </div>

            {/* Job List */}
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                    <span className="text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{job.category || 'General'}</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" /> {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" /> {job.salary}
                                </div>
                                {job.duration && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" /> {job.duration}
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                                {job.description}
                            </p>

                            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                                Apply Now
                            </button>
                        </div>
                    ))}
                    {jobs.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No jobs found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
