export default function Footer() {
    return (
        <footer className="bg-[#0A192F] border-t border-white/10 text-white/70 text-sm">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-y-6">
                    <div>
                        <div className="font-semibold tracking-tight text-white">VENTAS USA</div>
                        <div className="mt-0.5 text-xs">Importaciones urgentes • Logística de maquinaria pesada y repuestos</div>
                        <div className="mt-2 text-xs">Doral, Florida • +1 (305) 303-0502 • corporate@ventasusa.com</div>
                    </div>
                    <div className="flex flex-wrap gap-x-5 text-xs">
                        <a href="#animacion-ciclo" className="hover:text-white">Ciclo de Operatividad</a>
                        <a href="#mapa" className="hover:text-white">Ruta MIA-CCS</a>
                        <a href="#cta" className="hover:text-white">Cotizar</a>
                        <a href="/tracking" className="hover:text-white">Trazabilidad</a>
                    </div>
                    <div className="text-xs text-white/60">© {new Date().getFullYear()} Ventas USA. Capacidad AOG • Continuidad operativa.</div>
                </div>
                <div className="mt-6 text-[10px] text-white/50">Privacidad • Términos • Cumplimiento AOG</div>
            </div>
        </footer>
    );
}
