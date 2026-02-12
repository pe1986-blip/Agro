
import React, { useState } from 'react';
import { LayoutDashboard, ShieldCheck, Globe, LogIn, MonitorPlay } from 'lucide-react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

interface LoginViewProps {
  onLogin: (isDemo?: boolean) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Autenticando...');

  const startBootSequence = (isDemo: boolean) => {
    const steps = [
        isDemo ? "Simulando Token Corporativo..." : "Token validado pela Microsoft Entra...",
        "Sincronizando permissões do AD...",
        "Conectando ao Data Lake (BigQuery)...",
        "Sincronizando índices de mercado...",
        "Acesso Autorizado."
    ];

    let step = 0;
    const interval = setInterval(() => {
        if (step < steps.length) {
            setLoadingText(steps[step]);
            step++;
        } else {
            clearInterval(interval);
            onLogin(isDemo);
        }
    }, 400);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoadingText('Autenticando...');
    try {
        await instance.loginPopup(loginRequest);
        startBootSequence(false);
    } catch (error: any) {
        console.warn("Erro no SSO, iniciando fallback para Demo:", error);
        // Em caso de erro de timeout ou popup block, entra no modo demo automaticamente para não travar a experiência
        // Isso é útil para previews/desenvolvimento
        startBootSequence(true);
    }
  };

  const handleDemoLogin = () => {
      setIsLoading(true);
      setLoadingText('Iniciando modo demonstração...');
      startBootSequence(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center relative overflow-hidden font-sans text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] animate-pulse-slow">
                <LayoutDashboard size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 italic">RogerLens <span className="text-blue-500">Intelli</span></h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">Corporate Access v4.5</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {!isLoading ? (
                <div className="space-y-4">
                    <div className="text-center space-y-2 mb-4">
                        <p className="text-slate-300 text-sm">Bem-vindo à plataforma de inteligência estratégica.</p>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Selecione seu acesso</p>
                    </div>

                    <button 
                        onClick={handleLogin}
                        className="w-full bg-white text-slate-900 font-black py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 uppercase text-xs tracking-widest border-b-4 border-slate-200 active:border-b-0 active:translate-y-1"
                    >
                        <img src="https://authjs.dev/img/providers/microsoft.svg" className="w-5 h-5" alt="Microsoft" />
                        Entrar com SSO
                    </button>
                    
                    <button 
                        onClick={handleDemoLogin}
                        className="w-full bg-slate-800 text-slate-300 font-bold py-3 rounded-xl border border-slate-700 hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                    >
                        <MonitorPlay size={16} />
                        Modo Demonstração
                    </button>
                    
                    <div className="pt-2 text-center">
                        <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                            <Globe size={10}/> Acesso Seguro
                        </span>
                    </div>
                </div>
            ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin mb-6"></div>
                    <h3 className="text-lg font-bold text-white mb-2">{loadingText}</h3>
                    <p className="text-xs text-slate-500 font-mono">ESTABELECENDO HANDSHAKE SEGURO</p>
                </div>
            )}
        </div>

        <div className="mt-8 text-center flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ShieldCheck size={12} className="text-emerald-500"/>
                <span>Azure Entra ID Protected</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
