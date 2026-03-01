
import { jsPDF } from "jspdf";
import type { MunicipioPerfil } from "../types";
import { formatNumber } from "../constants";

interface AcademicThesis {
    title: string;
    type: 'Premium' | 'Mass' | 'Niche';
    modality: string;
    price: number;
    reasoning: string;
}

// --- CURRICULUM AI MOCK ---
// Gera módulos plausíveis baseados em palavras-chave do título
const generateModules = (title: string): string[] => {
    const t = title.toLowerCase();
    
    if (t.includes("holding") || t.includes("sucessão") || t.includes("governança")) {
        return [
            "Módulo 1: Estruturas Societárias e Blindagem Patrimonial",
            "Módulo 2: Planejamento Tributário no Agronegócio",
            "Módulo 3: Governança Familiar e Acordo de Sócios",
            "Módulo 4: Psicologia da Sucessão e Mediação de Conflitos",
            "Capstone: Projeto de Reestruturação Real"
        ];
    }
    if (t.includes("drone") || t.includes("dados") || t.includes("precisão")) {
        return [
            "Módulo 1: Fundamentos de Sensoriamento Remoto",
            "Módulo 2: Pilotagem e Regulamentação (ANAC/DECEA)",
            "Módulo 3: Processamento de Imagens e NDVI",
            "Módulo 4: Integração de Dados com Maquinário Agrícola",
            "Imersão: Voo de Campo e Mapeamento"
        ];
    }
    if (t.includes("gestão") || t.includes("executivo") || t.includes("mba")) {
        return [
            "Módulo 1: Cenários Econômicos e Commodities",
            "Módulo 2: Gestão Financeira e Hedge",
            "Módulo 3: Supply Chain e Logística Global",
            "Módulo 4: Liderança 4.0 no Campo",
            "Módulo Internacional: Visita Técnica (Opcional)"
        ];
    }
    if (t.includes("manutenção") || t.includes("máquinas")) {
        return [
            "Módulo 1: Mecânica Diesel Avançada",
            "Módulo 2: Hidráulica e Pneumática Agrícola",
            "Módulo 3: Eletrônica Embarcada e Diagnóstico",
            "Módulo 4: Gestão de Oficina e Peças",
            "Prática: Desmontagem e Regulagem"
        ];
    }
    
    // Default
    return [
        "Módulo 1: Fundamentos e Contexto de Mercado",
        "Módulo 2: Ferramentas Técnicas Aplicadas",
        "Módulo 3: Gestão e Eficiência Operacional",
        "Módulo 4: Inovação e Tendências Futuras",
        "Projeto Final Aplicado"
    ];
};

export const generateThesisPDF = async (city: MunicipioPerfil, thesis: AcademicThesis) => {
    const doc = new jsPDF();
    const primaryColor = "#0f172a"; // Slate 900
    const accentColor = "#2563eb"; // Blue 600
    const margin = 20;
    let y = 20;

    // --- HEADER ---
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("ROGERLENS INTELLIGENCE | ACADEMIC ENGINE", margin, y);
    
    y += 15;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Proposta de Estruturação", margin, y);
    
    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Mercado Alvo: ${city.nome.toUpperCase()} - ${city.estado}`, margin, y);

    // Linha divisória
    y += 5;
    doc.setDrawColor(200);
    doc.line(margin, y, 190, y);

    // --- PRODUTO ---
    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(accentColor);
    doc.setFont("helvetica", "bold");
    doc.text("PRODUTO SUGERIDO", margin, y);

    y += 8;
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    // Quebra automática de título longo
    const splitTitle = doc.splitTextToSize(thesis.title, 170);
    doc.text(splitTitle, margin, y);
    y += (splitTitle.length * 7);

    // Tags
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(`Modalidade: ${thesis.modality}  |  Perfil: ${thesis.type}`, margin, y);

    // --- JUSTIFICATIVA (THE WHY) ---
    y += 15;
    doc.setFillColor(245, 247, 250); // Slate 50
    doc.roundedRect(margin, y, 170, 30, 3, 3, "F");
    
    doc.setFontSize(9);
    doc.setTextColor(accentColor);
    doc.text("JUSTIFICATIVA ESTRATÉGICA (DATA-DRIVEN)", margin + 5, y + 8);
    
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.setFont("helvetica", "italic");
    const splitReason = doc.splitTextToSize(`"${thesis.reasoning}"`, 160);
    doc.text(splitReason, margin + 5, y + 16);
    
    y += 40;

    // --- VIABILIDADE ECONÔMICA ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(primaryColor);
    doc.text("VIABILIDADE & PRICING", margin, y);
    
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Ticket Sugerido: R$ ${formatNumber(thesis.price)}`, margin, y);
    doc.text(`Renda Média Local: R$ ${formatNumber(city.economia.renda_per_capita)}`, margin + 80, y);
    
    y += 6;
    const potencialRevenue = thesis.price * 35; // Turma de 35
    doc.text(`Receita Bruta/Turma (35 alunos): R$ ${formatNumber(potencialRevenue)}`, margin, y);

    // --- EMENTA SUGERIDA (CURRICULUM DRAFT) ---
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("ESTRUTURA CURRICULAR (DRAFT v1)", margin, y);
    
    y += 8;
    const modules = generateModules(thesis.title);
    
    modules.forEach((mod, index) => {
        doc.setFont("helvetica", "normal");
        doc.setFillColor(index % 2 === 0 ? "#ffffff" : "#fafafa"); // Zebra striping bem sutil
        doc.rect(margin, y - 5, 170, 8, "F");
        
        doc.text(mod, margin + 2, y);
        y += 8;
    });

    // --- FOOTER ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Gerado por RogerLens Intelligence em ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);
    doc.text("Documento Confidencial - Uso Interno", 140, pageHeight - 10);

    // Save
    doc.save(`Proposta_${city.nome}_${thesis.title.substring(0, 10)}.pdf`);
};
