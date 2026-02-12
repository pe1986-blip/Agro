
import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Clock, Users, Building2, 
  Hammer, Megaphone, Target, Briefcase, GraduationCap,
  ShieldCheck, ArrowRight, Zap, Settings, Landmark
} from 'lucide-react';

const WORKSTREAMS = [
  {
    id: 'gov',
    label: 'Governança & Stakeholders',
    icon: Landmark,
    color: 'blue',
    phases: [
      { m: 'M1-M2', task: 'Formação do Conselho Consultivo Local', desc: 'Convite para as 10 maiores lideranças agro da região.' },
      { m: 'M3', task: 'Mapeamento de MOUs Municipais', desc: 'Acordos de cooperação com Prefeituras e Sindicatos.' },
      { m: 'M4-M12', task: 'Rituais de Conselho (Trimestral)', desc: 'Reuniões de validação de demanda e ajuste de rumo.' }
    ]
  },
  {
    id: 'human',
    label: 'Capital Humano (O Novo Docente)',
    icon: GraduationCap,
    color: 'purple',
    phases: [
      { m: 'M1-M2', task: 'Headhunting: Docente Líder (Chief Agronomist)', desc: 'Busca de practitioner com trânsito no mercado.' },
      { m: 'M3-M4', task: 'Recrutamento: Mentores Práticos', desc: 'Seleção de especialistas locais para o modelo Dual.' },
      { m: 'M5', task: 'Capacitação: Time Comercial B2B', desc: 'Treinamento sobre a tese vocacionada para vendas complexas.' }
    ]
  },
  {
    id: 'infra',
    label: 'Infraestrutura & Skinning',
    icon: Hammer,
    color: 'orange',
    phases: [
      { m: 'M1-M3', task: 'Projeto Executivo & Orçamento', desc: 'Definição de áreas para retrofit e novos labs.' },
      { m: 'M4-M6', task: 'Execução de Obras: Sala Agro & Labs', desc: 'Adaptação física para o padrão Premium.' },
      { m: 'M7', task: 'Branding: Enxoval Visual', desc: 'Fachada, sinalização interna e totens digitais.' }
    ]
  },
  {
    id: 'comm',
    label: 'Acadêmico & Go-to-Market',
    icon: Briefcase,
    color: 'emerald',
    phases: [
      { m: 'M2-M4', task: 'Localização de Matrizes Radiais', desc: 'Ajuste do currículo para as culturas da praça.' },
      { m: 'M5-M7', task: 'Lançamento: Evento "Portas Abertas"', desc: 'Roadshow com empresas e autoridades locais.' },
      { m: 'M8-M12', task: 'Onboarding: Primeiras Turmas', desc: 'Início da operação Dual com contratos âncora.' }
    ]
  }
];

// Added: Explicitly type MilestoneCard as React.FC to handle 'key' prop correctly in map
const MilestoneCard: React.FC<{ phase: any; streamColor: string }> = ({ phase, streamColor }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group hover:border-blue-300 transition-all">
    <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${streamColor}`}></div>
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">{phase.m}</span>
    </div>
    <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{phase.task}</h4>
    <p className="text-[11px] text-slate-500 leading-relaxed">{phase.desc}</p>
  </div>
);

const ImplementationRoadmapView: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12 pb-20">
      {/* HEADER TÁTICO */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <Settings size={200} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Calendar size={12} /> Roadmap de Implantação Ano 1
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Kit de Transformação <span className="text-blue-500">no Tempo</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            O cronograma macro para tirar a Una do modelo generalista e entregar a primeira Sede Vocacionada em 12 meses.
          </p>
        </div>
      </div>

      {/* TIMELINE DASHBOARD */}
      <div className="grid grid-cols-1 gap-10">
        {WORKSTREAMS.map((stream) => {
          const colorClass = 
            stream.color === 'blue' ? 'bg-blue-500' : 
            stream.color === 'purple' ? 'bg-purple-500' : 
            stream.color === 'orange' ? 'bg-orange-500' : 'bg-emerald-500';

          return (
            <div key={stream.id} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${colorClass} text-white shadow-lg`}>
                  <stream.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{stream.label}</h3>
                </div>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stream.phases.map((phase, idx) => (
                  <MilestoneCard key={idx} phase={phase} streamColor={colorClass} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CRITICAL PATH / RISK SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
          <h4 className="font-black text-amber-900 uppercase text-sm mb-6 flex items-center gap-2">
            <Zap size={20} className="text-amber-600"/> Caminho Crítico (Gatilhos)
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800 shrink-0">1</div>
              <p className="text-sm text-slate-700 font-medium">A contratação do <strong>Chief Agronomist</strong> até o Mês 2 é o principal pilar para a venda B2B e credibilidade do Conselho.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800 shrink-0">2</div>
              <p className="text-sm text-slate-700 font-medium">O <strong>Retrofit da Fachada</strong> deve coincidir com o evento de lançamento para garantir o efeito "New Brand".</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 p-8 opacity-10">
            <ShieldCheck size={120} />
          </div>
          <h4 className="font-black text-blue-400 uppercase text-sm mb-6">Fator de Sucesso</h4>
          <p className="text-xl font-serif italic text-slate-200 leading-relaxed mb-6">
            "O setup não é apenas físico. O segredo está na governança: se o Conselho Local for forte, a captação de alunos e contratos B2B flui organicamente."
          </p>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest">
               Sincronismo Operacional: OK
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationRoadmapView;
