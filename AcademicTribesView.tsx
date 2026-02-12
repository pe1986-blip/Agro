
import React from 'react';
import { 
  Users, Map, ShieldAlert, GitMerge, 
  BookOpen, Feather, Flag, Briefcase, 
  Scale, Sprout, Quote, ArrowRight, Layers
} from 'lucide-react';

const QuoteBlock = ({ children }: { children?: React.ReactNode }) => (
    <div className="relative p-8 my-8 bg-slate-800 rounded-2xl text-center border-l-4 border-emerald-500 shadow-xl">
        <div className="absolute top-4 left-4 opacity-20 text-white">
            <Quote size={40} />
        </div>
        <p className="relative z-10 text-lg md:text-xl font-serif italic text-slate-200 leading-relaxed">
            "{children}"
        </p>
        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-4">
            — Tony Becher & Paul Trowler
        </p>
    </div>
);

const TribeCard = ({ title, icon: Icon, description, language, values, color }: any) => (
    <div className={`p-6 rounded-2xl border ${color.bg} ${color.border} relative group hover:shadow-lg transition-all`}>
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${color.iconBg} ${color.iconColor}`}>
                <Icon size={24} />
            </div>
            <h4 className={`text-lg font-black uppercase tracking-tight ${color.titleColor}`}>{title}</h4>
        </div>
        <div className="space-y-3">
            <p className="text-sm text-slate-600 font-medium leading-relaxed">{description}</p>
            <div className="pt-3 border-t border-black/5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Linguagem da Tribo</p>
                <p className="text-xs font-serif italic text-slate-700 bg-white/50 p-2 rounded">"{language}"</p>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">O que valorizam</p>
                <p className="text-xs font-bold text-slate-700">{values}</p>
            </div>
        </div>
    </div>
);

const TerritoryExample = () => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Map size={200} />
        </div>
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2 relative z-10">
            <Flag size={20} className="text-rose-500"/> Disputa de Território: "Crédito de Carbono"
        </h3>
        <p className="text-sm text-slate-600 mb-6 relative z-10 max-w-2xl">
            Quando surge um tema novo e complexo como "Mercado de Carbono", as tribos tentam anexar esse território às suas fronteiras. Quem é o "dono" do assunto na universidade?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-2">Tribo Agronomia</span>
                <p className="text-xs text-emerald-900 font-bold">"É nosso! Depende da fotossíntese e manejo do solo."</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Tribo Economia</span>
                <p className="text-xs text-blue-900 font-bold">"É nosso! É um ativo financeiro transacionável."</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block mb-2">Tribo Direito</span>
                <p className="text-xs text-purple-900 font-bold">"É nosso! Depende da regulação e segurança jurídica."</p>
            </div>
        </div>
    </div>
);

const RealWorldBridge = () => (
    <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden mt-12">
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500 rounded-lg text-slate-900">
                    <Sprout size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">O Mundo Real (Agro) não tem Departamentos</h3>
            </div>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-3xl">
                Seu canavial não sabe o que é "departamento de física". Ele obedece leis físicas, biológicas e econômicas <strong>simultaneamente</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Problema: Renovação de Canavial</h4>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Fisiologia Vegetal (Agronomia)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Fluxo de Caixa & Risco (Finanças)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Código Florestal (Direito)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Negociação com Fornecedores (Gestão)
                        </li>
                    </ul>
                </div>
                
                <div>
                    <p className="text-xl font-serif italic text-slate-200 leading-relaxed mb-6">
                        "Se o mundo real é multidimensional e integrado, por que insistimos em uma universidade fatiada em territórios fechados?"
                    </p>
                    <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2">
                        Ver Estratégias de Integração <ArrowRight size={14}/>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const AcademicTribesView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <BookOpen size={12} /> Fundamentação Teórica
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Tribos Acadêmicas & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Territórios Disciplinares
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Para redesenhar a universidade, precisamos primeiro entender a sociologia oculta que a governa. 
                Por que é tão difícil fazer um agrônomo e um advogado trabalharem juntos?
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        
        {/* INTRODUÇÃO TEÓRICA */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-slate-600 text-lg leading-relaxed">
                Na obra seminal <em>"Academic Tribes and Territories"</em>, Tony Becher e Paul Trowler argumentam que a universidade não é uma empresa unificada. 
                Ela é um arquipélago de <strong>tribos culturais</strong> habitando <strong>territórios políticos</strong> distintos.
            </p>
        </div>

        {/* 1. AS TRIBOS (IDENTIDADE) */}
        <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                    <Users size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">1. As Tribos (Cultura)</h2>
                    <p className="text-slate-500 text-sm font-medium">Grupos que compartilham linguagem, valores e ídolos.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TribeCard 
                    title="A Tribo Agronomia"
                    icon={Sprout}
                    description="Pragmáticos, conectados à terra e à biologia. Valorizam o que funciona no campo."
                    language="Produtividade, sca/ha, manejo, fisiologia."
                    values="Eficiência técnica e resultado produtivo."
                    color={{ bg: 'bg-emerald-50', border: 'border-emerald-200', titleColor: 'text-emerald-900', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' }}
                />
                <TribeCard 
                    title="A Tribo Economia"
                    icon={Briefcase}
                    description="Abstratos, focados em modelos e alocação de recursos. Valorizam a eficiência financeira."
                    language="ROI, EBITDA, elasticidade, custo de oportunidade."
                    values="Maximização de lucro e racionalidade."
                    color={{ bg: 'bg-blue-50', border: 'border-blue-200', titleColor: 'text-blue-900', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' }}
                />
                <TribeCard 
                    title="A Tribo Direito"
                    icon={Scale}
                    description="Normativos, focados na regra e na segurança. Valorizam a conformidade e o risco zero."
                    language="Compliance, marco regulatório, insegurança jurídica."
                    values="Ordem, justiça e conformidade legal."
                    color={{ bg: 'bg-purple-50', border: 'border-purple-200', titleColor: 'text-purple-900', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' }}
                />
            </div>
            
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 italic bg-white inline-block px-6 py-2 rounded-full border border-slate-200 shadow-sm">
                    "Cada tribo tem seus próprios periódicos, conferências e critérios do que é 'bom trabalho'."
                </p>
            </div>
        </section>

        {/* 2. OS TERRITÓRIOS (POLÍTICA) */}
        <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-rose-600">
                    <Map size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">2. Os Territórios (Poder)</h2>
                    <p className="text-slate-500 text-sm font-medium">Espaços onde a tribo exerce autoridade e controle.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        O "território" é a manifestação física e orçamentária da tribo. São os <strong>departamentos</strong>, os <strong>prédios</strong> e, principalmente, as <strong>matrizes curriculares</strong>.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Uma disciplina não é apenas um tema de estudo; é uma propriedade imobiliária. Quando tentamos criar um curso interdisciplinar, estamos essencialmente pedindo para as tribos cederem pedaços de seus territórios. Isso gera defesa e ataque.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <ShieldAlert size={14}/> Sintomas de Defesa Territorial
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>• "Essa matéria tem que ser dada pelo nosso departamento."</li>
                            <li>• "Não aceitamos que um economista dê aula de gestão rural."</li>
                            <li>• "Precisamos de mais carga horária (mais território)."</li>
                        </ul>
                    </div>
                </div>
                
                <TerritoryExample />
            </div>

            <QuoteBlock>
                As disciplinas são as unidades políticas da academia. Elas defendem suas fronteiras, controlam o acesso e definem o que é conhecimento legítimo.
            </QuoteBlock>
        </section>

        {/* 3. O PROBLEMA E A SOLUÇÃO */}
        <section className="mb-20">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-amber-500">
                    <GitMerge size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">3. Fragmentação vs. Complexidade</h2>
                    <p className="text-slate-500 text-sm font-medium">Por que isso mata a inovação no Agro.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Fragmentação</h4>
                    <p className="text-sm text-slate-600">
                        Cada tribo fala sozinha. O aluno precisa "integrar" na sua cabeça o que a universidade entregou separado.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Ponto Cego</h4>
                    <p className="text-sm text-slate-600">
                        Problemas complexos caem nos vácuos entre os territórios. Ninguém estuda o "todo".
                    </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Guerra Interna</h4>
                    <p className="text-sm text-slate-600">
                        Energia gasta em disputas de poder departamental em vez de resolver problemas do mundo real.
                    </p>
                </div>
            </div>

            <RealWorldBridge />
        </section>

        {/* FECHAMENTO */}
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                O Desafio da Ânima Agro
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
                Becher & Trowler nos ensinam que não podemos ignorar as tribos. Elas são necessárias para a profundidade do conhecimento. 
                O segredo não é destruir as tribos, mas criar <strong>zonas de comércio</strong> e <strong>projetos comuns</strong> que obriguem a colaboração.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">
                <Feather size={14} /> Próximo: Como redesenhar o mapa?
            </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicTribesView;
