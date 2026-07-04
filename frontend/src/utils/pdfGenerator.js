import { jsPDF } from "jspdf";

export const generatePDF = (result) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Company Research Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Company: ${result.company_name}`, 20, y);
  y += 10;

  doc.text(`Website: ${result.website}`, 20, y);
  y += 10;

  doc.text("Description:", 20, y);
  y += 8;

  const description = doc.splitTextToSize(
    result.description,
    170
  );

  doc.text(description, 20, y);

  y += description.length * 7 + 10;

  doc.setFontSize(16);
  doc.text("Company Summary", 20, y);

  y += 10;

  doc.setFontSize(12);

  const summary = doc.splitTextToSize(
    result.ai_analysis.company_summary,
    170
  );

  doc.text(summary, 20, y);

  y += summary.length * 7 + 15;

  doc.setFontSize(16);
  doc.text("Products & Services", 20, y);

  y += 10;

  doc.setFontSize(12);

  result.ai_analysis.products_services.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.setFontSize(16);
  doc.text("Business Pain Points", 20, y);

  y += 10;

  doc.setFontSize(12);

  result.ai_analysis.business_pain_points.forEach((item) => {
    const lines = doc.splitTextToSize(item, 160);

    doc.text(lines, 25, y);

    y += lines.length * 7 + 4;
  });

  y += 5;

  doc.setFontSize(16);
  doc.text("Top Competitors", 20, y);

  y += 10;

  doc.setFontSize(12);

  result.ai_analysis.top_5_competitors.forEach(
    (competitor) => {
      doc.text(`• ${competitor}`, 25, y);
      y += 8;
    }
  );

  doc.save(
    `${result.company_name.replace(/\s+/g, "_")}_report.pdf`
  );
};