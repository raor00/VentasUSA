"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
    return (
        <main className="relative flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="flex flex-col gap-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-xs font-bold text-accent tracking-wide uppercase">Carga Crítica & Maquinaria</span>
                            </div>
                            <h1 className="font-display text-5xl lg:text-6xl font-bold leading-[1.1] text-primary tracking-tight">
                                Logística Industrial<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">y de Alto Valor a tu medida.</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                Importación especializada de maquinaria pesada, repuestos industriales, equipos bancarios y tecnología de alta densidad. Sin límites de dimensión ni valor.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                <button className="flex items-center justify-center px-8 h-12 bg-accent hover:bg-teal-500 text-white text-base font-bold rounded shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5">
                                    Cotizar Carga Pesada
                                </button>
                                <button className="flex items-center justify-center px-8 h-12 bg-white border border-gray-200 text-primary text-base font-bold rounded hover:bg-gray-50 transition-colors group">
                                    <span className="material-symbols-outlined mr-2 text-xl group-hover:translate-x-1 transition-transform">forklift</span>
                                    Servicios Corporativos
                                </button>
                            </div>
                            <div className="flex items-center gap-6 mt-4 text-sm font-medium text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-accent text-lg">verified</span>
                                    <span>Certificación ISO</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-accent text-lg">shield</span>
                                    <span>Seguro de Carga 100%</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:h-[600px] flex items-center justify-center">
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60"></div>
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                <img
                                    alt="Large cargo plane"
                                    className="w-full h-full object-cover rounded-lg shadow-2xl rotate-3 transform hover:rotate-0 transition-all duration-700 grayscale-[0.2]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb1HihySoq4hEsRy7nJWIRxJAdbkUrAO9LOqZxYFEcDT-IdXW-bMwCyqKuNeMFqlmnn4HabC-PNtfDP2FgSy6nuAb1tCXPPgK3WG1ZWbpCWPAkkEAHti6M23fQUTv4o0YgYcAw4jXADaM3Vx1MN9JKEZ_7g7Mt_RYSXpcXGZ6a8mEqkKKkKj9GsBqbLi6IxK8vuzXHRiGFCxbsEJHcwZL_35Ads6Y5e1HFm3bD1MzNbfPwevCltGHAsbg3M9o7RIHkJLvYTw9P2TEh"
                                />
                                <div className="absolute -bottom-8 -left-4 sm:-left-8 right-4 sm:right-8 bg-surface p-6 rounded-md shadow-lift border border-gray-100 backdrop-blur-sm z-20 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-display font-bold text-lg text-primary">Rastreo de Manifiesto</h3>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Operativo</span>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400">barcode_scanner</span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-24 py-3 bg-background-light border border-gray-200 rounded text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                            placeholder="BOL-9821-IND..."
                                            type="text"
                                        />
                                        <button className="absolute inset-y-1 right-1 px-4 bg-primary text-white text-sm font-bold rounded hover:bg-secondary transition-colors">
                                            Localizar
                                        </button>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500 font-mono">Ingrese Bill of Lading o Nro. de Guía Industrial.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ticker Bar */}
            <div className="w-full bg-primary text-white py-3 overflow-hidden border-y border-white/10 relative z-20">
                <div className="ticker-wrap">
                    <div className="ticker">
                        <div className="inline-flex items-center gap-12 font-mono text-sm tracking-wide">
                            <span className="flex items-center gap-2"><span className="text-accent">🏭</span> Maquinaria Pesada en Tránsito</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">✈️</span> Carga Aérea Consolidada: Salida 18:00</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">⚓️</span> Contenedores Flat Rack Disponibles</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">⚙️</span> Repuestos Críticos: Prioridad Alta</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            {/* Duplicate for seamless wrap */}
                            <span className="flex items-center gap-2"><span className="text-accent">🏭</span> Maquinaria Pesada en Tránsito</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">✈️</span> Carga Aérea Consolidada: Salida 18:00</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">⚓️</span> Contenedores Flat Rack Disponibles</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">Proceso Logístico Integral</h2>
                        <p className="text-slate-600 text-lg">Gestión de cadena de suministro para industrias exigentes. Control total desde origen hasta planta.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group relative bg-background-light p-8 rounded-md border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-6xl font-bold text-primary group-hover:opacity-20 transition-opacity">01</div>
                            <div className="w-14 h-14 bg-primary text-white rounded flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">inventory_2</span>
                            </div>
                            <h3 className="font-display text-xl font-bold text-primary mb-3">Identificación de Carga</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Registro detallado de equipos y evaluación de requerimientos técnicos de transporte (peso, dimensiones, fragilidad).
                            </p>
                        </div>
                        <div className="group relative bg-background-light p-8 rounded-md border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-6xl font-bold text-primary group-hover:opacity-20 transition-opacity">02</div>
                            <div className="w-14 h-14 bg-white text-primary border border-primary/20 rounded flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">pallet</span>
                            </div>
                            <h3 className="font-display text-xl font-bold text-primary mb-3">Consolidación y Resguardo</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Almacenamiento especializado en Miami con manejo de carga frágil, peligrosa y pesada. Embalaje industrial certificado.
                            </p>
                        </div>
                        <div className="group relative bg-background-light p-8 rounded-md border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-6xl font-bold text-primary group-hover:opacity-20 transition-opacity">03</div>
                            <div className="w-14 h-14 bg-accent text-white rounded flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">local_shipping</span>
                            </div>
                            <h3 className="font-display text-xl font-bold text-primary mb-3">Despacho y Entrega Crítica</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Gestión aduanal experta, nacionalización y entrega directa en planta industrial o sitio de obra con grúas si es requerido.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Urgencies Section */}
            <section className="relative py-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-accent text-sm">emergency</span>
                                <span className="font-mono text-xs text-accent font-bold tracking-wider uppercase">SERVICIO CRÍTICO</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                                Urgencias en<br />
                                <span className="text-accent">menos de 72 horas.</span>
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
                                Para cuando la línea de producción no puede detenerse. Importa repuestos críticos, maquinaria pesada o equipos industriales con prioridad máxima de embarque y despacho aduanal preferencial.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="bg-accent/20 p-1 rounded">
                                        <span className="material-symbols-outlined text-accent text-xl">settings_alert</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold font-display">Repuestos Críticos</h4>
                                        <p className="text-sm text-gray-400">Solución inmediata para líneas de producción detenidas.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-accent/20 p-1 rounded">
                                        <span className="material-symbols-outlined text-accent text-xl">precision_manufacturing</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold font-display">Maquinaria Paralizada</h4>
                                        <p className="text-sm text-gray-400">Logística de emergencia para reactivación operativa.</p>
                                    </div>
                                </li>
                            </ul>
                            <button className="flex items-center gap-2 px-6 h-11 border border-accent text-accent hover:bg-accent hover:text-white font-bold rounded transition-colors text-sm uppercase tracking-wide">
                                Solicitar Envío Urgente
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="relative bg-secondary/80 backdrop-blur-md border border-white/10 rounded-lg p-1 overflow-hidden shadow-2xl">
                                <div className="bg-black/30 px-4 py-2 flex justify-between items-center border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="font-mono text-xs text-gray-500">INDUSTRIAL_LOGISTICS_DASHBOARD</span>
                                </div>
                                <div className="p-6 relative">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="text-xs text-gray-400 font-mono mb-1">PART NUMBER</div>
                                            <div className="text-white font-mono text-xl tracking-wider">CAT-3406-E</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-400 font-mono mb-1">STATUS</div>
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                                AOG / Crítico
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-xs text-gray-400 font-mono">
                                            <span>MIAMI HUB</span>
                                            <span>PLANTA VALENCIA</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                                            <div className="absolute left-0 top-0 h-full w-3/4 bg-accent shadow-[0_0_15px_rgba(0,191,166,0.5)]"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1">ETA Planta</div>
                                                <div className="text-white font-display font-bold text-lg">14:00 HRS</div>
                                            </div>
                                            <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1">Peso Neto</div>
                                                <div className="text-white font-display font-bold text-lg">850 KG</div>
                                            </div>
                                            <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1">Tipo</div>
                                                <div className="text-red-400 font-display font-bold text-lg">URGENT</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-9xl">conveyor_belt</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-background-light relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#0A192F 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Soluciones para su Industria</h2>
                    <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">Solicite una cotización técnica detallada para su proyecto de importación. Transparencia en costos de flete, seguro y nacionalización.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="flex items-center justify-center px-8 h-12 bg-accent hover:bg-teal-400 text-white text-base font-bold rounded shadow-lg shadow-black/10 transition-colors">
                            Cotizar Proyecto
                        </button>
                        <button className="flex items-center justify-center px-8 h-12 bg-transparent border border-primary/20 text-primary text-base font-bold rounded hover:bg-black/5 transition-colors">
                            Contactar Ventas B2B
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
