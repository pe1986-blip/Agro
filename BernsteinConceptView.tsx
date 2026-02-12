
import React from 'react';
import { 
  BookOpen, GitBranch, ClipboardCheck, Quote, 
  ArrowRight, Factory, Microscope, School, 
  Sprout, Shuffle, CheckCircle2, AlertTriangle, BookKey
} from 'lucide-react';

const QuoteBlock = ({ children, author, source }: { children?: React.ReactNode, author: string, source?: string }) => (
    <div className="relative p-10 my-12 bg-slate-900 rounded-[2.5rem] text-center border-l-8 border-indigo-500 shadow-2xl overflow-hidden">
        <div className="absolute top-6 left-8 opacity-10 text-white pointer-events-none">
            <Quote size={80} />
        </div>
        <p className="relative z-10 text-xl md:text-2xl font-serif italic text-slate-200 leading-relaxed font-medium">
            "{children}"
        </p>
        <div className="relative z-10 mt-6 flex flex-col items-center">
            <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">
                — {author}
            </p>
            {source && <p className="text-[10px] text-slate-500 mt-1">{source}</p>}
        </div>
    </div>
);

const ConceptCard = ({ title, icon: Icon, color, children }: any) => (
    <div className={`p-8 rounded-[2rem] border ${color.bg} ${color.border} relative overflow-hidden h-full group hover:shadow-xl transition-all duration-500`}>
        <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className={`p-4 rounded-2xl ${color.iconBg} ${color.iconColor} shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon size={28} />
            </div>
            <h3 className={`text-xl font-black uppercase tracking-tight ${color.title}`}>{title}</h3>
        </div>
        <div className="relative z-10 text-slate-700 space-y-4 text-sm font-medium leading-relaxed">
            {children}
        </div>
    </div>
);

const ComparisonRow = ({ label, traditional, vocational }: { label: string, traditional: string, vocational: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
        <div className="p-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{label}</span>
        </div>
        <div className="p-6 border-l border-slate-100 bg-red-50/30 text-sm text-slate-500 italic">
            <span className="font-bold text-red-800 block mb-1 text-xs uppercase">Tradicional</span>
            "{traditional}"
        </div>
        <div className="p-6 border-l border-slate-100 bg-emerald-50/30 text-sm text-slate-700 font-bold">
            <span className="font-black text-emerald-700 block mb-1 text-xs uppercase">Vocacionado</span>
            "{vocational}"
        </div>
    </div>
);

const BernsteinConceptView: React.FC = () => {
  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <BookKey size={12} /> Fundamentação Pedagógica
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                A "Máquina" do Conhecimento: <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    O Dispositivo Pedagógico
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Educação não é mágica; é engenharia social. Basil Bernstein nos deu o "mapa da máquina" para entender como o conhecimento sai do laboratório e vira poder na mão do aluno.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-16">
        
        {/* INTRODUÇÃO */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl">
            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/3">
                    <div className="aspect-square bg-slate-100 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop" 
                            alt="Engrenagens Abstratas" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
                        />
                        <div className="relative z-10 text-center">
                            <h3 className="text-6xl font-serif font-black text-slate-300">BB</h3>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Basil Bernstein</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Quem controla o "o quê" e o "como"?</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Bernstein não estava interessado apenas no "conteúdo" da aula. Ele queria entender a <strong>gramática oculta</strong> que estrutura o ensino. Ele descobriu que a educação não é neutra: existe um mecanismo — o Dispositivo Pedagógico — que regula quem tem acesso ao conhecimento "pensável" (teórico) e quem fica apenas com o conhecimento "executável" (técnico).
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Para o Agro, isso é vital. A universidade tradicional entrega teoria descolada da prática. O mercado exige prática embasada em teoria. Para conectar os dois, precisamos hackear esse dispositivo.
                    </p>
                </div>
            </div>
        </div>

        {/* OS 3 CAMPOS (CARDS) */}
        <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                    <GitBranch size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Os 3 Pilares do Sistema</h2>
                    <p className="text-slate-500 text-sm font-medium">Como o conhecimento viaja do laboratório até o campo.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <ConceptCard 
                    title="1. Produção" 
                    icon={Factory} 
                    color={{ bg: 'bg-blue-50', border: 'border-blue-100', title: 'text-blue-900', iconBg: 'bg-white', iconColor: 'text-blue-600' }}
                >
                    <p className="font-bold text-blue-800 uppercase text-xs tracking-wide mb-2">Onde o saber nasce</p>
                    <p>
                        É o campo onde "novas verdades" são criadas. Na ciência pura, na inovação tecnológica ou na experimentação de ponta.
                    </p>
                    <div className="mt-4 p-4 bg-white/60 rounded-xl border border-blue-100">
                        <span className="text-[10px] font-black text-blue-400 uppercase block mb-1">Exemplo Agro</span>
                        <p className="text-xs text-blue-900">
                            Um cientista da <strong>EMBRAPA</strong> descobre uma nova variedade de soja resistente à seca. Isso é "saber primário".
                        </p>
                    </div>
                </ConceptCard>

                <ConceptCard 
                    title="2. Recontextualização" 
                    icon={Shuffle} 
                    color={{ bg: 'bg-purple-50', border: 'border-purple-100', title: 'text-purple-900', iconBg: 'bg-white', iconColor: 'text-purple-600' }}
                >
                    <p className="font-bold text-purple-800 uppercase text-xs tracking-wide mb-2">A Grande Tradução</p>
                    <p>
                        O coração da pedagogia. É o processo de pegar o saber "lá" (na ciência) e trazê-lo para "cá" (no currículo). <strong>Não é simplificação; é realocação.</strong>
                    </p>
                    <div className="mt-4 p-4 bg-white/60 rounded-xl border border-purple-100">
                        <span className="text-[10px] font-black text-purple-400 uppercase block mb-1">Exemplo Agro</span>
                        <p className="text-xs text-purple-900">
                            O professor transforma o paper científico da Embrapa em uma aula sobre "Manejo de Soja no Cerrado". O saber muda de forma para ser ensinável.
                        </p>
                    </div>
                </ConceptCard>

                <ConceptCard 
                    title="3. Avaliação" 
                    icon={ClipboardCheck} 
                    color={{ bg: 'bg-emerald-50', border: 'border-emerald-100', title: 'text-emerald-900', iconBg: 'bg-white', iconColor: 'text-emerald-600' }}
                >
                    <p className="font-bold text-emerald-800 uppercase text-xs tracking-wide mb-2">A Medida do Sucesso</p>
                    <p>
                        Como sabemos que o aluno adquiriu o saber? Quem define o critério? A avaliação regula a reprodução do conhecimento.
                    </p>
                    <div className="mt-4 p-4 bg-white/60 rounded-xl border border-emerald-100">
                        <span className="text-[10px] font-black text-emerald-400 uppercase block mb-1">Exemplo Agro</span>
                        <p className="text-xs text-emerald-900">
                            Não é uma prova escrita. É o aluno aplicar a técnica na fazenda e a produtividade subir 5%. O critério é o <strong>resultado real</strong>.
                        </p>
                    </div>
                </ConceptCard>

            </div>
        </section>

        {/* A VIRADA DE CHAVE: RECONTEXTUALIZAÇÃO */}
        <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <GitBranch size={300} />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-rose-600 rounded-2xl shadow-lg">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">O "Pulo do Gato": Recontextualização</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6 font-medium">
                            A maioria das faculdades erra aqui. Elas acham que recontextualizar é "resumir o livro para o slide".
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            Para Bernstein, quando você move um conhecimento de lugar, você altera sua estrutura social. No Agro, se você ensina "Nutrição de Plantas" na lousa, é química abstrata. Se você ensina a mesma coisa na beira do pivô central, vira <strong>Tecnologia de Produção</strong>.
                        </p>
                        <p className="text-lg text-white font-bold italic border-l-4 border-rose-500 pl-4">
                            "A recontextualização cria um novo saber pedagógico, que não é mais o saber científico original, nem a prática pura. É algo novo desenhado para a aprendizagem."
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl overflow-hidden text-slate-800 shadow-lg">
                        <div className="bg-slate-100 p-4 border-b border-slate-200 text-center">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Comparativo de Abordagem</h4>
                        </div>
                        <ComparisonRow 
                            label="O Conceito"
                            traditional="Teoria abstrata de macronutrientes (N-P-K)."
                            vocational="Plano de adubação para milho safrinha."
                        />
                        <ComparisonRow 
                            label="O Local"
                            traditional="Sala de aula (Slide)."
                            vocational="Laboratório de Solos & Campo Experimental."
                        />
                        <ComparisonRow 
                            label="O Resultado"
                            traditional="Aluno decora a tabela periódica."
                            vocational="Aluno calcula o ROI da ureia vs. nitrato."
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* CITAÇÃO FINAL */}
        <QuoteBlock author="Basil Bernstein" source="A Estruturação do Discurso Pedagógico">
            O dispositivo pedagógico é a condição para a produção, reprodução e transformação da cultura. É através dele que a sociedade distribui, recontextualiza e avalia o conhecimento válido.
        </QuoteBlock>

        {/* FECHAMENTO / NEXT STEPS */}
        <div className="text-center max-w-2xl mx-auto pb-12">
            <p className="text-lg text-slate-600 font-medium italic leading-relaxed mb-8">
                "Entender isso muda o jogo. Não estamos apenas 'dando aulas'. Estamos construindo um <strong className="text-indigo-600">Sistema de Recontextualização Produtiva</strong> que conecta a ciência da Embrapa à prática do produtor, usando o aluno como agente transmissor."
            </p>
            
            <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                Próximo: O Campus como Dispositivo <ArrowRight size={14} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default BernsteinConceptView;
