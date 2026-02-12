
import React, { useState, useMemo } from 'react';
import { 
  Play, FileText, DoorOpen, Calendar, 
  PenTool, CheckCircle, ChevronRight, FileAudio,
  Building2, Globe, AlertTriangle, Network, Activity, 
  Layers, Wallet, Calculator, Target, Quote, Sprout, Zap,
  AlertCircle, TrendingUp, ShieldAlert, Check
} from 'lucide-react';
import { 
    ResponsiveContainer, ComposedChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Legend, Bar 
} from 'recharts';

// Importação das Sub-visões
import FourDoorsView from './FourDoorsView';
import ActionRoadmapView from './ActionRoadmapView';
import FinalReflectionView from './FinalReflectionView';
import FinalQuizView from './FinalQuizView';

// --- Imports Financeiros V8 ---
import { generateFullProjectStructure } from './services/financialSheetFactory';
import { consolidateSheets, recalculateSheet } from './services/sheetCalculationService';
import { convertSheetToModelResult } from './services/financialModelingService';
import { formatNumber } from './constants';
import { SheetData } from './types';

// --- COMPONENTES DO RESUMO EXECUTIVO ---

const IdeaCard = ({ number, title, icon: Icon, children }: any) => (
    <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Ideia</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {number}
            </div>
            <div className="w-px h-full bg-slate-100 group-hover:bg-blue-100 transition-colors"></div>
        </div>
        <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            </div>
            <div className="text-sm text-slate-600 leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    </div>
);

const AudioPlayerMock = () => (
    <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-lg border border-slate-700">
        <button className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 hover:scale-105 transition-transform shrink-0">
            <Play size={20} fill="currentColor" className="ml-1"/>
        </button>
        <div className="flex-1">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Áudio Briefing</p>
            <p className="text-sm font-medium text-white">Resumo Executivo para Stakeholders</p>
            <div className="w-full h-1 bg-slate-700 rounded-full mt-3 overflow-hidden">
                <div className="w-1/3 h-full bg-emerald-500 rounded-full"></div>
            </div>
        </div>
        <div className="text-xs font-mono text-slate-400 tabular-nums">
            01:45 / 05:00
        </div>
    </div>
);

