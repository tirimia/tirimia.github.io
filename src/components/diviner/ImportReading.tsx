import { useRef } from 'react';
import { ReadingSchema, type Reading } from './reading';

type ImportReadingProps = {
  onImport: (reading: Reading) => void;
  onCancel: () => void;
};

export default function ImportReading({ onImport, onCancel }: ImportReadingProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        if (typeof reader.result !== 'string') {
            console.error("File reader returned something other than a string, this should never happen.")
            return
        }
          const imported = ReadingSchema.safeParse(JSON.parse(reader.result));
          if (!imported.success) {
              alert(`Could not import reading: ${imported.error}`)
              return
          }
          onImport(imported.data);
    };
    reader.readAsText(file);
  };

  return (
    <div className="import-reading">
      <h3>Import Reading</h3>
      <p>Select a JSON file containing a previously exported tarot reading.</p>

      <div className="import-actions">
        <button onClick={handleFileSelect}>Select File</button>
        <button onClick={onCancel}>Cancel</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
