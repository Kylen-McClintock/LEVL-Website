"use client";

import React, { useState } from 'react';
import { Button, ButtonProps } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PartnerButtonProps extends ButtonProps {
    children: React.ReactNode;
}

export function PartnerButton({ children, className, ...props }: PartnerButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Scientist / Researcher');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Compile subject and body
        const subject = encodeURIComponent(`Partner Inquiry: ${role} - ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nRole: ${role}\n\nMessage:\n${message}`
        );
        
        // Open mail client
        window.location.href = `mailto:kylen@levlhealth.com?subject=${subject}&body=${body}`;
        
        // Close modal after brief delay
        setTimeout(() => setIsOpen(false), 300);
    };

    return (
        <>
            <Button {...props} className={className} onClick={() => setIsOpen(true)}>
                {children}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] shadow-2xl rounded-3xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-levl-cyan)] to-[var(--color-levl-magenta)]" />
                            
                            <div className="p-6 sm:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Partner With Us</h3>
                                        <p className="text-[var(--color-levl-text-secondary)] text-sm">Join us in building the infrastructure for the next generation of personalized longevity.</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="text-white/50 hover:text-white transition-colors p-1"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-white/70 ml-1">Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-levl-cyan)]/50 focus:ring-1 focus:ring-[var(--color-levl-cyan)]/50 transition-all"
                                                placeholder="Dr. Jane Doe"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-white/70 ml-1">Email</label>
                                            <input 
                                                required
                                                type="email" 
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-levl-cyan)]/50 focus:ring-1 focus:ring-[var(--color-levl-cyan)]/50 transition-all"
                                                placeholder="jane@institute.edu"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-white/70 ml-1">Role / Affiliation</label>
                                        <select 
                                            value={role}
                                            onChange={e => setRole(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-levl-cyan)]/50 focus:ring-1 focus:ring-[var(--color-levl-cyan)]/50 transition-all appearance-none"
                                        >
                                            <option value="Scientist / Researcher">Scientist / Researcher</option>
                                            <option value="Clinician / Practitioner">Clinician / Practitioner</option>
                                            <option value="Biomarker / Diagnostics Company">Biomarker / Diagnostics Company</option>
                                            <option value="Investor">Investor</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-white/70 ml-1">Message</label>
                                        <textarea 
                                            required
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            rows={4}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-levl-cyan)]/50 focus:ring-1 focus:ring-[var(--color-levl-cyan)]/50 transition-all resize-none"
                                            placeholder="Tell us about how we could collaborate..."
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <Button type="submit" variant="primary" className="w-full h-12">
                                            Prepare Message
                                        </Button>
                                    </div>
                                    <p className="text-center text-xs text-white/40 mt-3">
                                        This will open your default email client so you can review before sending.
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
