
import React from 'react';
import { 
  Layers, Hexagon, Zap, Sprout, Users, Coffee, 
  Scale, Database, Megaphone, GitMerge, ArrowRight, 
  Map, LayoutTemplate, Network
} from 'lucide-react';

// --- DADOS DOS NÚCLEOS ---
const NUCLEI = [
    {
        id: 'bioenergia',
        title: 'Núcleo Etanol & Bioenergia',
        icon: Zap,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        tribes: ['Eng. Química', 'Agronomia', 'Direito Regulatório', 'Logística'],
        problem: 'Como aumentar a eficiência energética e a certificação de CBIOs?',
        programs: ['MBA em Bioeconomia', 'Técnico em Processos Sucroalcooleiros'],
        partners: ['Raízen', 'BP Bunge', 'Unica']
    },
    {
        id: 'graos',
        title: 'Núcleo Grãos & Proteína',
        icon: Sprout,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        tribes: ['Zootecnia', 'Economia (Trading)', 'Eng. Mecânica', 'Veterinária'],
        problem: 'Otimização de conversão alimentar e hedge de commodities.',
        programs: ['Residência em Confinamento', 'Bootcamp de Trading Agrícola'],
        partners: ['JBS', 'Cargill', 'Amaggi']
    },
    {
        id: 'coop',
        title: 'Núcleo Cooperativismo',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        tribes: ['Sociologia Rural', 'Gestão', 'Contabilidade', 'Psicologia'],
        problem: 'Governança, sucessão familiar e fidelização do cooperado.',
        programs: ['Programa de Jovens Líderes', 'Gestão de Propriedade Familiar'],
        partners: ['OCB', 'Sicoob', 'Cooxupé']
    },
    {
        id: 'cafe',
        title: 'Núcleo Cafés Especiais',
        icon: Coffee,
        color: 'text-rose-700',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        tribes: ['Marketing', 'Gastronomia', 'Agronomia', 'Comércio Exterior'],
        problem: 'Agregar valor na xícara e acessar mercados premium internacionais.',
        programs: ['Q-Grader Certification', 'Branding de Terroir'],
        partners: ['BSCA', 'Nespresso', 'Exportadoras Locais']
    }
];

const TRANSVERSALS = [
    {
        title: 'Lab de Dados & Agrotech',
        icon: Database,
        desc: 'Fornece inteligência preditiva, sensores e dashboards para todos os núcleos.',
        color: 'bg-purple-100 text-purple-700'
    },
    {
        title: 'Lab de Políticas & Advocacy',
        icon: Scale,
        desc: 'Traduz os desafios técnicos dos núcleos em propostas de lei e regulação.',
        color: 'bg-slate-100 text-slate-700'
    },
    {
        title: 'Estúdio de Comunicação',
        icon: Megaphone,
        desc: 'Transforma os cases de sucesso dos núcleos em narrativa para a sociedade.',
        color: 'bg-pink-100 text-pink-700'
    }
];

