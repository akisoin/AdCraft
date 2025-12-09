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
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 relative overflow-hidden group shadow-sm transition-colors hover:border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-slate-300 flex items-center">
          <Wand2 size={16} className="mr-2 text-indigo-400" />
          Custom Instructions
        </label>
        {!isPro && (
          <button 
            onClick={onUpgrade}
            className="flex items-center text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wide hover:bg-yellow-500/20 transition-colors"
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
          className={`w-full bg-slate-950/50 border rounded-xl p-4 text-sm resize-none h-32 transition-all focus:ring-2 focus:ring-indigo-500/50 outline-none
            ${!isPro 
              ? 'border-slate-800 text-slate-600 cursor-not-allowed bg-slate-900/30' 
              : 'border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50'
            }
            ${disabled ? 'opacity-50' : ''}
          `}
        />
        
        {!isPro && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/5 backdrop-blur-[1px] rounded-xl z-10">
             <button 
               onClick={onUpgrade}
               className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-lg border border-slate-700 transition-transform hover:scale-105 flex items-center"
             >
               <Lock size={12} className="mr-2 text-yellow-400" />
               Unlock Context Control
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
