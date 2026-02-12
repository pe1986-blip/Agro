
import React, { useState } from 'react';
import { 
  Layers, Minimize2, Maximize2, Users, Mic, 
  GitMerge, CheckCircle2, XCircle, ArrowRight, 
  Scale, Grid, LayoutTemplate, MessageSquare
} from 'lucide-react';

const ConceptDefinition = ({ title, subtitle, icon: Icon, definition, strong, weak }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-900 rounded-2xl text-white">
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>
            </div>
        </div>
        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
            {definition}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Forte (+)</span>
                <p className="text-xs font-bold text-slate-700">{strong}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-2">Fraco (-)</span>
                <p className="text-xs font-bold text-emerald-800">{weak}</p>
            </div>
        </div>
    </div>
);

const ScenarioCard = ({ type, title, icon: Icon, characteristics, result, color }: any) => (
    <div className={`p-6 rounded-2xl border ${color.bg} ${color.border} h-full`}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <Icon size={20} className={color.text} />
                <h4 className={`font-black text-sm uppercase tracking-wide ${color.title}`}>{title}</h4>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/60 ${color.text}`}>
                {type}
            </span>
        </div>
        
        <ul className="space-y-3 mb-6">
            {characteristics.map((char: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${color.dot}`}></div>
                    {char}
                </li>
            ))}
        </ul>

        <div className="pt-4 border-t border-black/5">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Resultado</p>
            <p className="text-sm font-bold text-slate-800 leading-snug">
                {result}
            </p>
        </div>
    </div>
);

