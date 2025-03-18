import { useState } from 'react';
import { type Reading } from './reading';
import { SpreadSchema, type Spread } from './spread';

type NewReadingFormProps = {
  onComplete: (reading: Reading) => void;
  onCancel: () => void;
};

export default function NewReadingForm({ onComplete, onCancel }: NewReadingFormProps) {
  const [formData, setFormData] = useState({
    querent: '',
    reason: '',
    spread: 'Past Present Future' as Spread
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'spread' ? value as Spread : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReading: Reading = {
      querent: formData.querent,
      reason: formData.reason,
      spread: formData.spread,
      reading: []
    };

    onComplete(newReading);
  };

  return (
    <div className="new-reading-form">
      <h3>Create New Reading</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="querent">Querent Name</label>
          <input
            type="text"
            id="querent"
            name="querent"
            value={formData.querent}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Reading</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="spread">Select Spread</label>
          <select
            id="spread"
            name="spread"
            value={formData.spread}
            onChange={handleChange}
            required
          >
            {SpreadSchema.options.map(spread => (
              <option key={spread} value={spread}>{spread}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Create Reading</button>
        </div>
      </form>
    </div>
  );
}
