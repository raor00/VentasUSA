"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/* ── Types ─────────────────────────────────────────── */
export interface Shipment {
    id: string;
    manifestId: string;
    equipment: string;
    volume: number;
    value: number;
    status: "en_miami" | "en_transito" | "por_retirar" | "entregado";
    statusLabel: string;
    date: string;
}

export interface AdminPackage {
    id: string;
    manifestId: string;
    icon: string;
    equipment: string;
    client: string;
    clientId: string;
    date: string;
    weight: number;
    volume: number;
    status: string;
    statusColor: string;
    statusBg: string;
    statusBorder?: string;
    selected?: boolean;
}

export interface TrackingStep {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    icon: string;
    status: "active" | "completed" | "pending";
}

export interface TrackingInfo {
    id: string;
    title: string;
    type: string;
    bolNumber: string;
    containerId: string;
    weight: string;
    volumeStr: string;
    status: string;
    steps: TrackingStep[];
    documents: { name: string; verified: boolean }[];
    nextSteps: { title: string; subtitle: string; icon: string }[];
}

export interface User {
    name: string;
    shortName: string;
    lockerId: string;
    address: string;
    unit: string;
    city: string;
    avatar: string;
}

interface StoreState {
    user: User;
    shipments: Shipment[];
    adminPackages: AdminPackage[];
    trackingInfo: TrackingInfo;
    addAdminPackage: (pkg: Omit<AdminPackage, "id">) => void;
    togglePackageSelection: (id: string) => void;
    selectedPackages: AdminPackage[];
}

/* ── Mock Data ─────────────────────────────────────── */
const mockUser: User = {
    name: "Alex",
    shortName: "Alex M.",
    lockerId: "V-12894",
    address: "1350 NW 121st Ave",
    unit: "Unit V-12894",
    city: "Miami, FL 33182",
    avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWjZb-8W5UDKKa7NVufXSdPA8UxGxlWHtfxVTBeBCJRKEPyJxmDKC0aiNSmvkphvPTHiufdBKeZW6vFZRZmxCe_cash2tPyok2tG_GmgFqVALwNMtZq8wIPAddoUZQnKFG-xNwZTULjtqW9wbIAsS_3Hu612m7vii6aINCfN_Pa9KFtAdDijaO9YsmthJtXRmZhHndXRQckvGd2RwufAFEGNiVq71PDtAneMitQqRpN58RCkmZlrsD1jMC2TU5q2T0f9ocZhRrZmwp",
};

const mockShipments: Shipment[] = [
    { id: "1", manifestId: "MNF-9901", equipment: "CAT 3406-E Engine Parts", volume: 45.5, value: 12400, status: "por_retirar", statusLabel: "Por Retirar", date: "2023-10-24" },
    { id: "2", manifestId: "MNF-8842", equipment: "Industrial UPS System", volume: 120.0, value: 45000, status: "en_transito", statusLabel: "En Tránsito", date: "2023-10-23" },
    { id: "3", manifestId: "MNF-7721", equipment: "Hydraulic Pump Assembly", volume: 12.5, value: 8200, status: "en_miami", statusLabel: "En Miami", date: "2023-10-22" },
    { id: "4", manifestId: "MNF-6610", equipment: "Komatsu PC200 Boom Cylinder", volume: 35.0, value: 18500, status: "en_miami", statusLabel: "En Miami", date: "2023-10-21" },
    { id: "5", manifestId: "MNF-5509", equipment: "Atlas Copco Compressor Unit", volume: 88.0, value: 32000, status: "en_miami", statusLabel: "En Miami", date: "2023-10-20" },
    { id: "6", manifestId: "MNF-4408", equipment: "Siemens PLC Module S7-1500", volume: 2.5, value: 6800, status: "en_miami", statusLabel: "En Miami", date: "2023-10-19" },
    { id: "7", manifestId: "MNF-3307", equipment: "Cummins ISX15 Turbocharger", volume: 8.0, value: 4200, status: "en_miami", statusLabel: "En Miami", date: "2023-10-18" },
    { id: "8", manifestId: "MNF-2206", equipment: "Volvo EC480 Track Assembly", volume: 65.0, value: 22000, status: "en_transito", statusLabel: "En Tránsito", date: "2023-10-17" },
];

