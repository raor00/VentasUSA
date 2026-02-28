"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [trackingId, setTrackingId] = useState("");

    return (
        <main className="relative flex flex-col min-h-screen overflow-x-hidden">
            <Navbar onQuoteClick={() => setQuoteOpen(true)} />

            {/* ── Hero Section ─────────────────────────────────── */}
            <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-40 overflow-hidden bg-white">
                {/* Background gradient blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Left: Copy */}
                        <div className="flex flex-col gap-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-xs font-bold text-accent tracking-wide uppercase">Courier Industrial &amp; Empresarial</span>
                            </div>
                            <h1 className="font-display text-5xl lg:text-6xl font-bold leading-[1.1] text-primary tracking-tight">
                                Traemos lo que<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">tu empresa necesita.</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                Repuestos, herramientas, maquinaria, equipos tecnológicos o cualquier insumo industrial. Lo buscamos, lo compramos y lo entregamos directamente a tu empresa o planta.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                <button
                                    onClick={() => setQuoteOpen(true)}
                                    className="flex items-center justify-center px-8 h-12 bg-accent hover:bg-teal-500 text-white text-base font-bold rounded shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
                                >
                                    <span className="material-symbols-outlined mr-2 text-xl">request_quote</span>
                                    Cotizar Ahora
                                </button>
                                <button className="flex items-center justify-center px-8 h-12 bg-white border border-gray-200 text-primary text-base font-bold rounded hover:bg-gray-50 transition-colors group">
                                    <span className="material-symbols-outlined mr-2 text-xl group-hover:translate-x-1 transition-transform">play_circle</span>
                                    Cómo Funciona
                                </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm font-medium text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-accent text-lg">verified</span>
                                    <span>Empresa Certificada</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-accent text-lg">shield</span>
                                    <span>Seguro de Carga 100%</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-accent text-lg">support_agent</span>
                                    <span>Soporte 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Tracking Widget */}
                        <div className="relative lg:h-[580px] flex items-center justify-center">
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60"></div>
                            <div className="relative w-full max-w-lg mx-auto space-y-4">
                                {/* Hero image */}
                                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                    <img
                                        alt="Courier industrial entregando repuestos y herramientas"
                                        className="w-full h-72 object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb1HihySoq4hEsRy7nJWIRxJAdbkUrAO9LOqZxYFEcDT-IdXW-bMwCyqKuNeMFqlmnn4HabC-PNtfDP2FgSy6nuAb1tCXPPgK3WG1ZWbpCWPAkkEAHti6M23fQUTv4o0YgYcAw4jXADaM3Vx1MN9JKEZ_7g7Mt_RYSXpcXGZ6a8mEqkKKkKj9GsBqbLi6IxK8vuzXHRiGFCxbsEJHcwZL_35Ads6Y5e1HFm3bD1MzNbfPwevCltGHAsbg3M9o7RIHkJLvYTw9P2TEh"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
                                            <span className="text-white text-sm font-bold font-mono">ENVÍO EN TRÁNSITO</span>
                                        </div>
                                        <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">ETA: 48 HRS</span>
                                    </div>
                                </div>

                                {/* Tracking input card */}
                                <div className="bg-white p-5 rounded-xl shadow-lift border border-gray-100 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-display font-bold text-base text-primary">Rastrear mi Pedido</h3>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Operativo</span>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400">barcode_scanner</span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-24 py-3 bg-background-light border border-gray-200 rounded text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                            placeholder="VEU-9821-IND..."
                                            type="text"
                                            value={trackingId}
                                            onChange={(e) => setTrackingId(e.target.value)}
                                        />
                                        <button className="absolute inset-y-1 right-1 px-4 bg-primary text-white text-sm font-bold rounded hover:bg-secondary transition-colors">
                                            Localizar
                                        </button>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500 font-mono">Ingrese su número de guía o ID de pedido.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Ticker Bar ───────────────────────────────────── */}
            <div className="w-full bg-primary text-white py-3 overflow-hidden border-y border-white/10 relative z-20">
                <div className="ticker-wrap">
                    <div className="ticker">
                        <div className="inline-flex items-center gap-12 font-mono text-sm tracking-wide">
                            <span className="flex items-center gap-2"><span className="text-accent">🏭</span> Repuestos Industriales en Tránsito</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">✈️</span> Carga Aérea Consolidada: Salida 18:00</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">🔧</span> Herramientas Especializadas Disponibles</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">⚙️</span> Repuestos Críticos: Prioridad Alta</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">📦</span> Entregas Empresariales: Próximo Vuelo Viernes</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            {/* Duplicate for seamless wrap */}
                            <span className="flex items-center gap-2"><span className="text-accent">🏭</span> Repuestos Industriales en Tránsito</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">✈️</span> Carga Aérea Consolidada: Salida 18:00</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><span className="text-accent">🔧</span> Herramientas Especializadas Disponibles</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Stats Section ────────────────────────────────── */}
            <section className="py-16 bg-background-light border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "+500", label: "Empresas Atendidas", icon: "business" },
                            { value: "+12K", label: "Pedidos Entregados", icon: "inventory_2" },
                            { value: "98%", label: "Satisfacción del Cliente", icon: "thumb_up" },
                            { value: "72h", label: "Entrega Express Máx.", icon: "speed" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                                    <span className="material-symbols-outlined text-accent text-2xl">{stat.icon}</span>
                                </div>
                                <span className="font-display font-bold text-4xl text-primary mb-1">{stat.value}</span>
                                <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What We Bring Section ────────────────────────── */}
            <section id="servicios" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">category</span>
                            <span className="text-xs font-bold text-primary tracking-wide uppercase">Catálogo de Servicios</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">¿Qué podemos traerte?</h2>
                        <p className="text-slate-600 text-lg">Si existe en el mercado, lo conseguimos. Desde un tornillo especializado hasta una turbina industrial completa.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "settings",
                                title: "Repuestos Industriales",
                                desc: "Piezas para maquinaria pesada, motores, bombas hidráulicas, compresores, turbinas y cualquier componente industrial.",
                                tags: ["CAT", "Komatsu", "Cummins", "Siemens"],
                                color: "bg-blue-50 text-blue-600",
                            },
                            {
                                icon: "construction",
                                title: "Herramientas Especializadas",
                                desc: "Herramientas de precisión, equipos de medición, instrumentación industrial y herramientas de mano profesionales.",
                                tags: ["Snap-on", "Fluke", "Hilti", "Bosch"],
                                color: "bg-amber-50 text-amber-600",
                            },
                            {
                                icon: "precision_manufacturing",
                                title: "Maquinaria y Equipos",
                                desc: "Maquinaria de producción, equipos de laboratorio, plantas de tratamiento y sistemas automatizados.",
                                tags: ["Pesada", "Ligera", "Automatizada"],
                                color: "bg-purple-50 text-purple-600",
                            },
                            {
                                icon: "computer",
                                title: "Tecnología Empresarial",
                                desc: "Servidores, equipos de red, sistemas de seguridad, hardware especializado y tecnología de punta para empresas.",
                                tags: ["Cisco", "Dell", "HP", "IBM"],
                                color: "bg-teal-50 text-teal-600",
                            },
                            {
                                icon: "science",
                                title: "Insumos y Materiales",
                                desc: "Materiales de construcción especializada, químicos industriales, lubricantes, consumibles y materias primas.",
                                tags: ["Lubricantes", "Químicos", "Materiales"],
                                color: "bg-green-50 text-green-600",
                            },
                            {
                                icon: "medical_services",
                                title: "Equipos Médicos e Institucionales",
                                desc: "Equipamiento médico, laboratorial, hospitalario y para instituciones educativas o gubernamentales.",
                                tags: ["Hospitales", "Laboratorios", "Clínicas"],
                                color: "bg-red-50 text-red-600",
                            },
                        ].map((item) => (
                            <div key={item.title} className="group relative bg-background-light p-7 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-mono font-medium text-slate-500 bg-white border border-gray-200 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-accent text-xl">arrow_forward</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <p className="text-slate-500 text-sm mb-4">¿No encuentras lo que necesitas? Contáctanos directamente.</p>
                        <button
                            onClick={() => setQuoteOpen(true)}
                            className="inline-flex items-center gap-2 px-6 h-11 bg-primary hover:bg-secondary text-white font-bold rounded shadow-sm transition-colors text-sm"
                        >
                            <span className="material-symbols-outlined text-lg">chat</span>
                            Consultar Disponibilidad
                        </button>
                    </div>
                </div>
            </section>

            {/* ── How It Works ─────────────────────────────────── */}
            <section id="como-funciona" className="py-24 bg-background-light relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
                            <span className="material-symbols-outlined text-accent text-sm">route</span>
                            <span className="text-xs font-bold text-accent tracking-wide uppercase">Proceso Simple</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">Cómo Funciona</h2>
                        <p className="text-slate-600 text-lg">Un proceso transparente y eficiente de principio a fin.</p>
                    </div>
                    <div className="relative">
                        {/* Connector line */}
                        <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 z-0"></div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {[
                                {
                                    step: "01",
                                    icon: "request_quote",
                                    title: "Solicita tu Cotización",
                                    desc: "Dinos qué necesitas: marca, modelo, especificaciones técnicas. Recibe una cotización en menos de 2 horas.",
                                    color: "bg-primary text-white",
                                },
                                {
                                    step: "02",
                                    icon: "shopping_cart",
                                    title: "Aprobamos y Compramos",
                                    desc: "Una vez aprobada la cotización, nuestro equipo en USA localiza y adquiere el producto en los mejores proveedores.",
                                    color: "bg-white text-primary border border-primary/20",
                                },
                                {
                                    step: "03",
                                    icon: "flight_takeoff",
                                    title: "Enviamos a Venezuela",
                                    desc: "Consolidamos tu carga en Miami y la enviamos por vía aérea o marítima con seguimiento en tiempo real.",
                                    color: "bg-white text-primary border border-primary/20",
                                },
                                {
                                    step: "04",
                                    icon: "local_shipping",
                                    title: "Entrega en tu Empresa",
                                    desc: "Gestionamos la aduana y entregamos directamente en tu planta, almacén u oficina en Venezuela.",
                                    color: "bg-accent text-white",
                                },
                            ].map((item) => (
                                <div key={item.step} className="flex flex-col items-center text-center group">
                                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-background-light border-2 border-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-[9px] font-bold text-primary font-mono">{item.step}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-primary mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Industries Section ───────────────────────────── */}
            <section id="sectores" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-background-light to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
                                <span className="material-symbols-outlined text-primary text-sm">factory</span>
                                <span className="text-xs font-bold text-primary tracking-wide uppercase">Sectores que Atendemos</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                                Soluciones para cada<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">sector industrial.</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Trabajamos con empresas de todos los sectores productivos. Entendemos las necesidades específicas de cada industria y ofrecemos soluciones logísticas a medida.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: "oil_barrel", label: "Petróleo y Gas" },
                                    { icon: "factory", label: "Manufactura" },
                                    { icon: "bolt", label: "Energía Eléctrica" },
                                    { icon: "agriculture", label: "Agroindustria" },
                                    { icon: "local_hospital", label: "Salud y Farmacia" },
                                    { icon: "apartment", label: "Construcción" },
                                    { icon: "water", label: "Agua y Saneamiento" },
                                    { icon: "conveyor_belt", label: "Minería" },
                                ].map((sector) => (
                                    <div key={sector.label} className="flex items-center gap-3 p-3 rounded-lg bg-background-light hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all cursor-pointer group">
                                        <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                                            <span className="material-symbols-outlined text-primary text-lg">{sector.icon}</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{sector.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {/* Case study cards */}
                            {[
                                {
                                    company: "Planta Petroquímica",
                                    item: "Válvulas de control Emerson Fisher",
                                    time: "Entregado en 5 días",
                                    weight: "320 KG",
                                    status: "Entregado",
                                    statusColor: "bg-green-100 text-green-700",
                                },
                                {
                                    company: "Empresa Eléctrica Regional",
                                    item: "Transformadores ABB 220kV",
                                    time: "Entregado en 12 días",
                                    weight: "4,200 KG",
                                    status: "Entregado",
                                    statusColor: "bg-green-100 text-green-700",
                                },
                                {
                                    company: "Hospital Universitario",
                                    item: "Equipos de diagnóstico Siemens",
                                    time: "En tránsito",
                                    weight: "180 KG",
                                    status: "En Tránsito",
                                    statusColor: "bg-amber-100 text-amber-700",
                                },
                            ].map((c) => (
                                <div key={c.company} className="bg-background-light rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow group">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{c.company}</p>
                                            <h4 className="font-display font-bold text-primary text-sm">{c.item}</h4>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.statusColor}`}>{c.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                            {c.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">scale</span>
                                            {c.weight}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center pt-2">
                                <a href="#" className="text-sm font-bold text-accent hover:text-teal-600 transition-colors flex items-center justify-center gap-1">
                                    Ver más casos de éxito
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Urgency Section ──────────────────────────────── */}
            <section className="relative py-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-accent text-sm">emergency</span>
                                <span className="font-mono text-xs text-accent font-bold tracking-wider uppercase">SERVICIO URGENTE</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                                Urgencias en<br />
                                <span className="text-accent">menos de 72 horas.</span>
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
                                Cuando la línea de producción no puede detenerse. Importamos repuestos críticos, herramientas especializadas o cualquier insumo con prioridad máxima de embarque y despacho aduanal preferencial.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    { icon: "settings_alert", title: "Repuestos Críticos", desc: "Solución inmediata para líneas de producción detenidas." },
                                    { icon: "precision_manufacturing", title: "Maquinaria Paralizada", desc: "Logística de emergencia para reactivación operativa." },
                                    { icon: "verified_user", title: "Garantía Operativa", desc: "Prioridad absoluta sobre carga comercial estándar." },
                                ].map((item) => (
                                    <li key={item.title} className="flex items-start gap-3">
                                        <div className="bg-accent/20 p-1 rounded">
                                            <span className="material-symbols-outlined text-accent text-xl">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold font-display">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setQuoteOpen(true)}
                                className="flex items-center gap-2 px-6 h-11 bg-accent hover:bg-teal-400 text-white font-bold rounded transition-colors text-sm uppercase tracking-wide shadow-lg shadow-accent/20"
                            >
                                Solicitar Envío Urgente
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="relative bg-secondary/80 backdrop-blur-md border border-white/10 rounded-xl p-1 overflow-hidden shadow-2xl">
                                <div className="bg-black/30 px-4 py-2 flex justify-between items-center border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="font-mono text-xs text-gray-500">COURIER_INDUSTRIAL_DASHBOARD</span>
                                </div>
                                <div className="p-6 relative">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="text-xs text-gray-400 font-mono mb-1">PEDIDO #</div>
                                            <div className="text-white font-mono text-xl tracking-wider">VEU-CAT-9022</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-400 font-mono mb-1">STATUS</div>
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                                URGENTE
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-xs text-gray-400 font-mono">
                                            <span>MIAMI HUB</span>
                                            <span>PLANTA DESTINO</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                                            <div className="absolute left-0 top-0 h-full w-3/4 bg-accent shadow-[0_0_15px_rgba(0,191,166,0.5)]"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1">ETA</div>
                                                <div className="text-white font-display font-bold text-lg">48 HRS</div>
                                            </div>
                                            <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1">Peso</div>
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

            {/* ── Why Us Section ───────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">¿Por qué elegirnos?</h2>
                        <p className="text-slate-600 text-lg">Más de 10 años conectando empresas venezolanas con proveedores globales.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "search",
                                title: "Buscamos por Ti",
                                desc: "No necesitas tener el proveedor. Nuestro equipo en USA localiza el producto exacto que necesitas al mejor precio del mercado.",
                            },
                            {
                                icon: "gavel",
                                title: "Gestión Aduanal Completa",
                                desc: "Manejamos toda la documentación, permisos y trámites aduanales. Tú solo recibes tu pedido en la puerta.",
                            },
                            {
                                icon: "track_changes",
                                title: "Seguimiento en Tiempo Real",
                                desc: "Monitorea tu pedido en cada etapa del proceso desde nuestra plataforma digital, 24 horas al día.",
                            },
                            {
                                icon: "price_check",
                                title: "Precios Transparentes",
                                desc: "Cotización detallada con todos los costos incluidos: producto, flete, seguro y nacionalización. Sin sorpresas.",
                            },
                            {
                                icon: "support_agent",
                                title: "Asesoría Técnica",
                                desc: "Nuestros especialistas te ayudan a identificar el repuesto o equipo correcto según las especificaciones técnicas.",
                            },
                            {
                                icon: "local_shipping",
                                title: "Entrega Puerta a Puerta",
                                desc: "Desde el proveedor en USA hasta tu planta o almacén en Venezuela. Servicio completo sin intermediarios.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="group flex gap-5 p-6 rounded-xl bg-background-light hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300">
                                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-display text-lg font-bold text-primary mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Section ──────────────────────────────────── */}
            <section className="py-20 bg-background-light relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#0A192F 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="text-xs font-bold text-accent tracking-wide uppercase">Empieza Hoy</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">¿Listo para optimizar<br />tu cadena de suministro?</h2>
                    <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                        Solicita una cotización gratuita y recibe respuesta en menos de 2 horas. Sin compromisos, sin costos ocultos.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => setQuoteOpen(true)}
                            className="flex items-center justify-center gap-2 px-8 h-12 bg-accent hover:bg-teal-400 text-white text-base font-bold rounded shadow-lg shadow-black/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">request_quote</span>
                            Cotizar Gratis
                        </button>
                        <button className="flex items-center justify-center gap-2 px-8 h-12 bg-transparent border border-primary/20 text-primary text-base font-bold rounded hover:bg-black/5 transition-colors">
                            <span className="material-symbols-outlined text-xl">phone</span>
                            Hablar con un Asesor
                        </button>
                    </div>
                    <p className="mt-6 text-xs text-slate-400 font-mono">
                        📍 Miami, FL · 📞 +1 (305) 555-0123 · ✉️ ventas@ventasenusa.com
                    </p>
                </div>
            </section>

            <Footer />

            {/* ── Quote Modal ──────────────────────────────────── */}
            {quoteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setQuoteOpen(false)}>
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-primary px-6 py-5 flex items-center justify-between">
                            <div>
                                <h3 className="font-display font-bold text-xl text-white">Solicitar Cotización</h3>
                                <p className="text-blue-200 text-sm mt-0.5">Respuesta en menos de 2 horas</p>
                            </div>
                            <button
                                onClick={() => setQuoteOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nombre / Empresa</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                        placeholder="Empresa Industrial SA"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Teléfono / WhatsApp</label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                        placeholder="+58 412 000 0000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="compras@empresa.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Producto</label>
                                <select className="w-full px-3 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                                    <option value="">Seleccionar categoría...</option>
                                    <option>Repuestos Industriales</option>
                                    <option>Herramientas Especializadas</option>
                                    <option>Maquinaria y Equipos</option>
                                    <option>Tecnología Empresarial</option>
                                    <option>Insumos y Materiales</option>
                                    <option>Equipos Médicos</option>
                                    <option>Otro</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Descripción del Pedido</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-3 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                                    placeholder="Describe el producto: marca, modelo, número de parte, cantidad, especificaciones técnicas..."
                                />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <span className="material-symbols-outlined text-amber-500 text-xl">emergency</span>
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-amber-800">
                                    <input type="checkbox" className="rounded border-amber-300 text-amber-500 focus:ring-amber-400" />
                                    Es un pedido urgente (necesito en menos de 72 horas)
                                </label>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 pb-6 flex gap-3">
                            <button
                                onClick={() => setQuoteOpen(false)}
                                className="flex-1 px-4 py-3 border border-gray-200 text-slate-600 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                                Cancelar
                            </button>
                            <button className="flex-1 px-4 py-3 bg-accent hover:bg-teal-500 text-white font-bold rounded-lg shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">send</span>
                                Enviar Solicitud
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
