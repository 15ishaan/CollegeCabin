import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';



import samplePDF from '../../Iconpack/DSTL final file.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

function Test(props) {
  return (
    <embed src={`data:application/pdf;base64,${props.file}`}  type="application/pdf" width="100%"></embed>
  );
}

export default Test;