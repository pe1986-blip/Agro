import React, { useState } from 'react';
import { ChevronDown, Database, Server, Cloud, Bot, Code, Terminal, CloudCog, GitBranch, ShieldCheck, Zap, Layers, AlertTriangle, FileText, Users, GraduationCap, Users2, Lightbulb, Search, Globe } from 'lucide-react';

const CodeBlock: React.FC<{ language: string; children: string }> = ({ language, children }) => {
    // Basic syntax highlighting for demonstration
    const highlight = (code: string) => {
        return code
            .replace(/#.*$/gm, '<span class="text-gray-400">$&</span>') // comments
            .replace(/\b(gsutil|bq|load|gcloud|projects|create|services|enable|mb|cp|TRUNCATE|INSERT|INTO|AS|CURRENT_TIMESTAMP|INNER|ON|DISTINCT|SAFE_CAST|THEN|END|CASE|WHEN|WITH|UNION|ALL|CONCAT|CAST|FROM|WHERE|JOIN|GROUP BY|class|def|import|from|return|if|else|try|except|with|as|main|steps|call|args|uri|body|result|requests|py7zr|os|__name__|dd|pd|sqlalchemy|pl|const|async|function|await|new|return|for|of|console|log|SELECT|ORDER BY|ASC)\b/g, '<span class="text-purple-500">$&</span>') // keywords
            .replace(/\b(self|True|False|None)\b/g, '<span class="text-red-500">$&</span>') // built-ins
            .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="text-green-600">$&</span>') // strings
            .replace(/(\(|\)|\[|\]|\{|\}|:)/g, '<span class="text-yellow-500">$&</span>'); // brackets
    };

    return (
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-xs my-2">
            <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlight(children.trim()) }}></code>
        </pre>
    );
};

