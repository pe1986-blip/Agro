
import React from 'react';
import { 
  Map, Home, Battery, Flag, Quote, Navigation, 
  Layers, Sprout, ArrowRight, BookOpen, Anchor 
} from 'lucide-react';

const QuoteBlock = ({ children, author }: { children?: React.ReactNode, author: string }) => (
  <div className="relative p-8 my-10 bg-slate-900 rounded-[2rem] text-center overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
    <div className="absolute top-0 left-0 p-6 opacity-20 text-emerald-500">
      <Quote size={64} />
    </div>
    <p className="relative z-10 text-xl md:text-2xl font-serif italic text-slate-200 leading-relaxed">
      "{children}"
    </p>
    <p className="relative z-10 mt-4 text-xs font-black text-emerald-400 uppercase tracking-widest">
      — {author}
    </p>
  </div>
);

const ConceptCard = ({ icon: Icon, title, subtitle, content, color }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${color.bg} group-hover:scale-110 duration-300`}>
      <Icon size={28} className={color.text} />
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{subtitle}</p>
    <p className="text-slate-600 leading-relaxed text-sm">
      {content}
    </p>
  </div>
);

const DistinctionRow = ({ label, desc, icon: Icon }: any) => (
  <div className="flex items-start gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded-xl">
    <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-1">{label}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const AgroTerritoryConceptView: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans animate-fade-in pb-20">
      
      {/* HERO SECTION */}
      <div className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
          <Map size={400} />
        </div>
        <div className="max-w-4xl mx-auto px-8 py-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
            <BookOpen size={12} /> Fundamentação Teórica
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
            O Território como <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Organismo Vivo</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Para desenhar uma Unidade Vocacionada, precisamos abandonar a ideia de "espaço vazio". 
            Um campus não aterra em um terreno; ele se integra a um sistema de forças, vidas e histórias.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        
        {/* 1. DEFINIÇÃO */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-slate-800 rounded-full"></span>
            O que é um Território?
          </h2>
          <div className="prose prose-slate text-slate-600 text-lg leading-relaxed">
            <p>
              Imagine o território não como um palco onde as coisas acontecem, mas como o próprio espetáculo. 
              Para Milton Santos, o maior geógrafo brasileiro, o território é o resultado indissociável da 
              interação entre a natureza e a sociedade. É o <strong>"território usado"</strong>.
            </p>
            <p>
              Ele não é apenas a terra (o solo físico). Ele é a terra somada às pessoas que vivem nela, 
              às técnicas que elas usam para trabalhar, às leis que as regem e aos sonhos que elas projetam. 
              É um corpo vivo, pulsante, com cicatrizes do passado e intenções de futuro.
            </p>
          </div>

          <QuoteBlock author="Milton Santos, em 'A Natureza do Espaço'">
            O território não é apenas o conjunto dos sistemas naturais e de sistemas de coisas superpostas; 
            o território tem que ser entendido como o território usado, não o território em si. 
            O território usado é o chão mais a identidade. A existência de um povo depende do território. 
            Sem território não há nação.
          </QuoteBlock>
        </section>

        {/* 2. OS TRÊS PILARES */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
              A Tríade Existencial
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lentes de Análise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ConceptCard 
              icon={Home}
              title="O Abrigo"
              subtitle="Proteção e Identidade"
              color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
              content="É onde a vida acontece. O lugar de morada, da cultura, da segurança e do afeto. No agro, o abrigo é a tradição familiar, a festa da colheita, a igreja da comunidade e a sensação de pertencimento à terra."
            />
            <ConceptCard 
              icon={Battery}
              title="O Recurso"
              subtitle="Meio de Sobrevivência"
              color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
              content="É o território como fonte de valor. O solo, a água, a energia solar, mas também o trabalho humano e a tecnologia aplicada. É a dimensão econômica: a terra que produz, a estrada que escoa, o silo que armazena."
            />
            <ConceptCard 
              icon={Flag}
              title="O Projeto"
              subtitle="Visão de Futuro"
              color={{ bg: 'bg-amber-50', text: 'text-amber-600' }}
              content="É a dimensão política. Quem manda aqui? Para onde estamos indo? O território é moldado por decisões: leis de zoneamento, investimentos em infraestrutura e a ambição de se tornar um polo tecnológico."
            />
          </div>
        </section>

        {/* 3. EXEMPLO CONCRETO */}
        <section className="mb-20 bg-slate-50 border border-slate-200 rounded-[3rem] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sprout size={200} className="text-emerald-800"/>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <Anchor size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Estudo de Caso: Sudoeste Goiano</h3>
            </div>

            <div className="space-y-6 text-slate-600 font-medium">
              <p>
                Olhe para Rio Verde (GO). Se você vir apenas "plantação de soja", você está vendo <strong>espaço</strong>, não território.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <p><strong>Como Abrigo:</strong> É o lar de migrantes gaúchos que chegaram nos anos 70, trouxeram o chimarrão e fundaram cooperativas. A identidade local é a fusão do Centro-Oeste com o Sul.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <p><strong>Como Recurso:</strong> É um dos solos mais caros do Brasil, cruzado por ferrovias (Rumo) e fibra óptica de alta velocidade para conectar máquinas autônomas.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <p><strong>Como Projeto:</strong> Há uma decisão política clara: tornar-se o "Vale do Silício do Agro". Leis de incentivo atraem startups e indústrias de processamento.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. DISTINÇÕES NECESSÁRIAS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-slate-800 rounded-full"></span>
              O Glossário Geográfico
            </h2>
            <p className="text-slate-600 mb-6">
              Para um arquiteto de soluções educacionais, confundir esses termos é fatal. 
              Cada um exige uma estratégia pedagógica diferente.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-2 shadow-sm">
            <DistinctionRow 
              icon={Navigation}
              label="Espaço Geográfico"
              desc="É o 'palco' vazio. A natureza intocada ou a configuração física antes da ação humana. É abstrato."
            />
            <DistinctionRow 
              icon={Layers}
              label="Território"
              desc="É o espaço apropriado e dominado politicamente. Tem fronteiras, leis, donos e conflitos. É onde o poder se exerce."
            />
            <DistinctionRow 
              icon={Map}
              label="Lugar"
              desc="É a dimensão do sentimento e do cotidiano. Onde a vida acontece no nível micro. A 'esquina', a 'praça', o 'campus'."
            />
          </div>
        </section>

        {/* 5. FECHAMENTO */}
        <section className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-emerald-900 opacity-50"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Por que isso importa para uma Universidade?
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed mb-8">
              Uma universidade que ignora o território é uma intrusa. Ela oferece <strong>recursos</strong> (aulas), 
              mas falha em ser <strong>abrigo</strong> (pertencimento) e se desconecta do <strong>projeto</strong> (futuro) da região.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed mb-10">
              A <strong>Unidade Vocacionada</strong> nasce da leitura profunda dessas três camadas. 
              Ela não "leva" educação para o interior; ela "emerge" da inteligência que o território já possui.
            </p>
            
            <div className="inline-flex items-center gap-3 text-emerald-400 font-bold uppercase text-xs tracking-[0.2em] border border-emerald-500/30 px-6 py-3 rounded-full bg-emerald-500/10">
              Próximo Passo <ArrowRight size={14} /> Entender os Padrões Premium
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AgroTerritoryConceptView;
