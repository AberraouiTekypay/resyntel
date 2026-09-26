'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { UploadCloud, CheckCircle2, FileText, Download, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ConnectPage() {
  const [dataType, setDataType] = useState<'electricity' | 'water' | 'occupancy'>('electricity');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const { t, lang } = useLanguage();
  const [pilotForm, setPilotForm] = useState({
    hotelName: 'Zephyr Marrakech',
    contactName: '',
    contactEmail: '',
    phone: '',
    notes: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data_type', dataType);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ 
        error: lang === 'fr' 
          ? 'Échec du traitement du fichier CSV. Veuillez réessayer.' 
          : 'Failed to upload CSV. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleTemplate = (type: string) => {
    let content = '';
    if (type === 'electricity') {
      content = 'timestamp,meter_name,kwh,peak_kwh,cost_mad\n2026-09-01 00:00:00,Main Incomer 1,142.5,0.0,192.38\n2026-09-01 01:00:00,Main Incomer 1,138.2,0.0,186.57\n2026-09-01 02:00:00,Main Incomer 1,131.0,0.0,176.85';
    } else if (type === 'water') {
      content = 'timestamp,meter_name,m3,cost_mad\n2026-09-01 00:00:00,Main RADEEMA Incomer,2.1,30.45\n2026-09-01 01:00:00,Main RADEEMA Incomer,5.9,85.55\n2026-09-01 02:00:00,Main RADEEMA Incomer,5.8,84.10';
    } else {
      content = 'date,occupied_rooms,total_rooms,guest_nights\n2026-09-01,132,180,248\n2026-09-02,140,180,265\n2026-09-03,145,180,270';
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resyntel_zephyr_${type}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
          {t.connect.page_title}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          {t.connect.page_subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: CSV Upload Workflow */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#0B1F33]">{t.connect.pipeline_title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                <span className="text-[#087E8B] font-semibold">{lang === 'fr' ? 'Importer' : 'Upload'}</span>
                <span>→</span>
                <span>{lang === 'fr' ? 'Valider' : 'Validate'}</span>
                <span>→</span>
                <span>{lang === 'fr' ? 'Normaliser' : 'Normalize'}</span>
                <span>→</span>
                <span>{lang === 'fr' ? 'Analyser' : 'Analyze'}</span>
              </div>
            </div>

            {/* Template Download Button */}
            <button
              onClick={() => downloadSampleTemplate(dataType)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{t.connect.btn_download_template}</span>
            </button>
          </div>

          {/* Select Data Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {t.connect.select_resource}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'electricity', label: t.connect.electricity_opt, desc: lang === 'fr' ? 'Sous-compteurs & factures ONEE' : 'Interval meters & invoices' },
                { id: 'water', label: t.connect.water_opt, desc: lang === 'fr' ? 'Compteurs régie RADEEMA' : 'RADEEMA utility meters' },
                { id: 'occupancy', label: t.connect.occupancy_opt, desc: lang === 'fr' ? 'Nuitées chambres & clients PMS' : 'PMS room nights & guests' }
              ].map((tItem) => (
                <button
                  key={tItem.id}
                  onClick={() => {
                    setDataType(tItem.id as any);
                    setResult(null);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    dataType === tItem.id
                      ? 'border-[#087E8B] bg-cyan-50/30 ring-1 ring-[#087E8B]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{tItem.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{tItem.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* File Dropzone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-[#087E8B] rounded-xl p-8 text-center bg-slate-50/50 transition-colors">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <div className="text-sm font-semibold text-slate-800">
              {t.connect.dropzone_title}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.connect.dropzone_sub}
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-file-input"
            />
            <label
              htmlFor="csv-file-input"
              className="mt-4 inline-block px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md shadow-2xs cursor-pointer transition-colors"
            >
              {t.connect.btn_browse}
            </label>

            {file && (
              <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg inline-flex items-center gap-3 text-xs text-slate-700">
                <FileText className="w-4 h-4 text-[#087E8B]" />
                <span className="font-medium">{file.name}</span>
                <span className="text-slate-400 font-mono">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {file && (
            <div className="flex justify-end">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-5 py-2.5 bg-[#087E8B] hover:bg-[#076a75] disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
              >
                <span>{uploading ? t.connect.uploading : t.connect.btn_upload}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Validation Result Box */}
          {result && (
            <div
              className={`p-4 rounded-lg border text-xs ${
                result.status === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {result.status === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                )}
                <span>
                  {result.status === 'success' 
                    ? (lang === 'fr' ? 'Fichier CSV validé et normalisé avec succès.' : result.message) 
                    : result.error}
                </span>
              </div>

              {result.status === 'success' && (
                <div className="mt-2 space-y-1 text-[11px] text-emerald-800">
                  <div>
                    {lang === 'fr' ? 'Lignes traitées :' : 'Rows Processed:'} <strong className="font-mono">{result.rows_processed}</strong>
                  </div>
                  <div>
                    {lang === 'fr' ? 'Colonnes détectées :' : 'Columns Detected:'} <strong className="font-mono">{result.columns_detected?.join(', ')}</strong>
                  </div>
                  <div>
                    {lang === 'fr' ? 'Statut :' : 'Status:'} <strong>{lang === 'fr' ? 'Normalisé aux unités marocaines (MAD, kWh, m³)' : result.normalization_status}</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Request a Pilot Program */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-base font-bold text-[#0B1F33]">{t.connect.start_pilot_title}</h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.connect.start_pilot_sub}
            </p>
          </div>

          {pilotSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#2E7D5B] mx-auto" />
              <div className="text-sm font-bold text-slate-900">{t.connect.pilot_received_title}</div>
              <p className="text-xs text-slate-600">
                {t.connect.pilot_received_sub}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPilotSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {t.connect.form_prop_name}
                </label>
                <input
                  type="text"
                  required
                  value={pilotForm.hotelName}
                  onChange={(e) => setPilotForm({ ...pilotForm, hotelName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#087E8B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {t.connect.form_contact}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'fr' ? 'ex. Directeur Général / Directeur Financier' : 'e.g. General Manager / Financial Controller'}
                  value={pilotForm.contactName}
                  onChange={(e) => setPilotForm({ ...pilotForm, contactName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#087E8B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {t.connect.form_email}
                </label>
                <input
                  type="email"
                  required
                  placeholder="executive@zephyrhotels.ma"
                  value={pilotForm.contactEmail}
                  onChange={(e) => setPilotForm({ ...pilotForm, contactEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#087E8B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {t.connect.form_phone}
                </label>
                <input
                  type="tel"
                  placeholder="+212 5 24 ..."
                  value={pilotForm.phone}
                  onChange={(e) => setPilotForm({ ...pilotForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#087E8B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0B1F33] hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                {t.connect.form_submit}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.connect.nda_note}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{t.connect.cndp_note}</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
