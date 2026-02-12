
import React, { useState } from 'react';
import { 
  Users, TrendingUp, Scale, Zap, MessageCircle, 
  AlertTriangle, ArrowRight, Handshake, Mic, 
  Briefcase, Sprout, Database, Landmark, PenTool,
  Speech, X, Check, BrainCircuit
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

const TribePersona = ({ role, focus, language, color, icon: Icon }: any) => (
    <div className={`p-4 rounded-xl border ${color.bg} ${color.border} relative group`}>
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${color.iconBg} ${color.iconColor}`}>
                <Icon size={18} />
            </div>
            <div>
                <h4 className={`font-black text-sm uppercase tracking-tight ${color.title}`}>{role}</h4>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Foco: {focus}</p>
            </div>
        </div>
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-current opacity-20"></div>
            <p className="pl-3 text-xs italic font-medium opacity-80">
                "{language}"
            </p>
        </div>
    </div>
);

const MediationCard = ({ title, steps }: { title: string, steps: string[] }) => (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl mt-6 border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Handshake size={120} />
        </div>
        <div className="relative z-10">
            <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BrainCircuit size={16}/> O Papel da Universidade (Tradução)
            </h4>
            <ul className="space-y-3">
                {steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const ScenarioScene = ({ title, subtitle, context, children, mediation }: any) => {
    return (
        <div className="mb-16 last:mb-0">
            <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest mb-3">
                    <AlertTriangle size={12} /> Zona de Atrito Real
                </div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
                <p className="text-slate-500 text-sm mt-1 max-w-2xl">{subtitle}</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <p className="text-sm font-medium text-slate-600 mb-8 italic border-l-4 border-slate-200 pl-4">
                    "{context}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative">
                    {/* Linhas de Conexão (Visual apenas) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10"></div>
                    {children}
                </div>

                {mediation}
            </div>
        </div>
    );
};

const AcademicTribesConflictView: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-rose-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Speech size={12} /> A Torre de Babel
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Conflitos & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">
                    Traduções Entre Tribos
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Sempre que se misturam tribos, há atrito. No agro real, o Engenheiro Agrônomo, o Diretor Financeiro e o Advogado Ambiental falam línguas diferentes. O Campus Vocacionado é o intérprete.
            </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        
        {/* CENA 1: A USINA (Produtividade vs Financeiro) */}
        <ScenarioScene 
            title="Cena 1: A Batalha da Produtividade"
            subtitle="O conflito clássico entre quem quer produzir mais e quem paga a conta."
            context="Uma usina de cana em Goiás precisa aumentar a produtividade (TCH) em 20% em 3 anos para manter a viabilidade. A reunião de diretoria começa tensa."
            mediation={
                <MediationCard 
                    title="A Solução do Campus Vocacionado"
                    steps={[
                        "Projeto Integrador Multidisciplinar: Alunos de Agronomia e Finanças recebem o mesmo case real.",
                        "Tradutor de Parâmetros: O professor ensina a converter 'litros de água/ha' em 'custo marginal do m³'.",
                        "Resultado: Um plano onde o CAPEX de irrigação é justificado pelo hedge de seca (mitigação de risco financeiro), satisfazendo ambas as tribos."
                    ]}
                />
            }
        >
            <TribePersona 
                role="Agronomia"
                focus="Produtividade Biológica"
                language="Precisamos de novas variedades, adubação de base e pivô central. O TCH está caindo!"
                icon={Sprout}
                color={{ bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-900', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' }}
            />
            <TribePersona 
                role="Finanças (CFO)"
                focus="Retorno e Caixa"
                language="O CAPEX disso destrói meu fluxo de caixa livre. Qual o Payback? O WACC subiu, não aprovo."
                icon={TrendingUp}
                color={{ bg: 'bg-blue-50', border: 'border-blue-200', title: 'text-blue-900', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' }}
            />
            <TribePersona 
                role="Jurídico"
                focus="Risco & Compliance"
                language="A outorga de água está no limite. Aumentar irrigação agora é criar um passivo ambiental impagável."
                icon={Scale}
                color={{ bg: 'bg-slate-50', border: 'border-slate-200', title: 'text-slate-900', iconBg: 'bg-slate-200', iconColor: 'text-slate-600' }}
            />
        </ScenarioScene>

        {/* CENA 2: O CAMPO (Tech vs Tradição) */}
        <ScenarioScene 
            title="Cena 2: O Choque Digital"
            subtitle="Quando o Vale do Silício encontra a botina suja de barro."
            context="Uma AgTech de São Paulo tenta vender um sistema de sensoriamento remoto para uma cooperativa de leite familiar no interior. A rejeição é imediata."
            mediation={
                <MediationCard 
                    title="A Solução do Campus Vocacionado"
                    steps={[
                        "Imersão Empática: Alunos de Tech passam 1 semana acordando às 4h da manhã na ordenha.",
                        "Co-Design: O dashboard não é desenhado no laboratório, mas na leiteria, com o produtor.",
                        "Modelo de Negócio: Substituição da 'venda de licença' (Capex) por 'serviço de monitoramento' (Opex), alinhando incentivos."
                    ]}
                />
            }
        >
            <TribePersona 
                role="Dev / Tech"
                focus="Inovação & Dados"
                language="É só instalar o IoT no tanque, conectar na API da nuvem e ver o dashboard em tempo real. Simples!"
                icon={Zap}
                color={{ bg: 'bg-purple-50', border: 'border-purple-200', title: 'text-purple-900', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' }}
            />
            <TribePersona 
                role="Produtor Rural"
                focus="Rotina & Segurança"
                language="Meu pai fazia assim, eu faço assim. Se a internet cair, quem ordenha? Não vou arriscar meu rebanho nisso."
                icon={Users}
                color={{ bg: 'bg-amber-50', border: 'border-amber-200', title: 'text-amber-900', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' }}
            />
            <TribePersona 
                role="Extensão Rural"
                focus="Adoção Social"
                language="Vocês estão ignorando o contexto sociocultural. A tecnologia precisa ser apropriada, não imposta."
                icon={Handshake}
                color={{ bg: 'bg-orange-50', border: 'border-orange-200', title: 'text-orange-900', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' }}
            />
        </ScenarioScene>

        {/* CENA 3: A NARRATIVA (Ciência vs Política) */}
        <ScenarioScene 
            title="Cena 3: A Guerra das Narrativas"
            subtitle="Como defender o Agro na praça pública?"
            context="O setor de etanol está sob ataque de narrativas europeias sobre desmatamento. É preciso defender o papel do biocombustível na transição energética em Brasília."
            mediation={
                <MediationCard 
                    title="A Solução do Campus Vocacionado"
                    steps={[
                        "Fábrica de Narrativas: Alunos transformam dados complexos de ciclo de vida (ACV) em infográficos para redes sociais.",
                        "Policy Briefs: Tradução da ciência ('gCO2e/MJ') para 'empregos gerados' e 'soberania energética' (linguagem política).",
                        "Simulação de Audiência Pública: Treinamento de porta-vozes com dados reais."
                    ]}
                />
            }
        >
            <TribePersona 
                role="Cientista"
                focus="Precisão Técnica"
                language="O balanço de ciclo de vida mostra que a cana sequestra carbono se considerarmos o uso do solo indireto..."
                icon={Database}
                color={{ bg: 'bg-cyan-50', border: 'border-cyan-200', title: 'text-cyan-900', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' }}
            />
            <TribePersona 
                role="Político"
                focus="Votos & Agenda"
                language="Isso é muito técnico. O que eu digo para o eleitor? Isso baixa o preço da gasolina ou não?"
                icon={Landmark}
                color={{ bg: 'bg-slate-50', border: 'border-slate-200', title: 'text-slate-900', iconBg: 'bg-slate-200', iconColor: 'text-slate-600' }}
            />
            <TribePersona 
                role="Comunicador"
                focus="Percepção Pública"
                language="Ninguém entende 'sequestro de carbono'. Precisamos de uma história: 'O combustível que limpa o ar'."
                icon={PenTool}
                color={{ bg: 'bg-pink-50', border: 'border-pink-200', title: 'text-pink-900', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' }}
            />
        </ScenarioScene>

        {/* SÍNTESE FINAL */}
        <div className="mt-20 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 p-12 opacity-10 pointer-events-none">
                <Users size={300} />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold mb-8">
                    O Profissional "Embaixador"
                </h2>
                <p className="text-lg text-slate-200 leading-relaxed mb-10 font-medium">
                    Em um mundo de tribos isoladas, quem tem o poder é quem sabe traduzir. 
                    O egresso da Ânima Agro não é apenas um "membro da tribo"; ele é um diplomata que transita entre a Faria Lima, o Laboratório e a Lavoura.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/10">
                        <Check size={18} className="text-emerald-400"/>
                        <span className="font-bold text-sm">Escuta Ativa</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/10">
                        <Check size={18} className="text-emerald-400"/>
                        <span className="font-bold text-sm">Tradução de Linguagens</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/10">
                        <Check size={18} className="text-emerald-400"/>
                        <span className="font-bold text-sm">Construção de Consenso</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicTribesConflictView;
