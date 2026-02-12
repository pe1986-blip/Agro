
import React, { useState } from 'react';
import { 
  BookOpen, GitMerge, Users, Compass, 
  ArrowRight, Landmark, Layers, GraduationCap, 
  Lightbulb, AlertTriangle, CheckCircle2, Quote,
  GitBranch, MapPin, Search
} from 'lucide-react';

const QuoteSection = () => (
    <div className="relative p-8 md:p-12 my-8 bg-slate-900 rounded-3xl overflow-hidden text-center">
        <div className="absolute top-6 left-8 text-blue-500 opacity-20">
            <Quote size={80} />
        </div>
        <blockquote className="relative z-10 text-xl font-serif italic text-slate-200 leading-relaxed font-medium">
            "A universidade não pode ser uma torre de marfim, nem um balcão de serviços. Ela deve ser uma ágora contemporânea, um espaço de encontro de saberes para a emancipação do sujeito."
        </blockquote>
        <p className="relative z-10 mt-4 text-xs font-black text-blue-400 uppercase tracking-widest">
            — Naomar de Almeida Filho, Reitor da UFBA (2002-2010)
        </p>
    </div>
);

const CasePillar = ({ number, title, icon: Icon, concept, example, question, color }: any) => (
    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
        <div className={`p-6 ${color.bg} border-b ${color.border} flex justify-between items-start`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.iconBg} ${color.iconColor} text-xl font-black`}>
                    {number}
                </div>
                <div>
                    <h3 className={`text-lg font-black uppercase tracking-tight ${color.titleColor}`}>{title}</h3>
                    <p className="text-xs font-bold opacity-70">O Conceito na Prática</p>
                </div>
            </div>
            <Icon size={24} className={`${color.iconColor} opacity-50`} />
        </div>

        <div className="p-8 space-y-8">
            {/* O Conceito */}
            <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <BookOpen size={14}/> A Teoria
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {concept}
                </p>
            </div>

            {/* O Exemplo Concreto (Agro) */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${color.accent}`}></div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600"/> Aplicação no Agro
                </h4>
                <div className="space-y-3">
                    {example.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${color.dot} shrink-0`}></div>
                            <p className="text-xs text-slate-700 leading-snug">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* A Pergunta Provocativa */}
            <div className="pt-6 border-t border-slate-100">
                <p className="text-sm font-serif italic text-slate-500 text-center">
                    "{question}"
                </p>
            </div>
        </div>
    </div>
);

const ResistanceBlock = () => (
    <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 mt-12 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10">
            <AlertTriangle size={150} className="text-rose-600"/>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
                <h3 className="text-xl font-black text-rose-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                    <AlertTriangle size={24} className="text-rose-600"/> O Preço da Inovação (Resistência)
                </h3>
                <p className="text-sm text-rose-800 leading-relaxed mb-4">
                    Naomar não implementou isso sem cicatrizes. A "Universidade Nova" enfrentou forte oposição corporativista.
                </p>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs font-bold text-rose-700">
                        <XCircleIcon /> Professores tradicionais temiam perder "seus" alunos para os Bacharelados Interdisciplinares.
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-rose-700">
                        <XCircleIcon /> Conselhos profissionais (CREA, OAB) questionaram a validade dos diplomas iniciais.
                    </li>
                </ul>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-2xl shadow-sm text-center border border-rose-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lição Aprendida</p>
                <p className="text-lg font-bold text-slate-800 leading-tight">
                    "Sem vontade política férrea e apoio da reitoria, a inércia acadêmica vence."
                </p>
            </div>
        </div>
    </div>
);

const XCircleIcon = () => <div className="w-4 h-4 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-bold text-[10px]">X</div>;

const UfbaCaseStudyView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Landmark size={12} /> Estudo de Caso Histórico
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                De Teoria à Prática: <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    O Caso UFBA (2008)
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Como Naomar de Almeida Filho desenhou e executou a "Universidade Nova" na Bahia, 
                provando que a ruptura curricular é possível em solo brasileiro.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <QuoteSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            
            {/* 1. BACHARELADOS INTERDISCIPLINARES */}
            <CasePillar 
                number="01"
                title="Arquitetura de Ciclos"
                icon={Layers}
                color={{ 
                    bg: 'bg-indigo-50', border: 'border-indigo-200', titleColor: 'text-indigo-900',
                    iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', accent: 'bg-indigo-500', dot: 'bg-indigo-400'
                }}
                concept="Fim da entrada direta na profissão. O aluno entra num Bacharelado Interdisciplinar (BI) - 1º Ciclo - para formar uma base sistêmica antes de especializar (2º Ciclo)."
                example={[
                    "Ao invés de entrar em 'Agronomia' (fechada), o aluno entra no 'BI em Ciência e Tecnologia'.",
                    "Aprende: Ecologia, Economia Agrária, Direito Ambiental e Data Science nos primeiros 3 anos.",
                    "Resultado: Um profissional que entende o sistema agroalimentar, não apenas a planta."
                ]}
                question="Qual currículo te prepararia melhor para liderar uma cooperativa complexa: apenas técnica ou técnica + visão sistêmica?"
            />

            {/* 2. EMANCIPAÇÃO */}
            <CasePillar 
                number="02"
                title="Emancipação > Emprego"
                icon={Lightbulb}
                color={{ 
                    bg: 'bg-amber-50', border: 'border-amber-200', titleColor: 'text-amber-900',
                    iconBg: 'bg-amber-100', iconColor: 'text-amber-600', accent: 'bg-amber-500', dot: 'bg-amber-400'
                }}
                concept="Naomar insistiu: 'Não é sobre colocar aluno em job. É sobre formar um sujeito CRÍTICO, AUTÔNOMO e MOBILIZADO capaz de ler o mundo'."
                example={[
                    "Aluno de Agroecologia faz projeto sobre 'Reforma Agrária na Bahia'.",
                    "Estuda dados, historicidade, impactos reais.",
                    "Sai pensando: 'Eu posso INFLUENCIAR essa realidade. Tenho ferramental político e técnico'."
                ]}
                question="A universidade deve formar peças para a engrenagem ou engenheiros capazes de redesenhar a máquina?"
            />

            {/* 3. CURRÍCULOS FLEXÍVEIS */}
            <CasePillar 
                number="03"
                title="Trajetórias Singulares"
                icon={GitBranch}
                color={{ 
                    bg: 'bg-emerald-50', border: 'border-emerald-200', titleColor: 'text-emerald-900',
                    iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', accent: 'bg-emerald-500', dot: 'bg-emerald-400'
                }}
                concept="O aluno não segue uma esteira industrial. Ele desenha seu percurso. Existe um 'núcleo duro' obrigatório, mas a maior parte é eletiva orientada."
                example={[
                    "Base Comum: Solos, Fisiologia Vegetal, Climatologia.",
                    "Trilha A: Foco em Consultoria (Gestão + Finanças).",
                    "Trilha B: Foco em Pesquisa (Genética + Estatística).",
                    "Trilha C: Foco em Policy (Direito + Sociologia Rural)."
                ]}
                question="Por que obrigar um futuro gestor de agritech a fazer as mesmas aulas de botânica profunda que um futuro pesquisador?"
            />

            {/* 4. DIÁLOGO COMUNIDADE */}
            <CasePillar 
                number="04"
                title="Universidade Porosa"
                icon={Users}
                color={{ 
                    bg: 'bg-cyan-50', border: 'border-cyan-200', titleColor: 'text-cyan-900',
                    iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', accent: 'bg-cyan-500', dot: 'bg-cyan-400'
                }}
                concept="A universidade abre as portas. A comunidade entra, a universidade sai. O conhecimento flui nos dois sentidos, reconhecendo o saber popular."
                example={[
                    "Professor + Alunos visitam cooperativa de pequenos produtores.",
                    "Diagnóstico conjunto: 'Solo degradado, falta nutrição'.",
                    "Proposta: Co-desenho de plano de restauração (Saber local + Ciência).",
                    "Resultado: Paper publicado E produtividade aumentada."
                ]}
                question="Quem ensina quem? Na Universidade Nova, todos ensinam e todos aprendem."
            />

        </div>

        <ResistanceBlock />

        {/* FECHAMENTO */}
        <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Naomar mostrou que a "Universidade Nova" não é utopia.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                É possível. Exige ruptura com a tradição medieval de departamentos isolados. Exige VONTADE POLÍTICA. 
                Mas quando feita, transforma pessoas, comunidades e setores inteiros.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl hover:bg-blue-600 transition-colors cursor-pointer">
                Aplicar Conceitos ao Meu Projeto <ArrowRight size={14}/>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UfbaCaseStudyView;
