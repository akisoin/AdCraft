import React, { useState } from 'react';
import { Copy, Check, AlignLeft, List } from 'lucide-react';
import { AdCopy } from '../types';

interface AdCopyCardProps {
  ad: AdCopy;
  index: number;
}

export const CaptionCard: React.FC<AdCopyCardProps> = ({ ad, index }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [primaryTextMode, setPrimaryTextMode] = useState<'paragraph' | 'bullets'>('paragraph');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getToneStyle = (tone: string) => {
    const t = tone.toLowerCase();
    if (t.includes('direct') || t.includes('sales')) return 'bg-emerald-50 text-emerald-800 border-emerald-100';
    if (t.includes('problem') || t.includes('pain')) return 'bg-orange-50 text-orange-800 border-orange-100';
    if (t.includes('story')) return 'bg-purple-50 text-purple-800 border-purple-100';
    if (t.includes('urgency') || t.includes('fomo')) return 'bg-rose-50 text-rose-800 border-rose-100';
    return 'bg-blue-50 text-blue-800 border-blue-100';
  };

  const currentPrimaryText = primaryTextMode === 'paragraph' ? ad.primaryTextParagraph : ad.primaryTextBullets;

  return (
    <div 
      className="bg-white border border-slate-200 rounded-xl p-0 overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 group animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      {/* Header / Tone Badge */}
      <div className={`px-6 py-3 border-b border-slate-100 flex items-center justify-between ${getToneStyle(ad.tone)}`}>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider">{ad.tone}</span>
        </div>
        <div className="text-[10px] opacity-70 uppercase tracking-widest font-semibold">Variation #{index + 1}</div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Primary Text Section */}
        <div className="relative group/field">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Primary Text</label>
            
            <div className="flex items-center space-x-2">
              {/* Toggle Buttons */}
              <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button
                  onClick={() => setPrimaryTextMode('paragraph')}
                  className={`p-1.5 rounded-md transition-all ${primaryTextMode === 'paragraph' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Paragraph View"
                >
                  <AlignLeft size={14} />
                </button>
                <button
                  onClick={() => setPrimaryTextMode('bullets')}
                  className={`p-1.5 rounded-md transition-all ${primaryTextMode === 'bullets' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Bullet Points View"
                >
                  <List size={14} />
                </button>
              </div>

              <div className="w-px h-4 bg-slate-200 mx-1"></div>

              <button
                onClick={() => handleCopy(currentPrimaryText, 'primary')}
                className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                title="Copy Text"
              >
                {copiedField === 'primary' ? <Check size={16} className="text-emerald-500"/> : <Copy size={16} />}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <p className="text-slate-800 text-sm whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors min-h-[100px]">
              {currentPrimaryText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Headline Section */}
          <div className="relative group/field">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Headline</label>
              <button
                onClick={() => handleCopy(ad.headline, 'headline')}
                className="text-slate-400 hover:text-indigo-600 transition-colors"
                title="Copy Headline"
              >
                {copiedField === 'headline' ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-slate-900 font-bold text-base bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              {ad.headline}
            </p>
          </div>

          {/* Description Section */}
          <div className="relative group/field">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Description</label>
              <button
                onClick={() => handleCopy(ad.description, 'description')}
                className="text-slate-400 hover:text-indigo-600 transition-colors"
                title="Copy Description"
              >
                {copiedField === 'description' ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Ad Preview Mini-Mockup */}
        <div className="mt-4 pt-4 border-t border-slate-100 opacity-60 hover:opacity-100 transition-opacity">
          <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide text-center">Preview</div>
          <div className="bg-slate-50 rounded p-3 flex items-center justify-between pointer-events-none border border-slate-200">
            <div className="flex-1 min-w-0">
               <div className="text-xs font-bold text-slate-900 truncate">{ad.headline}</div>
               <div className="text-[10px] text-slate-500 truncate">{ad.description}</div>
            </div>
            <div className="bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded ml-3">
              Learn More
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};