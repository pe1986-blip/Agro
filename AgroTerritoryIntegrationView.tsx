
import React from 'react';
import { 
  Layers, Map, Globe, Truck, Factory, Sprout, 
  Coffee, ArrowRight, Anchor, Zap, Scale, 
  BarChart3, RefreshCw, Box
} from 'lucide-react';

const TerritoryCard = ({ title, icon: Icon, color, children }: any) => (
    <div className={`p-6 rounded-[2rem] border ${color.bg} ${color.border} relative overflow-hidden h-full group hover:shadow-lg transition-all`}>
        <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${color.iconBg} ${color.iconColor}`}>
                <Icon size={24} />
            </div>
            <h3 className={`text-xl font-black uppercase tracking-tight ${color.title}`}>{title}</h3>
        </div>
        <div className="relative z-10 text-slate-600 space-y-4 text-sm font-medium leading-relaxed">
            {children}
        </div>
        {/* Decor */}
        <div className={`absolute -right-4 -bottom-4 opacity-10 ${color.iconColor}`}>
            <Icon size={120} />
        </div>
    </div>
);

const ProductiveChainExample = ({ title, icon: Icon, color, fluxos }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-300 transition-all">
        <div className="flex items-center gap-3 mb-3">
            <Icon size={20} className={color} />
            <h4 className="font-bold text-slate-800 text-sm uppercase">{title}</h4>
        </div>
        <div className="space-y-2">
            {fluxos.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className={`w-1 h-1 rounded-full ${color.replace('text-', 'bg-')}`}></div>
                    {f}
                </div>
            ))}
        </div>
    </div>
);

const ScaleLevel = ({ title, icon: Icon, desc, examples }: any) => (
    <div className="flex items-start gap-4 p-4 border-b border-slate-100 last:border-0">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 shrink-0 mt-1">
            <Icon size={18} />
        </div>
        <div>
            <h5 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-1">{title}</h5>
            <p className="text-xs text-slate-500 mb-2">{desc}</p>
            <div className="flex flex-wrap gap-2">
                {examples.map((ex: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-bold text-slate-400 uppercase">
                        {ex}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const AgroTerritoryIntegrationView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-purple-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <RefreshCw size={12} /> A Virada de Chave
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Do Território Disciplinar ao <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600">
                    Território Produtivo
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Na lógica tradicional, o território é o departamento acadêmico. Na lógica vocacionada, o território é a cadeia agroindustrial e o espaço geopolítico onde ela opera.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-12">
        
        {/* 1. O CONCEITO DE 3 TERRITÓRIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <TerritoryCard 
                title="1. Disciplinar" 
                icon={Box} 
                color={{ bg: 'bg-slate-100', border: 'border-slate-200', title: 'text-slate-700', iconBg: 'bg-white', iconColor: 'text-slate-500' }}
            >
                <p>O mapa interno da universidade. Cada tribo (Agronomia, Direito) controla seu feudo, currículo e orçamento.</p>
                <p><strong>Foco:</strong> Profundidade e Rigor Teórico.</p>
                <p><strong>Limite:</strong> Isolamento e Cegueira Sistêmica.</p>
            </TerritoryCard>

            <TerritoryCard 
                title="2. Produtivo" 
                icon={Factory} 
                color={{ bg: 'bg-emerald-50', border: 'border-emerald-100', title: 'text-emerald-800', iconBg: 'bg-white', iconColor: 'text-emerald-600' }}
            >
                <p>O sistema agroindustrial real. Fluxos de matéria, capital e trabalho organizados em cadeias de valor.</p>
                <p><strong>Foco:</strong> Eficiência, Margem e Escala.</p>
                <p><strong>Exemplo:</strong> Cadeia da Soja, do Etanol, da Proteína.</p>
            </TerritoryCard>

            <TerritoryCard 
                title="3. Geopolítico" 
                icon={Globe} 
                color={{ bg: 'bg-blue-50', border: 'border-blue-100', title: 'text-blue-800', iconBg: 'bg-white', iconColor: 'text-blue-600' }}
            >
                <p>O espaço de poder e influência. Onde Goiás se conecta com a China, e a regulação local afeta o preço global.</p>
                <p><strong>Foco:</strong> Estratégia, Logística e Regulação.</p>
                <p><strong>Exemplo:</strong> Rio Verde no contexto global de commodities.</p>
            </TerritoryCard>
        
        </div>

        {/* 2. MERGULHO: TERRITÓRIO PRODUTIVO */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                    <Layers className="text-emerald-600" size={28}/> Territórios Produtivos (Cadeias)
                </h2>
                <p className="text-slate-500 mt-2 text-sm max-w-3xl">
                    No campus vocacionado, não organizamos o ensino por "departamentos", mas por "cadeias". 
                    Cada cadeia é um território complexo que exige a invasão de múltiplas disciplinas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-slate-50/30">
                <ProductiveChainExample 
                    title="Cadeia da Cana & Bioenergia"
                    icon={Zap}
                    color="text-amber-500"
                    fluxos={[
                        "Ciência: Melhoramento Genético (Agronomia)",
                        "Engenharia: Processos Industriais 4.0",
                        "Direito: Regulação RenovaBio e CBIOs",
                        "Logística: Escoamento de Etanol"
                    ]}
                />
                <ProductiveChainExample 
                    title="Cadeia de Grãos & Commodities"
                    icon={Sprout}
                    color="text-emerald-600"
                    fluxos={[
                        "Tecnologia: Agricultura de Precisão (GPS/Drones)",
                        "Finanças: Hedge, Barter e Derivativos",
                        "Infra: Armazenagem e Ferrovia",
                        "Gestão: Sucessão Familiar"
                    ]}
                />
                <ProductiveChainExample 
                    title="Cadeia de Cafés Especiais"
                    icon={Coffee}
                    color="text-rose-700"
                    fluxos={[
                        "Sensorial: Classificação e Torra",
                        "Branding: Indicação Geográfica e Storytelling",
                        "Comércio: Exportação Premium",
                        "Sustentabilidade: Certificações ESG"
                    ]}
                />
            </div>
            
            <div className="bg-slate-900 text-white p-6 text-center">
                <p className="text-sm font-medium">
                    "Para entender a Cadeia da Cana, eu preciso 'invadir' o território da Biologia, da Engenharia Química e do Direito Regulatório simultaneamente."
                </p>
            </div>
        </section>

        {/* 3. MERGULHO: TERRITÓRIO GEOPOLÍTICO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                    <Map className="text-blue-600" size={28}/> As Escalas do Agro
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                    O produtor rural de Jataí (GO) não está isolado. Ele é um nó em uma rede global. 
                    Uma canetada em Bruxelas (Lei antidesmatamento) muda a exigência de compliance na fazenda dele amanhã.
                </p>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <ScaleLevel 
                        title="Escala Global"
                        icon={Globe}
                        desc="Fluxos de commodities, regulação climática, demanda asiática."
                        examples={["China (Preço)", "União Europeia (ESG)", "Chicago (Bolsa)"]}
                    />
                    <ScaleLevel 
                        title="Escala Nacional/Regional"
                        icon={Map}
                        desc="Políticas públicas, logística estrutural, biomas."
                        examples={["Plano Safra", "Ferrovia Norte-Sul", "Matopiba"]}
                    />
                    <ScaleLevel 
                        title="Escala Local (O Lugar)"
                        icon={Anchor}
                        desc="Onde a produção acontece. A comunidade, o solo, a água."
                        examples={["Rio Verde", "Microbacia local", "Sindicato Rural"]}
                    />
                </div>
            </div>

            <div className="relative bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden flex flex-col justify-center min-h-[400px]">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Globe size={300} />
                </div>
                
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">O Efeito Borboleta do Agro</h3>
                            <p className="text-xs text-blue-300 font-bold uppercase tracking-widest">Exemplo Real</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse"></div>
                            <p className="text-sm text-slate-300">
                                <strong className="text-white">Ação:</strong> A China reduz a compra de carne suína.
                            </p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
                            <p className="text-sm text-slate-300">
                                <strong className="text-white">Impacto Global:</strong> Preço da soja cai (menos ração demandada).
                            </p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                            <p className="text-sm text-slate-300">
                                <strong className="text-white">Impacto Local (Rio Verde):</strong> O produtor segura a venda e precisa de crédito de estocagem urgente.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl border border-white/10 mt-6">
                        <p className="text-xs font-serif italic text-slate-200">
                            "O aluno precisa entender que ele não está gerindo apenas uma lavoura; ele está gerindo uma posição em um tabuleiro global."
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. SÍNTESE FINAL */}
        <section className="text-center max-w-4xl mx-auto py-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                A Definição do Campus Vocacionado
            </h2>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 
                 <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10">
                    "Um campus vocacionado é um dispositivo que reorganiza <span className="text-purple-200 font-bold border-b-2 border-purple-400">territórios disciplinares</span> (ciência) para atuar com precisão dentro de <span className="text-emerald-300 font-bold border-b-2 border-emerald-400">territórios produtivos</span> e <span className="text-blue-300 font-bold border-b-2 border-blue-400">geopolíticos</span> específicos."
                 </p>
            </div>

            <div className="mt-12 inline-flex items-center gap-3 bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-300 transition-colors cursor-pointer">
                <Zap size={14} /> Próximo: O Conflito das Tribos
            </div>
        </section>

      </div>
    </div>
  );
};

export default AgroTerritoryIntegrationView;
