"use client";

import Sidebar from "@/components/Sidebar";
import { useStore } from "@/context/StoreContext";

export default function UserDashboard() {
    const { user, shipments } = useStore();

    return (
        <div className="flex h-screen w-full bg-background-light">
            <Sidebar variant="user" />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 pb-24">
                    {/* Top Section: Welcome & Actions */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Hola, {user.name}</h2>
                            <p className="text-slate-500">Gestión de activos industriales y logística pesada.</p>
                        </div>
                        <button className="group flex items-center justify-center gap-2 bg-accent hover:bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
                            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                            <span>Cotizar Carga Pesada</span>
                        </button>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Left Column: Status Stats (2/3 width) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Status Cards Container */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* In Miami Card */}
                                <div className="bg-white p-5 rounded border border-slate-100 shadow-card hover:shadow-lift transition-shadow group cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-blue-600">
                                        <span className="material-symbols-outlined text-[64px]">warehouse</span>
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <span className="text-slate-500 font-medium text-sm mb-1">En Miami</span>
                                        <span className="font-display font-bold text-[42px] leading-none text-blue-600">5</span>
                                        <span className="text-xs text-blue-600/80 mt-2 font-medium">Manifiestos Procesados</span>
                                    </div>
                                </div>
                                {/* In Transit Card */}
                                <div className="bg-white p-5 rounded border border-slate-100 shadow-card hover:shadow-lift transition-shadow group cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-amber-500">
                                        <span className="material-symbols-outlined text-[64px]">flight_takeoff</span>
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <span className="text-slate-500 font-medium text-sm mb-1">En Tránsito</span>
                                        <span className="font-display font-bold text-[42px] leading-none text-amber-500">2</span>
                                        <span className="text-xs text-amber-600/80 mt-2 font-medium">Llegada est: Jueves</span>
                                    </div>
                                </div>
                                {/* Ready for Pickup Card */}
                                <div className="bg-white p-5 rounded border border-slate-100 shadow-card hover:shadow-lift transition-shadow group cursor-pointer relative overflow-hidden ring-1 ring-accent/20">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-accent">
                                        <span className="material-symbols-outlined text-[64px]">local_shipping</span>
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-slate-500 font-medium text-sm">Por Retirar</span>
                                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                        </div>
                                        <span className="font-display font-bold text-[42px] leading-none text-accent">1</span>
                                        <span className="text-xs text-teal-600/80 mt-2 font-medium">Disponible en tienda</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Shipments Table */}
                            <div className="bg-white rounded border border-slate-100 shadow-card overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <h3 className="font-display font-bold text-lg text-primary">Cargas Recientes</h3>
                                    <a className="text-sm font-medium text-accent hover:text-teal-600 transition-colors" href="#">Ver todos</a>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-xs text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100">
                                                <th className="px-6 py-3 font-mono">ID Manifiesto</th>
                                                <th className="px-6 py-3">Equipo / Contenido</th>
                                                <th className="px-6 py-3 text-right">Vol. (ft³)</th>
                                                <th className="px-6 py-3 text-right">Valor ($)</th>
                                                <th className="px-6 py-3 text-center">Docs</th>
                                                <th className="px-6 py-3">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {shipments.slice(0, 3).map((shipment) => (
                                                <tr key={shipment.id} className="hover:bg-slate-50 transition-colors border-b border-slate-50 group cursor-pointer">
                                                    <td className="px-6 py-4 font-mono text-slate-600 group-hover:text-primary font-medium">{shipment.manifestId}</td>
                                                    <td className="px-6 py-4 font-medium text-slate-800">{shipment.equipment}</td>
                                                    <td className="px-6 py-4 text-slate-500 text-right">{shipment.volume.toFixed(1)}</td>
                                                    <td className="px-6 py-4 text-slate-500 text-right">${shipment.value.toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">picture_as_pdf</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${shipment.status === 'por_retirar' ? 'bg-teal-100 text-teal-800 border-teal-200' :
                                                                shipment.status === 'en_transito' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                                                    'bg-blue-100 text-blue-800 border-blue-200'
                                                            }`}>
                                                            {shipment.statusLabel}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Locker ID (1/3 width) */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Locker ID Card */}
                            <div className="relative w-full rounded-xl overflow-hidden shadow-lift group hover:-translate-y-1 transition-transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent z-0"></div>
                                <div className="absolute inset-0 opacity-10 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                <div className="relative z-10 p-6 flex flex-col h-full justify-between min-h-[220px]">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20">
                                            <span className="material-symbols-outlined text-white">fingerprint</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">Tu Casillero</p>
                                            <h3 className="text-white font-mono text-xl font-bold tracking-wider">{user.lockerId}</h3>
                                        </div>
                                    </div>
                                    <div className="mt-8 space-y-1">
                                        <p className="text-slate-300 text-xs uppercase tracking-wide font-medium">Shipping Address</p>
                                        <p className="text-white font-bold text-lg leading-tight">{user.address}</p>
                                        <p className="text-white/90 text-sm">{user.unit}</p>
                                        <p className="text-white/90 text-sm">{user.city}</p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-xs text-white/60 font-mono">Status: ACTIVO</span>
                                        <button className="flex items-center gap-2 bg-white text-primary hover:bg-slate-100 text-xs font-bold py-2 px-3 rounded shadow-sm transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                            Copiar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tip Pro Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded p-6 shadow-card text-white relative overflow-hidden">
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3 text-accent">
                                        <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">Tip Pro</span>
                                    </div>
                                    <h4 className="font-display font-bold text-lg mb-2">Aduana Industrial & Maquinaria</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">Servicio especializado en Heavy Machinery Handling. Gestión de permisos SADA y nacionalización de equipos críticos.</p>
                                    <a className="text-sm font-medium text-white underline decoration-accent underline-offset-4 hover:text-accent transition-colors" href="#">Servicio Express para Repuestos Críticos →</a>
                                </div>
                            </div>

                            {/* Warehouse Status */}
                            <div className="bg-white rounded border border-slate-100 p-5 shadow-card">
                                <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Estatus de Almacén</h4>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-500">Capacidad Próximo Vuelo</span>
                                            <span className="text-primary font-mono font-bold">85%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="p-2 rounded bg-green-50 text-green-600">
                                            <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Próxima Salida</span>
                                            <span className="text-sm font-bold text-slate-800">Viernes, 25 Oct</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
