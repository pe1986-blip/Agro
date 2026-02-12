
import React, { useState } from 'react';
import { 
  Layers, Target, Cpu, ArrowRight, BookOpen, 
  GitMerge, CheckCircle2, Microscope, RefreshCw, 
  Award, Globe, Zap, Circle, LayoutTemplate, Factory
} from 'lucide-react';

const MatrixLayer = ({ title, icon: Icon, color, items, isActive, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-500 relative overflow-hidden group ${
            isActive 
            ? `bg-white ${color.border} shadow-xl scale-[1.02] z-10` 
            : 'bg-slate-50 border-transparent opacity-60 hover:opacity-80 hover:bg-slate-100'
        }`}
    >
        <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isActive ? color.bg + ' ' + color.text : 'bg-slate-200 text-slate-500'}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <h4 className={`text-lg font-black uppercase tracking-tight ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>{title}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Camada da Matriz</p>
                </div>
            </div>
            {isActive && <div className={`w-3 h-3 rounded-full ${color.bgIndicator} animate-pulse`}></div>}
        </div>
        
        {isActive && (
            <div className="mt-6 grid grid-cols-2 gap-3 animate-fade-in">
                {items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <div className={`w-1.5 h-1.5 rounded-full ${color.bgIndicator}`}></div>
                        {item}
                    </div>
                ))}
            </div>
        )}
    </button>
);

const BernsteinLensCard = ({ type, title, icon: Icon, description, example, color }: any) => (
    <div className={`p-8 rounded-[2.5rem] border ${color.bg} ${color.border} relative overflow-hidden group hover:shadow-lg transition-all`}>
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl ${color.iconBg} ${color.iconColor}`}>
                <Icon size={28} />
            </div>
            <div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${color.titleColor}`}>Lente de Bernstein: {type}</span>
                <h3 className="text-xl font-black text-slate-800 leading-tight">{title}</h3>
            </div>
        </div>
        
        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
            {description}
        </p>

        <div className="bg-white/60 p-5 rounded-2xl border border-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className={color.iconColor} />
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Exemplo Prático (Agro)</span>
            </div>
            <p className="text-sm text-slate-800 italic">
                "{example}"
            </p>
        </div>
    </div>
);

