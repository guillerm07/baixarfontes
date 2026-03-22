"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Stats = {
  overview: {
    totalFonts: number;
    totalAuthors: number;
    totalCategories: number;
    downloadedFonts: number;
    totalDownloads: number;
    realDownloads: number;
  };
  traffic: {
    today: number;
    last7d: number;
    last30d: number;
    total: number;
    topPages: { path: string; count: number }[];
    topReferrers: { referrer: string; count: number }[];
    dailyViews: { date: string; count: number }[];
    topCountries: { code: string; name: string; count: number }[];
    topBrowsers: { name: string; count: number }[];
    topDevices: { name: string; count: number }[];
  };
  topFonts: {
    name: string;
    slug: string;
    downloadsTotal: number;
    downloadsLocal: number;
    authorName: string | null;
    categoryName: string | null;
    license: string | null;
  }[];
  topCategories: {
    name: string;
    parentName: string;
    childName: string;
    fontCount: number;
  }[];
  licenseDistribution: { license: string; count: number }[];
  recentFonts: {
    name: string;
    slug: string;
    authorName: string | null;
    createdAt: string;
    fontDownloaded: boolean;
  }[];
  unreadMessages: number;
};

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type Tab = "overview" | "traffic" | "fonts" | "messages";

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        accent ? "bg-primary-50 border-primary-200" : "bg-white border-gray-200"
      }`}
    >
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? "text-primary-700" : "text-gray-900"}`}>
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString("pt-BR");
}

