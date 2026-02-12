
import React from 'react';
import { Loader2, AlertTriangle, RefreshCw, FileText, Link as LinkIcon, Lightbulb } from 'lucide-react';
import type { ResearchResult } from './perplexityService';

interface ResearchWidgetProps {
  result: ResearchResult | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const Badge: React.FC<{ text: string; colorClass: string }> = ({ text, colorClass }) => (
  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colorClass}`}>
    {text}
  </span>
);

export const ResearchWidget: React.FC<ResearchWidgetProps> = ({ result, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border">
        <Loader2 size={32} className="animate-spin text-blue-500" />
        <p className="mt-2 text-sm text-gray-500">Buscando inteligência...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 text-red-700 rounded-lg border border-red-200 p-4 text-center">
        <AlertTriangle size={32} className="mb-2" />
        <p className="font-semibold">Erro ao buscar pesquisa</p>
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={14} />
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!result) {
    return null; // Don't render anything if there's no result and not loading/error
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in border border-gray-200">
      <header className="flex justify-between items-start mb-3">
        <h3 className="text-md font-bold text-gray-800 flex items-center pr-4">
          <FileText size={18} className="text-blue-600 mr-2 shrink-0" />
          {result.title}
        </h3>
        <div className="flex space-x-2 shrink-0">
          <Badge text="Oportunidade" colorClass="bg-green-100 text-green-800" />
          <Badge text="Competitivo" colorClass="bg-blue-100 text-blue-800" />
        </div>
      </header>

      <p className="text-sm text-gray-600 mb-4">{result.summary}</p>

      <section className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <Lightbulb size={16} className="text-yellow-500 mr-2" />
          Insights Chave
        </h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm text-gray-700">
          {result.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <LinkIcon size={16} className="text-gray-500 mr-2" />
          Fontes
        </h4>
        <div className="flex flex-col space-y-1">
          {result.sources.map((source, index) => (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="text-xs text-blue-600 hover:underline truncate"
            >
              {source.title}
            </a>
          ))}
        </div>
      </section>

      <footer className="text-right text-xs text-gray-400 border-t pt-2 mt-2">
        Atualizado agora
      </footer>
    </div>
  );
};
