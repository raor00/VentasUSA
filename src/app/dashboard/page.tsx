"use client";

import Sidebar from "@/components/Sidebar";
import { useStore } from "@/context/StoreContext";
import WarehouseManagement from "@/components/WarehouseManagement";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function UserDashboardContent() {
    const { user, shipments } = useStore();
    const [showWarehouse, setShowWarehouse] = useState(false);
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view");

    const inMiami = shipments.filter((s) => s.status === "en_miami").length;
    const inTransit = shipments.filter((s) => s.status === "en_transito").length;
    const readyPickup = shipments.filter((s) => s.status === "por_retirar").length;

    const isOperationsView = !currentView || currentView === "operations";
    const isGuidesView = currentView === "guides";
    const isWarehouseView = currentView === "warehouse";
    const isDispatchView = currentView === "dispatch";
    const isSettingsView = currentView === "settings";
    const showWarehousePanel = showWarehouse || isWarehouseView;

    const viewMeta: Record<string, { title: string; description: string }> = {
        operations: {
            title: "Centro de Operaciones Logísticas",
            description: "Visibilidad en vivo de aterrizaje, compuerta, montacarga, documentación y salida de carga crítica.",
        },
        guides: {
            title: "Guías de Carga y Control Documental",
            description: "Mesa documental para BL, invoice, packing list, soportes técnicos y liberación de carga por manifiesto.",
        },
        warehouse: {
            title: "Coordinación de Almacén",
            description: "Capacidad, recepción técnica, consolidación y preparación de salida para carga industrial priorizada.",
        },
        dispatch: {
            title: "Panel de Despachos",
            description: "Seguimiento de unidades listas para retiro, coordinación de transporte y cierre operativo de entregas críticas.",
        },
        settings: {
            title: "Configuración Operativa",
            description: "Preferencias del centro de control, alertas del equipo y parámetros del panel administrativo.",
        },
    };

    const activeMeta = currentView && viewMeta[currentView]
        ? viewMeta[currentView]
        : {
            title: "Centro de Control Logístico",
            description: "Panel administrativo para supervisar operación aérea, documentación, almacén y despacho de carga industrial.",
        };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-background-light">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 pb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Hola, {user.name}</h2>
                            <p className="text-slate-500 max-w-2xl">{activeMeta.description}</p>
                        </div>
                        <button
                            onClick={() => setShowWarehouse(!showWarehouse)}
                            className="group flex items-center justify-center gap-2 bg-accent hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="material-symbols-outlined text-[20px]">control_camera</span>
                            <span>{showWarehousePanel ? "Ocultar Monitoreo" : "Activar Monitoreo"}</span>
                        </button>
                    </div>

                    <section className="mb-6 rounded-2xl border border-primary/10 bg-white p-5 sm:p-6 shadow-card">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2 font-mono">
                                    {currentView ? "Vista especializada" : "Resumen ejecutivo"}
                                </p>
                                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">{activeMeta.title}</h3>
                                <p className="text-slate-500 mt-2 max-w-3xl">
                                    Este panel concentra los eventos que un administrador logístico necesita ver para decidir rápido y mover carga crítica sin perder trazabilidad.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-0">
                                {[
                                    { label: "Aeronave", value: "En pista" },
                                    { label: "Compuerta", value: "Abierta" },
                                    { label: "Docs", value: "Al día" },
                                    { label: "Despacho", value: `${readyPickup} listo` },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400">{item.label}</p>
                                        <p className="font-display font-bold text-primary text-sm sm:text-base">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {showWarehouse && !isWarehouseView && <WarehouseManagement />}

                    {isOperationsView && (
                        <>
                            <section className="mb-8 rounded-2xl border border-primary/10 bg-linear-to-r from-primary via-secondary to-[#14304d] p-6 text-white shadow-lift">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-blue-200 mb-2 font-mono">Operacion en vivo</p>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Vuelo VU-CARGO-019 en proceso de descarga</h3>
                                        <p className="text-blue-100/80 max-w-2xl">Aterrizaje completado, compuerta trasera abierta y montacarga realizando extracción de mercancía crítica.</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                                        {[
                                            { label: "Pista", value: "OK", tone: "text-white" },
                                            { label: "Compuerta", value: "Abierta", tone: "text-blue-300" },
                                            { label: "Montacarga", value: "Activo", tone: "text-white" },
                                        ].map((item) => (
                                            <div key={item.label} className="rounded-xl border border-white/15 bg-white/8 p-3 text-center">
                                                <p className="text-[10px] uppercase text-blue-200/80">{item.label}</p>
                                                <p className={`font-display font-bold text-lg ${item.tone}`}>{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {[
                                            { label: "En Miami", value: inMiami, detail: "Manifiestos procesados", icon: "warehouse", color: "text-blue-600" },
                                            { label: "En Tránsito", value: inTransit, detail: "Llegada estimada jueves", icon: "flight_takeoff", color: "text-amber-500" },
                                            { label: "Por Retirar", value: readyPickup, detail: "Lista para montacarga", icon: "forklift", color: "text-accent" },
                                        ].map((card) => (
                                            <div key={card.label} className="bg-white p-5 rounded border border-slate-100 shadow-card relative overflow-hidden">
                                                <div className={`absolute top-0 right-0 p-3 opacity-10 ${card.color}`}>
                                                    <span className="material-symbols-outlined text-[64px]">{card.icon}</span>
                                                </div>
                                                <div className="relative z-10">
                                                    <span className="text-slate-500 font-medium text-sm mb-1 block">{card.label}</span>
                                                    <span className={`font-display font-bold text-[42px] leading-none ${card.color}`}>{card.value}</span>
                                                    <span className="text-xs text-slate-500 mt-2 font-medium block">{card.detail}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-white rounded border border-slate-100 shadow-card p-5">
                                        <h3 className="font-display font-bold text-lg text-primary mb-4">Secuencia Operativa</h3>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            {[
                                                { icon: "flight_land", title: "Aterrizaje", desc: "Aeronave confirmada en plataforma" },
                                                { icon: "garage_door", title: "Compuerta", desc: "Rampa activa y corredor asegurado" },
                                                { icon: "forklift", title: "Extracción", desc: "Carga crítica en movimiento" },
                                            ].map((step, index) => (
                                                <div key={step.title} className="rounded-xl border border-slate-200 p-4 bg-slate-50/70">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="material-symbols-outlined text-accent">{step.icon}</span>
                                                        <span className="text-xs font-mono text-slate-400">0{index + 1}</span>
                                                    </div>
                                                    <p className="font-semibold text-primary">{step.title}</p>
                                                    <p className="text-sm text-slate-500">{step.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded border border-slate-100 shadow-card overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                            <h3 className="font-display font-bold text-lg text-primary">Cargas críticas en seguimiento</h3>
                                            <a className="text-sm font-medium text-accent hover:text-blue-700 transition-colors" href="#">Ver operación completa</a>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="text-xs text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100">
                                                        <th className="px-6 py-3 font-mono">ID Manifiesto</th>
                                                        <th className="px-6 py-3">Equipo / Contenido</th>
                                                        <th className="px-6 py-3 text-right">Vol. (ft³)</th>
                                                        <th className="px-6 py-3 text-right">Valor ($)</th>
                                                        <th className="px-6 py-3">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {shipments.slice(0, 4).map((shipment) => (
                                                        <tr key={shipment.id} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                                                            <td className="px-6 py-4 font-mono text-slate-600 font-medium">{shipment.manifestId}</td>
                                                            <td className="px-6 py-4 font-medium text-slate-800">{shipment.equipment}</td>
                                                            <td className="px-6 py-4 text-slate-500 text-right">{shipment.volume.toFixed(1)}</td>
                                                            <td className="px-6 py-4 text-slate-500 text-right">${shipment.value.toLocaleString()}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${shipment.status === "por_retirar"
                                                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                                                    : shipment.status === "en_transito"
                                                                        ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                        : "bg-blue-100 text-blue-800 border-blue-200"
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

                                <div className="lg:col-span-1 space-y-6">
                                    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded p-6 shadow-card text-white relative overflow-hidden">
                                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-3 text-accent">
                                                <span className="material-symbols-outlined text-[20px]">sensors</span>
                                                <span className="text-xs font-bold uppercase tracking-wider">Alertas tácticas</span>
                                            </div>
                                            <h4 className="font-display font-bold text-lg mb-2">Zona de rampa estabilizada</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">Compuerta, montacarga y equipo de apoyo alineados para retiro sin cuello de botella.</p>
                                            <a className="text-sm font-medium text-white underline decoration-accent underline-offset-4 hover:text-accent transition-colors" href="#">Ver checklist de descarga →</a>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded border border-slate-100 p-5 shadow-card">
                                        <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Prioridades del turno</h4>
                                        <div className="space-y-4">
                                            {[
                                                { title: "Carga AOG", detail: "Motor Caterpillar C15 listo para liberación" },
                                                { title: "Documentos", detail: "1 manifiesto requiere validación final" },
                                                { title: "Despacho", detail: "Ventana de salida abierta hasta 18:00" },
                                            ].map((item) => (
                                                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                                    <p className="font-semibold text-primary text-sm">{item.title}</p>
                                                    <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded border border-slate-100 p-5 shadow-card">
                                        <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Capacidad de almacén</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-slate-500">Capacidad próximo vuelo</span>
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
                                                    <span className="text-xs text-slate-500 font-medium">Próxima salida</span>
                                                    <span className="text-sm font-bold text-slate-800">Viernes, 25 Oct</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isGuidesView && (
                        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                            <div className="xl:col-span-2 space-y-6">
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Completas", value: "12", detail: "Guías listas para liberación" },
                                        { label: "En revisión", value: "04", detail: "Pendientes de validar" },
                                        { label: "Críticas", value: "02", detail: "Frenan despacho prioritario" },
                                    ].map((card) => (
                                        <div key={card.label} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                            <p className="text-xs uppercase tracking-wide text-slate-400">{card.label}</p>
                                            <p className="font-display font-bold text-4xl text-primary mt-2">{card.value}</p>
                                            <p className="text-sm text-slate-500 mt-2">{card.detail}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                        <h3 className="font-display font-bold text-lg text-primary">Mesa documental de carga</h3>
                                        <p className="text-sm text-slate-500 mt-1">BL, invoice, packing list, soporte fotográfico, ficha técnica y liberación final.</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-xs text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100">
                                                    <th className="px-6 py-3 font-mono">Manifiesto</th>
                                                    <th className="px-6 py-3">Documentos</th>
                                                    <th className="px-6 py-3">Responsable</th>
                                                    <th className="px-6 py-3">Estado</th>
                                                    <th className="px-6 py-3 text-right">Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {[
                                                    { id: "MAN-CAT-9022", docs: "BL + Invoice + Packing List", owner: "Mesa Miami", status: "Completo", tone: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                                                    { id: "MAN-GEN-500K", docs: "Factura + guía técnica + fotos", owner: "Operaciones", status: "En revisión", tone: "bg-amber-100 text-amber-800 border-amber-200" },
                                                    { id: "MAN-PMP-K8", docs: "Checklist de retiro + liberación", owner: "Despacho", status: "Pendiente firma", tone: "bg-blue-100 text-blue-800 border-blue-200" },
                                                ].map((row) => (
                                                    <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50">
                                                        <td className="px-6 py-4 font-mono text-primary font-medium">{row.id}</td>
                                                        <td className="px-6 py-4 text-slate-700">{row.docs}</td>
                                                        <td className="px-6 py-4 text-slate-500">{row.owner}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.tone}`}>{row.status}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right text-accent font-medium">Abrir expediente</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-card">
                                    <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-mono mb-2">Liberación documental</p>
                                    <h4 className="font-display font-bold text-xl mb-2">La guía correcta acelera el despacho</h4>
                                    <p className="text-blue-100/80 text-sm leading-relaxed">Aquí se valida lo que permite que una carga crítica no se quede detenida por una factura, un BL o una ficha técnica incompleta.</p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                    <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Pendientes urgentes</h4>
                                    <div className="space-y-3">
                                        {[
                                            "Validar factura comercial de generador 500kVA",
                                            "Confirmar liberación aduanal de bomba Kirloskar",
                                            "Adjuntar soporte fotográfico a carga sobredimensionada",
                                        ].map((item) => (
                                            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                    <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Checklist de documentos</h4>
                                    <div className="space-y-3 text-sm text-slate-600">
                                        <div className="flex items-center justify-between"><span>Bill of Lading</span><span className="text-emerald-600 font-semibold">OK</span></div>
                                        <div className="flex items-center justify-between"><span>Commercial Invoice</span><span className="text-amber-600 font-semibold">Revisar</span></div>
                                        <div className="flex items-center justify-between"><span>Packing List</span><span className="text-emerald-600 font-semibold">OK</span></div>
                                        <div className="flex items-center justify-between"><span>Ficha técnica</span><span className="text-blue-600 font-semibold">Pendiente</span></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {isWarehouseView && (
                        <section className="mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { label: "Recepciones del día", value: "18", detail: "7 con inspección técnica completa" },
                                    { label: "Capacidad ocupada", value: "85%", detail: "Pico previsto antes del próximo vuelo" },
                                    { label: "Consolidaciones", value: "06", detail: "Listas para salida prioritaria" },
                                ].map((card) => (
                                    <div key={card.label} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                        <p className="text-xs uppercase tracking-wide text-slate-400">{card.label}</p>
                                        <p className="font-display font-bold text-4xl text-primary mt-2">{card.value}</p>
                                        <p className="text-sm text-slate-500 mt-2">{card.detail}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid xl:grid-cols-3 gap-6">
                                <div className="xl:col-span-2">
                                    <WarehouseManagement />
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-card">
                                        <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-mono mb-2">Pulso de almacén</p>
                                        <h4 className="font-display font-bold text-xl mb-2">El almacén decide la velocidad real de la operación</h4>
                                        <p className="text-blue-100/80 text-sm leading-relaxed">Aquí se controla ingreso, pesaje, consolidación y preparación de salida para que la carga crítica no se estanque al aterrizar.</p>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                        <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Alertas de piso</h4>
                                        <div className="space-y-3">
                                            {[
                                                "Pallet CAT-9022 requiere reubicación por prioridad AOG",
                                                "2 cargas sobredimensionadas esperan montacarga de alto alcance",
                                                "Consolidación VU-019 debe cerrar antes de las 17:30",
                                            ].map((item) => (
                                                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                        <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Checklist operativo</h4>
                                        <div className="space-y-3 text-sm text-slate-600">
                                            <div className="flex items-center justify-between"><span>Recepción escaneada</span><span className="text-emerald-600 font-semibold">OK</span></div>
                                            <div className="flex items-center justify-between"><span>Pesaje validado</span><span className="text-emerald-600 font-semibold">OK</span></div>
                                            <div className="flex items-center justify-between"><span>Ubicación asignada</span><span className="text-amber-600 font-semibold">Revisar</span></div>
                                            <div className="flex items-center justify-between"><span>Salida programada</span><span className="text-blue-600 font-semibold">Pendiente</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {isDispatchView && (
                        <section className="mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Retiros hoy", value: "09", detail: "6 confirmados" },
                                    { label: "Despachos críticos", value: "03", detail: "1 AOG, 2 industriales" },
                                    { label: "Unidades en ruta", value: "04", detail: "Tracking activo" },
                                    { label: "Ventanas activas", value: "02", detail: "Hasta las 18:00" },
                                ].map((card) => (
                                    <div key={card.label} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                        <p className="text-xs uppercase tracking-wide text-slate-400">{card.label}</p>
                                        <p className="font-display font-bold text-4xl text-primary mt-2">{card.value}</p>
                                        <p className="text-sm text-slate-500 mt-2">{card.detail}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid xl:grid-cols-3 gap-6">
                                <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                        <h3 className="font-display font-bold text-lg text-primary">Mesa de despacho y retiro</h3>
                                        <p className="text-sm text-slate-500 mt-1">Coordinación de retiro, transporte asignado, destino final y ventana operativa.</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-xs text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100">
                                                    <th className="px-6 py-3 font-mono">Manifiesto</th>
                                                    <th className="px-6 py-3">Destino</th>
                                                    <th className="px-6 py-3">Unidad</th>
                                                    <th className="px-6 py-3">Ventana</th>
                                                    <th className="px-6 py-3">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {[
                                                    { id: "MAN-CAT-9022", dest: "Puerto Ordaz", unit: "TRK-12", slot: "14:00 - 15:00", status: "Listo para retiro", tone: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                                                    { id: "MAN-GEN-500K", dest: "Valencia", unit: "LOWBED-03", slot: "16:00 - 17:30", status: "Esperando liberación", tone: "bg-amber-100 text-amber-800 border-amber-200" },
                                                    { id: "MAN-PMP-K8", dest: "Barquisimeto", unit: "TRK-07", slot: "17:30 - 18:00", status: "Despacho confirmado", tone: "bg-blue-100 text-blue-800 border-blue-200" },
                                                ].map((row) => (
                                                    <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50">
                                                        <td className="px-6 py-4 font-mono text-primary font-medium">{row.id}</td>
                                                        <td className="px-6 py-4 text-slate-700">{row.dest}</td>
                                                        <td className="px-6 py-4 text-slate-500">{row.unit}</td>
                                                        <td className="px-6 py-4 text-slate-500">{row.slot}</td>
                                                        <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.tone}`}>{row.status}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-card">
                                        <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-mono mb-2">Coordinación final</p>
                                        <h4 className="font-display font-bold text-xl mb-2">Despacho no es “salida”, es cierre perfecto</h4>
                                        <p className="text-blue-100/80 text-sm leading-relaxed">Aquí se alinea liberación documental, ventana de retiro, unidad asignada y destino final para que la operación cierre sin fricción.</p>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                        <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Pendientes del despacho</h4>
                                        <div className="space-y-3">
                                            {[
                                                "Confirmar chofer asignado para MAN-CAT-9022",
                                                "Cerrar liberación final del generador 500kVA",
                                                "Notificar hora exacta de retiro al cliente industrial",
                                            ].map((item) => (
                                                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                                        <h4 className="font-display font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Checklist de salida</h4>
                                        <div className="space-y-3 text-sm text-slate-600">
                                            <div className="flex items-center justify-between"><span>Liberación documental</span><span className="text-emerald-600 font-semibold">OK</span></div>
                                            <div className="flex items-center justify-between"><span>Unidad asignada</span><span className="text-emerald-600 font-semibold">OK</span></div>
                                            <div className="flex items-center justify-between"><span>Chofer confirmado</span><span className="text-amber-600 font-semibold">Revisar</span></div>
                                            <div className="flex items-center justify-between"><span>Cierre de entrega</span><span className="text-blue-600 font-semibold">Pendiente</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {isSettingsView && (
                        <section className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-card p-5 sm:p-6">
                            <h3 className="font-display font-bold text-xl text-primary mb-3">Configuración del centro de control</h3>
                            <p className="text-slate-500">Este espacio queda preparado para preferencias del panel, alertas y reglas operativas del equipo administrativo.</p>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function UserDashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-background-light" />}>
            <UserDashboardContent />
        </Suspense>
    );
}