interface AccordionItemProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    isSubItem?: boolean;
    status?: 'Pending' | 'Done' | 'Planned';
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpen, onToggle, isSubItem = false, status }) => {
    const paddingClass = isSubItem ? 'p-2' : 'p-3';
    const titleClass = isSubItem ? 'text-sm' : 'text-base';
    const bgColor = isSubItem ? 'bg-blue-50/50 hover:bg-blue-100/50' : 'bg-white hover:bg-gray-50';

    const statusStyles = {
        Pending: { text: 'Pendente', bg: 'bg-yellow-100', textColor: 'text-yellow-800' },
        Done: { text: 'Concluído', bg: 'bg-green-100', textColor: 'text-green-800' },
        Planned: { text: 'Planejado', bg: 'bg-gray-100', textColor: 'text-gray-800' },
    };
    
    return (
        <div className={`rounded-lg border border-gray-200 shadow-sm mb-2 ${isSubItem ? 'bg-white' : ''}`}>
            <button
                onClick={onToggle}
                className={`w-full flex justify-between items-center text-left font-semibold text-gray-700 focus:outline-none ${paddingClass} ${bgColor}`}
                aria-expanded={isOpen}
            >
                <div className="flex items-center flex-grow min-w-0">
                    <div className={`flex items-center justify-center rounded-full mr-3 shrink-0 ${isSubItem ? 'w-7 h-7 bg-blue-100' : 'w-8 h-8 bg-gray-100'}`}>
                        {icon}
                    </div>
                    <span className={`${titleClass} truncate`}>{title}</span>
                </div>
                <div className="flex items-center gap-3 ml-2 shrink-0">
                    {status && (
                         <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusStyles[status].bg} ${statusStyles[status].textColor}`}>
                            {statusStyles[status].text}
                        </span>
                    )}
                    <ChevronDown
                        className={`transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>
            {isOpen && (
                <div className={`border-t border-gray-200 bg-gray-50/50 ${isSubItem ? 'p-3' : 'p-4'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

const StrategicRefinements = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const handleToggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

    const refinements = [
        {
            title: "Orquestração: Cloud Workflows",
            icon: <GitBranch size={16} className="text-indigo-500" />,
            content: (
                <>
                    <p className="text-xs text-gray-600 mb-2">Em vez de jobs isolados no Cloud Scheduler, usar o Cloud Workflows para orquestrar o pipeline de dados de ponta a ponta. Isso garante o gerenciamento de dependências, retentativas automáticas e um ponto central de monitoramento.</p>
                    <CodeBlock language="yaml">{`
# Exemplo de workflow.yaml
main:
  steps:
    - run_emec:
        call: http.post
        args:
            uri: https://.../sync_emec_to_bq
        result: emec_result
    - run_cnpj_after_emec:
        call: http.post
        args:
            uri: https://.../sync_cnpj_to_bq
        result: cnpj_result
    - run_analytics:
        # Só roda se os passos anteriores funcionarem
        call: http.post
        args:
            uri: https://.../refresh_analytics_views
                    `}</CodeBlock>
                </>
            )
        },
        {
            title: "Processamento: Padrão ELT",
            icon: <Zap size={16} className="text-yellow-500" />,
            content: (
                <>
                    <p className="text-xs text-gray-600 mb-2">Mover a lógica de transformação (T) do Python (Pandas) para dentro do BigQuery (SQL), adotando um padrão ELT (Extract, Load, Transform). As Cloud Functions devem apenas extrair e carregar os dados brutos, enquanto o BigQuery e o Dataform cuidam das transformações em escala.</p>
                </>
            )
        },
        {
            title: "Segurança: Secret Manager",
            icon: <ShieldCheck size={16} className="text-green-500" />,
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Armazenar todas as chaves de API (CNPJ.ws, Google Maps, etc.) no Google Secret Manager. As Cloud Functions recebem permissão via IAM para acessar os segredos, eliminando chaves de API do código-fonte.</p>
                    <CodeBlock language="python">{`
from google.cloud import secretmanager

def get_api_key(secret_id: str) -> str:
    """Recupera uma chave de API do Secret Manager."""
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/seu-projeto/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Uso:
# api_key = get_api_key("CNPJWS_API_KEY")
                    `}</CodeBlock>
                </>
            )
        },
        {
            title: "IA: Gemini com Function Calling",
            icon: <Bot size={16} className="text-purple-500" />,
            content: (
                <>
                    <p className="text-xs text-gray-600 mb-2">Evoluir o agente de IA de um "gerador de SQL" para um modelo que utiliza "Function Calling". O Gemini não escreve mais o SQL, mas invoca funções seguras e pré-definidas (ex: `buscar_dados_competitivos(municipio)`), que executam queries testadas e otimizadas no backend. Isso aumenta a segurança, confiabilidade e velocidade.</p>
                </>
            )
        },
         {
            title: "Frontend: Cloud Run & Looker Studio",
            icon: <Layers size={16} className="text-red-500" />,
            content: (
                <>
                    <p className="text-xs text-gray-600">Para dashboards, utilizar o Looker Studio conectado diretamente ao BigQuery para desenvolvimento rápido. Para APIs customizadas (ex: endpoint GeoJSON para o mapa), hospedar um microsserviço em Python/Flask ou Node.js no Cloud Run, que é serverless e escalável.</p>
                </>
            )
        }
    ];

    return (
        <div className="mb-4">
            {refinements.map((item, index) => (
                 <AccordionItem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    isSubItem
                    status="Done"
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};


export default function SpecificationPanel() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sections = [
        {
            title: "Refinamentos Estratégicos e Melhorias",
            icon: <CloudCog size={18} className="text-blue-600" />,
            content: <StrategicRefinements />,
            status: 'Done',
        },
        {
            title: "Widgets de Análise de Correlação (Camada 2 & 3)",
            icon: <Zap size={18} className="text-green-600" />,
            status: 'Done' as 'Done',
            content: (
                <>
                    <p className="text-xs text-gray-600 mb-4">Estes widgets são projetados para cruzar dados de fontes diferentes, gerando os insights centrais da plataforma ao conectar a demanda do agronegócio com a oferta educacional.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Widget: PIB Agrícola per Capita vs. IDEB</h4>
                    <p className="text-xs text-gray-600 mb-2"><strong>Tipo:</strong> Gráfico de Dispersão (Scatter Plot). Cruza a riqueza do agro (PIB Agro / População) com a qualidade da educação (IDEB/Enade), permitindo identificar outliers e oportunidades.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Widget: Balanço de Vagas (Caged) vs. Formados (Censo)</h4>
                    <p className="text-xs text-gray-600 mb-2"><strong>Tipo:</strong> Gráfico de Barras Agrupadas. Visualiza o 'gap' de mercado para cargos-chave, comparando o saldo de vagas do Caged com o número de formandos do Censo INEP.</p>
        
                    <h4 className="font-semibold text-sm mb-1 mt-3">Widget: Nível Tecnológico vs. Qualificação Educacional</h4>
                    <p className="text-xs text-gray-600 mb-2"><strong>Tipo:</strong> Gráfico de Radar. Compara um município com a média nacional em eixos como tecnologia no campo (% de área irrigada), segurança climática (ZARC), e qualificação da mão de obra (alunos em cursos agro, nota CAPES).</p>
                </>
            )
        },
        {
            title: "Pipeline A: Dicionário de CNPJs (Receita Federal)",
            icon: <FileText size={18} className="text-cyan-600" />,
            status: 'Done',
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Este pipeline constrói a base de consulta de empresas, processando os dados abertos da Receita Federal para criar uma tabela que transforma um CNPJ em Razão Social, CNAE e localização.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 1: Extração (Resultado - A Fonte)</h4>
                     <ul className="list-disc list-inside text-xs text-gray-600 mb-2 space-y-1 pl-2">
                        <li><strong>Fonte Principal:</strong> Cadastro Nacional da Pessoa Jurídica - CNPJ.</li>
                        <li><strong>Link para Download:</strong> <a href="https://dados.gov.br/dados/conjuntos-dados/cadastro-nacional-da-pessoa-juridica---cnpj" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://dados.gov.br/.../cnpj</a></li>
                        <li><strong>Arquivos a Baixar:</strong> .zip de "Empresas", "Estabelecimentos" e "Cnaes".</li>
                    </ul>

                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 2: Transformação (Resultado - O Script)</h4>
                     <p className="text-xs text-gray-600 mb-2">Processamento de dados massivos (17GB+) com Polars para performance.</p>
                    <CodeBlock language="python">{`
import polars as pl
import os

# --- Configurações ---
DATA_PATH = "./rfb_raw_data/" # Pasta onde você descompactou os zips da RFB
OUTPUT_FILE = "dim_empresas_completo.parquet"
MUNICIPIOS_CONVERSAO_CSV = "municipios_rfb_para_ibge.csv" 

def processar_dados_rfb(data_path: str, output_file: str, conversao_path: str):
    """
    Processa os dados abertos da RFB usando Polars para criar
    um 'dicionário de CNPJs' otimizado.
    """
    print("Iniciando processamento dos dados da RFB...")
    # ... (lógica de carregamento e junção com Polars)
    df_estab = pl.read_csv(os.path.join(data_path, "ESTABELECIMENTOS.csv"), separator=";", encoding="latin1", columns=["CNPJ_BASICO", "CNPJ_ORDEM", "CNPJ_DV", "CNAE_FISCAL_PRINCIPAL", "CODIGO_MUNICIPIO"], schema_overrides={"CODIGO_MUNICIPIO": pl.Utf8})
    df_empresas = pl.read_csv(os.path.join(data_path, "EMPRESAS.csv"), separator=";", encoding="latin1", columns=["CNPJ_BASICO", "RAZAO_SOCIAL"], schema_overrides={"CNPJ_BASICO": pl.Utf8})
    df_cnae = pl.read_csv(os.path.join(data_path, "CNAES.csv"), separator=";", encoding="latin1", columns=["CNAE", "DESCRICAO"], schema_overrides={"CNAE": pl.Utf8})
    df_municipios = pl.read_csv(conversao_path, schema_overrides={"municipio_codigo_rfb": pl.Utf8, "municipio_codigo_ibge": pl.Int64})

    df_estab = df_estab.with_columns(pl.concat_str([pl.col("CNPJ_BASICO"), pl.col("CNPJ_ORDEM"), pl.col("CNPJ_DV")]).alias("cnpj_completo"))
    df_final = df_estab.join(df_empresas, on="CNPJ_BASICO", how="left")
    df_final = df_final.join(df_cnae, left_on="CNAE_FISCAL_PRINCIPAL", right_on="CNAE", how="left")
    df_final = df_final.join(df_municipios, left_on="CODIGO_MUNICIPIO", right_on="municipio_codigo_rfb", how="left")

    df_final = df_final.select(
        pl.col("cnpj_completo"),
        pl.col("RAZAO_SOCIAL").alias("razao_social"),
        pl.col("CNAE_FISCAL_PRINCIPAL").alias("cnae_principal_codigo"),
        pl.col("DESCRICAO").alias("cnae_principal_descricao"),
        pl.col("municipio_codigo_ibge")
    )
    df_final.write_parquet(output_file, compression="snappy")
    print(f"Sucesso! Dicionário de CNPJs criado.")

if __name__ == "__main__":
    if os.path.exists(MUNICIPIOS_CONVERSAO_CSV):
        processar_dados_rfb(DATA_PATH, OUTPUT_FILE, MUNICIPIOS_CONVERSAO_CSV)
    else:
        print(f"Atenção: Arquivo de conversão de municípios não encontrado.")
                    `}</CodeBlock>

                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 3: Carga (Resultado - O Schema)</h4>
                    <p className="text-xs text-gray-600 mb-2">Schema SQL para a tabela de dimensão que armazena os dados processados para consulta rápida.</p>
                    <CodeBlock language="sql">{`
-- Criação da Tabela Dimensão de Empresas (Dicionário de CNPJs)
CREATE TABLE IF NOT EXISTS dim_empresas (
    cnpj_completo VARCHAR(14) PRIMARY KEY NOT NULL, -- O CNPJ de 14 dígitos
    razao_social TEXT NOT NULL,
    cnae_principal_codigo BIGINT NOT NULL,
    cnae_principal_descricao TEXT,
    municipio_codigo_ibge INT,
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para buscar empresas em um município (essencial para o Caged)
CREATE INDEX IF NOT EXISTS idx_empresas_municipio_ibge ON dim_empresas (municipio_codigo_ibge);
-- Índice para buscar empresas por setor (CNAE)
CREATE INDEX IF NOT EXISTS idx_empresas_cnae ON dim_empresas (cnae_principal_codigo);
                    `}</CodeBlock>
                </>
            )
        },
        {
            title: "Pipeline B: Ranking de Contratantes (Microdados Caged)",
            icon: <Users2 size={18} className="text-orange-600" />,
            status: 'Done',
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Este pipeline processa os microdados brutos do Caged para identificar e ranquear os CNPJs que mais admitiram para um cargo (CBO) específico em cada município.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 1: Extração</h4>
                    <p className="text-xs text-gray-600 mb-2">Reutiliza os mesmos arquivos de microdados brutos do Caged baixados pelo "Pipeline de Dados de Emprego".</p>

                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 2: Transformação (Resultado - O Script "Top 10")</h4>
                    <p className="text-xs text-gray-600 mb-2">Script em Polars que processa os dados brutos e utiliza uma "Window Function" para ranquear os top 10 contratantes por cargo e cidade.</p>
                    <CodeBlock language="python">{`
import polars as pl
import os

MICRODADOS_PATH = "./caged_raw/"
OUTPUT_FILE = "caged_top_contratantes.parquet"
FILTRO_CBO_AGRO = ['222110', '321105', '641010'] # Lista simplificada

def processar_caged_top_contratantes(data_path: str, output_file: str, filtro_cbo: list):
    print("Iniciando processamento do Caged (Top Contratantes)...")
    try:
        df_caged = pl.scan_csv(os.path.join(data_path, "*.txt"), separator=";", encoding="latin1", schema_overrides={"municipio": pl.Utf8, "cbo2002ocupacao": pl.Utf8, "cnpjcei": pl.Utf8})
        
        df_processado = (
            df_caged
            .filter(pl.col("tipomovimentacao") == 1) 
            .filter(pl.col("cbo2002ocupacao").is_in(filtro_cbo))
            .group_by(["municipio", "cbo2002ocupacao", "cnpjcei"])
            .agg(pl.count().alias("total_admissoes_mes"))
        )
        
        df_ranking = (
            df_processado
            .with_columns(
                pl.col("total_admissoes_mes")
                .rank("dense", descending=True)
                .over(["municipio", "cbo2002ocupacao"]) 
                .alias("ranking_mes")
            )
            .filter(pl.col("ranking_mes") <= 10)
        )
        
        df_final = df_ranking.collect()
        df_final = df_final.rename({
            "municipio": "municipio_codigo_ibge",
            "cbo2002ocupacao": "cbo_ocupacao",
            "cnpjcei": "cnpj_completo"
        })
        df_final.write_parquet(output_file, compression="snappy")
        print("Sucesso! Ranking de contratantes salvo.")
    except Exception as e:
        print(f"Erro no processamento do Caged (Pipeline B): {e}")

if __name__ == "__main__":
    processar_caged_top_contratantes(MICRODADOS_PATH, OUTPUT_FILE, FILTRO_CBO_AGRO)
                    `}</CodeBlock>

                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 3: Carga (Resultado - O Schema da Tabela de Fatos)</h4>
                    <p className="text-xs text-gray-600 mb-2">Schema da tabela "fato" que armazena os CNPJs ranqueados, pronta para ser consultada pela API.</p>
                     <CodeBlock language="sql">{`
-- Criação da Tabela Fato de Demanda Caged por CNPJ
CREATE TABLE IF NOT EXISTS demanda_caged_top_cnpjs (
    id SERIAL PRIMARY KEY,
    municipio_codigo_ibge INT NOT NULL,
    -- ano_mes DATE NOT NULL, -- (A ser adicionado)
    cbo_ocupacao BIGINT NOT NULL,
    cnpj_completo VARCHAR(14) NOT NULL,
    total_admissoes_mes INT NOT NULL,
    ranking_mes INT NOT NULL,
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (municipio_codigo_ibge, cbo_ocupacao, cnpj_completo) -- (Ajustar para incluir ano_mes)
);

-- Índice principal para o widget da API
CREATE INDEX IF NOT EXISTS idx_caged_cnpj_widget
ON demanda_caged_top_cnpjs (municipio_codigo_ibge, cbo_ocupacao);

-- Índice para buscar uma empresa específica
CREATE INDEX IF NOT EXISTS idx_caged_cnpj_empresa
ON demanda_caged_top_cnpjs (cnpj_completo);
                    `}</CodeBlock>
                </>
            )
        },
        {
            title: "Pipeline C: Monitoramento de Vagas Online (Real-time)",
            icon: <Search size={18} className="text-green-600" />,
            status: 'Planned',
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Enquanto o Caged olha para o passado (emprego formal), este pipeline captura a demanda futura (intenção de contratação) analisando vagas abertas em tempo real.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Estratégia de Coleta</h4>
                    <ul className="list-disc list-inside text-xs text-gray-600 mb-2 space-y-1 pl-2">
                        <li><strong>Bright Data (Scraping):</strong> Coleta massiva de dados do LinkedIn para identificar "Hard Skills" emergentes que não estão no CBO (ex: "Piloto de Drone Agras T40").</li>
                        <li><strong>APIs Oficiais (Indeed/Glassdoor/Adzuna):</strong> Ingestão estruturada de volume de vagas e faixas salariais ofertadas.</li>
                        <li><strong>Google Cloud Talent Solution:</strong> API do Google para normalizar títulos de vagas e skills (ex: agrupar "Dev. Python" e "Programador Backend Python").</li>
                    </ul>

                    <h4 className="font-semibold text-sm mb-1 mt-3">Exemplo de Coleta (Conceitual)</h4>
                    <CodeBlock language="python">{`
import requests

# Exemplo simplificado de consulta à API do Adzuna (Job Aggregator)
def buscar_vagas_agro(municipio, app_id, app_key):
    url = "https://api.adzuna.com/v1/api/jobs/br/search/1"
    params = {
        "app_id": app_id,
        "app_key": app_key,
        "what": "agronomia tecnologia", # Keywords
        "where": municipio,
        "content-type": "application/json"
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()['results']
    return []

# O dado bruto é então enviado para o Google Cloud Talent para normalização
# antes de ser salvo no BigQuery.
                    `}</CodeBlock>
                </>
            )
        },
        {
            title: "Pipeline de Dados de Emprego (Novo Caged)",
            icon: <Users size={18} className="text-teal-500" />,
            status: 'Done',
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Este pipeline é crítico para a Camada 3, processando os microdados de emprego do governo para gerar indicadores de demanda por habilidades.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 1: Extração (Download dos Dados)</h4>
                    <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md border italic mb-2">
                        <strong>Prompt 1 (AI Studio):</strong> "Preciso dos dados mais recentes do Novo Caged. Qual é o link oficial para baixar os microdados brutos mensais?"
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md border italic mb-2">
                        <strong>Prompt 2 (AI Studio):</strong> "Escreva um script Python com `requests` e `py7zr` para baixar o arquivo do link [...], salvar como caged.7z, e descompactar para a pasta ./caged_raw."
                    </div>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 2: Transformação (Filtrando Dados do Agro)</h4>
                    <p className="text-xs text-gray-600 mb-2">Esta é a etapa mais importante, onde transformamos milhões de linhas de dados brutos em dados agregados e filtrados apenas para o agronegócio por município.</p>
                    <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md border italic mb-2">
                        <strong>Prompt 3 (AI Studio):</strong> "Para filtrar os dados do Caged, preciso das listas de códigos do Agronegócio para CNAE (Subclasses) e CBO (Ocupações), divididos entre 'Dentro', 'Antes' e 'Depois' da porteira."
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md border italic mb-2 mt-3">
                        <strong>Prompt 4 (AI Studio):</strong> "Escreva um script Python usando pandas para processar o arquivo CAGEDMOV.txt. O script deve: definir as listas de filtros, carregar o arquivo, filtrar por CNAE e CBO do agro, agrupar por município, cnae e cbo, calcular o saldo de vagas e salvar em caged_agro_agregado.csv."
                    </div>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 3: Carga (Load) e Banco de Dados</h4>
                    <p className="text-xs text-gray-600 mb-2">Com o arquivo CSV agregado pronto, o próximo passo é carregá-lo de forma permanente e eficiente no banco de dados da plataforma.</p>
                    <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md border italic mb-2">
                        <strong>Prompt 6 (AI Studio):</strong> "Crie o schema SQL (CREATE TABLE) para PostgreSQL para uma tabela chamada demanda_caged_agro. Ela deve ter as colunas: id, municipio_codigo_ibge, ano_mes, cnae_subclasse, cbo_ocupacao, saldo_vagas. Adicione índices compostos e uma chave de unicidade."
                    </div>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 4: API e Widgets (Camada de Inteligência)</h4>
                     <p className="text-xs text-gray-600 mb-2">Esta fase usa os dados agora disponíveis no banco para alimentar os widgets e gerar insights cruzados.</p>
                </>
            )
        },
        {
            title: "Pipeline de Oferta de Cursos (Ensino Superior)",
            icon: <GraduationCap size={18} className="text-indigo-500" />,
            status: 'Done',
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Esta é a segunda metade da Camada 3, focada em mapear a oferta de cursos de Graduação e Pós-graduação (Latu e Stricto Sensu) para cruzar com os dados de demanda.</p>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 1: Mapeamento e Extração (Fontes Mapeadas)</h4>
                    
                    <h5 className="font-semibold text-xs mb-1 mt-2">1.1. Graduação e Pós Latu Sensu (A Fonte "Massa")</h5>
                    <ul className="list-disc list-inside text-xs text-gray-600 mb-2 space-y-1 pl-2">
                        <li><strong>Fonte Principal:</strong> INEP - Microdados do Censo da Educação Superior.</li>
                        <li><strong>Onde Encontrar:</strong> Portal oficial do INEP (gov.br), que hospeda os microdados anuais completos.</li>
                    </ul>
                    <h5 className="font-semibold text-xs mb-1 mt-4">1.2. Pós Stricto Sensu (A Fonte "Estratégica")</h5>
                     <ul className="list-disc list-inside text-xs text-gray-600 mb-2 space-y-1 pl-2">
                        <li><strong>Fonte Principal:</strong> Portal de Dados Abertos da CAPES.</li>
                        <li><strong>Dado-Chave ("O Ouro"):</strong> Esta fonte contém a <strong>Nota de Avaliação da CAPES</strong> (3 a 7), um indicador de qualidade crucial.</li>
                    </ul>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 2: Transformação (O Filtro de Inteligência "Agro")</h4>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 3: Carga (Load) e Banco de Dados</h4>
                    
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 4: API e Widgets (Conectando Demanda e Oferta)</h4>
                </>
            )
        },
        {
            title: "Pipeline de Pós-Graduação Stricto Sensu (CAPES)",
            icon: <GraduationCap size={18} className="text-purple-600" />,
            status: 'Done',
            content: (
                 <>
                    <p className="text-xs text-gray-600 mb-2">Este pipeline é crucial para adicionar o indicador de qualidade (nota CAPES) e mapear a oferta de cursos de P&D (Mestrado/Doutorado).</p>
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 1: Extração</h4>
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 2: Transformação</h4>
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 3: Carga</h4>
                    <h4 className="font-semibold text-sm mb-1 mt-3">Fase 4: API e Widgets</h4>
                     <h5 className="font-semibold text-xs mb-1 mt-2">Lógica de Back-end (Entregável)</h5>
                     <p className="text-xs text-gray-600 mb-2">Esta lógica enriquece a API de comparação com indicadores de qualidade da Pós-Graduação, essenciais para análises de P&D e inovação.</p>
                     <CodeBlock language="python">{`
# No endpoint /api/v1/comparar-indicadores
query_stricto = await db.execute(
    select(
        func.count(oferta_cursos_superior_agro.c.id).label("total_programas"),
        func.avg(oferta_cursos_superior_agro.c.nota_capes).label("media_nota")
    ).where(
        oferta_cursos_superior_agro.c.municipio_codigo_ibge == mun_ibge_code,
        oferta_cursos_superior_agro.c.curso_nivel.in_(['Mestrado', 'Doutorado'])
    )
)
stricto_data = query_stricto.first()

resultado["total_programas_stricto_agro"] = stricto_data.total_programas or 0
resultado["media_nota_capes"] = round(stricto_data.media_nota, 2) if stricto_data.media_nota else 0
                    `}</CodeBlock>
                </>
            )
        },
        {
            title: "Chat com IA (Gemini)",
            icon: <Bot size={18} className="text-purple-500" />,
            status: 'Done',
            content: (
                <>
                    <h4 className="font-semibold text-sm mb-1">Exemplo de Prompt de Sistema</h4>
                     <p className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md border italic">
                        "Você é um assistente especializado em inteligência de mercado educacional brasileiro. Seu objetivo é ajudar a analisar dados sobre instituições, identificar oportunidades e comparar concorrentes. Responda sempre em português com base nos dados disponíveis nas tabelas e views do BigQuery."
                    </p>
                    <h4 className="font-semibold text-sm mb-1 mt-3">Lógica de Processamento</h4>
                    <p className="text-xs text-gray-600 mb-2">A abordagem inicial é fazer com que o Gemini gere queries SQL dinamicamente. Uma evolução recomendada para produção é usar **Function Calling**, onde o Gemini invoca funções seguras e pré-definidas no backend.</p>
                </>
            )
        },
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-center mb-4 text-blue-800">Especificação Técnica da Plataforma</h2>
            {sections.map((section, index) => (
                <AccordionItem
                    key={index}
                    title={section.title}
                    icon={section.icon}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    status={section.status as 'Pending' | 'Done' | 'Planned' | undefined}
                >
                    {section.content}
                </AccordionItem>
            ))}
        </div>
    );
}