const SynthesisRow = ({ element, matrix, benefit }: { element: string, matrix: string, benefit: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors p-4 items-center">
        <div className="font-bold text-slate-700 text-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            {element}
        </div>
        <div className="text-sm text-slate-600 md:border-l md:border-slate-100 md:pl-4">
            {matrix}
        </div>
        <div className="flex justify-end">
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border border-emerald-100">
                {benefit}
            </span>
        </div>
    </div>
);

const RadialMatrixView: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState<'core' | 'tracks' | 'extension'>('tracks');

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
            
            {/* HERO SECTION */}
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Cpu size={12} /> Engenharia Pedagógica
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        A Matriz Radial como <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                            Dispositivo em Ação
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        A teoria de Bernstein não fica no papel. Ela se materializa na arquitetura curricular da Ânima. 
                        A Matriz Radial é a máquina que operacionaliza a recontextualização.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-16">
                
                {/* PARTE 1: A ESTRUTURA RADIAL */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                            <Circle size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">1. A Anatomia da Matriz</h2>
                            <p className="text-slate-500 text-sm font-medium">Não linear. Cêntrica. Integrada.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <MatrixLayer 
                                title="1. Núcleo Comum (Core)"
                                icon={Target}
                                isActive={activeLayer === 'core'}
                                onClick={() => setActiveLayer('core')}
                                color={{ bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', bgIndicator: 'bg-indigo-500' }}
                                items={['Pensamento Crítico', 'Comunicação', 'Liderança Ética', 'Visão Sistêmica']}
                            />
                            <MatrixLayer 
                                title="2. Trilhas Temáticas"
                                icon={GitMerge}
                                isActive={activeLayer === 'tracks'}
                                onClick={() => setActiveLayer('tracks')}
                                color={{ bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', bgIndicator: 'bg-emerald-500' }}
                                items={['Bioenergia', 'Grãos & Proteína', 'Agricultura Digital', 'Gestão & Governança']}
                            />
                            <MatrixLayer 
                                title="3. Extensão (Borda)"
                                icon={Globe}
                                isActive={activeLayer === 'extension'}
                                onClick={() => setActiveLayer('extension')}
                                color={{ bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', bgIndicator: 'bg-rose-500' }}
                                items={['Projetos Aplicados', 'Mentoria com Mercado', 'Imersões em Usinas', 'Hackathons']}
                            />
                        </div>
                        
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex items-center justify-center min-h-[400px]">
                            {/* Visualização Abstrata da Matriz */}
                            <div className="relative w-80 h-80">
                                {/* Camada 3 (Extensão) */}
                                <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-700 ${activeLayer === 'extension' ? 'border-rose-500 opacity-100 scale-100' : 'border-slate-700 opacity-30 scale-95'}`}></div>
                                
                                {/* Camada 2 (Trilhas) */}
                                <div className={`absolute inset-8 rounded-full border-4 transition-all duration-700 ${activeLayer === 'tracks' ? 'border-emerald-500 opacity-100' : 'border-slate-600 opacity-40'}`}></div>
                                
                                {/* Camada 1 (Core) */}
                                <div className={`absolute inset-24 rounded-full transition-all duration-700 flex items-center justify-center ${activeLayer === 'core' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                                    <span className="font-black text-xs uppercase tracking-widest">Core</span>
                                </div>

                                {/* Conectores (Raios) */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                    <div className="w-full h-px bg-slate-400 rotate-0"></div>
                                    <div className="w-full h-px bg-slate-400 rotate-45"></div>
                                    <div className="w-full h-px bg-slate-400 rotate-90"></div>
                                    <div className="w-full h-px bg-slate-400 rotate-135"></div>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Foco Atual: <span className="text-white">{activeLayer === 'core' ? 'Competências' : (activeLayer === 'tracks' ? 'Vocação' : 'Impacto')}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PARTE 2: MAPEAMENTO DE BERNSTEIN */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-amber-500">
                            <Microscope size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">2. O Dispositivo em Ação</h2>
                            <p className="text-slate-500 text-sm font-medium">Como a teoria se traduz em prática pedagógica.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <BernsteinLensCard 
                            type="Produção"
                            title="Conhecimento Situado"
                            icon={Factory}
                            color={{ bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-white', iconColor: 'text-blue-600', titleColor: 'text-blue-400' }}
                            description="O conhecimento não é produzido apenas na sala de aula, mas nos 'Laboratórios Vivos' (usinas, campos, hubs). A produção é descentralizada."
                            example="O aluno não estuda 'produtividade' em abstrato. Ele estuda 'como aumentar o TCH da cana na fazenda X em Goiás'."
                        />

                        <BernsteinLensCard 
                            type="Recontextualização"
                            title="Tradução Ativa"
                            icon={RefreshCw}
                            color={{ bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-white', iconColor: 'text-purple-600', titleColor: 'text-purple-400' }}
                            description="A Matriz traduz a ciência complexa em projetos aplicáveis. O aluno é o agente dessa tradução, guiado pelo mentor."
                            example="Teoria: Ciclo de Vida do Produto. Prática: Modelo de LCA (Life Cycle Assessment) para reduzir carbono na usina parceira."
                        />

                        <BernsteinLensCard 
                            type="Avaliação"
                            title="Critério de Impacto"
                            icon={Award}
                            color={{ bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-white', iconColor: 'text-emerald-600', titleColor: 'text-emerald-400' }}
                            description="Não se avalia a memória (prova), mas a competência demonstrada e o impacto gerado no problema real."
                            example="Nota final baseada em: 'O projeto reduziu o custo operacional? A empresa validou a solução?'"
                        />

                    </div>
                </section>

                {/* PARTE 3: SÍNTESE FINAL */}
                <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                    <div className="bg-slate-900 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                <LayoutTemplate size={24} className="text-emerald-400"/> Síntese do Sistema
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">Conexão direta: Teoria (Bernstein) → Artefato (Matriz) → Resultado.</p>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        <div className="bg-slate-50 p-4 grid grid-cols-1 md:grid-cols-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <div>Elemento Bernstein</div>
                            <div className="md:pl-4">Na Matriz Radial</div>
                            <div className="text-right">Benefício Gerado</div>
                        </div>

                        <SynthesisRow 
                            element="Produção de Conhecimento"
                            matrix="Pesquisa aplicada em cadeias agro"
                            benefit="Relevância Imediata"
                        />
                        <SynthesisRow 
                            element="Recontextualização"
                            matrix="Ciclos de Extensão (Propósito > Diagnóstico)"
                            benefit="Integração Teoria-Prática"
                        />
                        <SynthesisRow 
                            element="Avaliação"
                            matrix="Competências em projetos reais"
                            benefit="Validade de Mercado"
                        />
                        <SynthesisRow 
                            element="Classificação Fraca"
                            matrix="Núcleos temáticos (multidisciplinares)"
                            benefit="Visão Sistêmica"
                        />
                        <SynthesisRow 
                            element="Enquadramento Moderado"
                            matrix="Aluno lidera projetos com mentoria"
                            benefit="Agência & Autonomia"
                        />
                    </div>
                    
                    <div className="bg-slate-50 p-8 text-center border-t border-slate-200">
                        <p className="text-lg font-serif italic text-slate-600 max-w-3xl mx-auto">
                            "A Matriz Radial não é um currículo aleatório. É um sistema integrado onde cada parte serve a um propósito pedagógico claro: formar profissionais capazes de intervir na complexidade."
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default RadialMatrixView;
