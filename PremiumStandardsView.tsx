
import React, { useState } from 'react';
import { 
  Users, Sprout, GraduationCap, Sparkles, Target, Network, 
  Award, Settings, Heart, Globe, ArrowRight, Layers, 
  Building2, Monitor, Zap, Database, Fingerprint, LucideIcon,
  Flag, Activity
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import StandardDetailModal from './StandardDetailModal';
import GoianiaCaseStudyView from './GoianiaCaseStudyView'; // NEW IMPORT

// --- TYPES ---
interface Balizador {
  id: number;
  icon: LucideIcon;
  title: string;
  agroLabel: string; // Metáfora Agro
  question: string;
  description: string;
  color: string;
  colSpan?: string; // Controle do Bento Grid (md:col-span-2 etc)
}

// --- DADOS DO RADAR (EVOLUÇÃO) ---
const RADAR_DATA = [
  { subject: 'Seletividade', A: 100, B: 70, C: 20, fullMark: 100 },       // B1
  { subject: 'Infraestrutura', A: 100, B: 85, C: 40, fullMark: 100 },     // B2
  { subject: 'Qualidade Acad.', A: 100, B: 80, C: 30, fullMark: 100 },    // B3
  { subject: 'Experiência (PBL)', A: 100, B: 90, C: 50, fullMark: 100 },  // B4
  { subject: 'Empregabilidade', A: 100, B: 95, C: 60, fullMark: 100 },    // B5
  { subject: 'Parcerias', A: 100, B: 80, C: 20, fullMark: 100 },          // B6
  { subject: 'Marca & Reputação', A: 100, B: 75, C: 10, fullMark: 100 },  // B7
  { subject: 'Operação Digital', A: 100, B: 90, C: 40, fullMark: 100 },   // B8
  { subject: 'Cultura & Valores', A: 100, B: 85, C: 50, fullMark: 100 },  // B9
  { subject: 'Internacional', A: 100, B: 60, C: 5, fullMark: 100 },       // B10
];

// --- DADOS DOS BALIZADORES ---
const BALIZADORES: Balizador[] = [
  {
    id: 1,
    icon: Users,
    title: 'Entrada & Curadoria',
    agroLabel: 'Quem entra e como?',
    question: 'Quem entra?',
    description: 'Taxa 15–20%; Fit validado; Bootcamp seleção.',
    color: 'bg-blue-600',
    colSpan: 'md:col-span-2'
  },
  {
    id: 2,
    icon: Sprout,
    title: 'Infraestrutura',
    agroLabel: 'Onde aprende?',
    question: 'Onde aprende?',
    description: '10–12 m²/aluno; 15+ labs; Farm-school 100–150 ha.',
    color: 'bg-emerald-600',
    colSpan: 'md:col-span-1'
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'Qualidade Acadêmica',
    agroLabel: 'Quem ensina?',
    question: 'Quem ensina?',
    description: '40%+ Ph.D.; 60%+ exp. setor; 2.5 pub/ano.',
    color: 'bg-purple-600',
    colSpan: 'md:col-span-1'
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Experiência de Aprendizagem',
    agroLabel: 'Como aprende?',
    question: 'Como aprende?',
    description: '90% ativo; 8 projetos reais/sem; NPS 70+.',
    color: 'bg-amber-500',
    colSpan: 'md:col-span-2'
  },
  {
    id: 5,
    icon: Target,
    title: 'Resultados & Impacto',
    agroLabel: 'O que sai?',
    question: 'O que sai?',
    description: '95%+ emprego; +30% renda; 200+ propriedades impactadas.',
    color: 'bg-rose-600',
    colSpan: 'md:col-span-1'
  },
  {
    id: 6,
    icon: Network,
    title: 'Rede & Parcerias',
    agroLabel: 'Com quem trabalha?',
    question: 'Com quem trabalha?',
    description: '40–60 parcerias; R$ 2–3M receita; 150% vagas.',
    color: 'bg-indigo-600',
    colSpan: 'md:col-span-1'
  },
  {
    id: 7,
    icon: Award,
    title: 'Marca & Posicionamento',
    agroLabel: 'O que mundo diz?',
    question: 'O que mundo diz?',
    description: 'Top 3 agro; 80% Top of Mind; 100–160 menções/ano.',
    color: 'bg-slate-800',
    colSpan: 'md:col-span-1'
  },
  {
    id: 8,
    icon: Settings,
    title: 'Operação & Zero Fricção',
    agroLabel: 'Como funciona dia-a-dia?',
    question: 'Como funciona?',
    description: '<2h resposta; 100% digital; NPS 65+ administrativo.',
    color: 'bg-cyan-600',
    colSpan: 'md:col-span-1'
  },
  {
    id: 9,
    icon: Heart,
    title: 'Cultura & Valores',
    agroLabel: 'Por que existe?',
    question: 'Por que existe?',
    description: '90% alinhados; 35%+ bolsistas; 85% voluntariado.',
    color: 'bg-pink-600',
    colSpan: 'md:col-span-1'
  },
  {
    id: 10,
    icon: Globe,
    title: 'Internacionalização',
    agroLabel: 'Aonde vai?',
    question: 'Aonde vai?',
    description: '25–35% internacionais; 40–50% mobilidade outbound; 60% docentes intl.',
    color: 'bg-blue-800',
    colSpan: 'md:col-span-3'
  }
];

// --- COMPONENTES VISUAIS ---

const PremiumRadarChart = () => {
    return (
        <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    
                    <Radar 
                        name="Benchmark Global (EHL/MIT)" 
                        dataKey="A" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        fill="#10b981" 
                        fillOpacity={0.1} 
                    />
                    <Radar 
                        name="Meta Ano 3 (Consolidação)" 
                        dataKey="B" 
                        stroke="#0ea5e9" 
                        strokeWidth={3} 
                        fill="#0ea5e9" 
                        fillOpacity={0.3} 
                    />
                    <Radar 
                        name="Baseline Ano 1 (Entrada)" 
                        dataKey="C" 
                        stroke="#f43f5e" 
                        strokeWidth={2} 
                        fill="#f43f5e" 
                        fillOpacity={0.4} 
                    />
                    
                    <Legend 
                        wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} 
                        iconType="circle"
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

const PillarCard: React.FC<{ data: Balizador, onClick: () => void }> = ({ data, onClick }) => (
    <div 
        onClick={onClick}
        className={`group relative rounded-3xl p-6 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 ${data.colSpan || 'md:col-span-1'} bg-white border border-slate-100`}
    >
        {/* Hover Gradient Overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${data.color}`}></div>
        
        <div className="flex flex-col h-full justify-between relative z-10">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 ${data.color}`}>
                    <data.icon size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-500 transition-colors">
                    B{data.id < 10 ? `0${data.id}` : data.id}
                </span>
            </div>

            <div className="mt-6">
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${data.color.replace('bg-', 'text-')}`}>
                    {data.title}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight mb-2 group-hover:text-slate-900">
                    {data.agroLabel}
                </h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-3 group-hover:text-slate-600 transition-colors">
                    {data.description}
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                Ver Detalhes <ArrowRight size={12} />
            </div>
        </div>
    </div>
);

const ComparisonRow = ({ feature, standard, premium }: { feature: string, standard: string, premium: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors text-sm">
        <div className="p-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{feature}</span>
        </div>
        <div className="p-4 text-xs text-slate-500 font-medium bg-slate-50/30 border-x border-white">
            {standard}
        </div>
        <div className="p-4 text-xs text-blue-900 font-bold bg-blue-50/30 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-blue-500"></div>
            {premium}
        </div>
    </div>
);

// --- VIEW PRINCIPAL ---

const PremiumStandardsView: React.FC = () => {
    const [selectedStandard, setSelectedStandard] = useState<number | null>(null);
    const [showGoianiaCase, setShowGoianiaCase] = useState(false);

    // Se estiver no modo Case Study, renderiza a nova view
    if (showGoianiaCase) {
        return <GoianiaCaseStudyView onBack={() => setShowGoianiaCase(false)} />;
    }

    return (
        <div className="bg-slate-50 min-h-screen animate-fade-in pb-20 relative">
            
            {/* MODAL DE DETALHES (OVERLAY) */}
            {selectedStandard && (
                <StandardDetailModal 
                    standardId={selectedStandard} 
                    onClose={() => setSelectedStandard(null)} 
                />
            )}

            {/* HERO HEADER REFORMULADO (GRID) */}
            <header className="relative bg-slate-900 text-white overflow-hidden pt-12 pb-20 px-8 rounded-b-[4rem] shadow-2xl mb-12">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                    <Fingerprint size={400} />
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Lado Esquerdo: Texto & CTA */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
                                <Sparkles size={14} className="text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">DNA da Excelência</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                                Campus Premium <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                                    Os 10 Balizadores
                                </span>
                            </h1>
                            
                            <p className="text-slate-300 text-sm md:text-base font-medium max-w-lg leading-relaxed mb-8 border-l-4 border-emerald-500 pl-6">
                                Não é sobre ter um campus. É sobre construir um ecossistema vivo que conecta o <strong>Ano 1 (Baseline)</strong> ao <strong>Padrão Global (Benchmark)</strong>.
                            </p>

                            <button 
                                onClick={() => setShowGoianiaCase(true)}
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3 group"
                            >
                                <Flag size={16} className="text-slate-900 group-hover:scale-110 transition-transform" />
                                Ver Case: Goiânia Sede (Flagship)
                            </button>
                        </div>

                        {/* Lado Direito: Radar Chart */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-700/50 p-2 shadow-2xl relative">
                            <div className="absolute top-4 left-6 flex items-center gap-2">
                                <Activity size={16} className="text-blue-400 animate-pulse"/>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matriz de Evolução Estratégica</span>
                            </div>
                            <PremiumRadarChart />
                        </div>

                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6">
                
                {/* 1. BENTO GRID */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                            <Layers size={20} className="text-blue-600"/> O Framework Detalhado
                        </h2>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(250px,auto)]">
                        {BALIZADORES.map((balizador) => (
                            <PillarCard 
                                key={balizador.id}
                                data={balizador}
                                onClick={() => setSelectedStandard(balizador.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* 2. MATRIZ COMPARATIVA (VISUAL) */}
                <div className="mb-20">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Standard vs. Premium</h3>
                                <p className="text-sm text-slate-400">A diferença tangível na entrega de valor.</p>
                            </div>
                            <div className="flex gap-4 text-right md:text-left">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Faculdade Padrão</p>
                                    <p className="text-xs font-black text-slate-400">Commodity</p>
                                </div>
                                <div className="w-px bg-white/20 h-8 hidden md:block"></div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-400 uppercase">Ânima Agro</p>
                                    <p className="text-xs font-black text-white">Ecossistema</p>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            <ComparisonRow 
                                feature="Infraestrutura"
                                standard="Salas de aula e laboratórios básicos."
                                premium="Living Lab: Estações experimentais e Hangar de Drones."
                            />
                            <ComparisonRow 
                                feature="Corpo Docente"
                                standard="Acadêmicos focados em titulação."
                                premium="Mestres do Campo: Profissionais ativos no mercado."
                            />
                            <ComparisonRow 
                                feature="Networking"
                                standard="Entre alunos da mesma idade."
                                premium="Vertical: Aluno, Produtor e Executivo no mesmo ambiente."
                            />
                        </div>
                    </div>
                </div>

                {/* 3. MAPA DE APLICAÇÃO (ONDE VAI O QUE) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Building2 size={120} />
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <Building2 size={24} className="text-white"/>
                            </div>
                            <h4 className="text-xl font-black uppercase mb-2">Sedes (Full Hub)</h4>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                Aplicação integral dos 10 balizadores. O centro de gravidade da região.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {BALIZADORES.map(b => (
                                <div key={b.id} className="w-2 h-2 rounded-full bg-emerald-400" title={b.title}></div>
                            ))}
                            <span className="text-[10px] font-bold text-emerald-400 ml-2">10/10 Ativos</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-300 transition-colors">
                        <div>
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                <Monitor size={24} />
                            </div>
                            <h4 className="text-xl font-black text-slate-800 uppercase mb-2">Polo P3 (Avançado)</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                Foco em <strong>Experiência (B4)</strong>, <strong>Impacto (B5)</strong> e <strong>Operação (B8)</strong>. Estrutura leve, mas conectada.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[1,2,4,5,6,8].map(i => (
                                <div key={i} className="w-2 h-2 rounded-full bg-blue-500"></div>
                            ))}
                            <span className="text-[10px] font-bold text-blue-600 ml-2">6/10 Ativos</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-orange-300 transition-colors">
                        <div>
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                                <Zap size={24} />
                            </div>
                            <h4 className="text-xl font-black text-slate-800 uppercase mb-2">Polo P2 (Digital)</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                Foco total em <strong>Entrada (B1)</strong>, <strong>Plataforma (B8)</strong> e <strong>Marca (B7)</strong>. Capilaridade máxima.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[1,7,8].map(i => (
                                <div key={i} className="w-2 h-2 rounded-full bg-orange-500"></div>
                            ))}
                            <span className="text-[10px] font-bold text-orange-600 ml-2">3/10 Ativos</span>
                        </div>
                    </div>
                </div>

                {/* PLACEHOLDER DE CARGA */}
                <div className="text-center py-12 opacity-60">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <Database size={14} /> Balizadores B1 a B10 Populados. Sistema Operacional Pronto.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PremiumStandardsView;
