
import React, { useState } from 'react';
import { 
  Users, Building2, Sprout, Landmark, HeartHandshake, 
  Network, ArrowRight, AlertTriangle, Zap, MessageCircle,
  Share2, MapPin, Handshake, Target
} from 'lucide-react';

// --- DADOS REAIS DO ECOSSISTEMA GOIANO ---

const STAKEHOLDERS = [
  {
    id: 'anchors',
    label: 'Empresas-Âncora',
    icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    role: 'Demandantes de Talento & Tecnologia',
    actors: [
      { name: 'BRF (Rio Verde)', detail: 'Maior complexo agroindustrial da América Latina.', pain: 'Falta de gestores industriais 4.0.', anima: 'Formação in-company de engenheiros de alimentos.' },
      { name: 'São Martinho (Boa Vista)', detail: 'Gigante de bioenergia e etanol.', pain: 'Transição energética e certificação RenovaBio.', anima: 'Hub de pesquisa em biocombustíveis.' },
      { name: 'John Deere (Maqcampo)', detail: 'Líder em maquinário e agricultura de precisão.', pain: 'Técnicos que saibam consertar software, não só motor.', anima: 'Lab de Mecatrônica Agrícola.' },
      { name: 'Bayer Cropscience', detail: 'Biotecnologia e proteção de cultivos.', pain: 'Adoção de tecnologias digitais pelo produtor médio.', anima: 'Extensão rural digital.' },
      { name: 'JBS (Friboi)', detail: 'Processamento de proteína animal.', pain: 'ESG e rastreabilidade da cadeia de fornecimento.', anima: 'MBA em Supply Chain Sustentável.' }
    ]
  },
  {
    id: 'producers',
    label: 'Produtores & Coops',
    icon: Sprout,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    role: 'O Coração Pulsante (A Base)',
    actors: [
      { name: 'COMIGO', detail: 'Cooperativa Mista (Rio Verde). Potência regional.', pain: 'Sucessão familiar e profissionalização da gestão.', anima: 'Programa de Herdeiros e Governança.' },
      { name: 'APROSOJA-GO', detail: 'Associação dos Produtores de Soja.', pain: 'Defesa de interesses e gargalos logísticos.', anima: 'Think Tank de dados logísticos.' },
      { name: 'Grupo Bom Futuro', detail: 'Mega produtor (atuação forte no Centro-Oeste).', pain: 'Escala de mão de obra qualificada no campo.', anima: 'Residência Agronômica.' }
    ]
  },
  {
    id: 'research',
    label: 'Pesquisa & Academia',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    role: 'Parceiros de Conhecimento',
    actors: [
      { name: 'EMBRAPA (Arroz e Feijão)', detail: 'Unidade em Santo Antônio de Goiás.', pain: 'Transformar papers científicos em produto de mercado.', anima: 'Aceleradora de spin-offs científicas.' },
      { name: 'IF Goiano', detail: 'Instituto Federal (Forte em Rio Verde).', pain: 'Foco técnico excelente, mas com gap de gestão/business.', anima: 'Complementação de Business para técnicos.' },
      { name: 'Hubs AgTech', detail: 'Cygni Lab, Campo Lab.', pain: 'Falta de devs que entendam de "roça".', anima: 'Bootcamps de Dev for Agro.' }
    ]
  },
  {
    id: 'gov',
    label: 'Governo & Regulação',
    icon: Landmark,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    role: 'Legisladores & Fomento',
    actors: [
      { name: 'SEAPA-GO', detail: 'Secretaria de Agricultura.', pain: 'Dados confiáveis para políticas públicas.', anima: 'Observatório do Agro (Data Provider).' },
      { name: 'FAEG / SENAR', detail: 'Federação da Agricultura.', pain: 'Capilaridade de treinamento ponta.', anima: 'Conteúdo EAD Premium para o Senar.' },
      { name: 'Agrodefesa', detail: 'Agência de Defesa Agropecuária.', pain: 'Atualização sanitária constante.', anima: 'Cursos de atualização em normas internacionais.' }
    ]
  },
  {
    id: 'impact',
    label: 'Impacto & ESG',
    icon: HeartHandshake,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    role: 'Guardiões da Sustentabilidade',
    actors: [
      { name: 'Aliança da Terra', detail: 'ONG de regularização ambiental.', pain: 'Conflito ideológico com produtores.', anima: 'Espaço neutro de diálogo baseado em ciência.' },
      { name: 'Certificadoras (RTRS)', detail: 'Auditoria de soja responsável.', pain: 'Falta de auditores qualificados.', anima: 'Formação de auditores ambientais.' }
    ]
  }
];

