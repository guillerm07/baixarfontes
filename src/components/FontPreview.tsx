"use client";

import { useState, useEffect } from "react";

export function FontPreview({ slug, name }: { slug: string; name: string }) {
  const [text, setText] = useState("");
  const [size, setSize] = useState(48);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    const family = `preview-${slug}`;

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
  }, [slug]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite aqui para pré-visualizar..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Tamanho:</label>
          <input
            type="range"
            min={12}
            max={120}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-500 w-10">{size}px</span>
        </div>
      </div>

      <div
        className="p-6 bg-gray-50 rounded-lg border min-h-[120px] flex items-center break-all"
        style={{
          fontFamily: fontReady ? `'preview-${slug}', serif` : "serif",
          fontSize: `${size}px`,
          lineHeight: 1.3,
        }}
      >
        {text || name}
      </div>
    </div>
  );
}
