import React from 'react';
import { Layers, GitBranch, Bot, BarChart3, Database, Cpu, BrainCircuit, Users2, FileJson, GraduationCap } from 'lucide-react';

const Phase = ({ title, icon, status, children }: { title: string, icon: React.ReactNode, status?: 'Pending' | 'Done' | 'Planned', children?: React.ReactNode }) => {
    const statusStyles = {
        Pending: { text: 'Pendente', bg: 'bg-yellow-100', textColor: 'text-yellow-800', borderColor: 'border-yellow-200' },
        Done: { text: 'Concluído', bg: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-200' },
        Planned: { text: 'Planejado', bg: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-200' },
    };
    
    return (
        <div className="mb-6 relative pl-8">
            <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full border-2 border-white shadow-sm">
                {icon}
            </div>
            <div className="ml-4">
                 <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-md font-bold text-gray-800">{title}</h3>
                    {status && (
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusStyles[status].bg} ${statusStyles[status].textColor}`}>
                            {statusStyles[status].text}
                        </span>
                    )}
                </div>
                <div className={`space-y-3 text-sm text-gray-600 border-l-2 ${status ? statusStyles[status].borderColor : 'border-blue-100'} pl-6 py-2`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const Step = ({ title, description }: { title: string, description:string }) => (
     <div className="relative">
        <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
        <p className="font-semibold text-gray-700">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
    </div>
);

const Pillar = ({ title, icon, description }: { title: string, icon: React.ReactNode, description: string }) => (
    <div className="flex items-start p-3 bg-white rounded-lg border">
        <div className="mr-3 text-blue-600 shrink-0">{icon}</div>
        <div>
            <h4 className="font-semibold text-sm text-gray-800">{title}</h4>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    </div>
);


export default function RoadmapPanel() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-bold text-center mb-6 text-blue-800">Arquitetura e Roteiro de Implementação</h2>
      
      <div className="p-2 mb-8">
          <h3 className="text-md font-bold text-gray-800 mb-3 text-center">A Arquitetura Final</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Pillar title="Fundação (Seus Dados)" icon={<Database size={24} />} description="A 'tb_matriz_municipal_completa' e os dados do e-MEC (incluindo o novo market share por IES) formam a base." />
              <Pillar title="O 'Robô' de Dados (Pipelines)" icon={<Cpu size={24} />} description="Pipelines ELT automatizados para coletar dados do IBGE, Receita Federal, Empregos (LinkedIn) e Uso da Terra (CAR/Embrapa)." />
              <Pillar title="O 'Cérebro' (API Híbrida)" icon={<BrainCircuit size={24} />} description="Uma API em Cloud Run que serve tanto relatórios de IA via Gemini (/chat) quanto dados estruturados (/api/...) para os dashboards." />
              <Pillar title="A 'Face' (Frontend Interativo)" icon={<Users2 size={24} />} description="Um dashboard com mapa interativo e gráficos dinâmicos, combinado com o chatbot 'RogerLens' para análises profundas." />
          </div>
      </div>
      
      <div className="p-2">
        <Phase title="Fase 1: Setup da Fundação" status="Done" icon={<Layers size={18} className="text-blue-600" />}>
            <Step title="Criar Projeto GCP & Schemas BQ" description="Setup inicial do projeto, APIs, buckets e datasets (educacao, agro_negocio, staging, analises)." />
            <Step title="Carga de Bootstrap" description="Carregar o CSV 'Matriz Completa' na tabela principal para ter dados base." />
            <Step title="Criar Tabela de Market Share" description="Criar a nova tabela 'educacao.tb_competidores_market_share' para desagregar os dados por IES, essencial para os gráficos de concorrência." />
        </Phase>

        <Phase title="Fase 2: Implementação dos Pipelines de Dados" status="Done" icon={<GitBranch size={18} className="text-blue-600" />}>
            <Step title="Pipeline da RFB (Prioridade Máxima)" description="Construir o 'Dicionário de CNPJs' processando o dump de dados da RFB para conectar vagas a empresas." />
            <Step title="Pipeline de Contratantes (Caged Microdata)" description="Implementar o pipeline para processar microdados brutos do Caged, ranqueando os CNPJs que mais contratam para cargos específicos." />
            <Step title="Pipeline do Novo Caged (Empregos)" description="Implementar o pipeline ELT para processar microdados de emprego do Caged, enriquecendo a análise de demanda por habilidades." />
            <Step title="Pipeline de Oferta de Cursos (INEP/CAPES)" description="Fontes de dados do INEP (Censo) e CAPES (Stricto Sensu) mapeadas. Próximo passo é desenvolver os scripts de extração e transformação." />
            <Step title="Pipelines de Cloud Functions (IBGE & LinkedIn)" description="Implementar as funções Python, configurar Secret Manager e agendar execuções com Cloud Scheduler." />
            <Step title="Pipeline de Arquivos (CAR/Embrapa)" description="Processo de download manual, upload para o GCS e carga no BigQuery com scripts SQL e bq load." />
             <Step title="Atualizar Pipeline e-MEC" description="Garantir que o pipeline do e-MEC seja robusto para popular a nova tabela 'tb_competidores_market_share'." />
        </Phase>

        <Phase title="Fase 3: Criação do Cérebro (API Híbrida)" status="Done" icon={<Bot size={18} className="text-blue-600" />}>
            <Step title="Criar a View Mestra" description="Executar o script da 'vw_ranking_oportunidade_agro' no BigQuery para consolidar os dados." />
            <Step title="Desenvolver Endpoints de Dados (JSON)" description="Atualizar a API para incluir indicadores da CAPES e criar o endpoint de detalhes (`/api/v1/municipio-detalhes`) que conecta Demanda (Caged) e Oferta (Censo/CAPES) para alimentar o Widget de 'Gap de Competências'." />
            <Step title="Manter Endpoint do Chat (AI)" description="O endpoint '/chat' existente continuará a fornecer relatórios qualitativos gerados pelo Gemini."/>
            <Step title="Deploy da Nova Versão no Cloud Run" description="Atualizar o serviço no Cloud Run com a nova API que inclui os endpoints de dados e de chat." />
        </Phase>

        <Phase title="Fase 4: O Rosto (Frontend Interativo)" status="Done" icon={<BarChart3 size={18} className="text-blue-600" />}>
             <Step title="Desenvolver Dashboard Comparativo" description="Construir o painel de análise comparativa, integrando os novos dados de emprego (Caged)." />
             <Step title="Construir Widget 'Gap de Competências'" description="Desenvolver o widget que cruzará dados de Caged, Censo/INEP, CAPES e LinkedIn, garantindo a geração de insights completos." />
             <Step title="Criar Widget 'Mapa de Competidores'" description="Desenvolver a tabela que materializa a análise de concorrência educacional, utilizando os dados do pipeline de oferta de cursos." />
             <Step title="Criar Widget 'PIB Agro vs. Educação'" description="Desenvolver o gráfico de dispersão (scatter plot) para correlacionar a riqueza agrícola com a qualidade da educação." />
             <Step title="Criar Widget 'Balanço Vagas vs. Formados'" description="Desenvolver o gráfico de barras agrupadas para visualizar o gap entre a demanda do Caged e a oferta do Censo." />
             <Step title="Criar Widget 'Tecnologia vs. Qualificação'" description="Desenvolver o gráfico de radar para comparar o nível tecnológico do município com a qualificação da mão de obra local." />
             <Step title="Integrar Mapa com API e Dashboard" description="Implementar a lógica no frontend para gerenciar seleção de múltiplos marcadores e popular os gráficos com dados JSON." />
             <Step title="Manter Interface do Chat" description="A interface do 'RogerLens' continuará a usar o endpoint '/chat' para as análises em linguagem natural." />
        </Phase>
      </div>
    </div>
  );
}