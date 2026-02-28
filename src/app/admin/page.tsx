"use client";

import Sidebar from "@/components/Sidebar";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";

export default function AdminDashboard() {
    const { adminPackages, togglePackageSelection, selectedPackages } = useStore();
    const [search, setSearch] = useState("");

    const filteredPackages = adminPackages.filter(pkg =>
        pkg.manifestId.toLowerCase().includes(search.toLowerCase()) ||
        pkg.client.toLowerCase().includes(search.toLowerCase()) ||
        pkg.equipment.toLowerCase().includes(search.toLowerCase())
    );

    const totalWeight = selectedPackages.reduce((acc, pkg) => acc + pkg.weight, 0);

    return (
        <div className="flex h-screen w-full bg-background-light">
            <Sidebar variant="admin" />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Top Header */}
                <header className="bg-surface h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="font-display font-bold text-xl text-primary tracking-tight">Centro de Control de Carga Industrial</h1>
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <div className="flex gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-mono font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Miami: En línea
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-mono font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Scanner: Activo
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                className="pl-9 pr-4 py-1.5 text-sm bg-background-light border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary w-64 transition-all"
                                placeholder="Buscar tracking, usuario..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute left-2.5 top-1.5 text-gray-400 text-[18px]">search</span>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-text-muted transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                    </div>
                </header>

                {/* Quick Ingest Bar */}
                <div className="bg-surface border-b border-gray-200 p-4 shadow-sm shrink-0 z-10">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">conveyor_belt</span> Ingreso de Manifiesto
                        </h2>
                        <div className="text-xs text-text-muted font-mono">Presiona [Enter] para guardar</div>
                    </div>
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">ID de Manifiesto / BOL</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[18px]">barcode_reader</span>
                                <input
                                    className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Escanea aquí..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="w-24">
                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Cliente</label>
                            <input className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded focus:ring-primary focus:border-primary" placeholder="V-1234" type="text" />
                        </div>
                        <div className="w-20">
                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Peso (KG)</label>
                            <input className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded focus:ring-primary focus:border-primary" placeholder="0.0" type="number" />
                        </div>
                        <div className="flex gap-1 items-end">
                            <div className="w-16">
                                <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Dim</label>
                                <input className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded focus:ring-primary focus:border-primary" placeholder='L"' type="number" />
                            </div>
                            <span className="text-gray-400 pb-2">x</span>
                            <div className="w-16">
                                <input className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded focus:ring-primary focus:border-primary" placeholder='W"' type="number" />
                            </div>
                            <span className="text-gray-400 pb-2">x</span>
                            <div className="w-16">
                                <input className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded focus:ring-primary focus:border-primary" placeholder='H"' type="number" />
                            </div>
                        </div>
                        <div className="w-32">
                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Tipo</label>
                            <select className="w-full px-2 py-2 text-xs border border-gray-300 rounded focus:ring-primary focus:border-primary bg-white">
                                <option>Pallet</option>
                                <option>Huacal</option>
                                <option>Maquinaria</option>
                                <option>Contenedor</option>
                            </select>
                        </div>
                        <button className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded shadow-sm font-bold text-sm flex items-center gap-2 h-[38px] transition-colors ml-auto">
                            <span className="material-symbols-outlined text-[18px]">add_box</span>
                            Ingresar
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-background-light px-6 py-3 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <select className="bg-white border border-gray-300 text-text-main py-1.5 px-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-sm">
                            <option>Todos los estados</option>
                            <option>En Almacén</option>
                            <option>En Tránsito</option>
                            <option>Entregado</option>
                        </select>
                        <div className="h-6 w-px bg-gray-300 mx-2"></div>
                        <label className="flex items-center gap-2 cursor-pointer group select-none">
                            <input className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                            <span className="text-sm font-medium text-text-muted group-hover:text-primary transition-colors">Modo Consolidación</span>
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-text-muted font-mono"><span className="font-bold text-text-main">{filteredPackages.length}</span> Paquetes</span>
                        <button className="p-1.5 text-text-muted hover:text-primary hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all">
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                        </button>
                        <button className="p-1.5 text-text-muted hover:text-primary hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all">
                            <span className="material-symbols-outlined text-[20px]">print</span>
                        </button>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="flex-1 overflow-auto bg-white border-t border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 sticky top-0 z-0 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 border-b border-gray-200 w-10">
                                    <input className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                                </th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider">ID Manifiesto</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider">Equipo / Contenido</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider">Cliente</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider">Recepción</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Peso (KG)</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Vol (M³)</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider text-center">Estado</th>
                                <th className="px-4 py-3 border-b border-gray-200 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPackages.map((pkg) => (
                                <tr key={pkg.id} className="group hover:bg-blue-50/50 transition-colors h-10">
                                    <td className="px-4 py-2 w-10">
                                        <input
                                            className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4"
                                            type="checkbox"
                                            checked={pkg.selected || false}
                                            onChange={() => togglePackageSelection(pkg.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px] text-gray-400">{pkg.icon}</span>
                                            <span className="font-mono text-sm text-primary font-medium">{pkg.manifestId}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-text-main font-bold">{pkg.equipment}</td>
                                    <td className="px-4 py-2 text-sm text-text-main">
                                        <span className="font-mono text-xs text-text-muted mr-1">{pkg.clientId}</span> {pkg.client}
                                    </td>
                                    <td className="px-4 py-2 font-mono text-xs text-text-muted">{pkg.date}</td>
                                    <td className="px-4 py-2 font-mono text-sm text-text-main text-right">{pkg.weight.toLocaleString()}</td>
                                    <td className="px-4 py-2 font-mono text-sm text-text-muted text-right">{pkg.volume.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${pkg.statusColor} ${pkg.statusBg} ${pkg.statusBorder ? 'border ' + pkg.statusBorder : ''}`}>
                                            {pkg.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <button className="text-gray-400 hover:text-primary">
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Floating Action Bar */}
                {selectedPackages.length > 0 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-lg shadow-lift py-3 px-6 flex items-center gap-6 z-30 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-3 border-r border-gray-600 pr-6">
                            <span className="bg-accent text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">{selectedPackages.length}</span>
                            <span className="font-medium text-sm">Paquetes seleccionados</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300 text-xs font-mono mr-2">
                            <span>Masa Total:</span> <span className="text-white font-bold">{totalWeight.toLocaleString()} kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="hover:bg-white/10 px-3 py-1.5 rounded transition-colors text-sm font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">print</span> Etiquetas
                            </button>
                            <button className="bg-accent hover:bg-emerald-400 text-primary px-4 py-1.5 rounded shadow-sm transition-colors text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">deployed_code</span> Consolidar
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
