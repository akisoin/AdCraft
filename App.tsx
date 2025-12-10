import React, { useState, useEffect } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { CaptionCard } from './components/CaptionCard';
import { PricingModal } from './components/PricingModal';
import { InstructionInput } from './components/InstructionInput';
import { FeatureCarousel } from './components/FeatureCarousel';
import { generateAdCopy } from './services/geminiService';
import { AdCopy, LoadingState } from './types';
import { Sparkles, Loader2, Zap, Megaphone, Crown, Lock, History, Download } from 'lucide-react';

const FREE_LIMIT = 2;

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [adCopies, setAdCopies] = useState<AdCopy[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  // Feature State
  const [customInstructions, setCustomInstructions] = useState('');

  // Monetization State
  const [generationCount, setGenerationCount] = useState(0);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [plan, setPlan] = useState<'free' | 'pro' | 'agency'>('free');

  // Load state from local storage on mount
  useEffect(() => {
    // Load Plan
    const savedPlan = localStorage.getItem('adcraft_plan') as 'free' | 'pro' | 'agency';
    if (savedPlan) setPlan(savedPlan);

    // Load Count and check Date
    const savedDate = localStorage.getItem('adcraft_date');
    const today = new Date().toDateString();
    
    if (savedDate !== today) {
      // Reset if new day
      setGenerationCount(0);
      localStorage.setItem('adcraft_date', today);
      localStorage.setItem('adcraft_count', '0');
    } else {
      const savedCount = localStorage.getItem('adcraft_count');
      if (savedCount) setGenerationCount(parseInt(savedCount));
    }
  }, []);

  const handleUpgrade = (newPlan: 'free' | 'pro' | 'agency') => {
    setPlan(newPlan);
    localStorage.setItem('adcraft_plan', newPlan);
    setIsPricingOpen(false);
    
    if (newPlan !== 'free') {
      setError(null);
    }
  };

  const handleFileSelect = (file: File) => {
    // Video support is now available for all plans

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

    // Feature Gate: Usage Limit
    if (plan === 'free' && generationCount >= FREE_LIMIT) {
      setIsPricingOpen(true);
      return;
    }

    setLoadingState(LoadingState.ANALYZING);
    setError(null);

    try {
      // Pass custom instructions only if plan allows (double check logic, though UI prevents it)
      const instructionsToSend = plan !== 'free' ? customInstructions : undefined;
      
      const results = await generateAdCopy(selectedFile, instructionsToSend);
      setAdCopies(results);
      setLoadingState(LoadingState.SUCCESS);
      
      // Increment and Save Count
      const newCount = generationCount + 1;
      setGenerationCount(newCount);
      localStorage.setItem('adcraft_count', newCount.toString());
      
    } catch (err) {
      console.error(err);
      setError("Failed to generate ad copy. Please check your file size or try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleExportCSV = () => {
    // Feature Gate: CSV Export
    if (plan === 'free') {
      setIsPricingOpen(true);
      return;
    }

    if (adCopies.length === 0) return;

    const headers = ['Tone', 'Headline', 'Description', 'Primary Text (Paragraph)', 'Primary Text (Bullets)'];
    const rows = adCopies.map(ad => [
      ad.tone,
      `"${ad.headline.replace(/"/g, '""')}"`,
      `"${ad.description.replace(/"/g, '""')}"`,
      `"${ad.primaryTextParagraph.replace(/"/g, '""')}"`,
      `"${ad.primaryTextBullets.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'adcraft_variations.csv';
    link.click();
  };

  const isLimitReached = plan === 'free' && generationCount >= FREE_LIMIT;
  const isPro = plan !== 'free';

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pb-20">
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        onUpgrade={handleUpgrade}
      />

      {/* Header */}
      <header className="pt-8 pb-8 px-6">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Ad<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Craft</span>
            </h1>
            {plan !== 'free' && (
               <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/30 uppercase tracking-wide">
                 {plan}
               </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-4">
             {/* Usage Counter Badge */}
             {plan === 'free' && (
               <div className="hidden md:flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                  <span className="text-xs text-slate-400">Daily Limit:</span>
                  <span className={`text-xs font-bold ${isLimitReached ? 'text-red-400' : 'text-emerald-400'}`}>
                    {generationCount}/{FREE_LIMIT}
                  </span>
               </div>
             )}

             {/* History Button (Gated) */}
             <button 
                onClick={() => plan === 'free' && setIsPricingOpen(true)}
                className="hidden md:flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                title={plan === 'free' ? "Upgrade to view history" : "View History"}
             >
                <div className="relative">
                  <History size={20} />
                  {plan === 'free' && <div className="absolute -top-1 -right-1 bg-slate-950 rounded-full"><Lock size={10} className="text-yellow-500"/></div>}
                </div>
                <span className="text-sm font-medium">History</span>
             </button>

             {plan === 'free' && (
               <button 
                onClick={() => setIsPricingOpen(true)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700"
               >
                 <Crown size={16} className="text-yellow-400" />
                 <span>Upgrade</span>
               </button>
             )}
          </div>
        </div>
      </header>

      <div className="text-center px-6 mb-12">
        <div className="inline-flex items-center justify-center space-x-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-full px-4 py-1.5 mb-6">
          <Zap size={14} className="text-yellow-400" fill="currentColor" />
          <span className="text-xs font-medium text-slate-300">Powered by Gemini 2.5 Flash</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Generate High-Converting Ads
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Upload your creative to instantly get <span className="text-indigo-400 font-medium">Meta-optimized</span> copy variations.
        </p>
      </div>

      <main className="container mx-auto px-4 md:px-6 max-w-5xl">

        {/* Info / Why this works - Carousel */}
        <FeatureCarousel />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Input */}
          <div className="space-y-6 md:sticky md:top-8">
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 mr-3 text-sm font-bold">1</span>
                  Upload Creative
                </h2>
                
                <ImageUpload 
                  onImageSelect={handleFileSelect}
                  selectedImage={selectedFile}
                  onClear={handleClear}
                  disabled={loadingState === LoadingState.ANALYZING}
                  isPro={isPro}
                />
              </div>

              {/* Custom Instructions (New Feature) */}
              <div>
                <InstructionInput 
                  value={customInstructions}
                  onChange={setCustomInstructions}
                  isPro={isPro}
                  onUpgrade={() => setIsPricingOpen(true)}
                  disabled={loadingState === LoadingState.ANALYZING}
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={!selectedFile || loadingState === LoadingState.ANALYZING}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300
                    ${!selectedFile 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : loadingState === LoadingState.ANALYZING
                        ? 'bg-indigo-600/50 text-white cursor-wait'
                        : isLimitReached 
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
                    }
                  `}
                >
                  {loadingState === LoadingState.ANALYZING ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Creative...
                    </>
                  ) : isLimitReached ? (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Daily Limit Reached (Upgrade)
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      {plan === 'free' ? `Generate Ad Copy (${FREE_LIMIT - generationCount} left)` : 'Generate Ad Copy'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 mr-3 text-sm font-bold">2</span>
                  Ad Copy Variations
                </h2>
                
                <div className="flex items-center space-x-3">
                  {/* Export Button (Gated) */}
                  <button
                    onClick={handleExportCSV}
                    className={`flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors
                      ${adCopies.length > 0 
                        ? 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600' 
                        : 'border-transparent text-slate-600 cursor-not-allowed'
                      }
                    `}
                    disabled={adCopies.length === 0}
                    title={plan === 'free' ? "Upgrade to Export CSV" : "Export to CSV"}
                  >
                     <div className="relative">
                        <Download size={14} />
                        {plan === 'free' && <div className="absolute -top-1 -right-1"><Lock size={8} className="text-yellow-500"/></div>}
                     </div>
                     <span className="hidden sm:inline">Export CSV</span>
                  </button>

                  {adCopies.length > 0 && (
                    <span className="text-sm text-slate-400 animate-in fade-in">
                      {adCopies.length} options
                    </span>
                  )}
                </div>
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
               <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center animate-in zoom-in-95">
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
