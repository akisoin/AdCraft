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
    if (t.includes('direct') || t.includes('sales')) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    if (t.includes('problem') || t.includes('pain')) return 'bg-orange-500/10 text-orange-300 border-orange-500/20';
    if (t.includes('story')) return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
    if (t.includes('urgency') || t.includes('fomo')) return 'bg-red-500/10 text-red-300 border-red-500/20';
    return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
  };

  const currentPrimaryText = primaryTextMode === 'paragraph' ? ad.primaryTextParagraph : ad.primaryTextBullets;

  return (
    <div 
      className="bg-slate-900 border border-slate-800 rounded-xl p-0 overflow-hidden transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:shadow-indigo-500/5 group animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      {/* Header / Tone Badge */}
      <div className={`px-6 py-3 border-b border-slate-800 flex items-center justify-between ${getToneStyle(ad.tone)} bg-opacity-50`}>
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
              <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => setPrimaryTextMode('paragraph')}
                  className={`p-1.5 rounded-md transition-all ${primaryTextMode === 'paragraph' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  title="Paragraph View"
                >
                  <AlignLeft size={14} />
                </button>
                <button
                  onClick={() => setPrimaryTextMode('bullets')}
                  className={`p-1.5 rounded-md transition-all ${primaryTextMode === 'bullets' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  title="Bullet Points View"
                >
                  <List size={14} />
                </button>
              </div>

              <div className="w-px h-4 bg-slate-700 mx-1"></div>

              <button
                onClick={() => handleCopy(currentPrimaryText, 'primary')}
                className="text-slate-500 hover:text-indigo-400 transition-colors p-1"
                title="Copy Text"
              >
                {copiedField === 'primary' ? <Check size={16} className="text-green-400"/> : <Copy size={16} />}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-950/30 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors min-h-[100px]">
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
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                title="Copy Headline"
              >
                {copiedField === 'headline' ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-white font-bold text-base bg-slate-950/30 p-3 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
              {ad.headline}
            </p>
          </div>

          {/* Description Section */}
          <div className="relative group/field">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Description</label>
              <button
                onClick={() => handleCopy(ad.description, 'description')}
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                title="Copy Description"
              >
                {copiedField === 'description' ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-slate-400 text-sm bg-slate-950/30 p-3 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Ad Preview Mini-Mockup */}
        <div className="mt-4 pt-4 border-t border-slate-800/50 opacity-60 hover:opacity-100 transition-opacity">
          <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wide text-center">Preview</div>
          <div className="bg-slate-800/50 rounded p-3 flex items-center justify-between pointer-events-none border border-slate-700/50">
            <div className="flex-1 min-w-0">
               <div className="text-xs font-bold text-slate-200 truncate">{ad.headline}</div>
               <div className="text-[10px] text-slate-400 truncate">{ad.description}</div>
            </div>
            <div className="bg-slate-700 text-slate-200 text-[10px] font-bold px-3 py-1.5 rounded ml-3">
              Learn More
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
