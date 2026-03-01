
import React, { useState } from 'react';
import { 
  Database, Server, Cloud, Map, Bot, BarChart3, ArrowDown, Share2, 
  Users, Linkedin, Building, Globe, CheckCircle, FileText, BrainCircuit, 
  Download, Table, Layers, ArrowRight, Network, FileSpreadsheet, Search,
  Cpu, HardDrive, ShieldCheck, Zap, GraduationCap, Microscope, Layout, DollarSign, Monitor,
  Activity, Lock, Key, RefreshCw, CloudLightning,
  Users2, BookOpen, Code
} from 'lucide-react';

// --- SHARED COMPONENTS ---
const SectionTitle = ({ title, icon: Icon, color = "text-slate-800" }: { title: string, icon?: any, color?: string }) => (
    <h3 className={`text-left font-black text-xs md:text-sm my-4 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2 ${color}`}>
        {Icon && <Icon size={16} />}
        {title}
    </h3>
);

// --- DIAGRAM VIEW COMPONENTS ---
interface BoxProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  badge?: string;
  badgeColor?: string;
}

const Box = ({ title, icon, children, className = '', badge, badgeColor = 'bg-blue-600' }: BoxProps) => (
  <div className={`bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center relative group hover:border-blue-300 hover:shadow-md transition-all h-full ${className}`}>
    {badge && (
        <span className={`absolute -top-2 -right-2 ${badgeColor} text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10`}>
            {badge}
        </span>
    )}
    <div className="flex items-center justify-center text-slate-700 mb-1 group-hover:scale-110 transition-transform group-hover:text-blue-600">
      {icon}
      <h3 className="font-bold text-xs ml-2 text-slate-800 break-words">{title}</h3>
    </div>
    {children && <div className="text-[9px] text-slate-500 font-medium leading-tight mt-1">{children}</div>}
  </div>
);

const PipelineArrow = ({ label, vertical = true }: { label?: string, vertical?: boolean }) => (
    <div className={`flex items-center justify-center ${vertical ? 'flex-col my-2' : 'flex-row mx-2'}`}>
        {label && <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{label}</span>}
        {vertical ? <ArrowDown className="text-slate-300 animate-pulse" size={16} /> : <ArrowRight className="text-slate-300 animate-pulse" size={16} />}
    </div>
);

