
import React, { useState } from 'react';
import { 
  BookOpen, Globe, Users, Zap, Quote, 
  Sprout, Microscope, ArrowRight, X, Check,
  Target, Leaf, MessageCircle
} from 'lucide-react';

const QuoteSection = ({ text, sub }: { text: string, sub: string }) => (
    <div className="relative p-8 md:p-12 my-12 bg-slate-900 rounded-3xl overflow-hidden text-center group">
        <div className="absolute top-6 left-8 text-emerald-500 opacity-30 group-hover:opacity-50 transition-opacity">
            <Quote size={64} />
        </div>
        <blockquote className="relative z-10 text-xl md:text-3xl font-serif italic text-slate-200 leading-relaxed font-medium">
            "{text}"
        </blockquote>
        <p className="relative z-10 mt-6 text-xs font-black text-emerald-400 uppercase tracking-widest">
            — {sub}
        </p>
    </div>
);

const KnowledgeCard = ({ type, title, icon: Icon, description, color }: any) => (
    <div className={`p-6 rounded-2xl border ${color.bg} ${color.border} h-full relative overflow-hidden`}>
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${color.iconBg} ${color.iconColor}`}>
                <Icon size={20} />
            </div>
            <h4 className={`text-sm font-black uppercase tracking-wide ${color.titleColor}`}>{title}</h4>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {description}
        </p>
        <div className="absolute top-2 right-2 text-[10px] font-bold uppercase opacity-50 px-2 py-1 rounded bg-white/50">
            {type}
        </div>
    </div>
);

const EcologyOfKnowledgesView: React.FC = () => {
  const [activePillar, setActivePillar] = useState<1 | 2 | 3>(1);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HEADER MANIFESTO */}
      <div className="max-w-4xl mx-auto px-8 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
            <BookOpen size={12} /> Epistemologia do Sul
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-8">
            Existe uma outra forma de fazer Universidade.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Não é apenas pedagógico; é político. Boaventura de Sousa Santos chamou isso de <span className="text-emerald-700 font-bold underline decoration-emerald-300 decoration-4 underline-offset-4">Ecologia de Saberes</span>.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        
        {/* QUOTE 1 */}
        <QuoteSection 
            text="Não há justiça social global sem justiça cognitiva global."
            sub="Boaventura de Sousa Santos, em 'O Fim do Império Cognitivo'"
        />

        {/* TABS DE PILARES */}
        <div className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur py-4 mb-8 border-b border-slate-200">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button 
                    onClick={() => setActivePillar(1)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 border ${activePillar === 1 ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                >
                    <Globe size={16} /> 1. Reconhecimento
                </button>
                <button 
                    onClick={() => setActivePillar(2)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 border ${activePillar === 2 ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                >
                    <Users size={16} /> 2. Co-Criação
                </button>
                <button 
                    onClick={() => setActivePillar(3)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 border ${activePillar === 3 ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                >
                    <Zap size={16} /> 3. Emancipação
                </button>
            </div>
        </div>

        {/* CONTEÚDO DINÂMICO DOS PILARES */}
        <div className="min-h-[500px]">
            
            {/* PILAR 1: RECONHECIMENTO */}
            {activePillar === 1 && (
                <div className="animate-fade-in space-y-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-black text-slate-800 mb-4">O Fim da Monocultura do Saber</h2>
                        <p className="text-slate-600 leading-relaxed">
                            A universidade tradicional opera na lógica de que existe <strong>UM</strong> conhecimento verdadeiro (o científico) e muitos falsos (o resto). 
                            A Ecologia de Saberes propõe que existem <strong>VÁRIOS</strong> conhecimentos válidos em contextos diferentes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <KnowledgeCard 
                            type="Academia"
                            title="Saber Científico"
                            icon={Microscope}
                            description="Nitrogênio aumenta produtividade. Baseado em testes de laboratório controlados e química sintética."
                            color={{ bg: 'bg-blue-50', border: 'border-blue-100', titleColor: 'text-blue-800', iconBg: 'bg-white', iconColor: 'text-blue-600' }}
                        />
                        <div className="hidden md:flex items-center justify-center text-slate-300">
                            <ArrowRight size={32} />
                        </div>
                        <KnowledgeCard 
                            type="Prática"
                            title="Saber Tradicional"
                            icon={Sprout}
                            description="Rotação de culturas. Leguminosas 'descansam' a terra e trazem força para o próximo plantio."
                            color={{ bg: 'bg-emerald-50', border: 'border-emerald-100', titleColor: 'text-emerald-800', iconBg: 'bg-white', iconColor: 'text-emerald-600' }}
                        />
                        <div className="hidden md:flex items-center justify-center text-slate-300">
                            <ArrowRight size={32} />
                        </div>
                         <KnowledgeCard 
                            type="Ancestral"
                            title="Saber Indígena"
                            icon={Leaf}
                            description="'Milpa' (As Três Irmãs): Milho, feijão e abóbora plantados juntos se fortalecem mutuamente sem química."
                            color={{ bg: 'bg-amber-50', border: 'border-amber-100', titleColor: 'text-amber-800', iconBg: 'bg-white', iconColor: 'text-amber-600' }}
                        />
                    </div>

                    <div className="bg-slate-100 rounded-2xl p-6 text-center border border-slate-200">
                        <p className="text-sm font-bold text-slate-700">
                            <span className="text-rose-600 font-black uppercase mr-2">A Pergunta:</span> Qual é o verdadeiro?
                            <span className="text-emerald-600 font-black uppercase ml-4 mr-2">A Resposta:</span> Todos. Em contextos diferentes.
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            A missão da Universidade Nova é aprender a <strong>TRADUZIR</strong> entre eles, não hierarquizar.
                        </p>
                    </div>
                </div>
            )}

            {/* PILAR 2: CO-CRIAÇÃO */}
            {activePillar === 2 && (
                <div className="animate-fade-in space-y-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-black text-slate-800 mb-4">A Ecologia em Ação</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Não operamos no modo "nós ensinamos, vocês aprendem". Operamos no modo <strong>CO-CRIAÇÃO</strong>.
                            A sala de aula se expande para o campo, e a hierarquia professor-aluno se dissolve em uma rede de colaboração.
                        </p>
                    </div>

                    <div className="relative bg-white rounded-[3rem] border border-slate-200 shadow-xl p-10 overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                            <Users size={300} />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            
                            {/* Actor 1 */}
                            <div className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                    <Microscope size={32} />
                                </div>
                                <h4 className="font-black text-slate-800 uppercase text-sm">O Professor</h4>
                                <p className="text-xs text-slate-500 mt-2 px-4">Traz rigor, método científico e ferramental conceitual.</p>
                            </div>

                            {/* Center Connector */}
                            <div className="text-center relative">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
                                <div className="inline-flex bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                    Trio de Aprendizagem
                                </div>
                            </div>

                            {/* Actor 2 */}
                            <div className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                    <Sprout size={32} />
                                </div>
                                <h4 className="font-black text-slate-800 uppercase text-sm">O Produtor</h4>
                                <p className="text-xs text-slate-500 mt-2 px-4">Traz 30 anos de prática, 500 hectares e 4 crises climáticas nas costas.</p>
                            </div>

                        </div>

                        <div className="mt-12 grid grid-cols-1 justify-center">
                             <div className="text-center max-w-sm mx-auto group">
                                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform shadow-lg border-4 border-white">
                                    <Zap size={24} />
                                </div>
                                <h4 className="font-black text-slate-800 uppercase text-sm">O Tecnólogo (Aluno)</h4>
                                <p className="text-xs text-slate-500 mt-2">Traz IA, drones, sensores e a vontade de conectar os pontos.</p>
                            </div>
                        </div>

                        <div className="mt-10 text-center border-t border-slate-100 pt-6">
                            <p className="text-lg font-serif italic text-slate-700">
                                "Quem é o aluno nessa relação? <strong>Todos são.</strong> O aprendizado é multidirecional."
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* PILAR 3: EMANCIPAÇÃO */}
            {activePillar === 3 && (
                <div className="animate-fade-in space-y-12">
                     <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-black text-slate-800 mb-4">Transformação & Emancipação</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Educação não é transmissão de conteúdo. É a mobilização de sujeitos para transformar sua realidade. 
                            Boaventura chama isso de <strong>Conhecimento-Emancipação</strong>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* THE OLD WAY */}
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <X size={32} className="text-slate-400" />
                                <h3 className="text-xl font-bold text-slate-500 line-through decoration-rose-500 decoration-2">Paternalismo</h3>
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-slate-500">
                                    "Vamos ensinar essa cooperativa como ser mais produtiva. Eles não sabem o que fazem."
                                </p>
                                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-400">
                                    <strong>Resultado:</strong> Dependência de consultores externos. Soluções que não duram.
                                </div>
                            </div>
                        </div>

                        {/* THE NEW WAY */}
                        <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-600">
                                <Target size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Check size={32} className="text-emerald-600" />
                                    <h3 className="text-xl font-black text-emerald-900 uppercase">Empoderamento</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-base font-bold text-emerald-800">
                                        "Como podemos JUNTOS reimaginar o futuro da sua cadeia? Como sua voz influencia a política pública?"
                                    </p>
                                    <div className="p-4 bg-white/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 shadow-sm">
                                        <strong>Resultado:</strong> Cooperativa autônoma, crítica e protagonista. Criação de soluções locais e sustentáveis.
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <QuoteSection 
                        text="A compreensão do mundo é muito mais ampla que a compreensão ocidental do mundo."
                        sub="Boaventura de Sousa Santos"
                    />
                </div>
            )}

        </div>

        {/* FECHAMENTO PRAGMÁTICO */}
        <div className="mt-20 bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl mx-4 md:mx-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-emerald-900 opacity-50"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold mb-8">
                    Não é "Politicamente Correto".<br/> É Pragmático.
                </h2>
                <p className="text-lg text-slate-200 leading-relaxed mb-10 font-medium">
                    O agribusiness de amanhã será resolvido por profissionais que entendem múltiplas perspectivas 
                    (científica, econômica, ambiental, social) e sabem dialogar com gente diferente.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                     <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                        <MessageCircle className="text-emerald-400 mb-3" size={24} />
                        <p className="text-sm font-bold text-white">Diálogo Intercultural</p>
                        <p className="text-xs text-slate-400 mt-1">Engenheiro + Agricultor + Indígena</p>
                     </div>
                     <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                        <BookOpen className="text-blue-400 mb-3" size={24} />
                        <p className="text-sm font-bold text-white">Visão Sistêmica</p>
                        <p className="text-xs text-slate-400 mt-1">Economia + Ambiente + Sociedade</p>
                     </div>
                     <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                        <Target className="text-amber-400 mb-3" size={24} />
                        <p className="text-sm font-bold text-white">Decisão Ética</p>
                        <p className="text-xs text-slate-400 mt-1">Autonomia para agir com fundamento</p>
                     </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default EcologyOfKnowledgesView;
