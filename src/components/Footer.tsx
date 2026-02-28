import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-accent/20 p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-accent text-2xl">local_shipping</span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-display font-bold text-lg tracking-tight">VENTAS EN USA</span>
                                <span className="text-[9px] font-mono text-accent uppercase tracking-widest">Courier Industrial</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Courier especializado en el sector industrial y empresarial. Traemos repuestos, herramientas, maquinaria y cualquier insumo desde USA directamente a tu empresa en Venezuela.
                        </p>
                        <div className="flex gap-3">
                            <a
                                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                                href="#"
                                aria-label="Twitter"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a
                                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                                href="#"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
                                href="#"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-display font-bold text-base mb-6 text-white">Servicios</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Repuestos Industriales</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Herramientas Especializadas</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Maquinaria y Equipos</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Tecnología Empresarial</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Envíos Urgentes 72h</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Gestión Aduanal</a></li>
                        </ul>
                    </div>

                    {/* Sectors */}
                    <div>
                        <h4 className="font-display font-bold text-base mb-6 text-white">Sectores</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Petróleo y Gas</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Manufactura</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Energía Eléctrica</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Agroindustria</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Salud y Farmacia</a></li>
                            <li><a className="hover:text-white transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[14px] text-accent">chevron_right</span>Construcción</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display font-bold text-base mb-6 text-white">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-accent text-lg mt-0.5">location_on</span>
                                <span>8400 NW 25th St, Suite 100<br />Doral, FL 33122, USA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent text-lg">call</span>
                                <a href="tel:+13055550123" className="hover:text-white transition-colors">+1 (305) 555-0123</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent text-lg">mail</span>
                                <a href="mailto:ventas@ventasenusa.com" className="hover:text-white transition-colors">ventas@ventasenusa.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent text-lg">schedule</span>
                                <span>Lun–Vie: 8am–6pm EST</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                            <p className="text-xs text-accent font-bold uppercase tracking-wider mb-1">WhatsApp Empresarial</p>
                            <a href="#" className="text-white font-mono text-sm hover:text-accent transition-colors">+1 (305) 555-0124</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2024 Ventas en USA LLC. Todos los derechos reservados. · Courier Industrial &amp; Empresarial</p>
                    <div className="flex gap-6">
                        <a className="hover:text-white transition-colors" href="#">Privacidad</a>
                        <a className="hover:text-white transition-colors" href="#">Términos de Servicio</a>
                        <Link className="hover:text-white transition-colors" href="/login">Portal Corporativo</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
