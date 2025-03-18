// src/components/ReactPdfGenerator.tsx
import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import DocumentTemplate from './DocumentTemplate';

interface FormData {
  title: string;
  author: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export default function ReactPdfGenerator() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    sections: [{ heading: '', content: '' }]
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle section input changes
  const handleSectionChange = (index: number, field: 'heading' | 'content', value: string) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData({
      ...formData,
      sections: updatedSections
    });
  };

  // Add a new section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { heading: '', content: '' }]
    });
  };

  // Remove a section
  const removeSection = (index: number) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sections: updatedSections
    });
  };

  // Toggle preview mode
  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Form is valid if title, author and all sections have content
  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.author.trim() !== '' &&
      formData.sections.every(
        section => section.heading.trim() !== '' && section.content.trim() !== ''
      )
    );
  };

  return (
    <div className="pdf-generator">
      {!isPreviewMode ? (
        <div className="form-container">
          <h2>Create Your Document</h2>

          <div className="form-group">
            <label htmlFor="title">Document Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <h3>Sections</h3>
          {formData.sections.map((section, index) => (
            <div key={index} className="section-inputs">
              <div className="form-group">
                <label>Section Heading</label>
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  rows={4}
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                />
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeSection(index)}
                disabled={formData.sections.length <= 1}
              >
                Remove Section
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-btn"
            onClick={addSection}
          >
            Add Section
          </button>

          <button
            type="button"
            className="preview-btn"
            onClick={togglePreview}
            disabled={!isFormValid()}
          >
            Preview PDF
          </button>

          {isFormValid() && (
            <PDFDownloadLink
              document={<DocumentTemplate {...formData} />}
              fileName={`${formData.title.replace(/\s+/g, '-').toLowerCase()}.pdf`}
              className="download-link"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Preparing download...' : 'Download PDF now'
              }
            </PDFDownloadLink>
          )}
        </div>
      ) : (
        <div className="preview-mode">
          <div className="preview-controls">
            <button onClick={togglePreview}>Back to Edit</button>

            <PDFDownloadLink
              document={<DocumentTemplate {...formData} />}
              fileName={`${formData.title.replace(/\s+/g, '-').toLowerCase()}.pdf`}
              className="download-btn"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Preparing download...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </div>

          {/* PDF Viewer - note this needs a fixed height */}
          <PDFViewer style={{ width: '100%', height: '70vh', border: '1px solid #ccc' }}>
            <DocumentTemplate {...formData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}
