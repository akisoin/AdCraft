import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { CaptionCard } from './components/CaptionCard';
import { generateAdCopy } from './services/geminiService';
import { AdCopy, LoadingState } from './types';
import { Sparkles, Loader2, Zap, Megaphone } from 'lucide-react';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [adCopies, setAdCopies] = useState<AdCopy[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAdCopies([]);
    setError(null);
    setLoadingState(LoadingState.IDLE);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setAdCopies([]);
    setError(null);
    setLoadingState(LoadingState.IDLE);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setLoadingState(LoadingState.ANALYZING);
    setError(null);

    try {
      const results = await generateAdCopy(selectedFile);
      setAdCopies(results);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate ad copy. Please check your file size (videos < 20MB recommended) or try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pb-20">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-full px-4 py-1.5 mb-6">
          <Zap size={14} className="text-yellow-400" fill="currentColor" />
          <span className="text-xs font-medium text-slate-300">Powered by Gemini 2.5 Flash</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Ad<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Craft</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Generate high-converting <span className="text-indigo-400 font-medium">Primary Text</span>, <span className="text-indigo-400 font-medium">Headlines</span>, and <span className="text-indigo-400 font-medium">Descriptions</span> for your ads instantly.
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Input */}
          <div className="space-y-6 md:sticky md:top-8">
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 mr-3 text-sm font-bold">1</span>
                Upload Creative
              </h2>
              
              <ImageUpload 
                onImageSelect={handleFileSelect}
                selectedImage={selectedFile}
                onClear={handleClear}
                disabled={loadingState === LoadingState.ANALYZING}
              />

              <div className="mt-6">
                <button
                  onClick={handleGenerate}
                  disabled={!selectedFile || loadingState === LoadingState.ANALYZING}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300
                    ${!selectedFile 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : loadingState === LoadingState.ANALYZING
                        ? 'bg-indigo-600/50 text-white cursor-wait'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
                    }
                  `}
                >
                  {loadingState === LoadingState.ANALYZING ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Creative...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Ad Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hint / Instructions */}
            <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800/50">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                <Megaphone size={16} className="mr-2 text-indigo-400"/>
                Why this works
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 mr-2 shrink-0"></div>
                  <span><strong className="text-slate-300">Multimodal Analysis:</strong> AI sees your video/image to match the copy to the visual hook.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 mr-2 shrink-0"></div>
                  <span><strong className="text-slate-300">Conversion Focused:</strong> Tones are specifically calibrated for user action (clicks, leads, sales).</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 mr-2 shrink-0"></div>
                  <span><strong className="text-slate-300">Platform Ready:</strong> Formatted for Facebook, Instagram, and LinkedIn ad managers.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 mr-3 text-sm font-bold">2</span>
                  Ad Variations
                </h2>
                {adCopies.length > 0 && (
                  <span className="text-sm text-slate-400 animate-in fade-in">
                    {adCopies.length} options generated
                  </span>
                )}
             </div>

             {loadingState === LoadingState.IDLE && adCopies.length === 0 && !error && (
               <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-slate-800 border-dashed bg-slate-900/20 text-slate-500">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="max-w-xs">Upload your ad creative to generate professional copy variations.</p>
               </div>
             )}

             {loadingState === LoadingState.ANALYZING && (
               <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-slate-900 rounded-xl p-6 border border-slate-800 animate-pulse">
                      <div className="h-4 bg-slate-800 rounded w-20 mb-6"></div>
                      <div className="space-y-2 mb-6">
                         <div className="h-3 bg-slate-800 rounded w-16 mb-2"></div>
                         <div className="h-4 bg-slate-800 rounded w-full"></div>
                         <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <div className="h-3 bg-slate-800 rounded w-16 mb-2"></div>
                            <div className="h-5 bg-slate-800 rounded w-full"></div>
                         </div>
                         <div>
                            <div className="h-3 bg-slate-800 rounded w-16 mb-2"></div>
                            <div className="h-5 bg-slate-800 rounded w-full"></div>
                         </div>
                      </div>
                    </div>
                  ))}
               </div>
             )}

             {error && (
               <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
                 <p className="text-red-400 font-medium mb-2">Generation Failed</p>
                 <p className="text-red-300 text-sm">{error}</p>
                 <button onClick={() => setError(null)} className="mt-4 text-sm text-red-400 hover:text-red-300 underline">Dismiss</button>
               </div>
             )}

             {adCopies.length > 0 && (
               <div className="grid gap-6">
                 {adCopies.map((ad, index) => (
                   <CaptionCard key={index} ad={ad} index={index} />
                 ))}
               </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
