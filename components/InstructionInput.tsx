import React from 'react';
import { Lock, Wand2 } from 'lucide-react';

interface InstructionInputProps {
  value: string;
  onChange: (value: string) => void;
  isPro: boolean;
  onUpgrade: () => void;
  disabled: boolean;
}

export const InstructionInput: React.FC<InstructionInputProps> = ({ value, onChange, isPro, onUpgrade, disabled }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 relative overflow-hidden group shadow-sm transition-colors hover:border-slate-300">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-slate-900 flex items-center">
          <Wand2 size={16} className="mr-2 text-indigo-600" />
          Custom Instructions
        </label>
        {!isPro && (
          <button 
            onClick={onUpgrade}
            className="flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wide hover:bg-amber-100 transition-colors"
          >
            <Lock size={10} className="mr-1" /> Pro Feature
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isPro || disabled}
          placeholder={isPro 
            ? "e.g., Target audience is busy moms. Focus on 'time-saving' and 'healthy'. Use a humorous tone." 
            : "Upgrade to Pro to add specific keywords, brand voice guidelines, or campaign context..."
          }
          className={`w-full bg-slate-50 border rounded-xl p-4 text-sm resize-none h-32 transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none
            ${!isPro 
              ? 'border-slate-200 text-slate-400 cursor-not-allowed' 
              : 'border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white'
            }
            ${disabled ? 'opacity-50' : ''}
          `}
        />
        
        {!isPro && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl z-10 transition-all">
             <button 
               onClick={onUpgrade}
               className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-lg shadow-slate-200/50 border border-slate-700 transition-transform hover:scale-105 flex items-center"
             >
               <Lock size={12} className="mr-2 text-amber-400" />
               Unlock Context Control
             </button>
          </div>
        )}
      </div>
    </div>
  );
};