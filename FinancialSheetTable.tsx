import React, { useMemo, useState, useRef } from 'react';
import { SheetData, YEARS, GlobalFinancialConfig } from './types';
import { getBenchmarksForSheet, validateInput, ValidationResult } from './services/marketBenchmarkService';
import { formatNumber } from './constants';
import { Wand2, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface FinancialSheetTableProps {
  sheet: SheetData;
  onUpdate: (updatedSheet: SheetData) => void;
  recalculate: (sheet: SheetData) => SheetData;
  globalConfig?: GlobalFinancialConfig | null;
}

interface EditState {
    rowId: string;
    yearIdx: number;
    value: string;
}

const FinancialSheetTable: React.FC<FinancialSheetTableProps> = ({ sheet, onUpdate, recalculate, globalConfig }) => {
  const [editState, setEditState] = useState<EditState | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Estados para Drag-to-Scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const benchmarks = useMemo(() => getBenchmarksForSheet(sheet.id), [sheet.id]);

  // --- LÓGICA DE DRAG-TO-SCROLL ---
  const handleMouseDown = (e: React.MouseEvent) => {
    // Não inicia drag se estiver clicando em um input de edição
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    
    setIsDragging(true);
    if (scrollContainerRef.current) {
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador de velocidade
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const commitValue = (rowId: string, yearIdx: number, valueStr: string) => {
      const normalizedValue = valueStr.replace(',', '.');
      const numValue = parseFloat(normalizedValue);
      const safeValue = isNaN(numValue) ? 0 : numValue;
      updateSheetValue(rowId, yearIdx, safeValue);
      setEditState(null);
  };

  const updateSheetValue = (rowId: string, yearIdx: number, value: number) => {
    const newSheet = JSON.parse(JSON.stringify(sheet)) as SheetData;
    const row = newSheet.rows.find(r => r.id === rowId);
    if (row) {
      row.values[YEARS[yearIdx]] = value;
      const calculatedSheet = recalculate(newSheet);
      onUpdate(calculatedSheet);
    }
  };

  const handleAutoFix = (rowId: string, yearIdx: number) => {
      let targetValue = 0;
      if (rowId === 'ticket') targetValue = benchmarks.ticket.avg;
      if (rowId === 'students_per_unit' || rowId === 'students_per_product') targetValue = benchmarks.studentsPerUnit.avg;
      if (rowId === 'capex_construction') targetValue = benchmarks.capexPerUnit.avg;
      if (targetValue > 0) updateSheetValue(rowId, yearIdx, targetValue);
  };

  const applySmartAction = (rowId: string, startColIdx: number, value: number, type: 'copy' | 'growth') => {
      const newSheet = JSON.parse(JSON.stringify(sheet)) as SheetData;
      const row = newSheet.rows.find(r => r.id === rowId);
      if (row) {
          row.values[YEARS[startColIdx]] = value;
          for (let i = startColIdx + 1; i < YEARS.length; i++) {
              let newVal = value;
              if (type === 'growth') {
                  const distance = i - startColIdx;
                  const growthRate = globalConfig ? (1 + (globalConfig.inflationRate + 2)/100) : 1.05;
                  newVal = value * Math.pow(growthRate, distance);
              }
              const finalVal = (row.id.includes('students') || row.id.includes('units') || row.id.includes('volume') || row.id.includes('contracts')) 
                ? Math.round(newVal) : Number(newVal.toFixed(2));
              row.values[YEARS[i]] = finalVal;
          }
          const calculatedSheet = recalculate(newSheet);
          onUpdate(calculatedSheet);
          setEditState(null);
      }
  };

  const checkValidation = (rowId: string, value: number): ValidationResult => {
      if (rowId === 'ticket') return validateInput(value, benchmarks.ticket);
      if (rowId === 'students_per_unit' || rowId === 'students_per_product') return validateInput(value, benchmarks.studentsPerUnit);
      if (rowId === 'capex_construction') return validateInput(value, benchmarks.capexPerUnit);
      return { status: 'ok' };
  };

  return (
    <div className="relative pb-12 select-none">
        <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl shadow-sm bg-white cursor-grab active:cursor-grabbing transition-shadow duration-300 ${isDragging ? 'shadow-inner' : ''}`}
        >
        <table className="w-full text-xs border-collapse pointer-events-auto">
            <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                <th className="p-3 text-left font-black min-w-[200px] sticky left-0 bg-slate-50 z-20 border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                Indicador
                </th>
                {YEARS.map((year, idx) => (
                <th key={year} className="p-3 text-right min-w-[120px] font-black border-r border-slate-100 last:border-r-0">
                    Ano {idx + 1}
                </th>
                ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {sheet.rows.map((row) => {
                if (row.isHeader) {
                return (
                    <tr key={row.id} className="bg-slate-100/50">
                    <td colSpan={YEARS.length + 1} className="p-3 font-black text-slate-700 uppercase tracking-widest text-[10px] sticky left-0 z-10 bg-slate-100/80 backdrop-blur-sm">
                        {row.label}
                    </td>
                    </tr>
                );
                }

                const isTotal = row.id === 'ebitda' || row.id === 'cashFlow' || row.id === 'netRevenue';
                const isBottomLine = row.id === 'cashFlowAccum';
                
                return (
                <tr key={row.id} className={`hover:bg-blue-50/30 transition-colors ${isTotal ? 'bg-slate-50/80 font-bold' : ''} ${isBottomLine ? 'bg-slate-100 font-black border-t-2 border-slate-200' : ''}`}>
                    <td className="p-2 pl-3 text-slate-600 font-medium sticky left-0 bg-white z-10 border-r border-slate-100 truncate shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                    {row.label}
                    </td>
                    {YEARS.map((year, idx) => {
                    const val = row.values[year];
                    const isEditing = editState?.rowId === row.id && editState?.yearIdx === idx;
                    let displayVal = isEditing ? editState.value : (row.isPercentage ? (val * 100).toFixed(1) + '%' : (row.isCurrency ? formatNumber(val) : val.toLocaleString('pt-BR')));
                    let valueToPropagate = val;
                    if (isEditing && editState && editState.value !== '') {
                        const parsed = parseFloat(editState.value.replace(',', '.'));
                        if (!isNaN(parsed)) valueToPropagate = parsed;
                    }
                    const isNegative = val < 0;
                    const textColor = isNegative ? 'text-red-500' : (isTotal || isBottomLine ? 'text-slate-800' : 'text-slate-600');
                    const validation = checkValidation(row.id, val);
                    const isWarning = validation.status !== 'ok';

                    return (
                        <td key={year} className="p-1 text-right relative group/cell border-r border-slate-50 last:border-r-0 hover:bg-blue-50 transition-colors">
                        {row.isEditable ? (
                            <div className="relative h-full flex items-center justify-end">
                                <input 
                                    type="text" 
                                    className={`w-full text-right bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded px-1 py-1 outline-none font-bold ${textColor} focus:bg-white focus:shadow-sm transition-all ${isWarning ? 'pr-6' : ''}`}
                                    value={displayVal}
                                    onFocus={() => {
                                        let rawVal = row.isPercentage ? (val * 100) : val;
                                        setEditState({ rowId: row.id, yearIdx: idx, value: rawVal === 0 ? '' : rawVal.toString() });
                                    }}
                                    onChange={(e) => setEditState(prev => prev ? { ...prev, value: e.target.value } : null)}
                                    onBlur={() => editState && commitValue(row.id, idx, row.isPercentage ? (parseFloat(editState.value.replace(',','.'))/100).toString() : editState.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                                />
                                {isWarning && (
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20 group/alert">
                                        <AlertTriangle size={12} className={validation.status === 'critical' ? "text-red-500" : "text-amber-500"} />
                                        <div className="absolute right-0 bottom-full mb-1 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover/alert:opacity-100 transition-opacity pointer-events-none z-50">
                                            <p className="font-bold mb-1 text-amber-400">Benchmarking</p>
                                            <p>{validation.msg}</p>
                                            <div className="mt-2 pt-2 border-t border-slate-600 flex justify-end">
                                                 <button className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wide cursor-pointer pointer-events-auto" onMouseDown={(e) => { e.preventDefault(); handleAutoFix(row.id, idx); }}>
                                                    <Wand2 size={10}/> Ajustar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute right-0 bottom-[100%] mb-1 hidden group-hover/cell:flex items-center gap-1 bg-slate-800 text-white shadow-xl border border-slate-700 rounded-lg p-1 z-50 pointer-events-auto backdrop-blur-sm">
                                    <button onMouseDown={(e) => { e.preventDefault(); applySmartAction(row.id, idx, valueToPropagate, 'copy'); }} className="p-1.5 hover:bg-slate-600 rounded transition-colors" title="Copiar p/ direita"><ArrowRight size={12} className="text-emerald-400"/></button>
                                    <div className="w-px h-3 bg-slate-600"></div>
                                    <button onMouseDown={(e) => { e.preventDefault(); applySmartAction(row.id, idx, valueToPropagate, 'growth'); }} className="p-1.5 hover:bg-slate-600 rounded transition-colors" title="Projetar Crescimento"><TrendingUp size={12} className="text-blue-400"/></button>
                                </div>
                            </div>
                        ) : (
                            <span className={`px-2 py-1 font-bold ${textColor}`}>{displayVal}</span>
                        )}
                        </td>
                    );
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
        {/* Indicador visual de rolagem */}
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-50">
            <ArrowRight size={10} className="animate-pulse" /> Arraste lateralmente para ver todos os anos <ArrowRight size={10} className="animate-pulse rotate-180" />
        </div>
    </div>
  );
};

export default FinancialSheetTable;