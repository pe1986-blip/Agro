
import React, { useMemo, useState } from 'react';
import { getDataQualityReport } from './services/governanceService';
import { ShieldCheck, Info, Database, AlertCircle, ExternalLink, ChevronDown } from 'lucide-react';
import type { MunicipioPerfil } from './types';

const DataQualityWidget: React.FC<{ municipio: MunicipioPerfil }> = ({ municipio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const report = useMemo(() => getDataQualityReport(municipio), [municipio]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'A': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'B': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-fade-in mb-6">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-black text-xl shadow-inner ${getStatusColor(report.status)}`}>
            {report.status}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-1.5">
              Integridade dos Dados
              <ShieldCheck size={16} className="text-emerald-500" />
            </h3>
            <p className="text-xs text-gray-500">Score de Confiança: <span className="font-bold">{report.overallScore}%</span> • {report.lineage.length} fontes mapeadas</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {report.anomalies.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full animate-pulse">
              <AlertCircle size={10} /> {report.anomalies.length} ALERTA(S)
            </span>
          )}
          <ChevronDown size={20} className={`text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t bg-gray-50 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Linhagem */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Database size={10} /> Data Lineage (Origem)
              </h4>
              <div className="space-y-1.5">
                {report.lineage.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs bg-white p-2 rounded border border-gray-200">
                    <div>
                      <span className="font-bold text-gray-700">{item.metric}</span>
                      <p className="text-[10px] text-gray-400">{item.source} ({item.version})</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-emerald-600">{(item.confidence * 100).toFixed(0)}%</span>
                      <p className="text-[9px] text-gray-400 italic">Atu. {item.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anomalias */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <AlertCircle size={10} /> Análise de Drift & Qualidade
              </h4>
              {report.anomalies.length > 0 ? (
                <div className="space-y-2">
                  {report.anomalies.map((ano, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-100 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-red-700 text-xs">{ano.metric}</span>
                        <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 rounded border border-red-100">{ano.variation}%</span>
                      </div>
                      <p className="text-[11px] text-red-600 leading-tight">{ano.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-center justify-center text-center h-[140px]">
                  <div>
                    <Info size={24} className="text-emerald-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-emerald-700">Consistência Validada</p>
                    <p className="text-[10px] text-emerald-600 mt-1">Nenhuma anomalia detectada nos dados deste município.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t flex justify-between items-center text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><Info size={10} /> Algoritmo de auditoria v2.4 (GCP Data Catalog Proxy)</span>
            <button className="text-blue-600 font-bold hover:underline flex items-center gap-0.5">
              Explicar esta métrica <ExternalLink size={10} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataQualityWidget;