const mockAdminPackages: AdminPackage[] = [
    { id: "1", manifestId: "MAN-CAT-9022", icon: "precision_manufacturing", equipment: "Motor Caterpillar C15", client: "Mining Solutions SA", clientId: "ENT-99", date: "25 Oct, 08:30 AM", weight: 1450.0, volume: 4.2, status: "AOG", statusColor: "text-white", statusBg: "bg-red-600", statusBorder: "border-red-700" },
    { id: "2", manifestId: "MAN-GEN-500K", icon: "factory", equipment: "Generador Eléctrico 500kVA", client: "Global Energy Corp", clientId: "ENT-12", date: "25 Oct, 07:15 AM", weight: 2100.5, volume: 8.5, status: "CARGA CRÍTICA", statusColor: "text-white", statusBg: "bg-amber-500" },
    { id: "3", manifestId: "MAN-HYD-P4", icon: "widgets", equipment: "Repuestos Hidráulicos (Pallet 4)", client: "Hydro-Systems LLC", clientId: "ENT-44", date: "24 Oct, 04:30 PM", weight: 420.0, volume: 1.2, status: "PROCESADO", statusColor: "text-blue-800", statusBg: "bg-blue-100", statusBorder: "border-blue-200" },
    { id: "4", manifestId: "MAN-TRF-220", icon: "bolt", equipment: "Transformador 220kV", client: "ElectroVen CA", clientId: "ENT-55", date: "24 Oct, 02:00 PM", weight: 3200.0, volume: 12.0, status: "EN ALMACÉN", statusColor: "text-emerald-800", statusBg: "bg-emerald-100", statusBorder: "border-emerald-200" },
    { id: "5", manifestId: "MAN-PMP-K8", icon: "water_pump", equipment: "Bomba Centrífuga Kirloskar", client: "AguaPura Systems", clientId: "ENT-78", date: "23 Oct, 11:45 AM", weight: 680.0, volume: 2.8, status: "EN TRÁNSITO", statusColor: "text-amber-800", statusBg: "bg-amber-100", statusBorder: "border-amber-200" },
];

const mockTracking: TrackingInfo = {
    id: "1",
    title: "Turbina Hidráulica Siemens SGT-800",
    type: "Carga Sobredimensionada",
    bolNumber: "MSCU-882910-B",
    containerId: "MSKU 928371-4",
    weight: "24,500 KG",
    volumeStr: "115.00 m³",
    status: "En Tránsito",
    documents: [
        { name: "Commercial Invoice", verified: true },
        { name: "Packing List", verified: true },
        { name: "Bill of Lading (BL)", verified: true },
    ],
    steps: [
        { id: 1, title: "Despacho Marítimo Internacional", description: "Contenedor cargado y en tránsito desde Port of Miami hacia Puerto de La Guaira. Naviera MSC confirma zarpe.", date: "Oct 20, 2023", time: "14:30 EST", location: "Port of Miami > La Guaira", icon: "flight_takeoff", status: "active" },
        { id: 2, title: "Consolidación en Almacén Miami", description: "Carga consolidada, embalaje industrial certificado y documentación aduanal preparada.", date: "Oct 19, 2023", time: "09:15 EST", location: "Miami Warehouse", icon: "local_shipping", status: "completed" },
        { id: 3, title: "Inspección y Verificación Técnica", description: "Equipo inspeccionado por ingenieros certificados. Dimensiones y peso verificados contra BL.", date: "Oct 18, 2023", time: "16:45 EST", location: "Miami Warehouse", icon: "inventory_2", status: "completed" },
        { id: 4, title: "Orden de Servicio Creada", description: "Logística de carga crítica configurada y aprobada por el departamento técnico.", date: "Oct 15, 2023", time: "10:20 EST", location: "User Dashboard", icon: "shopping_cart", status: "completed" },
    ],
    nextSteps: [
        { title: "Llegada Pto. La Guaira", subtitle: "Pendiente Atraque", icon: "anchor" },
        { title: "Nacionalización (Aduana)", subtitle: "Proceso Legal", icon: "gavel" },
        { title: "Entrega en Planta", subtitle: "Sidor, Puerto Ordaz", icon: "factory" },
    ],
};

/* ── Context ───────────────────────────────────────── */
const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [shipments] = useState<Shipment[]>(mockShipments);
    const [adminPackages, setAdminPackages] = useState<AdminPackage[]>(mockAdminPackages);
    const [trackingInfo] = useState<TrackingInfo>(mockTracking);

    const addAdminPackage = (pkg: Omit<AdminPackage, "id">) => {
        setAdminPackages((prev) => [
            { ...pkg, id: String(prev.length + 1) },
            ...prev,
        ]);
    };

    const togglePackageSelection = (id: string) => {
        setAdminPackages((prev) =>
            prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
        );
    };

    const selectedPackages = adminPackages.filter((p) => p.selected);

    return (
        <StoreContext.Provider
            value={{
                user: mockUser,
                shipments,
                adminPackages,
                trackingInfo,
                addAdminPackage,
                togglePackageSelection,
                selectedPackages,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within StoreProvider");
    return context;
}
