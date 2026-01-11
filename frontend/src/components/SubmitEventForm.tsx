import { useState } from 'react';
import { submissionsApi } from '../services/api';

export const SubmitEventForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    submitterName: '',
    submitterEmail: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    locationName: '',
    locationAddress: ''
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    try {
      await submissionsApi.submit({
        ...form,
        startDate: form.startDate,
        endDate: form.endDate || null
      });
      setStatus('success');
      setForm({
        submitterName: '',
        submitterEmail: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        locationName: '',
        locationAddress: ''
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="rounded-3xl bg-white/80 p-6 shadow-soft">
      <h2 className="font-display text-xl font-semibold text-ink">Submit an Event</h2>
      <p className="mt-1 text-sm text-slate">Share local events with the Derby community.</p>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="rounded-xl border border-slate/20 px-3 py-2 text-sm"
            placeholder="Your name"
            value={form.submitterName}
            onChange={(event) => handleChange('submitterName', event.target.value)}
          />
          <input
            className="rounded-xl border border-slate/20 px-3 py-2 text-sm"
            placeholder="Email"
            required
            type="email"
            value={form.submitterEmail}
            onChange={(event) => handleChange('submitterEmail', event.target.value)}
          />
        </div>
        <input
          className="w-full rounded-xl border border-slate/20 px-3 py-2 text-sm"
          placeholder="Event title"
          required
          value={form.title}
          onChange={(event) => handleChange('title', event.target.value)}
        />
        <textarea
          className="w-full rounded-xl border border-slate/20 px-3 py-2 text-sm"
          placeholder="Event description"
          rows={3}
          value={form.description}
          onChange={(event) => handleChange('description', event.target.value)}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="rounded-xl border border-slate/20 px-3 py-2 text-sm"
            required
            type="datetime-local"
            value={form.startDate}
            onChange={(event) => handleChange('startDate', event.target.value)}
          />
          <input
            className="rounded-xl border border-slate/20 px-3 py-2 text-sm"
            type="datetime-local"
            value={form.endDate}
            onChange={(event) => handleChange('endDate', event.target.value)}
          />
        </div>
        <input
          className="w-full rounded-xl border border-slate/20 px-3 py-2 text-sm"
          placeholder="Location name"
          value={form.locationName}
          onChange={(event) => handleChange('locationName', event.target.value)}
        />
        <input
          className="w-full rounded-xl border border-slate/20 px-3 py-2 text-sm"
          placeholder="Address"
          value={form.locationAddress}
          onChange={(event) => handleChange('locationAddress', event.target.value)}
        />
        <button
          className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit event'}
        </button>
        {status === 'success' && (
          <p className="text-sm text-emerald-700">Thanks! We will review your submission.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600">Submission failed. Please try again.</p>
        )}
      </form>
    </section>
  );
};
