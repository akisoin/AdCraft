import React from 'react';
import { Eye, Target, Share2, ArrowRight } from 'lucide-react';

export const FeatureSection: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {/* Card 1: Vision */}
      <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Eye size={80} className="text-indigo-600 transform rotate-12 translate-x-4 -translate-y-4" />
        </div>
        
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
           <Eye className="w-6 h-6 text-indigo-600" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
          Multimodal Vision
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          Our AI analyzes your video frames and image composition to ensure the copy matches your visual hook perfectly.
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
           <div className="w-1/3 h-full bg-indigo-500 rounded-full group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>

      {/* Card 2: Conversion */}
      <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Target size={80} className="text-emerald-600 transform rotate-12 translate-x-4 -translate-y-4" />
        </div>

        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
           <Target className="w-6 h-6 text-emerald-600" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Conversion Engineered
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          Every word is selected based on proven ad frameworks designed to stop the scroll and drive clicks, leads, and sales.
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
           <div className="w-1/3 h-full bg-emerald-500 rounded-full group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>

      {/* Card 3: Native */}
      <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Share2 size={80} className="text-purple-600 transform rotate-12 translate-x-4 -translate-y-4" />
        </div>

        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
           <Share2 className="w-6 h-6 text-purple-600" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Platform Native
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          Formatted specifically for Meta's algorithm. We handle emojis, spacing, and structure so your ads look professional.
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
           <div className="w-1/3 h-full bg-purple-500 rounded-full group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>
  );
};
