import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Search, DollarSign } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Find the perfect part-time job while you study
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        StudWork connects students with verified employers for flexible, secure, and well-paying part-time opportunities.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/register"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get Started
                        </Link>
                        <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                            Log in <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-24 sm:py-32 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Why StudWork?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to find work securely
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Verified Employers
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    We check every employer to ensure safety and genuine opportunities.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <Search className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Smart Search
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Filter jobs by category, location, and schedule to fit your studies.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <DollarSign className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Transparent Pay
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Clear salary information on every job posting. No hidden surprises.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
