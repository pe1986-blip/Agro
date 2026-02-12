
import React from 'react';
import { 
  GitMerge, Users, Zap, Award, Network, 
  ArrowRight, BookOpen, Layers, Target, 
  RefreshCw, CheckCircle2, Factory, Share2, 
  MapPin, Sprout, Briefcase, Search
} from 'lucide-react';

const ComparisonCard = ({ 
  title, 
  conceptOld, 
  conceptNew, 
  icon: Icon, 
  color, 
  exampleTitle, 
  exampleText 
}: any) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
        <div className={`p-8 ${color.bgHeader}`}>
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${color.bgIcon} ${color.textIcon} shadow-lg`}>
                    <Icon size={32} />
                </div>
                <h3 className={`text-2xl font-black uppercase tracking-tight ${color.title}`}>{title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {/* Linha Divisória (Desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-300/50 -translate-x-1/2"></div>
                
                {/* O Velho (Conceito) */}
                <div className="opacity-70">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Universidade Nova (Teoria)</p>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                        "{conceptOld}"
                    </p>
                </div>

                {/* O Novo (Ânima) */}
                <div className="relative">
                    <div className={`absolute -left-4 top-1 w-2 h-2 rounded-full ${color.dot} hidden md:block`}></div>
                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Ânima Agro (Prática)</p>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                        {conceptNew}
                    </p>
                </div>
            </div>
        </div>

        {/* Exemplo Concreto */}
        <div className="bg-slate-50 p-6 border-t border-slate-200">
            <div className="flex items-start gap-3">
                <div className={`mt-1 p-1 rounded-full ${color.bgDot} flex items-center justify-center`}>
                    <CheckCircle2 size={14} className={color.textIcon} />
                </div>
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Aplicação Real: {exampleTitle}</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {exampleText}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const MetricBadge = ({ label, value, icon: Icon }: any) => (
    <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
        <Icon size={20} className="text-emerald-400 mb-2" />
        <span className="text-2xl font-black text-white">{value}</span>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{label}</span>
    </div>
);

const AnimaAgroNewUniversityView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <header className="relative bg-slate-900 pt-20 pb-28 px-8 overflow-hidden rounded-b-[4rem] shadow-2xl mb-12">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
            <Sprout size={400} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Síntese do Módulo 02
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-8">
                Ânima Agro: Uma Universidade Nova <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    Vocacionada ao Agribusiness
                </span>
            </h1>
            <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Aqui, a teoria de Boaventura e a visão de Naomar deixam o papel. Elas se tornam concreto, currículo e transformação no campo.
            </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 space-y-12 -mt-16 relative z-20">
        
        {/* 1. INTEGRAÇÃO DISCIPLINAR */}
        <ComparisonCard 
            title="Do Silo à Trilha"
            conceptOld="Fim dos departamentos isolados. Criação de Núcleos de Transformação Temáticos."
            conceptNew="Em lugar de silos, temos 'Trilhas Temáticas' (Etanol, Grãos, Café) onde Agronomia, Economia, Direito e Tech atacam o MESMO problema simultaneamente."
            icon={GitMerge}
            color={{ 
                bgHeader: 'bg-white', bgIcon: 'bg-blue-50', textIcon: 'text-blue-600', 
                title: 'text-slate-800', dot: 'bg-blue-500', bgDot: 'bg-blue-100' 
            }}
            exampleTitle="MBA em Etanol"
            exampleText="Módulo 1 Integrado: 'Botânica da Cana' (Agro) + 'Mercado de CBIOs' (Econ) + 'Regulação RenovaBio' (Direito) + 'Precision Ag' (Tech). Tudo na mesma semana, mostrando a conexão real."
        />

        {/* 2. ECOLOGIA DE SABERES */}
        <ComparisonCard 
            title="A Nova Ecologia"
            conceptOld="O triângulo de aprendizado: Professor + Aluno + Comunidade, validando múltiplos saberes."
            conceptNew="Substituímos 'Comunidade' por 'Empresas-Âncora'. O Professor traz o método. O Aluno traz a energia. O Produtor traz 20 anos de prática e a dor real."
            icon={Users}
            color={{ 
                bgHeader: 'bg-white', bgIcon: 'bg-purple-50', textIcon: 'text-purple-600', 
                title: 'text-slate-800', dot: 'bg-purple-500', bgDot: 'bg-purple-100' 
            }}
            exampleTitle="O Insight Coletivo"
            exampleText="Juntos, eles criam insights que nenhum faria sozinho. O acadêmico valida o dado, o produtor valida a viabilidade, o aluno constrói a solução tecnológica."
        />

        {/* 3. CO-CRIAÇÃO (CICLO) */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute left-0 bottom-0 p-10 opacity-10 pointer-events-none">
                <RefreshCw size={300} />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-rose-600 rounded-2xl shadow-lg">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Da Transmissão à Co-Criação</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { step: "01. Imersão", desc: "Aluno entra na empresa parceira.", icon: Factory },
                        { step: "02. Diagnóstico", desc: "Identificação colaborativa da dor.", icon: Search },
                        { step: "03. Projeto", desc: "Co-criação da solução com o time interno.", icon: Layers },
                        { step: "04. Impacto", desc: "Implementação e medição de resultado.", icon: Target }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors">
                            <item.icon size={20} className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-white text-sm mb-1">{item.step}</h4>
                            <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-center text-sm font-medium text-slate-400 italic">
                    "Não é um 'case study' lido em livro. É um problema real, com dinheiro e reputação em jogo."
                </p>
             </div>
        </div>

        {/* 4. AGENTE TRANSFORMADOR */}
        <ComparisonCard 
            title="Emancipação Real"
            conceptOld="Foco em formar sujeitos críticos e autônomos, não apenas mão de obra para o mercado."
            conceptNew="Nossos alunos saem como 'Líderes de Transformação'. Eles não apenas ocupam uma vaga; eles têm a agência para mudar a indústria."
            icon={Award}
            color={{ 
                bgHeader: 'bg-white', bgIcon: 'bg-amber-50', textIcon: 'text-amber-600', 
                title: 'text-slate-800', dot: 'bg-amber-500', bgDot: 'bg-amber-100' 
            }}
            exampleTitle="O Toolkit do Egresso"
            exampleText="Saem com: 1) Emprego (95% colocação); 2) Rede (200+ conexões); 3) Voz (Paper publicado); 4) Agência (Capacidade de influenciar decisões)."
        />

        {/* 5. NÓ DE REDE */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute right-0 top-0 p-10 opacity-10 pointer-events-none">
                <Network size={300} />
             </div>

             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                        <Share2 size={28} className="text-blue-200"/>
                        <h3 className="text-2xl font-black uppercase tracking-tight">O Nó da Rede Territorial</h3>
                    </div>
                    <p className="text-blue-100 text-lg font-medium leading-relaxed mb-6">
                        Não somos uma ilha educacional. Somos um <strong>NÓ CAPILAR</strong>. Conectamos a pesquisa da Embrapa, a demanda da Raízen, a política da SEAGRO e a energia da nova geração.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase backdrop-blur-md border border-white/20">Raízen</span>
                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase backdrop-blur-md border border-white/20">Cosan</span>
                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase backdrop-blur-md border border-white/20">Cooperativas</span>
                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase backdrop-blur-md border border-white/20">Gov. Goiás</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <MetricBadge value="6" label="Clusters Nacionais" icon={MapPin} />
                    <MetricBadge value="200+" label="Parceiros B2B" icon={Briefcase} />
                    <MetricBadge value="360º" label="Fluxo de Saber" icon={RefreshCw} />
                    <MetricBadge value="100%" label="Capilaridade" icon={Network} />
                </div>
             </div>
        </div>

        {/* FECHAMENTO FINAL */}
        <div className="text-center max-w-3xl mx-auto pt-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 leading-tight">
                "Quando você entra no campus vocacionado da Ânima Agro, não está entrando em uma universidade tradicional."
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
                Está entrando em um <strong>ESPAÇO DE TRANSFORMAÇÃO</strong> que respira o agribusiness, que dialoga com múltiplos saberes e que te empodera para ser um <strong>LÍDER</strong>, não um funcionário.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl">
                <BookOpen size={14} className="text-emerald-400" />
                Isso é 'Universidade Nova' em Ação
            </div>
        </div>

      </div>
    </div>
  );
};

export default AnimaAgroNewUniversityView;
