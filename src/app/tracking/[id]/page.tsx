"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";

export default function TrackingPage({ params }: { params: { id: string } }) {
    const { trackingInfo } = useStore();

    return (
        <div className="bg-background-light min-h-screen flex flex-col antialiased bg-map-pattern relative overflow-x-hidden">
            <Navbar />

            <main className="flex-grow z-10 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-6 font-medium">
                        <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            Volver al Dashboard
                        </Link>
                    </div>

                    {/* Shipment Summary Card */}
                    <div className="bg-surface rounded-sm shadow-card border border-gray-100 p-6 mb-8 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-gray-100 text-text-muted px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-bold">{trackingInfo.type}</span>
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                        {trackingInfo.status}
                                    </span>
                                </div>
                                <h1 className="font-display font-bold text-2xl text-primary leading-tight">{trackingInfo.title}</h1>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">BOL Number</span>
                                        <span className="font-mono text-primary font-bold text-sm">{trackingInfo.bolNumber}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Container ID</span>
                                        <span className="font-mono text-primary font-bold text-sm">{trackingInfo.containerId}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Total Weight</span>
                                        <span className="font-mono text-primary font-bold text-sm">{trackingInfo.weight}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Volume</span>
                                        <span className="font-mono text-primary font-bold text-sm">{trackingInfo.volumeStr}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-2 sm:mt-0">
                                <button className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-gray-100 text-primary rounded-sm text-sm font-medium transition-colors border border-gray-200">
                                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                    Reportar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Document Checklist */}
                    <div className="bg-white rounded-sm shadow-card border border-gray-100 p-5 mb-8">
                        <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">description</span> Documentación de Embarque
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {trackingInfo.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm border border-gray-200">
                                    <span className="text-xs font-medium text-text-main">{doc.name}</span>
                                    {doc.verified && <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-4 sm:pl-8 py-4">
                        {trackingInfo.steps.map((step, idx) => (
                            <div key={idx} className="relative pb-12 group last:pb-0">
                                {/* Connector Line */}
                                {idx < trackingInfo.steps.length - 1 && (
                                    <div
                                        aria-hidden="true"
                                        className={`absolute top-10 left-[19px] w-[2px] h-full -ml-[1px] ${step.status === 'completed' ? 'bg-accent' : 'bg-gray-200 border-l-[2px] border-dotted border-gray-300'
                                            }`}
                                    />
                                )}

                                <div className="flex gap-6 sm:gap-8 relative">
                                    {/* Icon Node */}
                                    <div className="relative flex-shrink-0 z-10">
                                        {step.status === 'active' && (
                                            <>
                                                <div className="absolute -inset-2 rounded-full border border-accent opacity-40 animate-ping"></div>
                                                <div className="absolute -inset-4 rounded-full bg-accent/10 animate-pulse"></div>
                                            </>
                                        )}
                                        <div className={`size-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white relative z-20 ${step.status === 'active' ? 'bg-primary text-white' : 'bg-surface border-2 border-accent text-accent'
                                            }`}>
                                            <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`flex-1 ${step.status === 'active'
                                            ? 'bg-surface rounded-sm shadow-card border border-gray-100 p-5 relative transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5'
                                            : 'opacity-80 hover:opacity-100 transition-opacity'
                                        }`}>
                                        {step.status === 'active' && (
                                            <div className="absolute left-[-6px] top-6 w-3 h-3 bg-surface border-l border-t border-gray-100 transform -rotate-45"></div>
                                        )}

                                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                                            <h3 className={`font-display font-bold text-lg text-primary ${step.status !== 'active' ? 'text-base' : ''}`}>
                                                {step.title}
                                            </h3>
                                            {step.status === 'active' && (
                                                <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-2 py-1 rounded-sm">
                                                    <span className="material-symbols-outlined text-[14px]">radar</span>
                                                    <span className="text-xs font-bold uppercase tracking-wide">Status Actual</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-text-muted text-sm mb-4 leading-relaxed">{step.description}</p>

                                        <div className={`flex items-center gap-3 pt-3 ${step.status === 'active' ? 'border-t border-gray-100' : ''}`}>
                                            <div className="flex items-center gap-1.5 text-xs font-mono text-primary">
                                                <span className="material-symbols-outlined text-[14px] text-text-muted">calendar_today</span>
                                                {step.date}
                                            </div>
                                            {step.status === 'active' && (
                                                <div className="flex items-center gap-1.5 text-xs font-mono text-primary">
                                                    <span className="material-symbols-outlined text-[14px] text-text-muted">schedule</span>
                                                    {step.time}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5 text-xs font-mono text-primary ml-auto">
                                                <span className="material-symbols-outlined text-[14px] text-text-muted">location_on</span>
                                                {step.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Future Steps Preview */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h4 className="font-display font-bold text-sm text-text-muted uppercase tracking-wider mb-4">Próximos Pasos</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {trackingInfo.nextSteps.map((step, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-sm bg-gray-50/50">
                                    <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-display font-medium text-text-muted text-sm">{step.title}</p>
                                        <p className="text-[10px] text-gray-400 uppercase">{step.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