const NucleusCard = ({ data }: any) => (
    <div className={`p-6 rounded-3xl border ${data.bg} ${data.border} relative group hover:shadow-lg transition-all`}>
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl bg-white shadow-sm ${data.color}`}>
                <data.icon size={24} />
            </div>
            <h3 className={`text-lg font-black uppercase tracking-tight ${data.color.replace('text-', 'text-opacity-80 text-')}`}>{data.title}</h3>
        </div>
        
        <div className="space-y-4">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tribos Reunidas</p>
                <div className="flex flex-wrap gap-2">
                    {data.tribes.map((t: string) => (
                        <span key={t} className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-slate-600 border border-slate-100">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Problema Real (O Imã)</p>
                <p className="text-xs font-medium text-slate-700 leading-snug italic">"{data.problem}"</p>
            </div>

            <div className="pt-4 border-t border-black/5 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Produtos</p>
                    <p className="text-[10px] font-bold text-slate-600">{data.programs[0]}</p>
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Parceiros</p>
                    <p className="text-[10px] font-bold text-slate-600">{data.partners.join(', ')}</p>
                </div>
            </div>
        </div>
    </div>
);

const VisualMapDiagram = () => (
    <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl mb-16">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Network size={400} />
        </div>
        
        <div className="text-center mb-12 relative z-10">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">O Diagrama Arquitetônico</h2>
            <p className="text-slate-400 text-sm">A estrutura concêntrica do Campus Vocacionado</p>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
            {/* CAMADA 1: NÚCLEOS (Círculo Externo) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {NUCLEI.map((n) => (
                    <div key={n.id} className={`p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center group hover:bg-white/10 transition-colors`}>
                        <n.icon size={24} className={`mx-auto mb-2 ${n.color.replace('text-', 'text-')}`} />
                        <h4 className="text-xs font-bold uppercase">{n.title}</h4>
                    </div>
                ))}
            </div>

            {/* CONECTORES */}
            <div className="flex justify-center mb-8 text-slate-600">
                <ArrowRight size={24} className="rotate-90" />
            </div>

            {/* CAMADA 2: TRANSVERSAIS (O Meio) */}
            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Camada Transversal de Serviços (Labs)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TRANSVERSALS.map((t, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
                            <t.icon size={18} className="text-slate-400" />
                            <span className="text-xs font-bold">{t.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CAMADA 3: O CENTRO (Campus) */}
            <div className="flex justify-center">
                <div className="bg-emerald-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3">
                    <Map size={20} /> Campus Ânima Agro
                </div>
            </div>
        </div>
    </div>
);

const ComparisonSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200">
            <h3 className="text-lg font-black text-slate-500 uppercase tracking-tight mb-6 flex items-center gap-2">
                <LayoutTemplate size={20}/> Modelo Tradicional
            </h3>
            <ul className="space-y-4">
                <li className="flex items-start gap-3 opacity-60">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Organização:</strong> Departamentos (Agronomia, Direito, Economia).</p>
                </li>
                <li className="flex items-start gap-3 opacity-60">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Foco:</strong> A disciplina (o método, a teoria isolada).</p>
                </li>
                <li className="flex items-start gap-3 opacity-60">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Interação:</strong> Rara. Aluno de Direito nunca pisa no laboratório de solos.</p>
                </li>
            </ul>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-emerald-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
            <h3 className="text-lg font-black text-emerald-800 uppercase tracking-tight mb-6 flex items-center gap-2 relative z-10">
                <Hexagon size={20}/> Modelo Vocacionado
            </h3>
            <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <p className="text-sm text-slate-700"><strong>Organização:</strong> Núcleos de Cadeia Produtiva.</p>
                </li>
                <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <p className="text-sm text-slate-700"><strong>Foco:</strong> O problema real da cadeia (ex: "sustentabilidade do etanol").</p>
                </li>
                <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <p className="text-sm text-slate-700"><strong>Interação:</strong> Total. O advogado e o agrônomo sentam juntos para resolver o licenciamento ambiental.</p>
                </li>
            </ul>
        </div>
    </div>
);

const AcademicTerritoryMapView: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Map size={12} /> Arquitetura Acadêmica
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                O Novo Mapa de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Territórios Internos
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Se a universidade tradicional é um arquipélago de departamentos isolados, 
                o Campus Vocacionado é um ecossistema conectado por problemas reais.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        
        {/* DIAGRAMA MENTAL */}
        <VisualMapDiagram />

        {/* COMPARATIVO */}
        <ComparisonSection />

        {/* OS NÚCLEOS VOCACIONADOS */}
        <div className="mb-16">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <Layers size={24} className="text-indigo-600"/> 1. Núcleos Vocacionados (Verticais)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {NUCLEI.map(nucleo => (
                    <NucleusCard key={nucleo.id} data={nucleo} />
                ))}
            </div>
        </div>

        {/* AS TRANSVERSAIS */}
        <div className="mb-16">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <GitMerge size={24} className="text-purple-600"/> 2. Laboratórios Transversais (Horizontais)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TRANSVERSALS.map((t, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-start`}>
                        <div className={`p-3 rounded-xl mb-4 ${t.color}`}>
                            <t.icon size={24} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-wide text-slate-800 mb-2">{t.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* FECHAMENTO */}
        <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-600 font-medium italic leading-relaxed mb-8">
                "Um campus vocacionado é, no fundo, um NOVO MAPA DE TERRITÓRIOS: 
                menos feudos disciplinares, mais ecossistemas vivos organizados por cadeias produtivas e problemas públicos."
            </p>
            <div className="inline-flex items-center gap-3 bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest cursor-default">
                Próximo Passo: Quem é você neste mapa?
            </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicTerritoryMapView;
