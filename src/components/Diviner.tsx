import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { ReadingDocument } from './diviner/document';
import { sampleReading, type Reading, ReadingSchema } from './diviner/reading';
import { z } from 'astro/zod';
import ReadingDisplay from "./diviner/ReadingDisplay";
import ImportReading from './diviner/ImportReading';
import NewReadingForm from './diviner/NewReadingForm';

type DivinerContent = Reading | 'new' | 'import' | 'initial'
function isReading(content: DivinerContent): content is Reading {
    return typeof content !== 'string'
}

export default function Diviner() {
    const [content, setContent] = useState<DivinerContent>(sampleReading);
    //const [content, setContent] = useState<DivinerContent>('initial');
    const setReading = (reading: Reading) => (setContent(reading))

  return (
      <div className="diviner-container">
      <div className="diviner-header">

          <h1>Diviner</h1>
          <div className="diviner-actions">
              <button onClick={() => setContent('import')}>Import</button>
              <button onClick={() => setContent('new')}>New</button>
          </div>
      </div>
       <div className="diviner-content">
        {content === 'initial' && (
          <div className="diviner-intro">
            <p>Welcome to the Tarot Reading Generator.</p>
            <p>Click "Import" to load an existing reading or "New" to create a fresh reading.</p>
          </div>
        )}

        {content === 'import' && (
          <ImportReading
            onImport={setReading}
            onCancel={() => setContent('initial')}
          />
        )}

        {content === 'new' && (
          <NewReadingForm
            onComplete={setReading}
            onCancel={() => setContent('initial')}
          />
        )}

        {isReading(content) && (
          <ReadingDisplay
            reading={content}
            onBack={() => setContent('initial')}
          />
        )}
      </div>
      </div>
  );
}
