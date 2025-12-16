import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Search, DollarSign, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-deep-black text-white selection:bg-neon-green selection:text-black">

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex flex-col justify-center items-center overflow-hidden">
                {/* Background Particles/Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-green/20 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-electric-purple/20 rounded-full blur-[128px] animate-pulse delay-700" />
                </div>

                <div className="mx-auto max-w-4xl text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
                            EARN WHILE YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan animate-pulse">LEARN</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl leading-8 text-gray-400 font-inter max-w-2xl mx-auto">
                            The decentralized hub for student employment. Verified gigs, instant connections, and future-ready opportunities.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Link to="/register" className="group relative px-8 py-3 bg-transparent border border-neon-green/50 text-neon-green font-orbitron font-bold tracking-wider hover:bg-neon-green hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]">
                            <span className="absolute inset-0 w-full h-full bg-neon-green/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            <span>INITIATE SEQUENCE</span>
                        </Link>
                        <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-neon-cyan transition-colors flex items-center gap-2">
                            MEMBER LOGIN <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid (Bento Style) */}
            <div className="py-24 sm:py-32 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        className="mx-auto max-w-2xl lg:text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-base font-orbitron font-semibold leading-7 text-neon-cyan tracking-widest">SYSTEM PROTOCOLS</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-orbitron">
                            SECURE. FAST. RELIABLE.
                        </p>
                    </motion.div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {[
                                {
                                    icon: Shield,
                                    title: 'VERIFIED ENTITIES',
                                    desc: 'All employers undergo rigorous identity verification protocols.',
                                    color: 'text-neon-green'
                                },
                                {
                                    icon: Zap,
                                    title: 'INSTANT SYNC',
                                    desc: 'Real-time job matching algorithms connecting you to gigs instantly.',
                                    color: 'text-neon-cyan'
                                },
                                {
                                    icon: Globe,
                                    title: 'GLOBAL ACCESS',
                                    desc: 'Remote or local. Find opportunities anywhere in the network.',
                                    color: 'text-electric-purple'
                                },
                            ].map((feature, idx) => (
                                <motion.div
                                    key={feature.title}
                                    className="flex flex-col items-start p-8 rounded-2xl bg-soft-black/50 border border-white/5 hover:border-white/10 backdrop-blur-sm transition-all hover:bg-white/5"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                >
                                    <div className={`mb-4 p-3 rounded-lg bg-white/5 ${feature.color}`}>
                                        <feature.icon className="h-8 w-8" aria-hidden="true" />
                                    </div>
                                    <dt className="text-xl font-orbitron font-bold leading-7 text-white">
                                        {feature.title}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400 font-inter">
                                        <p className="flex-auto">{feature.desc}</p>
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
