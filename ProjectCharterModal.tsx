
import React, { useMemo, useState, useEffect } from 'react';
import { 
  X, Target, MapPin, Calendar, Users, 
  DollarSign, AlertTriangle, CheckCircle2, 
  ArrowRight, Building2, ShieldAlert, Activity,
  Briefcase, Scale, Zap, Flag, TrendingUp,
  Clock, XCircle, Hourglass
} from 'lucide-react';
import { generateFullProjectStructure } from './services/financialSheetFactory';
import { recalculateSheet } from './services/sheetCalculationService';
import { convertSheetToModelResult } from './services/financialModelingService';
import { FinancialRepository } from './services/persistenceService';
import { formatNumber } from './constants';
import { YEARS, SheetData } from './types';

interface ProjectCharterModalProps {
  onClose: () => void;
  onProceed: () => void;
}

const PhaseStep = ({ phase, time, title, desc, status }: any) => (
    <div className="relative pl-8 pb-8 last:pb-0">
        <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 bg-white ${status === 'done' ? 'border-emerald-500 text-emerald-500' : 'border-slate-300 text-slate-300'}`}>
            {status === 'done' ? <CheckCircle2 size={14}/> : <div className="w-2 h-2 rounded-full bg-slate-300"></div>}
        </div>
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200"></div>
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{phase}</span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{time}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">{title}</h4>
            <p className="text-xs text-slate-500 mt-1">{desc}</p>
        </div>
    </div>
);

const RiskCard = ({ type, title, items }: any) => (
    <div className={`p-5 rounded-2xl border ${type === 'execution' ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'}`}>
        <h4 className={`text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${type === 'execution' ? 'text-amber-700' : 'text-rose-700'}`}>
            {type === 'execution' ? <AlertTriangle size={14}/> : <XCircle size={14}/>}
            {title}
        </h4>
        <ul className="space-y-3">
            {items.map((item: any, idx: number) => (
                <li key={idx} className="flex gap-3 text-xs font-medium text-slate-700">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${type === 'execution' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                    <div>
                        <span className="font-bold block text-slate-800">{item.title}</span>
                        {item.desc}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const ProjectCharterModal: React.FC<ProjectCharterModalProps> = ({ onClose, onProceed }) => {
  const [financialData, setFinancialData] = useState({ capex: 0, revenue: 0, ticket: 0, margin: 0, students: 0, cashburn: 0, breakeven: 0 });
  const [isCalculated, setIsCalculated] = useState(false);

  // --- SINCRONIZAÇÃO FINANCEIRA (V8 ENGINE) ---
  useEffect(() => {
      const loadFinancials = async () => {
          // 1. Tenta carregar dados salvos
          let sheets: SheetData[] = await FinancialRepository.loadSheets();
          
          // 2. Se não houver sheets (primeiro load), usa o factory
          if (!sheets || sheets.length === 0) {
              sheets = generateFullProjectStructure();
          }

          // 3. Busca a sheet de Goiânia
          const goianiaSheet = sheets.find(s => s.id === 'sede_goiania');
          
          if (!goianiaSheet) return;

          // 4. Recalcula para garantir integridade
          const calculated = recalculateSheet(goianiaSheet, null);

          // 5. Converte para Modelo Financeiro (KPIs)
          const modelResult = convertSheetToModelResult(calculated);

          // 6. Extrai KPIs
          const getVal = (id: string, year: string) => {
              const row = calculated.rows.find(r => r.id === id);
              return row ? row.values[year as any] : 0;
          };

          // Capex: Soma Total (Todos os anos)
          const capexRow = calculated.rows.find(r => r.id === 'capexTotal');
          const totalCapex = capexRow ? YEARS.reduce((acc, y) => acc + capexRow.values[y], 0) : 0;
          
          // Revenue Maturity (Ano 5)
          const revenueMaturity = getVal('netRevenue', 'ano5');
          const ticketEntry = getVal('ticket', 'ano1');
          const marginMaturity = getVal('ebitdaMargin', 'ano5') * 100;
          const studentsMaturity = getVal('students', 'ano5');

          setFinancialData({
              capex: totalCapex, 
              revenue: revenueMaturity, 
              ticket: ticketEntry, 
              margin: marginMaturity,
              students: studentsMaturity,
              cashburn: 35, // Valor fixo do 5W2H para alinhar com o texto
              breakeven: modelResult.kpis.paybackAnos // Payback calculado pela engine
          });
          setIsCalculated(true);
      };
      loadFinancials();
  }, []);

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto custom-scrollbar flex flex-col relative">
        
        {/* Header de Missão */}
        <div className="relative bg-slate-900 text-white p-8 overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                <Target size={200} />
            </div>
            
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
            >
                <X size={20} className="text-white"/>
            </button>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Activity size={12} /> Project Charter
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
                            Hub Nacional: <span className="text-emerald-400">Goiânia</span>
                        </h1>
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/10 max-w-3xl backdrop-blur-sm">
                            <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
                                "O epicentro da estratégia da Ânima Educação, onde a instituição materializa sua tese de integração total com o setor produtivo agrícola por meio da Sede Flagship, funcionando como infraestrutura de tecnologia de desenvolvimento de pessoas que conecta em tempo real território, empresas, dados e pesquisa."
                            </p>
                        </div>
                    </div>

                    {/* Live Sync Badge */}
                    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status do Projeto</span>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs text-slate-300">
                                 <span>Construcap</span> <span className="text-emerald-400 font-bold">MOU</span>
                             </div>
                             <div className="flex justify-between text-xs text-slate-300">
                                 <span>RogerLens</span> <span className="text-emerald-400 font-bold">OK</span>
                             </div>
                             <div className="flex justify-between text-xs text-slate-300">
                                 <span>Gov. GO</span> <span className="text-emerald-400 font-bold">Conectado</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Corpo do Dossiê */}
        <div className="p-8 md:p-12 space-y-12 bg-[#f8fafc]">
            
            {/* 1. GRID TÁTICO (5W2H) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Zap size={20}/></div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase">O Que</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Abertura da primeira unidade acadêmica Premium vocacionada ao Agro. Uma plataforma que correlaciona desenvolvimento de habilidades com impacto territorial.
                    </p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors"><MapPin size={20}/></div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase">Onde</h4>
                    </div>
                    <p className="text-sm font-black text-slate-800">Complexo Serra Dourada</p>
                    <p className="text-xs text-slate-500 mt-1">Goiânia, GO. Visibilidade máxima e acesso político.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors"><Users size={20}/></div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase">Quem</h4>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 font-medium">
                        <li>• Ânima (Marca em definição)</li>
                        <li>• Construcap (Real Estate)</li>
                        <li>• Bioma (K-12 Partner)</li>
                        <li>• Datagro (Em definição)</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Briefcase size={20}/></div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase">Como</h4>
                    </div>
                     <ul className="text-xs text-slate-600 space-y-1 font-medium">
                        <li>• BTS (Built to Suit)</li>
                        <li>• Investimento Ânima em FF&E</li>
                        <li>• Co-branding Institucional</li>
                    </ul>
                </div>
            </div>

            {/* 2. LINHA DO TEMPO & FINANCEIRO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Timeline */}
                <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600"/> Cronograma (Construcap Sinergy)
                    </h3>
                    <div className="space-y-1">
                        <PhaseStep phase="Fase 1" time="30 Dias" title="Diagnóstico" desc="Definir espaços educacionais e analisar demanda." status="done" />
                        <PhaseStep phase="Fase 2" time="30-60 Dias" title="Masterplan Integrado" desc="Proposta conceitual + viabilidade econômica." status="current" />
                        <PhaseStep phase="Fase 3" time="60-90 Dias" title="Termo de Cooperação" desc="Formatação do contrato definitivo." />
                        <div className="pl-8 pt-4">
                            <div className="bg-slate-900 text-white p-4 rounded-xl text-center shadow-lg">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-400">Target</span>
                                <span className="text-xl font-black">Inauguração 2027</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Box (Dinâmico) */}
                <div className="lg:col-span-7 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><DollarSign size={200}/></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                    <Scale size={24} className="text-emerald-400"/> Quanto (Estimativa Macro)
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Dados sincronizados com Financial Studio V8</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Maturidade (Ano 5)</p>
                                <p className="text-3xl font-black text-emerald-400">R$ {formatNumber(financialData.revenue)}MM</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Capex Total</p>
                                <p className="text-xl font-black">R$ {formatNumber(financialData.capex)}MM</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Cashburn (2 Anos)</p>
                                <p className="text-xl font-black text-rose-400">R$ {financialData.cashburn}MM</p>
                            </div>
                            {/* PONTO DE DESTAQUE: BREAKEVEN */}
                            <div className="bg-white/10 p-3 rounded-xl border border-white/20 shadow-inner">
                                <div className="flex items-center gap-1 mb-1">
                                    <Hourglass size={10} className="text-purple-400"/>
                                    <p className="text-[10px] font-bold text-purple-300 uppercase">Breakeven</p>
                                </div>
                                <p className="text-xl font-black text-white">{financialData.breakeven.toFixed(1)} <span className="text-xs text-slate-300">Anos</span></p>
                            </div>
                             <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Margem EBITDA</p>
                                <p className="text-xl font-black text-blue-400">{financialData.margin.toFixed(0)}%</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-medium text-slate-400">
                             <span>Alunos na Maturidade: <strong className="text-white">{formatNumber(financialData.students)}</strong></span>
                             <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white">Indicadores de Longo Prazo</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. MATRIZ DE RISCO (EXECUÇÃO VS INAÇÃO) */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-200 rounded-lg text-slate-700"><ShieldAlert size={20}/></div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Análise de Risco Bifurcada</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RiskCard 
                        type="execution"
                        title="Riscos de Execução (Fazer)"
                        items={[
                            { title: "Complexidade de Obra", desc: "Serra Dourada exige aprovações e cronograma rígido (dependência da Construcap)." },
                            { title: "Curva de Maturação", desc: "Ticket de R$ 3k exige entrega de valor imediata; risco de ocupação lenta." },
                            { title: "Alinhamento de Sócios", desc: "Manter Bioma, Construcap e Ânima na mesma página pedagógica." }
                        ]}
                    />
                    <RiskCard 
                        type="inaction"
                        title="Riscos de Inação (Não Fazer)"
                        items={[
                            { title: "Perda de Janela", desc: "Goiânia está no 'hype'. Se não ocuparmos, Insper ou FGV o farão." },
                            { title: "Irrelevância Setorial", desc: "Continuar sendo uma IES generalista em um estado vocacionado." },
                            { title: "Custo de Oportunidade", desc: "Perder o parceiro Construcap para um concorrente educacional." }
                        ]}
                    />
                </div>
            </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t border-slate-200 bg-white sticky bottom-0 z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
             <div className="text-xs text-slate-500 font-medium">
                 Última atualização: <span className="font-bold text-slate-800">{new Date().toLocaleDateString()}</span>
             </div>

             <button 
                onClick={onProceed}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-3 transform hover:scale-105"
            >
                Acessar War Room <ArrowRight size={16} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectCharterModal;