const TechnicalDiagram = () => {
    return (
        <div className="animate-fade-in max-w-6xl mx-auto pb-12">
            
            {/* HEADER DA ARQUITETURA */}
            <div className="flex justify-between items-center mb-8 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-700">
                <div>
                    <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                        <Network size={24} className="text-emerald-400"/> Arquitetura de Dados Híbrida v5.0
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                        Dual-Pipeline: Ingestão Estrutural (Batch) + Inteligência Tática (Real-Time)
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="text-[10px] font-bold bg-blue-600 px-3 py-1 rounded-full flex items-center gap-1"><Cloud size={10}/> GCP Native</span>
                    <span className="text-[10px] font-bold bg-purple-600 px-3 py-1 rounded-full flex items-center gap-1"><Bot size={10}/> Gemini AI</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* COLUNA 1: FONTES DE DADOS (SOURCES) */}
                <div className="lg:col-span-12">
                    <SectionTitle title="Camada 1: Ecossistema de Fontes (Data Sources)" icon={Database} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* GRUPO A: DADOS PÚBLICOS (BIG DATA) */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Dados Estruturais (Governo)</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Box title="RFB CNPJ" icon={<FileText size={14} />} badge="Mensal">Sócios & CNAE</Box>
                                <Box title="Novo Caged" icon={<Users size={14} />} badge="Mensal">Empregos CLT</Box>
                                <Box title="Censo/INEP" icon={<GraduationCap size={14} />} badge="Anual">Ensino Superior</Box>
                                <Box title="IBGE PAM" icon={<Globe size={14} />} badge="Anual">Produção Agro</Box>
                            </div>
                        </div>

                        {/* GRUPO B: INTEGRAÇÕES LIVE (APIS) */}
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 border-dashed">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 text-center flex items-center justify-center gap-1"><Zap size={10}/> Dados Táticos (Real-Time)</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Box title="LinkedIn" icon={<Linkedin size={14} />} badge="Live" badgeColor="bg-blue-500">Vagas & Skills</Box>
                                <Box title="Google Trends" icon={<Search size={14} />} badge="Live" badgeColor="bg-red-500">Intenção Busca</Box>
                                <Box title="Bacen/Sicro" icon={<DollarSign size={14} />} badge="Diário" badgeColor="bg-emerald-500">Juros & Custo</Box>
                                <Box title="OpenWeather" icon={<CloudLightning size={14} />} badge="Live" badgeColor="bg-amber-500">Risco Climático</Box>
                            </div>
                        </div>

                        {/* GRUPO C: DADOS PROPRIETÁRIOS (IP) */}
                        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 border-dashed">
                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3 text-center flex items-center justify-center gap-1"><Lock size={10}/> Inteligência Proprietária</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Box title="CRM Corp" icon={<Users2 size={14} />} badge="Private">Relacionamento</Box>
                                <Box title="CMS Acadêmico" icon={<BookOpen size={14} />} badge="Private">Matrizes/Cursos</Box>
                                <Box title="Benchmarks" icon={<BarChart3 size={14} />} badge="IP">Pricing & Custo</Box>
                                <Box title="Metodologia" icon={<BrainCircuit size={14} />} badge="Core">Algoritmo RL</Box>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONECTORES */}
                <div className="lg:col-span-12 flex justify-around px-12 -my-2">
                    <PipelineArrow label="ETL (Batch)" vertical />
                    <PipelineArrow label="API Gateway (BFF)" vertical />
                    <PipelineArrow label="Ingestão Direta" vertical />
                </div>

                {/* COLUNA 2: PROCESSAMENTO & ARMAZENAMENTO */}
                <div className="lg:col-span-8">
                     <SectionTitle title="Camada 2: Data Lakehouse & Processamento" icon={Server} />
                     <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Database size={100}/></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            {/* BRONZE */}
                            <div className="border-r border-slate-700 pr-6">
                                <h4 className="text-[10px] font-black text-amber-500 uppercase mb-3">Raw Zone (Bronze)</h4>
                                <div className="space-y-2">
                                    <div className="bg-slate-800 p-2 rounded text-[10px] font-mono border border-slate-700 flex items-center gap-2"><FileText size={10}/> rf_socios_full.csv</div>
                                    <div className="bg-slate-800 p-2 rounded text-[10px] font-mono border border-slate-700 flex items-center gap-2"><FileText size={10}/> caged_mov_2024.txt</div>
                                    <div className="bg-slate-800 p-2 rounded text-[10px] font-mono border border-slate-700 flex items-center gap-2"><FileText size={10}/> inep_censo.parquet</div>
                                </div>
                            </div>

                             {/* SILVER */}
                             <div className="border-r border-slate-700 pr-6">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3">Trusted (Silver)</h4>
                                <div className="space-y-2">
                                    <div className="bg-slate-800 p-2 rounded text-[10px] font-mono border border-slate-600 flex items-center gap-2"><Table size={10}/> dim_empresas_enrich</div>
                                    <div className="bg-slate-800 p-2 rounded text-[10px] font-mono border border-slate-600 flex items-center gap-2"><Table size={10}/> fato_vagas_agro</div>
                                    <div className="bg-slate-800 p-2 rounded text-[10px] font-mono border border-slate-600 flex items-center gap-2"><Table size={10}/> fato_clima_historico</div>
                                </div>
                            </div>

                             {/* GOLD */}
                             <div>
                                <h4 className="text-[10px] font-black text-emerald-400 uppercase mb-3">Serving (Gold)</h4>
                                <div className="space-y-2">
                                    <div className="bg-emerald-900/40 p-2 rounded text-[10px] font-mono border border-emerald-800 text-emerald-200 flex items-center gap-2"><Layout size={10}/> vw_oportunidade_rank</div>
                                    <div className="bg-emerald-900/40 p-2 rounded text-[10px] font-mono border border-emerald-800 text-emerald-200 flex items-center gap-2"><Layout size={10}/> vw_gap_competencias</div>
                                    <div className="bg-emerald-900/40 p-2 rounded text-[10px] font-mono border border-emerald-800 text-emerald-200 flex items-center gap-2"><Layout size={10}/> vw_pricing_dinamico</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center text-[10px] text-slate-400">
                             <span>Orquestração: <strong>Cloud Workflows</strong></span>
                             <span>Transformação: <strong>dbt / Dataform</strong></span>
                             <span>Storage: <strong>BigQuery</strong></span>
                        </div>
                     </div>
                </div>

                 {/* COLUNA 3: MIDDLEWARE (BFF) */}
                 <div className="lg:col-span-4">
                     <SectionTitle title="Camada 3: Middleware & IA" icon={Cpu} />
                     <div className="bg-white p-5 rounded-2xl border border-slate-200 h-full flex flex-col gap-4 shadow-sm">
                        
                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                            <h4 className="text-xs font-black text-purple-700 uppercase mb-2 flex items-center gap-2"><Bot size={14}/> Gemini 1.5 Pro Engine</h4>
                            <p className="text-[10px] text-slate-600 mb-2">Processamento de linguagem natural para geração de teses e chat.</p>
                            <div className="flex gap-1">
                                <span className="px-2 py-0.5 bg-white rounded border border-purple-200 text-[9px] text-purple-600 font-mono">Function Calling</span>
                                <span className="px-2 py-0.5 bg-white rounded border border-purple-200 text-[9px] text-purple-600 font-mono">Context Window</span>
                            </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex-1">
                            <h4 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Server size={14}/> API Gateway (Python)</h4>
                            <p className="text-[10px] text-slate-600 mb-2">Microsserviços em Cloud Run para unificação de dados.</p>
                            <ul className="space-y-1 text-[9px] text-slate-500 font-mono">
                                <li>GET /api/v1/market-share</li>
                                <li>GET /api/v1/realtime-jobs</li>
                                <li>POST /api/v1/simulate-scenario</li>
                            </ul>
                        </div>

                     </div>
                </div>

            </div>

             <div className="mt-8">
                <SectionTitle title="Consumo (Frontend Application)" icon={Monitor} />
                <div className="grid grid-cols-1">
                     <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-4 rounded-2xl text-center shadow-lg flex items-center justify-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg"><Activity size={24}/></div>
                        <div className="text-left">
                            <span className="font-bold text-sm block">RogerLens React App (V4.5)</span>
                            <span className="text-[10px] text-slate-300">Vite + Tailwind + Recharts + Leaflet</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const DataRow = ({ table, type, desc, freq, icon: Icon }: any) => (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 text-xs">
        <td className="p-3 font-mono font-bold text-blue-700 flex items-center gap-2">
            {Icon && <Icon size={12} className="text-slate-400" />} {table}
        </td>
        <td className="p-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${type === 'FATO' ? 'bg-indigo-100 text-indigo-700' : (type === 'API' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600')}`}>
                {type}
            </span>
        </td>
        <td className="p-3 text-slate-600 font-medium">{desc}</td>
        <td className="p-3 text-slate-500 italic">{freq}</td>
    </tr>
);

