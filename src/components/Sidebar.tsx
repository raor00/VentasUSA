"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface NavItem {
    label: string;
    icon: string;
    href: string;
}



const userNavItems: NavItem[] = [
    { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
    { label: "Centro de Operaciones", icon: "monitoring", href: "/dashboard?view=operations" },
    { label: "Guías de Carga", icon: "inventory_2", href: "/dashboard?view=guides" },
    { label: "Almacén", icon: "warehouse", href: "/dashboard?view=warehouse" },
    { label: "Despachos", icon: "local_shipping", href: "/dashboard?view=dispatch" },
    { label: "Configuración", icon: "settings", href: "/dashboard?view=settings" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view');

    const items = userNavItems;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavigate = () => setMobileOpen(false);
    const handleLogout = () => {
        setMobileOpen(false);
        router.push("/login");
    };

    const isActive = (item: NavItem) => {
        if (item.href.includes('view=')) {
            const view = item.href.split('view=')[1];
            return pathname === '/dashboard' && currentView === view;
        }

        return pathname === item.href && !currentView;
    };

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]">anchor</span>
                    </div>
                    <span className="font-display font-bold text-lg text-primary">
                        Ventas en USA
                    </span>
                </Link>
                <button className="text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
                    <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
                    <aside className="w-64 h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <SidebarContent items={items} isActive={isActive} onNavigate={handleNavigate} onLogout={handleLogout} />
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-full bg-white border-r border-slate-200 shadow-card z-10">
                <SidebarContent items={items} isActive={isActive} onNavigate={handleNavigate} onLogout={handleLogout} />
            </aside>
        </>
    );
}

function SidebarContent({
    items,
    isActive,
    onNavigate,
    onLogout,
}: {
    items: NavItem[];
    isActive: (item: NavItem) => boolean;
    onNavigate: () => void;
    onLogout: () => void;
}) {
    return (
        <>
            {/* Logo Area */}
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[20px]">anchor</span>
                </div>
                <h1 className="font-display font-bold text-lg tracking-tight text-primary">
                    Ventas en USA
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {items.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive(item)
                                ? "bg-secondary text-white"
                                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                            }`}
                    >
                        <span
                            className={`material-symbols-outlined text-[22px] ${isActive(item) ? "text-white" : "text-slate-500"}`}
                            style={isActive(item) ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            {item.icon}
                        </span>
                        <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full bg-slate-200 bg-center bg-cover"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWjZb-8W5UDKKa7NVufXSdPA8UxGxlWHtfxVTBeBCJRKEPyJxmDKC0aiNSmvkphvPTHiufdBKeZW6vFZRZmxCe_cash2tPyJxmDKC0aiNSmvkphvPTHiufdBKeZW6vFZRZmxCe_cash2tPyok2tG_GmgFqVALwNMtZq8wIPAddoUZQnKFG-xNwZTULjtqW9wbIAsS_3Hu612m7vii6aINCfN_Pa9KFtAdDijaO9YsmthJtXRmZhHndXRQckbGd2RwufAFEGNiVq71PDtAneMitQqRpN58RCkmZlrsD1jMC2TU5q2T0f9ocZhRrZmwp')`,
                        }}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary font-display">
                            Alex M.
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                            ID: V-12894
                        </span>
                    </div>
                    <button className="ml-auto text-slate-400 hover:text-primary transition-colors" onClick={onLogout} type="button">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}
