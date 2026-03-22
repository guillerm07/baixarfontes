"use client";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()+-=[]{}|;:',.<>?/".split("");

export function CharacterMap({ slug }: { slug: string }) {
  return (
    <div
      className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-1"
      style={{ fontFamily: `'preview-${slug}', serif` }}
    >
      {CHARS.map((char, i) => (
        <div
          key={i}
          className="flex items-center justify-center h-12 bg-gray-50 rounded border text-2xl hover:bg-gray-100 transition-colors"
          title={char}
        >
          {char}
        </div>
      ))}
    </div>
  );
}
