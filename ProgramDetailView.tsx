import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, AlertTriangle, ChevronLeft, ChevronDown, TrendingUp, BarChart3, Briefcase, GraduationCap, DollarSign, Target, Zap, FileText, CheckCircle, Lightbulb, Building, X, Search, Download, Send, Calendar, Users, Flag, Mail, MapPin, Factory, Sprout, Wrench } from 'lucide-react';
import type { ProgramDetail, ProgramRecommendation } from './types';
import { getProgramDetailById } from './programDetailService';
import { formatNumber, formatPercent } from './constants';
import ChatWidget from './ChatWidget';

// --- DYNAMIC MOCK DATA GENERATION ---
const stringToSeed = (str: string): number => {
    if (!str) return 0;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const seededRandom = (seed: number) => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    return (a * seed + c) % m / m;
};

// Taxonomia Consistente com o Mapa
const TAXONOMY = {
    'Antes da Porteira': {
        color: 'orange',
        categories: ['Insumos & Sementes', 'Maquinário & Revenda', 'AgTech & Serviços', 'Biotecnologia', 'Serviços Financeiros']
    },
    'Dentro da Porteira': {
        color: 'green',
        categories: ['Produção de Grãos', 'Pecuária de Corte', 'Cooperativa Agrícola', 'Hortifruti', 'Fruticultura']
    },
    'Depois da Porteira': {
        color: 'red',
        categories: ['Agroindústria', 'Logística & Trading', 'Varejo & Consumo', 'Processamento Animal', 'Bioenergia']
    }
};

const COMPANY_NAMES = {
    'Antes da Porteira': ['AgroTech Solutions', 'Rural Bank', 'Insumos Forte', 'Máquinas do Campo', 'BioGenética Lab', 'Drone View', 'Solo Fértil Consultoria'],
    'Dentro da Porteira': ['Fazenda Santa Fé', 'Grupo Maggi', 'Agropecuária Futuro', 'Sementes Ouro', 'Fazenda Esperança', 'Grupo Bom Futuro', 'Estância Real'],
    'Depois da Porteira': ['BRF Processamento', 'Rumo Logística', 'Cargill Export', 'Aurora Alimentos', 'Supermercados Regional', 'BioEnergy Usina', 'Transportadora Veloz']
};

const generateMockCnpjsForMunicipality = (municipality: string, programName: string) => {
    if (!municipality) return [];
    const seed = stringToSeed(municipality + programName);
    const results = [];
    const numResults = 25;

    // Função para calcular o "Fit" baseado no nome do programa vs categoria
    const calculateFit = (program: string, category: string, position: string) => {
        const p = program.toLowerCase();
        const c = category.toLowerCase();
        let score = 50 + Math.floor(Math.random() * 30); // Base score 50-80

        // Lógica de Matching
        if (p.includes('tech') || p.includes('digital') || p.includes('precisão') || p.includes('dados')) {
            if (position === 'Antes da Porteira') score += 20;
            if (position === 'Dentro da Porteira') score += 10;
        }
        else if (p.includes('gestão') || p.includes('mba') || p.includes('negócio')) {
             if (position === 'Dentro da Porteira') score += 15;
             if (position === 'Depois da Porteira') score += 15;
        }
        else if (p.includes('logística') || p.includes('supply') || p.includes('industrial')) {
            if (position === 'Depois da Porteira') score += 25;
        }
        else if (p.includes('zootecnia') || p.includes('agronomia') || p.includes('veterinária')) {
            if (position === 'Dentro da Porteira') score += 25;
            if (category.includes('Insumos')) score += 15;
        }

        return Math.min(100, score);
    };

    for (let i = 0; i < numResults; i++) {
        const currentSeed = seed + i * 13;
        
        // Select Position weighted randomly
        const positions = Object.keys(TAXONOMY);
        const position = positions[Math.floor(seededRandom(currentSeed) * positions.length)] as keyof typeof TAXONOMY;
        
        // Select Category
        const categories = TAXONOMY[position].categories;
        const category = categories[Math.floor(seededRandom(currentSeed + 1) * categories.length)];

        // Select Name base
        const names = COMPANY_NAMES[position];
        const baseName = names[Math.floor(seededRandom(currentSeed + 2) * names.length)];
        const companyName = `${baseName} ${String.fromCharCode(65 + (i % 26))}`; // Ex: Fazenda Santa Fé A

        // Generate Mock CNPJ
        const cnpj = `${Math.floor(10 + seededRandom(currentSeed + 4) * 89)}.${Math.floor(100 + seededRandom(currentSeed + 5) * 899)}.${Math.floor(100 + seededRandom(currentSeed + 6) * 899)}/0001-${Math.floor(10 + seededRandom(currentSeed + 7) * 89)}`;

        // Distance (Bias towards close range)
        const distanceKm = Math.floor(seededRandom(currentSeed + 8) * 50 * (seededRandom(currentSeed + 9) > 0.7 ? 1 : 0.4)) + 1;

        // Calculate Fit
        const fit = calculateFit(programName, category, position);

        results.push({
            id: i,
            cnpj,
            empresa: companyName,
            segmento: category,
            cadeia: position,
            distancia: distanceKm,
            fit,
        });
    }
    
    // Sort by Fit (Descending) then Distance (Ascending)
    return results.sort((a, b) => {
        if (b.fit !== a.fit) return b.fit - a.fit;
        return a.distancia - b.distancia;
    });
};