const StakeholderGraph = () => {
  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center group">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Central Node: Ânima */}
      <div className="relative z-20 flex flex-col items-center justify-center w-32 h-32 bg-white rounded-full shadow-[0_0_60px_rgba(37,99,235,0.3)] animate-pulse-slow border-4 border-slate-800">
        <Network size={40} className="text-blue-600" />
        <span className="text-[10px] font-black text-slate-900 mt-2 uppercase tracking-widest">Orquestrador</span>
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-[300px] h-[300px] border border-white/10 rounded-full animate-spin-slow pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none"></div>

      {/* Satellite Nodes */}
      {STAKEHOLDERS.map((st, idx) => {
        const angle = (idx * 360) / STAKEHOLDERS.length; // Distribui em círculo
        const radius = 180; // Distância do centro
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div 
            key={st.id}
            className="absolute flex flex-col items-center group/node cursor-pointer transition-all duration-500 hover:scale-110 z-20"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {/* Connecting Line (Pseudo-SVG via CSS for simplicity in this view) */}
            <div 
                className="absolute top-1/2 left-1/2 w-[180px] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -z-10 origin-left"
                style={{ 
                    transform: `rotate(${angle + 180}deg)`,
                    width: `${radius}px`,
                    left: `${-radius}px`
                }}
            ></div>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 border-slate-800 ${st.bg} ${st.color}`}>
              <st.icon size={24} />
            </div>
            <div className="mt-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 shadow-xl opacity-0 group-hover/node:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold text-white whitespace-nowrap">{st.label}</span>
            </div>
          </div>
        );
      })}
      
      <div className="absolute bottom-6 left-6 text-slate-500 text-[10px] font-mono">
        GRAFO DE RELACIONAMENTO • GOIÂNIA HUB
      </div>
    </div>
  );
};

const GoianiaStakeholdersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('anchors');

  const activeData = STAKEHOLDERS.find(s => s.id === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen font-sans animate-fade-in pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-12">
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/20">
                    <Handshake size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">Mapa de Poder & Influência</h1>
            </div>
            <p className="text-lg text-slate-500 max-w-3xl font-medium leading-relaxed">
                Um campus vocacionado não existe no vácuo. Ele é um nó em uma rede complexa. 
                Abaixo, mapeamos os atores reais de Goiás que orbitarão nossa operação.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* 1. VISUALIZAÇÃO DE GRAFO */}
        <section>
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Share2 className="text-blue-600" size={24} /> A Teia de Conexões
                </h2>
                <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                    Ecossistema Sudoeste Goiano
                </span>
            </div>
            <StakeholderGraph />
        </section>

        {/* 2. TABELA INTERATIVA DE ATORES */}
        <section>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Menu Lateral */}
                <div className="w-full md:w-1/4 space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Categorias de Atores</h3>
                    {STAKEHOLDERS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveTab(s.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all group ${
                                activeTab === s.id 
                                ? 'bg-white shadow-md border-l-4 border-blue-600 ring-1 ring-slate-100' 
                                : 'text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                            <span className="text-sm font-bold group-hover:text-slate-800">{s.label}</span>
                            {activeTab === s.id && <ArrowRight size={14} className="text-blue-600"/>}
                        </button>
                    ))}
                </div>

                {/* Conteúdo do Card */}
                <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-lg p-8 relative overflow-hidden min-h-[500px]">
                    {/* Background Icon */}
                    <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none">
                        {activeData && React.createElement(activeData.icon, { size: 400 })}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-2xl ${activeData?.bg} ${activeData?.color}`}>
                                {activeData && React.createElement(activeData.icon, { size: 32 })}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{activeData?.label}</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{activeData?.role}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {activeData?.actors.map((actor, idx) => (
                                <div key={idx} className="group p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all bg-slate-50 hover:bg-white">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-black text-slate-800">{actor.name}</h4>
                                        <div className="bg-white px-2 py-1 rounded border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-bold text-blue-600 uppercase">Parceiro Potencial</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-4">{actor.detail}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                                        <div>
                                            <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                                                <AlertTriangle size={10}/> Dor Real (Pain)
                                            </p>
                                            <p className="text-xs text-slate-700 font-medium">{actor.pain}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                                                <Zap size={10}/> Solução Ânima
                                            </p>
                                            <p className="text-xs text-slate-700 font-medium">{actor.anima}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. TENSÕES E CONFLITOS (REALIDADE) */}
        <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-600 rounded-lg shadow-lg shadow-rose-600/30">
                            <Target size={24} className="text-white"/>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Zonas de Tensão</h2>
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        Um ecossistema real tem atritos. A Ânima não ignora isso; ela se posiciona como o <strong>terreno neutro</strong> onde essas tensões viram inovação.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="mt-1"><AlertTriangle size={20} className="text-amber-400"/></div>
                            <div>
                                <h4 className="font-bold text-white text-sm">Produtor vs. Indústria</h4>
                                <p className="text-xs text-slate-400 mt-1">Disputa de preços e margens. A Ânima oferece dados imparciais de mercado (Think Tank).</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="mt-1"><AlertTriangle size={20} className="text-amber-400"/></div>
                            <div>
                                <h4 className="font-bold text-white text-sm">Regulação vs. Expansão</h4>
                                <p className="text-xs text-slate-400 mt-1">Produtores querem abrir área; ONGs querem preservar. A Ânima ensina intensificação tecnológica (produzir mais no mesmo espaço).</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 text-center">
                    <MessageCircle size={48} className="mx-auto text-emerald-400 mb-6"/>
                    <h3 className="text-xl font-serif font-bold text-white mb-4">
                        "Qual dessas vozes você representa?"
                    </h3>
                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                        Seja você um gigante como a BRF ou um produtor familiar de Jataí, o campus foi desenhado para resolver a sua dor específica, conectando-o ao outro lado da mesa.
                    </p>
                    <button className="bg-emerald-500 text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-emerald-400 transition-colors uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        Agendar Visita ao Hub
                    </button>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default GoianiaStakeholdersView;
