
import React, { useState } from 'react';
import { 
  Target, Search, Zap, ArrowRight, BookOpen, 
  Users, Microscope, RefreshCw, FileText, CheckCircle2,
  Factory, Lightbulb, Activity
} from 'lucide-react';

const CycleContent = ({ cycle, active, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`flex-1 text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
            active 
            ? 'bg-slate-900 border-slate-900 shadow-xl' 
            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${active ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <cycle.icon size={24} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-400' : 'text-slate-400'}`}>
                Ciclo 0{cycle.id}
            </span>
        </div>
        <h3 className={`text-lg font-black uppercase tracking-tight mb-2 ${active ? 'text-white' : 'text-slate-800'}`}>
            {cycle.title}
        </h3>
        <p className={`text-xs font-medium leading-relaxed ${active ? 'text-slate-300' : 'text-slate-500'}`}>
            {cycle.summary}
        </p>
        
        {active && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
        )}
    </button>
);

const CaseStudyBox = ({ title, steps }: { title: string, steps: any[] }) => (
    <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-800 pointer-events-none">
            <Factory size={200} />
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-600/20">
                    <Zap size={20} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest">Caso Real: MBA em Bioenergia</h4>
                    <p className="text-lg font-bold text-slate-800">{title}</p>
                </div>
            </div>

            <div className="space-y-6">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-700 shadow-sm">
                                {idx + 1}
                            </div>
                            {idx < steps.length - 1 && <div className="w-0.5 h-full bg-emerald-200 my-1"></div>}
                        </div>
                        <div className="pb-4">
                            <h5 className="text-sm font-bold text-slate-800 mb-1">{step.phase}</h5>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                {step.desc}
                            </p>
                            {step.quote && (
                                <div className="mt-2 pl-3 border-l-2 border-emerald-300 text-xs italic text-slate-500">
                                    "{step.quote}"
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const BernsteinAnalysis = ({ production, recontext, evaluation }: any) => (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <BookOpen size={20} className="text-indigo-600" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Decodificador de Bernstein</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                    <Factory size={12}/> Produção (Origem)
                </p>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {production}
                </p>
            </div>
            <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase mb-2 flex items-center gap-1">
                    <RefreshCw size={12}/> Recontextualização (Pedagogia)
                </p>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {recontext}
                </p>
            </div>
            <div>
                <p className="text-[10px] font-bold text-rose-400 uppercase mb-2 flex items-center gap-1">
                    <Activity size={12}/> Avaliação (Critério)
                </p>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {evaluation}
                </p>
            </div>
        </div>
    </div>
);

const RecontextualizationCyclesView: React.FC = () => {
    const [activeCycle, setActiveCycle] = useState(1);

    const cycles = [
        {
            id: 1,
            title: "Propósito & Impacto",
            icon: Target,
            summary: "O aluno define 'por que' está ali. Visão emancipatória do problema.",
            content: {
                intro: "A primeira etapa não é uma aula expositiva. É um choque de realidade. O aluno entra no programa e é imediatamente confrontado com a complexidade do setor, não para 'aprender sobre ele', mas para definir seu lugar dentro dele.",
                caseTitle: "O Choque de Perspectivas na Usina",
                caseSteps: [
                    { phase: "Imersão Inicial", desc: "Aluno visita a Raízen na Semana 1. Entrevista o Gerente Agrícola, o Engenheiro Industrial e o Especialista Ambiental.", quote: "Cada um tem uma verdade diferente sobre o mesmo litro de etanol." },
                    { phase: "Síntese do Conflito", desc: "Aluno percebe que o Agrônomo quer produtividade a qualquer custo, enquanto o Ambiental quer reduzir emissões. O problema é sistêmico." },
                    { phase: "Statement de Propósito", desc: "Resultado do ciclo: O aluno escreve sua tese pessoal. 'Vou atuar na interseção entre custo e carbono para viabilizar o RenovaBio.'", quote: "Não estou aqui para tirar nota. Estou aqui para resolver essa tensão." }
                ],
                bernstein: {
                    prod: "Conhecimento produzido na prática da usina, nas metas globais de ESG e na regulação estatal.",
                    recont: "O aluno traz a visão bruta da empresa; o professor ajuda a estruturar isso em um 'propósito articulado' e ético.",
                    eval: "O critério não é 'você decorou?', é 'seu propósito é ambicioso, viável e eticamente responsável?'"
                }
            }
        },
        {
            id: 2,
            title: "Diagnóstico & Imersão",
            icon: Search,
            summary: "Mergulho profundo no território. O aluno como pesquisador-aprendiz.",
            content: {
                intro: "Agora o aluno entra na cadeia produtiva, não como visitante, mas como 'pesquisador-aprendiz'. Durante 8 a 12 semanas, ele vive o problema, coleta dados reais e navega as tensões políticas e técnicas da organização.",
                caseTitle: "A Caça ao Carbono (Diagnóstico)",
                caseSteps: [
                    { phase: "Mapeamento (Semanas 1-2)", desc: "Aluno rastreia o ciclo de vida: da colheita à destilação. Onde o carbono está vazando? Qual a linha base real?", quote: "Os dados da planilha não batem com o consumo real da caldeira." },
                    { phase: "Análise Rigorosa (Semanas 3-4)", desc: "Lê papers sobre eficiência energética. Conversa com professores especialistas. Usa ferramentas de LCA (Life Cycle Assessment).", quote: "A ciência diz que a eficiência deveria ser 15% maior." },
                    { phase: "Diálogo Crítico (Semanas 5-8)", desc: "Confronta a teoria com a realidade financeira. Conversa com o CFO sobre CAPEX vs. OPEX.", quote: "Entendi. A caldeira nova reduz carbono, mas o payback é de 8 anos. O desafio é financeiro, não técnico." }
                ],
                bernstein: {
                    prod: "A prática diária da usina, os desafios concretos de manutenção e operação.",
                    recont: "A Imersão é a ferramenta. O aluno traduz o ruído da fábrica em dados estruturados e diagnóstico científico.",
                    eval: "Critério de realidade: 'Você entendeu o problema raiz? Você fala a língua da usina? Seus dados param em pé?'"
                }
            }
        },
        {
            id: 3,
            title: "Cocriação & Inovação",
            icon: Lightbulb,
            summary: "Design da solução. O conhecimento vira competência aplicada.",
            content: {
                intro: "O aluno deixa de ser observador e vira propositor. Ele co-desenha a solução com o mentor da empresa e o professor. O objetivo não é um 'estudo de caso' de papel, é um projeto de implementação real.",
                caseTitle: "O Projeto Híbrido de R$ 20MM",
                caseSteps: [
                    { phase: "Design da Solução", desc: "Aluno propõe um modelo híbrido: retrofit da caldeira atual + software de otimização de queima.", quote: "Menor investimento inicial, retorno mais rápido." },
                    { phase: "Modelagem Multidisciplinar", desc: "Engenharia valida a técnica. Finanças valida o ROI (25% em 4 anos). Estratégia valida o risco.", quote: "O professor de finanças ajudou a montar o fluxo de caixa descontado." },
                    { phase: "Piloto & Legado", desc: "Teste em 1 módulo da usina. Se funcionar, vira padrão. O aluno sai com um case de portfólio.", quote: "Eu não tirei 10. Eu liderei um projeto de inovação real." }
                ],
                bernstein: {
                    prod: "A prática da inovação, o 'fazer diferente' dentro da restrição real.",
                    recont: "O 'Design de Inovação' integra técnica, economia e social. A sala de aula vira mesa de decisão.",
                    eval: "Impacto: 'O projeto funcionou? Reduziu carbono? Deu lucro? O que aprendemos com a falha?'"
                }
            }
        }
    ];

    const activeContent = cycles.find(c => c.id === activeCycle)?.content;

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
            
            {/* HERO */}
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <RefreshCw size={12} /> Metodologia Aplicada
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        Os 3 Ciclos de <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                            Recontextualização
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Como o dispositivo pedagógico transforma a teoria de Bernstein na jornada prática do aluno Ânima Agro. Do propósito ao projeto implementado.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-12">

                {/* NAVEGAÇÃO DE CICLOS */}
                <div className="flex flex-col md:flex-row gap-4">
                    {cycles.map((cycle) => (
                        <CycleContent 
                            key={cycle.id}
                            cycle={cycle}
                            active={activeCycle === cycle.id}
                            onClick={() => setActiveCycle(cycle.id)}
                        />
                    ))}
                </div>

                {/* CONTEÚDO DO CICLO ATIVO */}
                {activeContent && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                        
                        {/* Coluna Principal: Texto & Teoria */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">O que acontece neste ciclo?</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {activeContent.intro}
                                </p>
                            </div>

                            <BernsteinAnalysis 
                                production={activeContent.bernstein.prod}
                                recontext={activeContent.bernstein.recont}
                                evaluation={activeContent.bernstein.eval}
                            />
                        </div>

                        {/* Coluna Lateral: Estudo de Caso Visual */}
                        <div className="lg:col-span-5">
                            <CaseStudyBox 
                                title={activeContent.caseTitle}
                                steps={activeContent.caseSteps}
                            />
                        </div>

                    </div>
                )}

                {/* SÍNTESE FINAL (TABELA) */}
                <div className="mt-12 bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden relative">
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">A Espiral de Aprendizagem</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                                Esses 3 ciclos não são apenas sequenciais; são espirais. O aluno passa por eles várias vezes durante o curso, em níveis crescentes de complexidade.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <Target className="mx-auto text-blue-400 mb-4" size={32} />
                                <h4 className="text-sm font-black uppercase tracking-widest mb-2">1. Visão</h4>
                                <p className="text-xs text-slate-300">Construção de sentido e ética.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <Search className="mx-auto text-emerald-400 mb-4" size={32} />
                                <h4 className="text-sm font-black uppercase tracking-widest mb-2">2. Rigor</h4>
                                <p className="text-xs text-slate-300">Análise científica da realidade.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <Factory className="mx-auto text-rose-400 mb-4" size={32} />
                                <h4 className="text-sm font-black uppercase tracking-widest mb-2">3. Impacto</h4>
                                <p className="text-xs text-slate-300">Transformação concreta do mundo.</p>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 text-center">
                            <p className="text-lg font-serif italic text-slate-200">
                                "Isso é radicalmente diferente de 'ir para a aula e fazer prova'. É produzir conhecimento na prática, com rigor e para a realidade."
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecontextualizationCyclesView;