// --- NOVO WIDGET: SNAPSHOT FINANCEIRO DINÂMICO ---
const FinancialSnapshotWidget = () => {
    const financialData = useMemo(() => {
        // 1. Gera a estrutura completa do projeto (todas as frentes)
        const allSheets = generateFullProjectStructure().map(s => recalculateSheet(s, null));
        
        // 2. Extrai Goiânia (assumindo que a primeira 'sede' é Goiânia)
        const goianiaSheet = allSheets.find(s => s.id === 'sede_goiania');
        
        // 3. Consolidado Total (Soma de tudo)
        const consolidatedSheet = consolidateSheets(allSheets);

        // 4. Converte para Resultados (KPIs)
        const goianiaResult = goianiaSheet ? convertSheetToModelResult(goianiaSheet) : null;
        const totalResult = convertSheetToModelResult(consolidatedSheet);

        return { goianiaResult, totalResult };
    }, []);

    const { goianiaResult, totalResult } = financialData;

    // Dados para o gráfico comparativo (Ano 5 - Maturidade)
    const chartData = [
        {
            name: 'Goiânia (Piloto)',
            receita: goianiaResult ? goianiaResult.kpis.ebitdaAno5 / 1000000 : 0, 
            ebitda: goianiaResult ? goianiaResult.kpis.ebitdaAno5 / 1000000 : 0,
            margem: goianiaResult ? goianiaResult.projecoes[4].margemEbitda : 0,
            roi: goianiaResult ? goianiaResult.kpis.roi3anos : 0,
            acumulado: goianiaResult ? goianiaResult.projecoes[4].fluxoCaixaAcumulado / 1000000 : 0
        },
        {
            name: 'Plano Nacional',
            receita: totalResult.kpis.ebitdaAno5 / 1000000,
            ebitda: totalResult.kpis.ebitdaAno5 / 1000000,
            margem: totalResult.projecoes[4].margemEbitda,
            roi: totalResult.kpis.roi3anos,
            acumulado: totalResult.projecoes[4].fluxoCaixaAcumulado / 1000000
        }
    ];

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden mb-16 border border-slate-800">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Calculator size={300} />
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Wallet size={12} /> Financial Studio V8 Integration
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Viabilidade Econômica</h2>
                        <p className="text-slate-400 text-sm mt-1">Projeção de Maturidade (Ano 5) • Goiânia vs. Consolidado</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">EBITDA Consolidado (Ano 5)</p>
                        <p className="text-4xl font-black text-emerald-400">R$ {formatNumber(totalResult.kpis.ebitdaAno5 / 1000000)} MM</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Coluna 1: Goiânia (Unit Unit) */}
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Building2 className="text-blue-400" size={20}/> Goiânia (Hub Sede)
                            </h3>
                            <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Piloto</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">EBITDA (Ano 5)</span>
                                <span className="font-mono font-bold text-white">R$ {formatNumber((goianiaResult?.kpis.ebitdaAno5 || 0) / 1000000)} MM</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">Margem EBITDA</span>
                                <span className="font-mono font-bold text-emerald-400">{(goianiaResult?.projecoes[4].margemEbitda || 0).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">Payback</span>
                                <span className="font-mono font-bold text-yellow-400">{(goianiaResult?.kpis.paybackAnos || 0).toFixed(1)} Anos</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">ROI (3 Anos)</span>
                                <span className="font-mono font-bold text-white">{(goianiaResult?.kpis.roi3anos || 0).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2: Consolidado (Scale) */}
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Globe className="text-purple-400" size={20}/> Visão Nacional
                            </h3>
                            <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Total</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">EBITDA (Ano 5)</span>
                                <span className="font-mono font-bold text-white">R$ {formatNumber(totalResult.kpis.ebitdaAno5 / 1000000)} MM</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">Margem Média</span>
                                <span className="font-mono font-bold text-emerald-400">{totalResult.projecoes[4].margemEbitda.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">VPL (NPV)</span>
                                <span className="font-mono font-bold text-blue-400">R$ {formatNumber(totalResult.kpis.vpl / 1000000)} MM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Alavancagem ROI</span>
                                <span className="font-mono font-bold text-white">{(totalResult.kpis.roi3anos).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-slate-500 italic">
                        *Dados sincronizados em tempo real com o módulo Financial Studio. Premissas: Inflação 4.5% a.a., Crescimento Orgânico 5% a.a.
                    </p>
                </div>
            </div>
        </div>
    );
};

const ExecutiveSummaryContent = () => (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans animate-fade-in">
        {/* HERO HEADER */}
        <div className="bg-white border-b border-slate-200 px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest mb-6">
                    <FileText size={12} /> Carta ao Stakeholder
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                    O Que Você Precisa Saber
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                    A tese da Ânima Agro resumida para decisores. O problema, a solução e o impacto em 5 minutos.
                </p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
            
            {/* AUDIO PLAYER */}
            <AudioPlayerMock />

            {/* ABERTURA */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                <div className="absolute top-10 right-10 opacity-5">
                    <Quote size={120} />
                </div>
                
                <div className="prose prose-lg prose-slate text-slate-700 leading-relaxed font-serif">
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-slate-900">
                        O propósito deste documento é apresentar, de forma estruturada e fundamentada, a tese estratégica da Ânima Agro — uma iniciativa que vai além da criação de "mais uma faculdade" para posicionar a Ânima Educação como infraestrutura nacional de desenvolvimento de lideranças no setor mais vital da economia brasileira.
                    </p>
                    <p>
                        O agronegócio brasileiro já é potência global em produção — exporta alimentos, bioenergia e fibras em escala que poucos países replicam. Mas ainda não é potência em inteligência: falta formar os estrategistas, gestores e formuladores de política com visão sistêmica da cadeia produtiva. A sofisticação tecnológica da porteira não foi acompanhada pela mesma sofisticação na formação de lideranças.
                    </p>
                    <p>
                        Este Resumo Executivo consolida os elementos centrais do business plan: Contexto & Propósito (por que Ânima, por que Agro, por que agora), Ambiente (panorama do setor), Gaps Críticos (déficits mapeados pela cadeia produtiva), Solução Ânima (3 pilares operacionais + Matriz Curricular Radial), SWOT (forças, fraquezas, oportunidades, ameaças), Pricing, Projeções Financeiras e Plano de Implementação. Nos próximos capítulos, cada dimensão será aprofundada. Aqui, apresentamos a visão de conjunto.
                    </p>
                </div>
            </div>

            {/* 6 IDEIAS CHAVE */}
            <div className="space-y-6 mb-16">
                <div className="flex items-center gap-4 mb-4 ml-2">
                    <div className="h-px bg-slate-300 flex-1"></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Contexto & Gaps Estruturais</span>
                    <div className="h-px bg-slate-300 flex-1"></div>
                </div>

                <IdeaCard number="01" title="Por Que Ânima?" icon={Building2}>
                    <p>
                        A Ânima traz 20+ anos de trajetória em qualidade acadêmica e inovação educacional escalável. Ocupa uma posição única: ágil (diferente da pública burocrática) e conectada (diferente da escola técnica isolada sem densidade acadêmica). É o hub natural entre IES, empresas e governo para operar em rede nacional.
                    </p>
                    <p className="text-slate-500">
                        <strong>Na prática:</strong> A Ânima tem capacidade de orquestração nacional — pode conectar pesquisa de ponta da UNP em biotecnologia com demandas de campo de cooperativas no Centro-Oeste, fechando o ciclo entre conhecimento e aplicação real.
                    </p>
                </IdeaCard>

                <IdeaCard number="02" title="Por Que Agro?" icon={Sprout}>
                    <p>
                        O agronegócio brasileiro movimenta R$ 2,4 trilhões/ano (24% do PIB), é responsável pela segurança alimentar global e principal motor do superávit comercial. Está em transformação profunda: de "commodity bruta" para AgTech (IA, IoT, Rastreabilidade, Bioenergia Avançada). Enfrenta fome estrutural de talento: déficit de 148 mil profissionais qualificados em Agricultura Digital, Gestão de Dados e ESG.
                    </p>
                    <p className="text-slate-500">
                        <strong>Na prática:</strong> Cooperativas, tradings e usinas de bioenergia estão abrindo vagas que ficam meses sem preenchimento por falta de profissionais que combinem visão de cadeia produtiva + domínio de dados + competências de gestão. É um mercado vendedor para quem forma bem.
                    </p>
                </IdeaCard>

                <IdeaCard number="03" title="Por Que Agora? A Convergência de 3 Forças" icon={Zap}>
                    <p>
                        Três forças convergem neste momento: (1) Déficit massivo de talentos (148 mil em Agricultura Digital), (2) Transformação tecnológica acelerada (IA, bioenergia 2G/3G, ESG obrigatório), e (3) Agro como agenda #1 de Estado, pressionado por rastreabilidade, comércio internacional e transição energética.
                    </p>
                    <p className="text-slate-500">
                        <strong>Na prática:</strong> Quando universidades tradicionais levam 5 anos para reformar currículo e o agro muda em 6 meses, abre-se uma janela estratégica para quem consegue operar com aprendizagem viva em vez de burocracia acadêmica fossilizada. A janela é de 18-24 meses.
                    </p>
                </IdeaCard>

                <IdeaCard number="04" title="O Ambiente: Agro em Transformação Profunda" icon={Globe}>
                    <p>
                        O Brasil controla 7 das 10 principais cadeias agrícolas globais (soja, milho, carne bovina, frango, celulose, café, etanol). O setor está passando por três transições simultâneas: (1) Digitalização massiva (sensores IoT, IA preditiva, blockchain para rastreabilidade), (2) Complexificação regulatória (ESG, EUDR, mercado de carbono), e (3) Consolidação corporativa (cooperativas crescendo como multilatinas, tradings verticalizando operações).
                    </p>
                    <p className="text-slate-500">
                        <strong>Na prática:</strong> O perfil de liderança que o agro demanda hoje não existe em escala suficiente. Agrônomos clássicos não dominam dados. Engenheiros de dados não entendem de solo. Gestores de trading não têm formação em ESG. A Ânima entra para formar o profissional radial — competente em múltiplas camadas.
                    </p>
                </IdeaCard>

                <IdeaCard number="05" title="Gaps Críticos: Os Déficits Estruturais" icon={AlertTriangle}>
                    <p>
                        O diagnóstico revela 4 déficits estruturais: (1) Gap de Competências Digitais — 148 mil profissionais faltando em Agricultura Digital; (2) Gap de Gestão Integrada — cooperativas e usinas operando com gestores sem visão de cadeia completa; (3) Gap de Interlocução com Poder Público — falta quem traduza operação de campo em política pública e vice-versa; (4) Gap de Formação em ESG — pressão internacional crescente sem capacitação local adequada.
                    </p>
                    <p className="text-slate-500">
                        <strong>Na prática:</strong> Quando mapeamos a presença da Ânima pela lógica da cadeia produtiva (antes/dentro/depois da porteira), territórios e stakeholders, o diagnóstico é incômodo: temos pesquisa de qualidade e volume de alunos, mas estamos posicionados nas bordas da cadeia — não no seu núcleo operativo. A Ânima Agro é a travessia dessa periferia para o centro.
                    </p>
                </IdeaCard>

                <IdeaCard number="06" title="A Solução: Infraestrutura de Desenvolvimento de Lideranças" icon={Network}>
                    <p>
                        A Ânima Agro não é campus físico isolado — é plataforma de desenvolvimento conectada em rede, operando através de 3 pilares: (1) Operação Viva (alunos trabalhando sobre dados e desafios reais de empresas-parceiras, não casos fictícios), (2) Matriz Curricular Radial (conhecimento organizado em torno de projetos de impacto de cadeia produtiva, não disciplinas isoladas), e (3) Rede Nacional de Clusters (conhecimento fluindo entre Goiânia, Mato Grosso, Oeste do Paraná, Minas Gerais e outros polos).
                    </p>
                    <p className="text-slate-500">
                        <strong>Na prática:</strong> Alunos não estudam "cases de Harvard". Trabalham sobre problemas reais de Raízen, Copersucar, SLC Agrícola, Coamo enquanto aprendem — e entregam soluções que viram portfólio de impacto comprovado. Graduates chegam ao mercado com 90%+ de empregabilidade em 6 meses (vs. 50-60% média do setor).
                    </p>
                </IdeaCard>

            </div>

            {/* SEÇÃO DOS 3 PILARES */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-6 ml-2">
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Os 3 Pilares em Detalhes</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="text-blue-600" size={24} />
                            <h3 className="font-bold text-slate-800 text-sm uppercase">Pilar 1 — Operação Viva</h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Alunos trabalham sobre dados reais de empresas-parceiras (cooperativas, tradings, usinas) desde o primeiro semestre. Não há separação artificial entre "teoria" e "prática" — o problema real da cadeia produtiva é o eixo em torno do qual os conceitos são aprendidos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <Layers className="text-emerald-600" size={24} />
                            <h3 className="font-bold text-slate-800 text-sm uppercase">Pilar 2 — Matriz Radial</h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Currículo organizado radialmente: projetos de impacto no centro, competências técnicas (agronomia, dados, gestão, ESG, política) orbitando em função do problema a resolver. Não há "cadeiras soltas" — tudo converge para gerar solução real.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <Target className="text-amber-500" size={24} />
                            <h3 className="font-bold text-slate-800 text-sm uppercase">Pilar 3 — Rede de Clusters</h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Goiânia é a nossa sede, a Una é o nosso piloto. Nos próximo anos, expansão em rede para Mato Grosso, Oeste do Paraná, Minas Gerais, Bahia e interior de SP. Conhecimento flui entre territórios em tempo real, sem replicar erro de "campus isolado".
                        </p>
                    </div>
                </div>
            </div>

            {/* SEÇÃO FINANCEIRA DINÂMICA (NOVA) */}
            <FinancialSnapshotWidget />

            {/* SEÇÃO SWOT */}
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-6 ml-2">
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Análise SWOT Estratégica</span>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                    <p className="text-slate-600 mb-8 max-w-3xl">
                        A análise SWOT sintetiza a posição estratégica da Ânima Agro no contexto competitivo brasileiro e identifica os principais vetores de risco e oportunidade.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Strengths */}
                        <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100">
                            <h4 className="flex items-center gap-2 font-black text-emerald-800 uppercase tracking-wide mb-4">
                                <Check size={18} /> Forças (Strengths)
                            </h4>
                            <ul className="space-y-2 text-sm text-emerald-900">
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>Trajetória consolidada de 20+ anos da Ânima em qualidade acadêmica.</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>Posição única: ágil (vs. pública) e conectada (vs. isolada).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>Capacidade de orquestração nacional entre IES, empresas e governo.</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>Governança desenhada para atender padrões internacionais.</li>
                            </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="bg-rose-50/50 rounded-xl p-6 border border-rose-100">
                            <h4 className="flex items-center gap-2 font-black text-rose-800 uppercase tracking-wide mb-4">
                                <AlertCircle size={18} /> Fraquezas (Weaknesses)
                            </h4>
                            <ul className="space-y-2 text-sm text-rose-900">
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>Falta de reconhecimento de marca no setor do agronegócio (forte em Saúde).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>Posicionamento atual nas bordas da cadeia produtiva, não no núcleo.</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>Ausência de histórico de parcerias estruturadas com grandes coops.</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>Investimento inicial elevado com retorno de médio/longo prazo.</li>
                            </ul>
                        </div>

                        {/* Opportunities */}
                        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                            <h4 className="flex items-center gap-2 font-black text-blue-800 uppercase tracking-wide mb-4">
                                <TrendingUp size={18} /> Oportunidades (Opportunities)
                            </h4>
                            <ul className="space-y-2 text-sm text-blue-900">
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>Demanda explosiva por profissionais qualificados (148 mil de déficit).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>Governo receptivo: Agro é agenda #1 de Estado (infra + políticas).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>Integração de IA e IoT no currículo (Aprendizagem Viva).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>Vácuo competitivo: públicas lentas, privadas sem densidade.</li>
                            </ul>
                        </div>

                        {/* Threats */}
                        <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
                            <h4 className="flex items-center gap-2 font-black text-amber-800 uppercase tracking-wide mb-4">
                                <ShieldAlert size={18} /> Ameaças (Threats)
                            </h4>
                            <ul className="space-y-2 text-sm text-amber-900">
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></span>Flutuações na economia global e no setor agrícola (commodities).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></span>Mudanças regulatórias abruptas.</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></span>Risco de não conseguir parcerias-âncora na janela crítica (18 meses).</li>
                                <li className="flex gap-2 items-start"><span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></span>Risco reputacional se a empregabilidade inicial não for alta.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* FECHAMENTO (CTA) */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                    <Target size={300} />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                        O Convite
                    </h2>
                    
                    <div className="text-left space-y-6 text-slate-300 text-lg mb-10 leading-relaxed font-medium">
                        <p>
                            Se você é uma <strong>Empresa</strong>, este é o lugar para formar seus futuros líderes sob medida e resolver seus gargalos de inovação.
                        </p>
                        <p>
                            Se você é <strong>Governo</strong>, este é o parceiro para desenvolver políticas públicas baseadas em dados reais do setor.
                        </p>
                        <p>
                            Se você é <strong>Estudante</strong>, aqui você não vai esperar a formatura para começar sua carreira. Você começa no dia 1.
                        </p>
                    </div>

                    <p className="text-xl md:text-2xl text-white font-bold italic mb-10 border-t border-white/20 pt-8">
                        "Em vez de esperar que o futuro do agro aconteça, este campus foi desenhado para permitir que a gente o construa junto."
                    </p>
                </div>
            </div>

        </div>
    </div>
);

// --- COMPONENTE HUB PRINCIPAL ---

type SynthesisTab = 'summary' | 'doors' | 'roadmap' | 'reflection' | 'quiz';

const SynthesisView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SynthesisTab>('summary');

  const TABS = [
    { id: 'summary', label: 'Resumo Executivo', icon: FileText, desc: 'A Tese em 5 min' },
    { id: 'doors', label: '4 Portas', icon: DoorOpen, desc: 'Seu Perfil' },
    { id: 'roadmap', label: 'Roteiro 90 Dias', icon: Calendar, desc: 'Plano de Voo' },
    { id: 'reflection', label: 'Reflexão', icon: PenTool, desc: 'Manifesto Pessoal' },
    { id: 'quiz', label: 'Micro-Quiz', icon: CheckCircle, desc: 'Consolidação' },
  ];

  const ActiveComponent = () => {
      switch(activeTab) {
          case 'summary': return <ExecutiveSummaryContent />;
          case 'doors': return <FourDoorsView />;
          case 'roadmap': return <ActionRoadmapView />;
          case 'reflection': return <FinalReflectionView />;
          case 'quiz': return <FinalQuizView />;
          default: return <ExecutiveSummaryContent />;
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
        
        {/* HEADER DE NAVEGAÇÃO DO HUB */}
        <div className="bg-white border-b border-slate-200 z-40 shrink-0">
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-slate-700">
                            Encerramento
                        </span>
                        <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                            <ChevronRight size={12}/> Próximos Passos
                        </span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <FileAudio className="text-slate-700" size={24}/> Síntese Executiva
                    </h1>
                </div>

                <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as SynthesisTab)}
                                className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all min-w-[100px] border ${
                                    isActive 
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                                    : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-0.5">
                                    <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                                    <span className="text-[10px] font-black uppercase tracking-wide">{tab.label}</span>
                                </div>
                                <span className={`text-[8px] font-medium hidden md:block ${isActive ? 'text-slate-400' : 'text-slate-300'}`}>
                                    {tab.desc}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* ÁREA DE CONTEÚDO */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-0 bg-[#fcfbf9]">
            <ActiveComponent />
        </div>

    </div>
  );
};

export default SynthesisView;