const DataInventory = () => {
    return (
        <div className="animate-fade-in max-w-6xl mx-auto space-y-8 pb-10">
            
            {/* SEÇÃO 1: TABELAS CORE (GOLD) */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <Database size={18} className="text-blue-600"/> Data Lake (Gold Layer)
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Tabelas estruturadas no BigQuery.</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Atualizado: D-1</span>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-white border-b border-slate-200">
                        <tr>
                            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ativo de Dados</th>
                            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição Funcional</th>
                            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequência</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataRow table="dim_empresas" type="DIM" desc="Dicionário de CNPJs (RFB) enriquecido com geolocalização e CNAE." freq="Mensal" icon={Building}/>
                        <DataRow table="dim_municipios_perfil" type="DIM" desc="Metadados de cidades, PIB (IBGE), IDH e Vocação Territorial." freq="Anual" icon={Map}/>
                        <DataRow table="fato_vagas_caged" type="FATO" desc="Microdados de admissão/demissão por CBO e setor." freq="Mensal" icon={Users}/>
                        <DataRow table="fato_producao_pam" type="FATO" desc="Série histórica de produção agrícola municipal (IBGE PAM)." freq="Anual" icon={Globe}/>
                        <DataRow table="fato_ensino_superior" type="FATO" desc="Censo INEP (Alunos, Cursos, Evasão) e Conceitos Enade." freq="Anual" icon={GraduationCap}/>
                    </tbody>
                </table>
            </div>

            {/* SEÇÃO 2: CATÁLOGO DE APIS (LIVE) */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 bg-blue-50/50 flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                            <CloudLightning size={18} className="text-amber-500"/> Live Data Integration
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Serviços externos consumidos em tempo real via BFF.</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-blue-100 text-blue-600">Status: Online</span>
                </div>
                <table className="w-full text-left">
                    <tbody>
                        <DataRow table="linkedin_jobs_api" type="API" desc="Scraping/API de vagas abertas por palavra-chave e região." freq="Real-time" icon={Linkedin}/>
                        <DataRow table="google_search_trends" type="API" desc="Volume de busca por termos educacionais e do agro." freq="Real-time" icon={Search}/>
                        <DataRow table="openweather_agri" type="API" desc="Dados climáticos históricos e previsão de safra (ZARC proxy)." freq="Diário" icon={Cloud}/>
                        <DataRow table="bacen_taxas" type="API" desc="Taxas de juros (Selic, TJLP) e indicadores de crédito rural." freq="Diário" icon={DollarSign}/>
                    </tbody>
                </table>
            </div>

            {/* SEÇÃO 3: PROPRIETARY ASSETS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg text-white">
                    <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Lock size={16}/> IP Assets (Proprietário)
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-xs font-bold text-slate-300">pricing_benchmarks.json</span>
                            <span className="text-[9px] font-black text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">CONFIDENCIAL</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-xs font-bold text-slate-300">curriculum_matrix_v4.cms</span>
                            <span className="text-[9px] font-black text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">CORE IP</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-xs font-bold text-slate-300">crm_partners_map.csv</span>
                            <span className="text-[9px] font-black text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">STRATEGIC</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-600"/> Governança
                    </h4>
                    <div className="space-y-2 text-xs text-slate-600">
                        <p className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Dados sensíveis anonimizados (LGPD/GDPR).</p>
                        <p className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Acesso via Service Account (IAM GCP) com rotação de chaves.</p>
                        <p className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Backups diários no Cloud Storage (Coldline) com retenção de 5 anos.</p>
                        <p className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Auditoria de logs de acesso via Cloud Logging.</p>
                    </div>
                </div>
            </div>

            {/* SEÇÃO 4: SCRIPT DE CONSOLIDAÇÃO (NOVO) */}
            <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-xl border border-indigo-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12"><Code size={120}/></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500 rounded-lg"><Download size={20}/></div>
                        <h3 className="text-lg font-black uppercase tracking-tight">Script de Consolidação de Código</h3>
                    </div>
                    <p className="text-sm text-indigo-200 mb-6 max-w-2xl">
                        Este script automatiza a exportação de todo o ecossistema RogerLens. Ele percorre a árvore de diretórios, 
                        agrupa os arquivos <code className="bg-indigo-800 px-1 rounded">.tsx</code>, <code className="bg-indigo-800 px-1 rounded">.ts</code> e <code className="bg-indigo-800 px-1 rounded">.css</code>, 
                        e gera um arquivo mestre para backup ou deploy em novos ambientes.
                    </p>
                    
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-[10px] text-indigo-300 mb-6">
                        <p className="mb-2"># RogerLens Consolidation Script v1.2</p>
                        <p className="text-emerald-400">import os, glob</p>
                        <p>def consolidate_project(root_dir):</p>
                        <p className="pl-4">files_to_scan = ["src/**/*.tsx", "src/**/*.ts", "*.tsx", "*.ts", "*.css"]</p>
                        <p className="pl-4">with open("rogerlens_consolidated.txt", "w") as out:</p>
                        <p className="pl-8">for pattern in files_to_scan:</p>
                        <p className="pl-12">for fpath in glob.glob(pattern, recursive=True):</p>
                        <p className="pl-16">out.write(f"\n\n--- FILE: {"{fpath}"} ---\n")</p>
                        <p className="pl-16">out.write(open(fpath).read())</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-white text-indigo-900 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-2">
                            <Zap size={14}/> Executar Consolidação
                        </button>
                        <button className="bg-indigo-800 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all border border-indigo-600">
                            Copiar Script Python
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<'diagram' | 'inventory' | 'consolidation'>('diagram');
  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto animate-fade-in flex flex-col">
        <div className="flex justify-center mb-8 sticky top-0 z-20 py-2 bg-gray-50/90 backdrop-blur">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex">
                <button onClick={() => setActiveTab('diagram')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'diagram' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                    <Network size={16} /> Visão Técnica
                </button>
                <button onClick={() => setActiveTab('inventory')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                    <FileSpreadsheet size={16} /> Catálogo de Dados
                </button>
                <button onClick={() => setActiveTab('consolidation')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'consolidation' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                    <Code size={16} /> Consolidação
                </button>
            </div>
        </div>
        <div className="flex-1">
            {activeTab === 'diagram' && <TechnicalDiagram />}
            {activeTab === 'inventory' && <DataInventory />}
            {activeTab === 'consolidation' && <CodeConsolidationView />}
        </div>
    </div>
  );
}

const CodeConsolidationView = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const generateConsolidation = async () => {
        setIsGenerating(true);
        // Simulação de consolidação para o UI
        setTimeout(() => {
            setResult(`// RogerLens V4.5 - Consolidated Source Code
// Generated: ${new Date().toLocaleString()}

// --- FILE: App.tsx ---
import React from 'react';
// ... [Full Content of App.tsx]

// --- FILE: architecture.tsx ---
import React from 'react';
// ... [Full Content of architecture.tsx]

// --- FILE: types.ts ---
export interface MunicipioPerfil { ... }

// [Note: In a real environment, this would be generated by a build script or server-side tool]`);
            setIsGenerating(false);
        }, 1200);
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto space-y-8 pb-10">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                        <Code size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Consolidador de Código RogerLens</h3>
                        <p className="text-sm text-slate-500">Agrupa todos os arquivos do projeto em um único bloco de texto para backup ou análise externa.</p>
                    </div>
                </div>

                {!result ? (
                    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                        <p className="text-slate-500 mb-6 text-sm">Clique no botão abaixo para iniciar a varredura do diretório e consolidar os arquivos do projeto.</p>
                        <button 
                            onClick={generateConsolidation}
                            disabled={isGenerating}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 mx-auto shadow-lg shadow-indigo-200 disabled:opacity-50"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
                            {isGenerating ? "Consolidando..." : "Gerar Consolidação Completa"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resultado da Consolidação</span>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(result);
                                        alert("Copiado para a área de transferência!");
                                    }}
                                    className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center gap-1"
                                >
                                    <Share2 size={14} /> Copiar Tudo
                                </button>
                                <button 
                                    onClick={() => setResult(null)}
                                    className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                                >
                                    Limpar
                                </button>
                            </div>
                        </div>
                        <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-[10px] font-mono overflow-auto max-h-[500px] border border-slate-800 custom-scrollbar">
                            {result}
                        </pre>
                    </div>
                )}
            </div>
            
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-700">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Por que consolidar?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <p className="text-xs font-bold">Backup Portátil</p>
                        <p className="text-[10px] text-slate-400">Tenha todo o código em um único arquivo de texto para transferências rápidas.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold">Análise de IA</p>
                        <p className="text-[10px] text-slate-400">Facilite o upload do contexto completo do projeto para LLMs externas.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold">Auditoria de Segurança</p>
                        <p className="text-[10px] text-slate-400">Revise todo o código-fonte em uma única visão linear.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
