
import React, { useState } from 'react';
import { 
  Users, Cpu, TrendingUp, Leaf, Landmark, 
  ArrowRight, Search, Info, CheckCircle2,
  AlertTriangle, Network
} from 'lucide-react';

const STEAP_DATA = [
  {
    id: 'social',
    label: 'Social',
    icon: Users,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    gradient: 'from-rose-500 to-pink-500',
    forces: [
      { title: 'Bem-estar como destino', desc: 'Saúde mental e burnout docente exigem novos modelos de acolhimento.' },
      { title: 'Fragmentação Cultural', desc: 'Guerra de narrativas e bolhas exigem literacia crítica.', impact: 'Curto Prazo' },
      { title: 'Novas Carreiras', desc: 'Professores viram mentores e curadores.', impact: 'Médio Prazo' }
    ],
    agroImplication: "O campo está envelhecendo, mas a gestão rejuvenesce. A sucessão familiar é o maior drama social do agro hoje. A universidade precisa ser o mediador desse conflito de gerações."
  },
  {
    id: 'tech',
    label: 'Tecnológica',
    icon: Cpu,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-indigo-500',
    forces: [
      { title: 'IA Generativa Ubíqua', desc: 'Fim da avaliação tradicional. Personalização em escala.' },
      { title: 'Tokenização de Credenciais', desc: 'Diplomas fragmentados em blockchain e micro-skills.', impact: 'Médio Prazo' },
      { title: 'Realidade Aumentada (XR)', desc: 'Laboratórios virtuais substituem infraestrutura física cara.', impact: 'Médio Prazo' }
    ],
    agroImplication: "Agro 4.0 não é futuro, é presente. Drones, IoT e dados são commodities. O gap é humano: gente que saiba interpretar o dashboard da colheitadeira."
  },
  {
    id: 'economic',
    label: 'Econômica',
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-cyan-500',
    forces: [
      { title: 'Aprendizagem Longa Vida', desc: 'Fim do "curso de 4 anos". Assinaturas de educação recorrente.' },
      { title: 'Vendas B2B', desc: 'Empresas assumem o papel de compradores de educação em escala.', impact: 'Curto Prazo' },
      { title: 'Economia P2P', desc: 'Plataformas descentralizadas de ensino entre pares.', impact: 'Médio/Longo Prazo' }
    ],
    agroImplication: "O produtor rural é rico em ativos (terra), mas ilíquido. O modelo de financiamento precisa mudar (Barter Educacional? Soja por Curso?). As empresas (B2B) são os grandes pagadores da formação técnica."
  },
  {
    id: 'environmental',
    label: 'Ambiental',
    icon: Leaf,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-green-500',
    forces: [
      { title: 'Transição Climática', desc: 'Currículos focados em resiliência e adaptação.' },
      { title: 'Ecoansiedade', desc: 'Jovens buscando propósito regenerativo.', impact: 'Curto Prazo' },
      { title: 'Economia Circular', desc: 'Campus como laboratório vivo de sustentabilidade.', impact: 'Médio Prazo' }
    ],
    agroImplication: "A pressão ESG é existencial para o agro exportador. Não existe mais agrônomo que não entenda de carbono. A universidade precisa ser a certificadora dessas práticas."
  },
  {
    id: 'political',
    label: 'Político-Regulatória',
    icon: Landmark,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-orange-500',
    forces: [
      { title: 'Governança de Dados', desc: 'LGPD e AI Act redefinem a confiança institucional.' },
      { title: 'Regulação EAD', desc: 'Restrições crescentes exigem qualidade comprovada.', impact: 'Curto Prazo' },
      { title: 'Inclusão Digital', desc: 'Acesso universal como direito básico.', impact: 'Curto/Médio Prazo' }
    ],
    agroImplication: "O agro é altamente regulado (Ambiental, Sanitário, Fundiário). O profissional precisa navegar na burocracia estatal tanto quanto na técnica de campo."
  }
];

const ForceCard = ({ data, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${isActive ? 'ring-2 ring-offset-2 ring-slate-900 shadow-xl transform scale-[1.02]' : 'hover:bg-slate-50'}`}
  >
    {isActive && (
       <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${data.gradient}`}></div>
    )}
    
    <div className="flex items-center gap-4 mb-2">
        <div className={`p-3 rounded-xl ${data.bg} ${data.color} shadow-sm group-hover:scale-110 transition-transform`}>
            <data.icon size={24} />
        </div>
        <div>
            <h3 className={`text-lg font-black uppercase tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{data.label}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{data.forces.length} Vetores</p>
        </div>
    </div>
  </button>
);

const DetailPanel = ({ data }: { data: typeof STEAP_DATA[0] }) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden h-full flex flex-col animate-fade-in">
        <div className={`p-8 bg-gradient-to-r ${data.gradient} text-white`}>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <data.icon size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">{data.label}</h2>
            </div>
            <p className="text-white/90 text-sm font-medium leading-relaxed border-l-2 border-white/30 pl-4">
                "Esta dimensão não é opcional. Ela redefine as regras do jogo para quem quer operar educação no século XXI."
            </p>
        </div>

        <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
            
            {/* AGRO IMPLICATION */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                <div className="absolute -top-3 -right-3 bg-slate-900 text-white p-2 rounded-lg shadow-lg">
                    <Network size={16} />
                </div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Impacto Específico no Agro</h4>
                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                    "{data.agroImplication}"
                </p>
            </div>

            {/* FORCES LIST */}
            <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle size={14} /> Vetores de Mudança
                </h4>
                <div className="space-y-4">
                    {data.forces.map((force, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all bg-white group">
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 bg-gradient-to-r ${data.gradient}`}></div>
                            <div>
                                <div className="flex justify-between items-start">
                                    <h5 className="font-bold text-slate-800 text-sm">{force.title}</h5>
                                    {force.impact && (
                                        <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                            {force.impact}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{force.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const SteapForcesView: React.FC = () => {
  const [activeForce, setActiveForce] = useState(STEAP_DATA[0].id);
  const activeData = STEAP_DATA.find(d => d.id === activeForce)!;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fade-in">
        
        {/* HERO */}
        <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                    <Search size={12} /> Foresight Estratégico
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                    As Matrizes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">STEAP</span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                    Mapeamento sistemático das 5 dimensões críticas que estão remodelando o ecossistema educacional. Não são tendências; são fatos portadores de futuro.
                </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
                
                {/* LEFT NAV */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-4">
                        <p className="text-xs text-slate-500 font-medium leading-relaxed flex gap-2">
                            <Info size={32} className="text-blue-500 shrink-0"/>
                            Navegue pelas dimensões para entender como cada força pressiona a transformação da universidade.
                        </p>
                    </div>
                    <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1">
                        {STEAP_DATA.map(data => (
                            <ForceCard 
                                key={data.id} 
                                data={data} 
                                isActive={activeForce === data.id} 
                                onClick={() => setActiveForce(data.id)} 
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT DETAIL */}
                <div className="lg:col-span-8 h-full">
                    <DetailPanel data={activeData} />
                </div>

            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl hover:bg-blue-600 transition-colors cursor-pointer">
                    <CheckCircle2 size={14} /> Concluir Análise de Cenário
                </div>
            </div>

        </div>
    </div>
  );
};

export default SteapForcesView;