function countryFlag(code: string): string {
  if (code.length !== 2) return "";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

function BarList({
  items,
  color = "primary",
}: {
  items: { label: string; value: number; prefix?: string }[];
  color?: "primary" | "violet" | "emerald" | "amber";
}) {
  const max = items[0]?.value || 1;
  const colorMap = {
    primary: "bg-primary-400",
    violet: "bg-violet-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
  };
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-gray-700 truncate max-w-[250px]">
              {item.prefix && <span className="mr-1.5">{item.prefix}</span>}
              {item.label}
            </span>
            <span className="text-gray-500 font-mono">{item.value.toLocaleString("pt-BR")}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${colorMap[color]} rounded-full`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-gray-400">Sem dados ainda</p>}
    </div>
  );
}

function MiniChart({ data }: { data: { date: string; count: number }[] }) {
  const totalViews = data.reduce((sum, d) => sum + d.count, 0);
  const maxVal = Math.max(...data.map((d) => d.count), 1);

  if (totalViews === 0) {
    return (
      <div className="flex items-center justify-center h-24 text-sm text-gray-400 bg-gray-50 rounded-lg">
        Sem visitas registradas neste período
      </div>
    );
  }

  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((d) => {
        const height = Math.max((d.count / maxVal) * 100, d.count > 0 ? 4 : 1);
        return (
          <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t transition-all ${
                d.count > 0
                  ? "bg-primary-500 hover:bg-primary-600"
                  : "bg-gray-200"
              }`}
              style={{ height: `${height}%` }}
              title={`${d.date}: ${d.count} visitas`}
            />
            {data.length <= 14 && (
              <span className="text-[9px] text-gray-400 -rotate-45 origin-top-left w-0">
                {d.date.slice(5)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [expandedMsg, setExpandedMsg] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadStats = () => {
    setLoading(true);
    fetch("/api/admin/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao carregar");
        return r.json();
      })
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const loadMessages = () => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => {});
  };

  useEffect(() => {
    loadStats();
    loadMessages();
  }, []);

  const deleteMessage = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (expandedMsg === id) setExpandedMsg(null);
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold mb-8">Painel de Administração</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-7 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
          {error || "Erro desconhecido."}
        </div>
      </div>
    );
  }

  const { overview, traffic, topFonts, topCategories, licenseDistribution, recentFonts } = stats;

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview", label: "Geral" },
    { id: "traffic", label: "Tráfego" },
    { id: "fonts", label: "Fontes" },
    { id: "messages", label: "Mensagens", badge: stats.unreadMessages },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Painel de Administração</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              loadStats();
              loadMessages();
            }}
            className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Atualizar
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
          >
            Encerrar sessão
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              if (t.id === "messages") loadMessages();
            }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors relative ${
              tab === t.id
                ? "border-primary-600 text-primary-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
            {t.badge ? (
              <span className="ml-1.5 inline-flex items-center justify-center h-5 min-w-[20px] px-1 text-[10px] font-bold bg-red-500 text-white rounded-full">
                {t.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === "overview" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total fontes" value={overview.totalFonts} />
            <StatCard label="Autores" value={overview.totalAuthors} />
            <StatCard label="Categorias" value={overview.totalCategories} />
            <StatCard
              label="Downloads (DaFont)"
              value={formatNumber(overview.totalDownloads)}
              sub="Importados do DaFont"
            />
            <StatCard
              label="Downloads reais"
              value={overview.realDownloads}
              sub="Do BaixarFontes"
              accent
            />
            <StatCard label="Visitas hoje" value={traffic.today} accent />
            <StatCard label="Visitas 7 dias" value={traffic.last7d} accent />
            <StatCard label="Visitas 30 dias" value={traffic.last30d} accent />
            <StatCard
              label="Fontes baixadas"
              value={overview.downloadedFonts}
              sub={`${((overview.downloadedFonts / overview.totalFonts) * 100).toFixed(1)}% do total`}
            />
          </div>

          {/* Daily chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Visitas últimos 14 dias
            </h2>
            <MiniChart data={traffic.dailyViews} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Páginas mais vistas</h2>
              <BarList
                items={traffic.topPages.map((p) => ({ label: p.path, value: p.count }))}
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Fontes de tráfego</h2>
              <BarList
                items={traffic.topReferrers.map((r) => ({ label: r.referrer, value: r.count }))}
                color="violet"
              />
            </div>
          </div>
        </>
      )}

      {/* Tab: Traffic */}
      {tab === "traffic" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Hoje" value={traffic.today} accent />
            <StatCard label="Últimos 7 dias" value={traffic.last7d} accent />
            <StatCard label="Últimos 30 dias" value={traffic.last30d} accent />
            <StatCard label="Total histórico" value={traffic.total} />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Evolução diária (14 dias)
            </h2>
            <MiniChart data={traffic.dailyViews} />
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1">
              <span>{traffic.dailyViews[0]?.date}</span>
              <span>{traffic.dailyViews[traffic.dailyViews.length - 1]?.date}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Top 15 páginas (30d)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2 pr-2">#</th>
                      <th className="pb-2 pr-2">Página</th>
                      <th className="pb-2 text-right">Visitas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {traffic.topPages.map((p, i) => (
                      <tr key={p.path} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-1.5 pr-2 text-gray-400">{i + 1}</td>
                        <td className="py-1.5 pr-2 font-mono text-gray-700 truncate max-w-[300px]">
                          {p.path}
                        </td>
                        <td className="py-1.5 text-right font-mono">{p.count.toLocaleString("pt-BR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {traffic.topPages.length === 0 && (
                  <p className="text-sm text-gray-400 py-4 text-center">Sem dados ainda</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Fontes de tráfego (30d)</h2>
              <BarList
                items={traffic.topReferrers.map((r) => ({ label: r.referrer, value: r.count }))}
                color="violet"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Countries */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Países (30d)</h2>
              <BarList
                items={(traffic.topCountries || []).map((c) => ({
                  label: c.name,
                  value: c.count,
                  prefix: countryFlag(c.code),
                }))}
                color="emerald"
              />
            </div>

            {/* Browsers */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Navegadores (30d)</h2>
              <BarList
                items={(traffic.topBrowsers || []).map((b) => ({
                  label: b.name,
                  value: b.count,
                }))}
                color="amber"
              />
            </div>

            {/* Devices */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Dispositivos (30d)</h2>
              <BarList
                items={(traffic.topDevices || []).map((d) => ({
                  label: d.name,
                  value: d.count,
                }))}
                color="primary"
              />
            </div>
          </div>
        </>
      )}

      {/* Tab: Fonts */}
      {tab === "fonts" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Top 20 Fontes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 pr-2">#</th>
                    <th className="pb-2 pr-2">Fonte</th>
                    <th className="pb-2 pr-2">Autor</th>
                    <th className="pb-2 text-right pr-3">DaFont</th>
                    <th className="pb-2 text-right">Reais</th>
                  </tr>
                </thead>
                <tbody>
                  {topFonts.map((font, i) => (
                    <tr key={font.slug} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-1.5 pr-2 text-gray-400">{i + 1}</td>
                      <td className="py-1.5 pr-2">
                        <Link
                          href={`/fonte/${font.slug}`}
                          className="text-primary-600 hover:underline font-medium"
                        >
                          {font.name}
                        </Link>
                      </td>
                      <td className="py-1.5 pr-2 text-gray-500">{font.authorName || "—"}</td>
                      <td className="py-1.5 text-right pr-3 font-mono text-gray-400">
                        {font.downloadsTotal.toLocaleString("pt-BR")}
                      </td>
                      <td className="py-1.5 text-right font-mono font-semibold text-primary-700">
                        {font.downloadsLocal.toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Top Categorias</h2>
            <div className="space-y-2">
              {topCategories.map((cat) => {
                const max = topCategories[0]?.fontCount || 1;
                return (
                  <div key={cat.name}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-700">
                        {cat.parentName} &rsaquo; {cat.childName}
                      </span>
                      <span className="text-gray-500 font-mono">
                        {cat.fontCount.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${(cat.fontCount / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Distribuição de Licenças</h2>
            <div className="space-y-2">
              {licenseDistribution.map((item) => {
                const max = licenseDistribution[0]?.count || 1;
                return (
                  <div key={item.license}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-700 truncate max-w-[200px]">{item.license}</span>
                      <span className="text-gray-500 font-mono">
                        {item.count.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{ width: `${(item.count / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Últimas importações</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 pr-2">Fonte</th>
                    <th className="pb-2 pr-2">Autor</th>
                    <th className="pb-2 pr-2">ZIP</th>
                    <th className="pb-2 text-right">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentFonts.map((font) => (
                    <tr key={font.slug} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-1.5 pr-2">
                        <Link
                          href={`/fonte/${font.slug}`}
                          className="text-primary-600 hover:underline font-medium"
                        >
                          {font.name}
                        </Link>
                      </td>
                      <td className="py-1.5 pr-2 text-gray-500">{font.authorName || "—"}</td>
                      <td className="py-1.5 pr-2">
                        {font.fontDownloaded ? (
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Sim" />
                        ) : (
                          <span className="inline-block w-2 h-2 bg-gray-300 rounded-full" title="Não" />
                        )}
                      </td>
                      <td className="py-1.5 text-right text-gray-500">
                        {new Date(font.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Messages */}
      {tab === "messages" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {messages.length} mensagem{messages.length !== 1 ? "ns" : ""}{" "}
              {stats.unreadMessages > 0 && (
                <span className="text-red-600 font-medium">
                  ({stats.unreadMessages} não lidas)
                </span>
              )}
            </p>
            <button
              onClick={loadMessages}
              className="text-sm text-primary-600 hover:underline"
            >
              Atualizar
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-400">Não há mensagens ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white rounded-xl border p-4 shadow-sm transition-colors ${
                    !msg.read ? "border-primary-300 bg-primary-50/30" : "border-gray-200"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setExpandedMsg(expandedMsg === msg.id ? null : msg.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!msg.read && (
                          <span className="inline-block w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                        )}
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {msg.subject}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">{msg.name}</span>
                        {" — "}
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-primary-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {msg.email}
                        </a>
                        {" — "}
                        {new Date(msg.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Excluir esta mensagem?")) deleteMessage(msg.id);
                      }}
                      disabled={deletingId === msg.id}
                      className="ml-3 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 disabled:opacity-50 flex-shrink-0"
                    >
                      {deletingId === msg.id ? "..." : "Excluir"}
                    </button>
                  </div>

                  {expandedMsg === msg.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
