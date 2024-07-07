import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
// import latex from './Latex.js';

function LatexToPdf() {
  const [latexInput, setLatexInput] = useState('');

  async function generatePdf() {
        // Convert LaTeX to HTML
        // const htmlContent = latex(latexInput);

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        // Draw the HTML content onto the PDF
        page.drawText(latexInput, {
            x: 50,
            y: 750,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Serialize the PDF document to bytes (Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Trigger the download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'latex_output.pdf');
    }

  return (
    <div>
      <h1>LaTeX to PDF Generator</h1>
      <textarea
        value={latexInput}
        onChange={(e) => setLatexInput(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Enter LaTeX here"
      />
      <br />
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default LatexToPdf;
