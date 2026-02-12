
import React, { useState } from 'react';
import { 
  AlertTriangle, Layers, Clock, Lock, Factory, 
  ArrowRight, Sprout, BookOpen, XCircle, GraduationCap, 
  Split, Hourglass, ShieldAlert, DollarSign, HeartCrack,
  Network, Zap, Target, Users, BarChart3, AlertOctagon,
  ChevronDown, ChevronUp, Activity
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

// --- DADOS DAS 13 CRISES (AGRUPADAS) ---
const CRISIS_GROUPS = [
    {
        id: 'sentido',
        label: 'Crise de Sentido',
        color: '#8b5cf6', // Purple
        score: 9.5, // Intensidade
        crises: [
            { id: 1, title: 'Legitimidade & Relevância', desc: 'Diploma perde valor percebido frente a microcredenciais.', agroFactor: 'No campo, o "saber fazer" vale mais que o diploma. O produtor não contrata pelo papel, contrata pelo resultado na safra.' },
            { id: 6, title: 'Propósito & Futuro', desc: 'Formação para um mundo estável que não existe mais.', agroFactor: 'O agro lida com incerteza radical (clima, preço, praga). Um currículo estático é obsoleto no dia da formatura.' },
            { id: 13, title: 'Identidade Institucional', desc: 'A universidade não sabe se é mercado, igreja ou partido.', agroFactor: 'O setor produtivo rejeita ideologização. Exige pragmatismo técnico e científico.' }
        ]
    },
    {
        id: 'humano',
        label: 'Fator Humano',
        color: '#f43f5e', // Rose
        score: 8.0,
        crises: [
            { id: 3, title: 'Carreira Docente', desc: 'Envelhecimento, burnout e desvalorização.', agroFactor: 'Doutores acadêmicos não querem morar no interior. Faltam "practitioners" (mestres do ofício) na sala de aula.' },
            { id: 11, title: 'Confiança Intergeracional', desc: 'Jovens digitais vs. Gestores analógicos.', agroFactor: 'O sucessor da fazenda é nativo digital (drones/AI); o professor muitas vezes parou na Revolução Verde dos anos 70.' },
            { id: 12, title: 'Engajamento & Atenção', desc: 'Competição com economia da atenção e falta de sentido.', agroFactor: 'A sala de aula fechada é insuportável para quem gosta de campo e natureza.' },
            { id: 4, title: 'Equidade & Inclusão', desc: 'Acesso desigual a recursos e tecnologia.', agroFactor: 'O abismo de conectividade rural cria duas classes de profissionais: os conectados e os excluídos.' }
        ]
    },
    {
        id: 'operacional',
        label: 'Operacional',
        color: '#f59e0b', // Amber
        score: 9.0,
        crises: [
            { id: 7, title: 'Sustentabilidade Financeira', desc: 'Inadimplência, custos crescentes e guerra de preços.', agroFactor: 'Dependência de FIES/Prouni é mortal. O modelo precisa migrar para financiamento privado (bolsas de empresas).' },
            { id: 8, title: 'Governança & Regulação', desc: 'Rigidez do MEC vs. Velocidade do Mundo.', agroFactor: 'A tecnologia muda a cada safra. Agrade curricular muda a cada 5 anos. O gap é insustentável.' },
            { id: 2, title: 'Avaliação & Incentivo', desc: 'Foco na memorização em era de IA Generativa.', agroFactor: 'Não adianta decorar a praga; o app identifica. O aluno precisa saber tomar decisão de manejo.' },
            { id: 9, title: 'Inovação Pedagógica', desc: 'Aulas expositivas do séc XIX.', agroFactor: 'O Agro é "Hands-on". Ensino passivo não forma quem precisa operar máquinas de R$ 2 milhões.' }
        ]
    },
    {
        id: 'conexao',
        label: 'Conexão Externa',
        color: '#10b981', // Emerald
        score: 10.0, // Crítico no Agro
        crises: [
            { id: 10, title: 'Mundo do Trabalho', desc: 'Desalinhamento de skills.', agroFactor: 'Déficit de 148k profissionais digitais. O agro grita por tech, a universidade entrega teoria.' },
            { id: 5, title: 'Fragmentação Epistêmica', desc: 'Bolhas culturais e guerras de narrativa.', agroFactor: 'A tensão "Cidade vs Campo" e "Ambiental vs Produtivo" exige um profissional capaz de dialogar, não de polarizar.' }
        ]
    }
];

const RADAR_DATA = CRISIS_GROUPS.map(g => ({
    subject: g.label,
    A: g.score,
    fullMark: 10
}));

const CrisisGroupCard: React.FC<{ group: typeof CRISIS_GROUPS[0] }> = ({ group }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 mb-6 shadow-sm hover:shadow-md ${isOpen ? 'ring-1 ring-slate-200' : ''}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between bg-slate-50/50 border-b border-slate-100"
            >
                <div className="flex items-center gap-4">
                    <div className="w-3 h-10 rounded-full" style={{ backgroundColor: group.color }}></div>
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{group.label}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                            Intensidade: <span style={{ color: group.color }}>{group.score}/10</span>
                        </p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="text-slate-400"/> : <ChevronDown className="text-slate-400"/>}
            </button>

            {isOpen && (
                <div className="p-6 grid grid-cols-1 gap-4">
                    {group.crises.map(crisis => (
                        <div key={crisis.id} className="border-l-2 pl-4 py-1" style={{ borderColor: group.color }}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#{crisis.id}</span>
                                <h4 className="font-bold text-slate-800 text-sm">{crisis.title}</h4>
                            </div>
                            <p className="text-xs text-slate-500 mb-2 leading-relaxed">{crisis.desc}</p>
                            
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <Sprout size={10} className="text-emerald-600"/> Fator Agro (Multiplicador de Risco)
                                </p>
                                <p className="text-xs text-slate-700 font-medium italic">"{crisis.agroFactor}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const UniversityCrisisView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fade-in">
      
      {/* HERO: A Tempestade Perfeita */}
      <div className="bg-slate-900 text-white pt-16 pb-24 px-8 relative overflow-hidden rounded-b-[4rem] shadow-2xl mb-12">
        <div className="absolute top-0 left-0 p-20 opacity-10 pointer-events-none">
          <AlertTriangle size={400} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Activity size={12}/> Diagnóstico Sistêmico
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8">
            Colapso Convergente <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              As 13 Fraturas
            </span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Não é apenas uma crise de alunos. É uma crise de existência. O modelo industrial de educação está sendo esmagado por 13 pressões simultâneas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: RADAR CHART & SUMMARY */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-50 px-4 py-2 rounded-bl-2xl border-l border-b border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Radar de Tensão</p>
                    </div>
                    
                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                                <Radar
                                    name="Nível de Crise"
                                    dataKey="A"
                                    stroke="#e11d48"
                                    strokeWidth={3}
                                    fill="#f43f5e"
                                    fillOpacity={0.2}
                                />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm font-medium text-slate-600 italic">
                            "A crise é multidimensional. Tentar resolver apenas o 'Financeiro' sem resolver o 'Sentido' é enxugar gelo."
                        </p>
                    </div>
                </div>

                {/* CALLOUT BOX */}
                <div className="bg-slate-800 rounded-[2rem] p-8 text-white shadow-lg border border-slate-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <AlertOctagon className="text-rose-500" /> Veredito
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        Diante desse cenário, a educação se encontra em uma encruzilhada histórica: ou se torna irrelevante, ou se reinventa radicalmente como <strong>infraestrutura estratégica</strong>.
                    </p>
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs font-bold text-center">
                        Risco de Extinção: ALTO
                    </div>
                </div>
            </div>

            {/* RIGHT: THE 13 POINTS */}
            <div className="lg:col-span-7">
                <div className="space-y-4">
                    {CRISIS_GROUPS.map(group => (
                        <CrisisGroupCard key={group.id} group={group} />
                    ))}
                </div>
            </div>

        </div>

      </div>

      {/* FECHAMENTO */}
      <div className="max-w-4xl mx-auto mt-20 px-8 text-center">
        <p className="text-lg font-serif italic text-slate-600 leading-relaxed mb-8">
          "Essas fraturas não são o fim. São o convite para a metamorfose. Onde a universidade falha, o <strong>Ecossistema de Aprendizagem</strong> floresce."
        </p>
        
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors cursor-pointer shadow-lg">
           Ver as Forças de Transformação (STEAP) <ArrowRight size={14} />
        </div>
      </div>

    </div>
  );
};

export default UniversityCrisisView;
