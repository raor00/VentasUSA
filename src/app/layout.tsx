import type { Metadata } from "next";
import { StoreProvider } from "@/context/StoreContext";
import "./globals.css";

export const metadata: Metadata = {
    title: "Ventas en USA - Industrial & Heavy Cargo Logistics",
    description:
        "Importación especializada de maquinaria pesada, repuestos industriales, equipos bancarios y tecnología de alta densidad. Sin límites de dimensión ni valor.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-background-light text-text-main antialiased">
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