const ClassificationFramingView: React.FC = () => {
    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
            
            {/* HERO */}
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Scale size={12} /> A Arquitetura do Controle
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        Classificação & <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
                            Enquadramento
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Bernstein não olha apenas para o "conteúdo". Ele olha para a "forma". Como a universidade controla fronteiras (Classificação) e processos (Enquadramento)?
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-16">
                
                {/* 1. DEFINIÇÕES LADO A LADO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ConceptDefinition 
                        title="Classificação"
                        subtitle="Fronteiras do Saber"
                        icon={Grid}
                        definition="Refere-se à força das fronteiras entre os conteúdos. Quão isolados estão os departamentos?"
                        strong="Silos Rígidos (Agronomia ≠ Economia)"
                        weak="Integração (Núcleo de Bioenergia)"
                    />
                    <ConceptDefinition 
                        title="Enquadramento"
                        subtitle="Controle do Processo"
                        icon={LayoutTemplate}
                        definition="Refere-se a quem controla o ritmo, a sequência e o método. Quem manda na sala de aula?"
                        strong="Professor Decide Tudo (Passivo)"
                        weak="Aluno/Mentor Negociam (Ativo)"
                    />
                </div>

                {/* 2. DEEP DIVE: CLASSIFICAÇÃO */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">1. Classificação (Fronteiras)</h2>
                            <p className="text-slate-500 text-sm font-medium">Do isolamento disciplinar à inteligência sistêmica.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl overflow-hidden">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">O Caso: Expansão de Etanol (50% em 5 anos)</h3>
                            <p className="text-slate-600 text-sm">Como diferentes modelos universitários abordam este problema complexo?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            {/* Conector Visual */}
                            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-slate-200 text-slate-400 z-10">
                                <ArrowRight size={20} />
                            </div>

                            <ScenarioCard 
                                type="Universidade Tradicional"
                                title="Classificação Forte (+C)"
                                icon={Minimize2}
                                color={{ bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', title: 'text-slate-700', dot: 'bg-slate-400' }}
                                characteristics={[
                                    "Agrônomo foca apenas na produtividade da cana.",
                                    "Economista foca apenas no custo de capital.",
                                    "Advogado foca apenas no zoneamento.",
                                    "Alunos não se encontram; disciplinas isoladas."
                                ]}
                                result="Visão Fragmentada. O agrônomo propõe algo tecnicamente viável mas financeiramente desastroso."
                            />

                            <ScenarioCard 
                                type="Campus Vocacionado"
                                title="Classificação Fraca (-C)"
                                icon={Maximize2}
                                color={{ bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', title: 'text-indigo-900', dot: 'bg-indigo-500' }}
                                characteristics={[
                                    "Núcleo Integrado: Agronomia + Econ + Direito + Tech.",
                                    "Problema comum: 'Viabilidade da Expansão'.",
                                    "Diálogo constante: 'Se aumentar TCH, como impacta o Capex?'",
                                    "Solução cocriada, não agregada."
                                ]}
                                result="Inteligência Sistêmica. O aluno aprende a 'traduzir' entre tribos e gera soluções robustas."
                            />
                        </div>
                    </div>
                </section>

                {/* 3. DEEP DIVE: ENQUADRAMENTO */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-rose-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">2. Enquadramento (Controle)</h2>
                            <p className="text-slate-500 text-sm font-medium">Da obediência passiva à agência responsável.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <GitMerge size={300} />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">O Projeto na Usina</h3>
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    No modelo vocacionado, o professor não entrega o roteiro pronto. Ele entrega o <strong>desafio</strong> e as <strong>ferramentas</strong>.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 bg-white/10 rounded-xl border border-white/10">
                                        <Mic className="text-rose-400 shrink-0" size={20} />
                                        <div>
                                            <p className="text-xs font-black uppercase text-rose-300 mb-1">Negociação (Agência)</p>
                                            <p className="text-sm text-slate-200">
                                                "Professor, queremos focar em eficiência energética da caldeira, pois a usina tem orçamento para isso agora."
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4 p-4 bg-white/10 rounded-xl border border-white/10">
                                        <Users className="text-emerald-400 shrink-0" size={20} />
                                        <div>
                                            <p className="text-xs font-black uppercase text-emerald-300 mb-1">Facilitação (Suporte)</p>
                                            <p className="text-sm text-slate-200">
                                                "Ótimo. Para isso, vocês vão precisar de Termodinâmica Avançada. Aqui estão os materiais e o especialista."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white text-slate-800 p-8 rounded-3xl shadow-lg">
                                <h4 className="font-black text-sm uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                                    A Mudança de Papel
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Professor</span>
                                        <div className="flex items-center gap-2 text-xs font-bold">
                                            <span className="text-red-400 line-through">Detentor da Verdade</span>
                                            <ArrowRight size={12} className="text-slate-300"/>
                                            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Facilitador Metodológico</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Aluno</span>
                                        <div className="flex items-center gap-2 text-xs font-bold">
                                            <span className="text-red-400 line-through">Recipiente Passivo</span>
                                            <ArrowRight size={12} className="text-slate-300"/>
                                            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Líder do Projeto</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Ritmo</span>
                                        <div className="flex items-center gap-2 text-xs font-bold">
                                            <span className="text-red-400 line-through">Cronograma de Aulas</span>
                                            <ArrowRight size={12} className="text-slate-300"/>
                                            <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded">Realidade da Safra</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SÍNTESE FINAL */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-10 text-center shadow-lg mt-12">
                    <MessageSquare size={48} className="mx-auto text-emerald-500 mb-6" />
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">A Fórmula da Transformação</h3>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-black text-sm uppercase border border-indigo-100">
                            Classificação Fraca
                        </span>
                        <span className="text-slate-300 font-serif italic text-xl">+</span>
                        <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black text-sm uppercase border border-emerald-100">
                            Enquadramento Moderado
                        </span>
                        <span className="text-slate-300 font-serif italic text-xl">=</span>
                        <span className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-sm uppercase shadow-lg">
                            Profissional Sistêmico & Autônomo
                        </span>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        "Bernstein nos mostra que o segredo não é apenas o que se ensina, mas <strong>como se controla o ensino</strong>. Ao relaxar as fronteiras e compartilhar o controle, criamos o espaço para a verdadeira inovação."
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ClassificationFramingView;
