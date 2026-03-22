"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
};

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 12 meses em segundos

function getCookieConsent(): CookiePreferences | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[2]));
  } catch {
    return null;
  }
}

function setCookieConsent(prefs: CookiePreferences) {
  const value = encodeURIComponent(JSON.stringify(prefs));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent({ necessary: true, analytics: true });
    setVisible(false);
  };

  const handleRejectAll = () => {
    setCookieConsent({ necessary: true, analytics: false });
    setVisible(false);
  };

  const handleSaveSettings = () => {
    setCookieConsent({ necessary: true, analytics });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Uso de cookies
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Utilizamos cookies próprios e de terceiros para melhorar sua experiência de navegação
            e analisar o tráfego do site. Os cookies técnicos são necessários para o
            funcionamento do site. Os cookies analíticos só são ativados com seu
            consentimento.{" "}
            <Link
              href="/politica-cookies"
              className="text-primary-600 hover:underline font-medium"
            >
              Mais informações
            </Link>
          </p>
        </div>

        {showSettings && (
          <div className="mb-4 space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Cookies técnicos</p>
                <p className="text-xs text-gray-500">Necessários para o funcionamento do site</p>
              </div>
              <div className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                Sempre ativos
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Cookies analíticos</p>
                <p className="text-xs text-gray-500">Nos ajudam a entender como você usa o site</p>
              </div>
              <button
                onClick={() => setAnalytics(!analytics)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  analytics ? "bg-primary-600" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={analytics}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    analytics ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {showSettings ? (
            <button
              onClick={handleSaveSettings}
              className="flex-1 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Salvar preferências
            </button>
          ) : (
            <>
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Rejeitar não essenciais
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Configurar
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Aceitar todos
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Export helper to check consent from other components
export function hasAnalyticsConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics === true;
}
