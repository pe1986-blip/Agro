
import React from 'react';
import { 
  Box, Scale, Briefcase, Megaphone, 
  ArrowRight, Layout, GitMerge, 
  Building2, Share2, MapPin, Microscope, Users, Cpu, DollarSign, Calendar
} from 'lucide-react';

const NUCLEI_DATA = [
  {
    id: 'pesquisa',
    title: 'Núcleo 1: Pesquisa Aplicada',
    subtitle: 'Science & Revenue',
    icon: Microscope,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20',
    border: 'border-purple-500/30',
    location: 'Andar 3 (Think Tank)',
    stats: {
        headcount: "15-20 Pesquisadores",
        revenue: "R$ 2-3M / ano",
        output: "10-15 Projetos/ano"
    },
    responsibilities: [
      "Parcerias estratégicas com EMBRAPA, APTA e Federais.",
      "Publicação em revistas especializadas e blogs setoriais.",
      "Validação de hipóteses em propriedades reais (Coops/Produtores)."
    ],
    interfaces: ["Mestrado/Doutorado", "Empresas Parceiras"]
  },
  {
    id: 'relacionamento',
    title: 'Núcleo 2: Relacionamento',
    subtitle: 'Advocacy & Events',
    icon: Users,
    color: 'text-amber-400',
    bg: 'bg-amber-900/20',
    border: 'border-amber-500/30',
    location: 'Andar 3 (Auditório)',
    stats: {
        headcount: "8-12 Profissionais",
        revenue: "R$ 1-2M / ano",
        output: "12+ Eventos/ano"
    },
    responsibilities: [
      "Gestão de 100+ parcerias (Coops, Agroindústrias).",
      "Coordenação de Círculos de Aprendizagem (Produtores).",
      "Assento em boards (CNA, ABAG, SENAR)."
    ],
    interfaces: ["Comercial", "Marketing Corporativo"]
  },
  {
    id: 'inovacao',
    title: 'Núcleo 3: Inovação & Tech',
    subtitle: 'Pedagogical Engine',
    icon: Cpu,
    color: 'text-emerald-400',
    bg: 'bg-emerald-900/20',
    border: 'border-emerald-500/30',
    location: 'Andar 2 (Labs)',
    stats: {
        headcount: "Equipe Tech & Acad.",
        revenue: "Retenção & LTV",
        output: "Plataforma Integrada"
    },
    responsibilities: [
      "Learning Analytics: Rastreio de impacto pós-saída.",
      "IA Generativa: Personalização de currículo em tempo real.",
      "Tradução de papers científicos para linguagem prática."
    ],
    interfaces: ["Diretoria de Ensino", "TI / Sistemas"]
  }
];

const GoianiaGovernanceStructure: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12">
        
        {/* Header de Contexto */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <GitMerge size={200} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
                        <Building2 size={24} className="text-white"/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white">Hub de Inovação, Pesquisa e Relacionamento</h2>
                        <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.3em]">
                            Estrutura Expandida da Sede Nacional
                        </p>
                    </div>
                </div>
                <p className="text-slate-400 max-w-3xl text-sm leading-relaxed font-medium border-l-4 border-blue-600 pl-6">
                    A Sede Goiânia transcende a gestão acadêmica tradicional. Ela opera como uma unidade de negócios autossustentável, gerando receita própria através de pesquisa aplicada e eventos, enquanto alimenta a rede com inovação pedagógica.
                </p>
            </div>
        </div>

        {/* GRID DE NÚCLEOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {NUCLEI_DATA.map((nucleo) => (
                <div key={nucleo.id} className={`p-6 rounded-[2rem] border ${nucleo.bg} ${nucleo.border} relative group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full`}>
                    
                    {/* Header do Card */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl bg-slate-950 shadow-lg ${nucleo.color}`}>
                                <nucleo.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight">{nucleo.title}</h3>
                                <p className={`text-[10px] font-bold uppercase tracking-wider opacity-80 ${nucleo.color}`}>{nucleo.subtitle}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar (Novo) */}
                    <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                        <div>
                            <p className="text-[9px] text-slate-500 uppercase font-black flex items-center gap-1"><Users size={10}/> Equipe</p>
                            <p className="text-xs font-bold text-white">{nucleo.stats.headcount}</p>
                        </div>
                        <div>
                            <p className="text-[9px] text-slate-500 uppercase font-black flex items-center gap-1"><DollarSign size={10}/> Receita Est.</p>
                            <p className={`text-xs font-bold ${nucleo.id === 'inovacao' ? 'text-slate-300' : 'text-emerald-400'}`}>{nucleo.stats.revenue}</p>
                        </div>
                        <div className="col-span-2 pt-2 border-t border-white/5">
                             <p className="text-[9px] text-slate-500 uppercase font-black flex items-center gap-1"><Calendar size={10}/> Output Chave</p>
                             <p className="text-xs font-bold text-white">{nucleo.stats.output}</p>
                        </div>
                    </div>

                    {/* Responsabilidades */}
                    <ul className="space-y-3 mb-8 flex-1">
                        {nucleo.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 font-medium leading-relaxed">
                                <ArrowRight size={14} className={`mt-0.5 shrink-0 ${nucleo.color}`} />
                                {resp}
                            </li>
                        ))}
                    </ul>

                    {/* Footer: Interfaces */}
                    <div className="pt-4 border-t border-white/10 mt-auto">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Share2 size={10}/> Interfaces
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {nucleo.interfaces.map((inter, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-950 rounded-lg border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-default">
                                    {inter}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            ))}
        </div>

        {/* FLUXO DE VALOR (VISUALIZAÇÃO) */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layout size={18} className="text-blue-600"/> O Metabolismo da Informação
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center relative">
                {/* Linha de conexão (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0"></div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 w-full md:w-auto relative z-10 flex flex-col items-center group hover:border-amber-300 transition-colors">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg mb-2"><Users size={20}/></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Input</p>
                    <p className="text-sm font-black text-slate-800">Relacionamento</p>
                    <p className="text-xs text-slate-500 mt-1">Ouve as Dores</p>
                </div>

                <ArrowRight size={24} className="text-slate-300 rotate-90 md:rotate-0" />

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 w-full md:w-auto relative z-10 flex flex-col items-center group hover:border-purple-300 transition-colors">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mb-2"><Microscope size={20}/></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Process</p>
                    <p className="text-sm font-black text-slate-800">Pesquisa</p>
                    <p className="text-xs text-slate-500 mt-1">Cria a Solução</p>
                </div>

                <ArrowRight size={24} className="text-slate-300 rotate-90 md:rotate-0" />

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 w-full md:w-auto relative z-10 flex flex-col items-center group hover:border-emerald-300 transition-colors">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mb-2"><Cpu size={20}/></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Output</p>
                    <p className="text-sm font-black text-slate-800">Inovação</p>
                    <p className="text-xs text-slate-500 mt-1">Ensina o Aluno</p>
                </div>
            </div>
        </div>

    </div>
  );
};

export default GoianiaGovernanceStructure;
