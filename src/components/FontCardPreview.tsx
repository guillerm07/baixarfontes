"use client";

import { useEffect, useRef, useState } from "react";

export function FontCardPreview({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const family = `preview-${slug}`;

    // Descargar como ArrayBuffer para evitar problemas de MIME/format
    fetch(`/api/font-file/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.arrayBuffer();
      })
      .then((buf) => {
        const face = new FontFace(family, buf);
        return face.load();
      })
      .then((loaded) => {
        document.fonts.add(loaded);
        setFontReady(true);
      })
      .catch(() => {});
  }, [visible, slug]);

  return (
    <div
      ref={ref}
      className="h-20 flex items-center overflow-hidden rounded-lg bg-gray-50/50 px-4 group-hover:bg-gray-50 transition-colors"
    >
      <span
        className="text-3xl sm:text-4xl text-gray-800 truncate"
        style={{
          fontFamily: fontReady ? `'preview-${slug}', serif` : "serif",
        }}
      >
        {name}
      </span>
    </div>
  );
}
