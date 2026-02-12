
import React, { useState } from 'react';
import { 
  Zap, Sprout, Users, Coffee, Cpu, 
  MapPin, ArrowRight, TrendingUp, AlertTriangle, 
  Target, Factory, Droplets, Map
} from 'lucide-react';

// --- DADOS DAS CADEIAS PRODUTIVAS ---
const CHAINS = [
  {
    id: 'bioenergia',
    title: 'Etanol & Bioenergia',
    region: 'Sudoeste Goiano (Quirinópolis, Jataí)',
    volume: 'R$ 15 Bi / ano (Est.)',
    anchors: ['São Martinho', 'Raízen', 'BP Bunge', 'SJC Bioenergia'],
    tech: 'Etanol 2G, Biogás, Cogeração',
    challenges: 'Logística de biomassa e certificação RenovaBio.',
    opportunity: 'Formar engenheiros de bioprocessos e gestores de manutenção industrial.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  {
    id: 'graos',
    title: 'Grãos & Commodities',
    region: 'Rio Verde, Jataí, Mineiros',
    volume: '30 Mi Toneladas (Soja/Milho)',
    anchors: ['Comigo', 'Cargill', 'Caramuru', 'Louis Dreyfus'],
    tech: 'Agricultura de Precisão, Biológicos, Sementes GM',
    challenges: 'Armazenagem (Déficit de 40%) e escoamento ferroviário.',
    opportunity: 'Cursos de Trading, Logística e Agronomia de Dados.',
    icon: Sprout,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  },
  {
    id: 'coops',
    title: 'Cooperativismo & PME',
    region: 'Transversal (Forte no Sul)',
    volume: 'R$ 12 Bi (Faturamento Coops)',
    anchors: ['COMIGO', 'COAPIL', 'Complem'],
    tech: 'Verticalização industrial (Agroindústria)',
    challenges: 'Sucessão familiar e profissionalização da gestão.',
    opportunity: 'MBA em Governança, Gestão de Propriedade Familiar.',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  {
    id: 'irrigacao',
    title: 'Irrigação & Especiais',
    region: 'Cristalina (Leste), Planalto',
    volume: 'Maior PIB Agro per Capita',
    anchors: ['Bonduelle', 'Fugini', 'Fazendas de Café Especial'],
    tech: 'Pivôs Centrais, Telemetria Hídrica',
    challenges: 'Gestão de recursos hídricos e outorgas.',
    opportunity: 'Engenharia Hídrica e Tecnologia de Alimentos.',
    icon: Droplets, // Replaced Coffee with Droplets for generic irrigation context, or Coffee specifically
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200'
  },
  {
    id: 'tech',
    title: 'Agrotech & Inovação',
    region: 'Goiânia (Hub) & Rio Verde',
    volume: 'R$ 500 Mi (Investimentos)',
    anchors: ['Solinftec', 'Siagri (Totvs)', 'Hubs Locais'],
    tech: 'SaaS, IoT, Marketplace, Fintechs',
    challenges: 'Conectividade no campo e mão de obra dev.',
    opportunity: 'Bootcamps de Dev para Agro, Data Science.',
    icon: Cpu,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  }
];

const GoianiaTerritoryMap: React.FC = () => {
  const [activeChain, setActiveChain] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen font-sans animate-fade-in pb-20">
      
      {/* HEADER HERO */}
      <div className="bg-slate-900 text-white pt-20 pb-24 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Map size={400} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Análise Territorial Profunda
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Goiás: O Coração <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Agroindustrial</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Goiás não é apenas um estado; é uma plataforma produtiva integrada. 
            Mapeamos as 5 artérias vitais que transformam este território no laboratório perfeito para a Ânima Agro.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* CARDS DAS CADEIAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CHAINS.map((chain) => (
            <div 
              key={chain.id}
              className={`p-6 rounded-[2rem] border transition-all duration-300 cursor-default group relative overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 ${chain.border}`}
              onMouseEnter={() => setActiveChain(chain.id)}
              onMouseLeave={() => setActiveChain(null)}
            >
              <div className={`absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-125 ${chain.color}`}>
                <chain.icon size={80} />
              </div>

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${chain.bg} ${chain.color}`}>
                  <chain.icon size={24} />
                </div>
                
                <h3 className="text-xl font-black text-slate-800 mb-1">{chain.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1">
                  <MapPin size={10} /> {chain.region}
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume & Âncoras</p>
                    <p className="text-sm font-bold text-slate-700">{chain.volume}</p>
                    <p className="text-xs text-slate-500 mt-1 truncate">{chain.anchors.join(', ')}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <p className="text-[9px] font-bold text-red-400 uppercase mb-1 flex items-center gap-1"><AlertTriangle size={8}/> Desafio</p>
                      <p className="text-[10px] text-slate-600 leading-tight">{chain.challenges}</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <p className="text-[9px] font-bold text-blue-500 uppercase mb-1 flex items-center gap-1"><Target size={8}/> Oportunidade</p>
                      <p className="text-[10px] text-slate-600 leading-tight">{chain.opportunity}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`absolute bottom-0 left-0 w-full h-1 ${chain.bg.replace('bg-', 'bg-gradient-to-r from-white to-')}`}></div>
            </div>
          ))}
        </div>

        {/* MAPA VISUAL CONCEITUAL */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl mb-20 overflow-hidden relative">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-3">
                        <Map size={28} className="text-blue-600"/>
                        Geografia da Inovação
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        Goiás funciona como um sistema integrado. O <strong>Sudoeste</strong> produz a biomassa e os grãos. O <strong>Leste (Cristalina)</strong> traz a tecnologia de irrigação. E <strong>Goiânia</strong>, no centro, processa a inteligência, o capital e a tomada de decisão política.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="bg-slate-200 p-2 rounded-lg"><Factory size={20} className="text-slate-600"/></div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Cluster Industrial</h4>
                                <p className="text-xs text-slate-500">Transformação de proteína e grãos in-loco (Rio Verde).</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="bg-slate-200 p-2 rounded-lg"><TrendingUp size={20} className="text-slate-600"/></div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Cluster Financeiro</h4>
                                <p className="text-xs text-slate-500">Goiânia concentra as tradings e os escritórios jurídicos.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative h-[400px] w-full bg-slate-100 rounded-[2rem] border border-slate-200 p-6 flex flex-col justify-between">
                    {/* Abstract Map Representation */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Goias_Meso_Micro_Municip.svg/1200px-Goias_Meso_Micro_Municip.svg.png')] bg-cover bg-center mix-blend-multiply"></div>
                    
                    {/* Pins */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10 hover:scale-110 transition-transform cursor-help">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                        <span className="text-xs font-black text-slate-800">GOIÂNIA (HQ)</span>
                    </div>

                    <div className="absolute bottom-1/4 left-1/4 bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10 hover:scale-110 transition-transform cursor-help">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-bold text-slate-600">Rio Verde</span>
                    </div>

                    <div className="absolute bottom-1/3 right-1/4 bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10 hover:scale-110 transition-transform cursor-help">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <span className="text-xs font-bold text-slate-600">Cristalina</span>
                    </div>

                    <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400 uppercase">
                        Mapa Esquemático de Influência
                    </div>
                </div>
            </div>
        </div>

        {/* INSIGHT FINAL */}
        <div className="bg-slate-900 text-white rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 p-12 opacity-10">
                <Target size={200} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Por que Goiás é "Vocacionado"?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
                <div>
                    <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-2">01. Concentração</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Não é disperso. Os clusters estão densamente conectados por rodovias funcionais e cultura comum.</p>
                </div>
                <div>
                    <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-2">02. Densidade de Talento</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Já existe uma "massa crítica" de agrônomos e técnicos. O próximo nível é formar os <strong>Líderes</strong>.</p>
                </div>
                <div>
                    <h4 className="text-purple-400 font-bold uppercase text-xs tracking-widest mb-2">03. Inovação Sistêmica</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">O produtor goiano é "early adopter". Ele compra tecnologia antes de SP e MT em muitos casos.</p>
                </div>
            </div>
            
            <div className="mt-12">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 hover:text-white transition-all flex items-center gap-2 mx-auto">
                    Explorar Dados Financeiros <ArrowRight size={14}/>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default GoianiaTerritoryMap;