// --- SUB-COMPONENTS ---

const getScoreCategory = (score: number) => {
    if (score >= 8) return { text: 'Alto Potencial', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 5) return { text: 'Médio Potencial', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Baixo Potencial', color: 'text-red-600', bg: 'bg-red-100' };
};

const KPI_Card: React.FC<{ icon: React.ReactNode; label: string; value: string; subValue?: string; valueColor?: string; }> = ({ icon, label, value, subValue, valueColor = 'text-gray-900' }) => (
    <div className="bg-white p-3 rounded-lg border flex items-start gap-3">
        <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-lg font-bold ${valueColor}`}>{value}</p>
            {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
        </div>
    </div>
);

const AccordionSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; }> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-white rounded-lg border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 font-semibold text-gray-700 hover:bg-gray-50">
                <div className="flex items-center gap-2">
                    {icon}
                    {title}
                </div>
                <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t text-sm text-gray-600 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

// --- CNPJ IMPACT MODAL COMPONENT ---
const CnpjImpactModal: React.FC<{ onClose: () => void; municipality: string; programName: string; }> = ({ onClose, municipality, programName }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cadeiaFilter, setCadeiaFilter] = useState('all');

    const mockCnpjs = useMemo(() => generateMockCnpjsForMunicipality(municipality, programName), [municipality, programName]);

    const uniqueCadeias = Object.keys(TAXONOMY);

    const filteredCnpjs = useMemo(() => {
        return mockCnpjs.filter(cnpj => {
            const matchesSearch = cnpj.empresa.toLowerCase().includes(searchTerm.toLowerCase()) || cnpj.segmento.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCadeia = cadeiaFilter === 'all' || cnpj.cadeia === cadeiaFilter;
            return matchesSearch && matchesCadeia;
        });
    }, [searchTerm, cadeiaFilter, mockCnpjs]);

    const getCadeiaBadge = (cadeia: string) => {
        let colorClass = 'bg-gray-100 text-gray-800';
        let Icon = Building;
        if (cadeia === 'Antes da Porteira') { colorClass = 'bg-orange-100 text-orange-800'; Icon = Wrench; }
        else if (cadeia === 'Dentro da Porteira') { colorClass = 'bg-green-100 text-green-800'; Icon = Sprout; }
        else if (cadeia === 'Depois da Porteira') { colorClass = 'bg-red-100 text-red-800'; Icon = Factory; }

        return (
            <span className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 w-fit ${colorClass}`}>
                <Icon size={10} /> {cadeia.split(' ')[0]}
            </span>
        );
    };
    
    const FitBar = ({ value }: { value: number }) => {
        const getColor = (v: number) => {
            if (v >= 90) return 'bg-blue-600';
            if (v >= 75) return 'bg-green-500';
            if (v >= 50) return 'bg-yellow-500';
            return 'bg-gray-400';
        };
        return (
            <div className="flex items-center gap-2 w-full">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className={`${getColor(value)} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
                </div>
                <span className="font-semibold text-xs w-8 text-right">{value}%</span>
            </div>
        );
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <header className="p-4 border-b flex justify-between items-center bg-white rounded-t-xl">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Building className="text-blue-600" size={20}/>
                            Empresas Potencialmente Impactadas
                        </h2>
                        <p className="text-sm text-gray-500">Parceiros num raio de 50km de {municipality} para o programa <span className="font-semibold text-blue-700">{programName}</span></p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </header>

                {/* Filters */}
                <div className="p-3 bg-white grid grid-cols-1 md:grid-cols-4 gap-3 border-b shadow-sm z-10">
                    <div className="relative md:col-span-2">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input type="text" placeholder="Buscar por nome ou segmento..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>
                    <select value={cadeiaFilter} onChange={e => setCadeiaFilter(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm py-1.5 px-2">
                        <option value="all">Todas as Posições</option>
                        {uniqueCadeias.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex items-center justify-end text-xs text-gray-500">
                        <MapPin size={14} className="mr-1 text-gray-400"/> Raio de 50km
                    </div>
                </div>

                {/* Table */}
                <div className="flex-grow overflow-y-auto bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Empresa / CNPJ</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Segmento</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Posição</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Distância</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-48">Aderência (Fit)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCnpjs.map(cnpj => (
                                <tr key={cnpj.id} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-800">{cnpj.empresa}</div>
                                        <div className="text-xs font-mono text-gray-400">{cnpj.cnpj}</div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{cnpj.segmento}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {getCadeiaBadge(cnpj.cadeia)}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                        <span className="font-mono font-semibold">{cnpj.distancia}</span> km
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <FitBar value={cnpj.fit} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <footer className="p-3 border-t flex justify-end items-center gap-3 bg-gray-50 rounded-b-xl">
                    <span className="text-xs text-gray-500 mr-auto">
                        *Cálculo de aderência baseado na correlação semântica entre as skills do curso e o CNAE da empresa.
                    </span>
                    <span className="text-sm font-bold text-gray-700 mr-2">{filteredCnpjs.length} Empresas Encontradas</span>
                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                        <Download size={16}/> Exportar Lista
                    </button>
                    <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                       <Send size={16}/> Iniciar Prospecção
                    </button>
                </footer>
            </div>
        </div>
    );
};

// --- ACTIVATION MODAL COMPONENT ---
const ActivationModal: React.FC<{ onClose: () => void; programName: string, municipality: string }> = ({ onClose, programName, municipality }) => {
    const [checklist, setChecklist] = useState({
        partnership: false,
        professor: false,
        infra: false,
        marketing: false,
        sap: false,
    });
    const [startDate, setStartDate] = useState('');
    const [studentTarget, setStudentTarget] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleCheck = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const allChecked = useMemo(() => Object.values(checklist).every(Boolean), [checklist]);
    const isReadyForConfirmation = allChecked && startDate && studentTarget;

    const handleConfirm = () => {
        if(isReadyForConfirmation) {
            setIsConfirmed(true);
        }
    };
    
    const handleSendToManagement = () => {
        console.log("--- MOCK EMAIL ---");
        console.log("Para: gestao@empresa.com");
        console.log("Assunto: Ativação de Programa Aprovada");
        console.log(`O programa "${programName}" foi ativado para ${municipality}.`);
        console.log("Detalhes:");
        console.log(` - Data de Início: ${startDate}`);
        console.log(` - Meta de Alunos: ${studentTarget}`);
        console.log("Plano de ativação concluído e confirmado.");
        console.log("-------------------");
        alert("Plano de ativação enviado para a gestão (ver console).");
        onClose();
    };

    const checklistItems = [
        { key: 'partnership', label: 'Validar parceria com IES local' },
        { key: 'professor', label: 'Definir corpo docente e coordenador' },
        { key: 'infra', label: 'Preparar infraestrutura (salas, laboratórios)' },
        { key: 'marketing', label: 'Iniciar campanha de marketing e inscrições' },
        { key: 'sap', label: 'Realizar integração com sistema SAP' },
    ];
    
    return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                 <header className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Plano de Ativação de Programa</h2>
                        <p className="text-sm text-gray-500">{programName} - {municipality}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </header>
                <div className="p-6 space-y-4">
                    {checklistItems.map(item => (
                        <label key={item.key} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${checklist[item.key as keyof typeof checklist] ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                            <div className="flex items-center">
                                <input type="checkbox" checked={checklist[item.key as keyof typeof checklist]} onChange={() => handleCheck(item.key as keyof typeof checklist)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" disabled={isConfirmed}/>
                                <span className={`ml-3 text-sm font-medium ${checklist[item.key as keyof typeof checklist] ? 'text-gray-800' : 'text-gray-600'}`}>{item.label}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${checklist[item.key as keyof typeof checklist] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                {checklist[item.key as keyof typeof checklist] ? 'Concluído' : 'Pendente'}
                            </span>
                        </label>
                    ))}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                             <Calendar size={18} className="text-gray-500" />
                             <label className="text-sm font-medium text-gray-600">Data de Início:</label>
                             <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm" disabled={isConfirmed} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={18} className="text-gray-500" />
                            <label className="text-sm font-medium text-gray-600">Meta Alunos:</label>
                             <input type="number" placeholder="Ex: 40" value={studentTarget} onChange={e => setStudentTarget(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm" disabled={isConfirmed}/>
                        </div>
                    </div>
                    
                    {isConfirmed && (
                         <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                            <CheckCircle size={16} /> Plano de Ativação Confirmado!
                        </div>
                    )}
                </div>
                 <footer className="p-3 border-t flex justify-end items-center gap-3 bg-gray-50 rounded-b-xl">
                    {!isConfirmed ? (
                        <button onClick={handleConfirm} disabled={!isReadyForConfirmation} className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                           <Flag size={16}/> Confirmar Ativação
                        </button>
                    ) : (
                        <button onClick={handleSendToManagement} className="flex items-center gap-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg animate-pulse">
                           <Mail size={16}/> Enviar para Gestão
                        </button>
                    )}
                </footer>
            </div>
         </div>
    );
};


// --- MAIN COMPONENT ---

const ProgramDetailView: React.FC<{ program: ProgramRecommendation; onBack: () => void; }> = ({ program, onBack }) => {
    const [details, setDetails] = useState<ProgramDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCnpjModalOpen, setIsCnpjModalOpen] = useState(false);
    const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);


    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getProgramDetailById(program.id, program.name, program.municipality);
                setDetails(result);
            } catch (e: any) {
                setError(e.message || "Falha ao buscar detalhes do programa.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [program]);

    const chatContext = useMemo(() => {
        if (!details) return "Aguardando detalhes do programa...";
        
        return `Estou analisando o detalhe do programa "${details.name}" para o município de ${details.municipality}.
Dados principais:
- Score de Oportunidade: ${details.opportunityScore}
- Gap Educacional: ${details.educationalGap} vagas
- Empregabilidade: ${formatPercent(details.employabilityRate)}
- Investimento Inicial: ${details.financialViability.initialInvestment}
- ROI em 3 Anos: ${details.financialViability.roiIn3Years}

Responda perguntas sobre este programa, como "quais seriam os principais desafios para lançar este curso?" ou "sugira um público-alvo para a campanha de marketing".`;

    }, [details]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                <Loader2 size={40} className="animate-spin text-blue-500" />
                <p className="mt-3 text-gray-600">Carregando detalhes do programa...</p>
            </div>
        );
    }

    if (error || !details) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-red-50 text-red-700 p-4 text-center">
                <AlertTriangle size={40} className="mb-3" />
                <p className="font-semibold text-lg">Erro ao Carregar Programa</p>
                <p className="text-md mb-4">{error}</p>
                 <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">
                    <ChevronLeft size={16} />
                    Voltar
                </button>
            </div>
        );
    }
    
    const scoreInfo = getScoreCategory(details.opportunityScore);
    const gapColor = details.educationalGap > 0 ? 'text-green-600' : 'text-red-600';
    
    return (
        <div className="p-4 max-w-5xl mx-auto bg-gray-50 animate-fade-in relative">
            {isCnpjModalOpen && <CnpjImpactModal onClose={() => setIsCnpjModalOpen(false)} municipality={details.municipality || 'N/A'} programName={details.name} />}
            {isActivationModalOpen && <ActivationModal onClose={() => setIsActivationModalOpen(false)} programName={details.name} municipality={details.municipality || 'N/A'}/>}

            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                 <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
                    <ChevronLeft size={18}/> Voltar aos Programas
                </button>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${scoreInfo.bg} ${scoreInfo.color}`}>
                    {scoreInfo.text}
                </div>
            </header>
            
            <h1 className="text-3xl font-bold text-gray-800">{details.name}</h1>
            <p className="text-md text-gray-500 mt-1">Código: {details.code}</p>

            {/* KPIs */}
            <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI_Card icon={<TrendingUp size={20} className="text-blue-500" />} label="Demanda Local" value={`${details.localDemand}`} subValue="vagas abertas" />
                <KPI_Card icon={<BarChart3 size={20} className="text-purple-500" />} label="Oferta Atual" value={`${details.currentOffer}`} subValue="cursos similares" />
                <KPI_Card icon={<Briefcase size={20} className="text-amber-500" />} label="Gap Educacional" value={`${details.educationalGap > 0 ? '+' : ''}${details.educationalGap}`} subValue="vagas a suprir" valueColor={gapColor} />
                <KPI_Card icon={<GraduationCap size={20} className="text-green-500" />} label="Empregabilidade" value={formatPercent(details.employabilityRate)} subValue="taxa de egresso" />
            </div>

            {/* Sections */}
            <div className="space-y-4">
                <AccordionSection title="Descrição do Programa" icon={<FileText size={16} className="text-gray-500"/>} defaultOpen>
                    <p className="whitespace-pre-line">{details.description}</p>
                </AccordionSection>

                <AccordionSection title="Competências Desenvolvidas" icon={<CheckCircle size={16} className="text-green-500"/>}>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-none">
                        {details.developedSkills.map(skill => (
                            <li key={skill} className="flex items-center gap-2">
                                <Lightbulb size={16} className="text-yellow-500 shrink-0"/> {skill}
                            </li>
                        ))}
                    </ul>
                </AccordionSection>

                <AccordionSection title="Estrutura do Programa" icon={<Building size={16} className="text-blue-500"/>}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div><strong>Duração:</strong><p>{details.structure.duration}</p></div>
                        <div><strong>Formato:</strong><p>{details.structure.format}</p></div>
                        <div><strong>Turmas/Ano:</strong><p>{details.structure.classesPerYear}</p></div>
                        <div><strong>Alunos/Turma:</strong><p>{details.structure.studentsPerClass}</p></div>
                    </div>
                     <h4 className="font-semibold mb-2">Módulos Principais:</h4>
                     <ul className="list-disc list-inside space-y-1">
                        {details.structure.modules.map(mod => <li key={mod.title}><strong>{mod.title}</strong> ({mod.duration})</li>)}
                     </ul>
                </AccordionSection>

                <AccordionSection title="Informações de Mercado" icon={<Target size={16} className="text-red-500"/>}>
                     <ul className="space-y-3">
                        <li><strong>Salário Médio de Egresso:</strong> <span className="font-bold text-green-700">{details.marketInfo.averageSalary}</span></li>
                        <li><strong>Posições Disponíveis:</strong> {details.marketInfo.availablePositions.join(', ')}</li>
                        <li><strong>Empresas Recrutadoras na Região:</strong> {details.marketInfo.hiringCompanies.join(', ')}</li>
                        <li><strong>Crescimento da Demanda de Mercado:</strong> {details.marketInfo.marketDemandGrowth}</li>
                     </ul>
                </AccordionSection>

                <AccordionSection title="Viabilidade Financeira (Estimativa)" icon={<DollarSign size={16} className="text-green-500"/>}>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        <li><strong>Preço do Programa:</strong> {details.financialViability.programPrice}</li>
                        <li><strong>Receita Estimada/Turma:</strong> {details.financialViability.estimatedRevenuePerClass}</li>
                        <li><strong>Investimento Inicial:</strong> {details.financialViability.initialInvestment}</li>
                        <li><strong>Ponto de Equilíbrio (Break-even):</strong> {details.financialViability.breakEven}</li>
                         <li className="md:col-span-2"><strong>ROI em 3 Anos:</strong> <span className="font-bold text-xl text-green-700">{details.financialViability.roiIn3Years}</span></li>
                     </ul>
                </AccordionSection>
            </div>

            {/* CTAs */}
            <div className="mt-8 p-4 bg-white rounded-lg border grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Gerar Proposta (PDF)
                </button>
                 <button onClick={() => setIsCnpjModalOpen(true)} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors" style={{ backgroundColor: '#FF9900' }}>
                    CNPJs Impactados
                </button>
                 <button onClick={() => setIsActivationModalOpen(true)} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Ativar Programa
                </button>
            </div>
             <ChatWidget
                contextPrompt={chatContext}
                initialMessage={details ? "Olá! Estes são os detalhes do programa. O que mais você gostaria de saber?" : "Aguardando detalhes..."}
            />
        </div>
    );
};

export default ProgramDetailView;