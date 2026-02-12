
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Gera um PDF A4 a partir de um elemento HTML.
 */
export const generateExecutiveReport = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Elemento não encontrado.");
  
  const originalWidth = element.style.width;
  element.style.width = '1200px'; 

  const hiddenElements = element.querySelectorAll('.pdf-visible');
  hiddenElements.forEach((el) => { (el as HTMLElement).style.display = 'block'; });

  try {
      const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`${filename}.pdf`);

  } catch (error) {
      console.error("Erro no PDF:", error);
  } finally {
      element.style.width = originalWidth;
      hiddenElements.forEach((el) => { (el as HTMLElement).style.display = 'none'; });
  }
};

/**
 * Exporta um elemento específico como imagem PNG transparente em ALTA RESOLUÇÃO.
 */
export const exportElementAsPNG = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Aguarda um pouco mais para garantir carregamento total dos ícones e texturas
        await new Promise(resolve => setTimeout(resolve, 800));

        const canvas = await html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            scale: 4, // ULTRA-HD: 4x a resolução da tela
            backgroundColor: null, // TRANSPARÊNCIA TOTAL (Canal Alpha)
            logging: false,
            imageTimeout: 0,
            onclone: (clonedDoc) => {
                const el = clonedDoc.getElementById(elementId);
                if (el) {
                    el.style.backgroundColor = 'transparent';
                    el.style.backgroundImage = 'none';
                    el.style.boxShadow = 'none';
                    el.style.border = 'none';
                    
                    // Garante que o Leaflet não tenha fundos cinzas internos no clone
                    const leafletPanes = el.querySelectorAll('.leaflet-pane');
                    leafletPanes.forEach(pane => {
                        (pane as HTMLElement).style.backgroundColor = 'transparent';
                    });
                }
            }
        });

        const link = document.createElement('a');
        link.download = `${filename}_HD.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    } catch (err) {
        console.error("Erro ao exportar imagem HD transparente:", err);
        throw err;
    }
};
