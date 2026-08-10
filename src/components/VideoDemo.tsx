"use client";

import React from "react";

interface VideoDemoProps {
  src: string;
  poster?: string;
  caption?: string;
  id?: string;
}

export default function VideoDemo({ src, poster, caption, id }: VideoDemoProps) {
  return (
    <div id={id} className="relative rounded-2xl overflow-hidden border border-white/10 bg-black">
      <video
        src={src}
        controls
        muted
        loop
        playsInline
        poster={poster}
        className="w-full h-auto max-h-[65vh] object-contain"
      >
        Tu navegador no soporta video HTML5.
        <a href={src} className="text-accent underline">Descargar</a>
      </video>
      {caption && (
        <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-white/70">
          {caption}
        </div>
      )}
    </div>
  );
}
