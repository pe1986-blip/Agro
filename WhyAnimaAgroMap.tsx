
import React from 'react';
import { 
  Award, Layers, Network, Sprout, TrendingUp, Users, 
  Clock, AlertTriangle, Zap, CheckCircle2, ArrowDown,
  Building2, Globe, Rocket
} from 'lucide-react';

const MindMapNode = ({ title, icon: Icon, color, items, side }: any) => (
    <div className={`flex-1 min-w-[300px] bg-white rounded-3xl p-6 border-t-4 shadow-lg hover:shadow-xl transition-all duration-500 group relative ${color.border}`}>
        {/* Connector Line (Visual) */}
        <div className={`absolute top-1/2 ${side === 'left' ? '-right-4' : (side === 'right' ? '-left-4' : 'left-1/2 -translate-x-1/2 top-full h-8 w-0.5')} w-4 h-0.5 bg-slate-300 hidden lg:block`}></div>

        <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl ${color.bg} ${color.text} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <h3 className={`text-lg font-black uppercase tracking-tight ${color.title}`}>{title}</h3>
        </div>
        <ul className="space-y-3">
            {items.map((item: any, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color.dot}`}></div>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const WhyAnimaAgroMap: React.FC = () => {
    return (
        <div className="bg-[#fcfbf9] min-h-screen p-8 animate-fade-in font-sans">
            
            {/* Header Visual */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Network size={12} /> ROADMAP DE MOTIVAÇÃO
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                    Por Que Ânima? <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Por Que Agro? Por Que Agora?</span>
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                
                {/* LEVEL 1: STRUCTURAL & MARKET (Top Row) */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8 relative">
                    
                    {/* A) Por que Ânima */}
                    <MindMapNode 
                        title="1. Por Que Ânima?"
                        icon={Building2}
                        side="left"
                        color={{ border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-600', title: 'text-blue-900', dot: 'bg-blue-400' }}
                        items={[
                            "Trajetória de 20+ anos em qualidade acadêmica e inovação educacional escalável.",
                            "Posição Única: Ágil (diferente da pública burocrática) e Conectada (diferente da escola técnica isolada).",
                            "Capacidade de Orquestração Nacional: Hub natural entre IES, Empresas e Governo para operar em rede."
                        ]}
                    />

                    {/* CENTER: CONVERGENCE POINT */}
                    <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-32 relative z-10">
                        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-slate-100 animate-pulse-slow">
                            <Zap size={32} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 text-center bg-white px-2 rounded">Sinergia</p>
                    </div>

                    {/* B) Por que Agro */}
                    <MindMapNode 
                        title="2. Por Que Agro?"
                        icon={Sprout}
                        side="right"
                        color={{ border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', title: 'text-emerald-900', dot: 'bg-emerald-400' }}
                        items={[
                            "Setor Estratégico: R$ 2.4T/ano, 24% do PIB, segurança alimentar global e principal motor de superávit.",
                            "Transformação Profunda: De 'commodity bruta' para AgTech (IA, IoT, Rastreabilidade, Bioenergia Avançada).",
                            "Fome de Talento: Déficit de 148 mil profissionais qualificados em Agricultura Digital, Gestão de Dados e ESG."
                        ]}
                    />
                </div>

                {/* LEVEL 2: TIMING (Center Bottom) */}
                <div className="flex justify-center mb-8 relative">
                    {/* Vertical Connector Line */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-0.5 bg-slate-300 hidden lg:block"></div>
                    
                    <div className="w-full lg:w-2/3 bg-white rounded-3xl p-8 border-t-4 border-amber-500 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-500">
                            <Clock size={150} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-xl font-black text-amber-900 uppercase tracking-tight">3. Por Que Agora? (Timing)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-4 rounded-xl border border-amber-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Mercado</p>
                                    <p className="text-sm font-bold text-slate-700">Concorrentes públicos presos em burocracia; privados sem profundidade acadêmica nem conexão com território.</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-amber-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Governo</p>
                                    <p className="text-sm font-bold text-slate-700">Agro é prioridade de Estado com investimento em infraestrutura, rastreabilidade e transição energética.</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-amber-100">
                                    <p className="text-[10px] font-black text-purple-500 uppercase mb-1 flex items-center gap-1"><Zap size={10}/> Tech + IA</p>
                                    <p className="text-sm font-bold text-slate-700">IA Generativa e conectividade rural viabilizam o 'metabolismo de aprendizagem' 24/7 pela primeira vez.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LEVEL 3: RISK (Footer) */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full text-rose-500 shadow-sm">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-rose-800 uppercase tracking-widest">O Custo da Inação</h4>
                            <p className="text-sm text-rose-700 font-medium mt-1">
                                O mercado não vai esperar. Se não liderarmos agora, plataformas de nicho ou aventureiros digitais ocuparão o vácuo de formação de impacto no agro brasileiro.
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-rose-200"></div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-rose-600">Janela de Oportunidade</p>
                        <p className="text-2xl font-black text-rose-900">18-24 Meses</p>
                    </div>
                </div>

                {/* SUPPORT TEXT */}
                <div className="mt-12 border-t border-slate-200 pt-8">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Racional Estratégico (Suporte)</h4>
                    <div className="prose prose-slate text-slate-600 text-sm max-w-none columns-1 md:columns-2 gap-8 leading-relaxed text-justify">
                        <p>
                            Este mapa mental não é apenas um exercício visual; é a síntese da nossa vantagem competitiva estrutural. A Ânima traz a arquitetura pedagógica e a escala que nenhuma escola técnica isolada possui. O Agro traz a demanda reprimida, o capital e a urgência que nenhum outro setor brasileiro oferece hoje com a mesma intensidade.
                        </p>
                        <p>
                            A convergência acontece Agora porque a tecnologia (IA e Conectividade Rural) finalmente permite que a educação de alta densidade chegue ao campo sem perda de qualidade. Estamos diante de um "Oceano Azul" temporário: as universidades públicas estão presas em currículos do século XX, e as edtechs puras não têm a profundidade de campus que o produtor rural e as grandes cooperativas respeitam. O risco de não agir é ceder a liderança da maior indústria do país para players estrangeiros ou modelos educacionais superficiais.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WhyAnimaAgroMap;
