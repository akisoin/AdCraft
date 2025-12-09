import React, { useState } from 'react';
import { Check, X, Zap, Crown, Building2 } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'free' | 'pro' | 'agency') => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  if (!isOpen) return null;

  const handlePlanSelect = (plan: 'free' | 'pro' | 'agency') => {
    // In a real app, you would pass the billingCycle to the backend/stripe
    console.log(`Selected ${plan} with ${billingCycle} billing`);
    onUpgrade(plan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unlock High-Converting Ads
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your growth. Upgrade now to remove limits and access advanced AI models.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-10">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-7 bg-slate-800 rounded-full p-1 transition-colors border border-slate-700 hover:border-slate-600"
            >
              <div 
                className={`w-5 h-5 bg-indigo-500 rounded-full shadow-md transform transition-transform duration-300 ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`} 
              />
            </button>
            <span className={`text-sm font-medium flex items-center ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual
              <span className="ml-2 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wide">
                Save ~20%
              </span>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            
            {/* Free Plan */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
              <div className="mb-4 p-3 bg-slate-800/50 rounded-xl w-fit">
                <Zap className="text-slate-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Starter</h3>
              <div className="mt-2 mb-6 h-14">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">$0</span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                <div className="text-xs text-transparent select-none">Forever free</div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-slate-500 mr-3" /> 2 Generations / day
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-slate-500 mr-3" /> Standard Speed
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-slate-500 mr-3" /> Image & Video Support
                </li>
              </ul>
              <button 
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-colors"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-gradient-to-b from-indigo-900/20 to-slate-900 border border-indigo-500/50 rounded-2xl p-6 flex flex-col relative ring-1 ring-indigo-500/50 transform md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <div className="mb-4 p-3 bg-indigo-500/20 rounded-xl w-fit">
                <Crown className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Pro Creator</h3>
              <div className="mt-2 mb-6 h-14">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">
                    {billingCycle === 'monthly' ? '$29' : '$24'}
                  </span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="text-xs text-emerald-400 font-medium mt-1">
                    Billed $288 yearly (Save $60)
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-slate-200 text-sm">
                  <Check size={16} className="text-indigo-400 mr-3" /> <span className="font-semibold text-white mr-1">Unlimited</span> Generations
                </li>
                <li className="flex items-center text-slate-200 text-sm">
                  <Check size={16} className="text-indigo-400 mr-3" /> Video & Image Support
                </li>
                <li className="flex items-center text-slate-200 text-sm">
                  <Check size={16} className="text-indigo-400 mr-3" /> <span className="text-indigo-200 font-medium">Custom AI Instructions</span>
                </li>
                <li className="flex items-center text-slate-200 text-sm">
                  <Check size={16} className="text-indigo-400 mr-3" /> Export to CSV
                </li>
              </ul>
              <button 
                onClick={() => handlePlanSelect('pro')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
              >
                Start Free Trial
              </button>
            </div>

            {/* Agency Plan */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
              <div className="mb-4 p-3 bg-purple-500/10 rounded-xl w-fit">
                <Building2 className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Agency</h3>
              <div className="mt-2 mb-6 h-14">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">
                    {billingCycle === 'monthly' ? '$99' : '$79'}
                  </span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                {billingCycle === 'annual' && (
                   <div className="text-xs text-emerald-400 font-medium mt-1">
                    Billed $948 yearly (Save $240)
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-purple-400 mr-3" /> Unlimited Generations
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-purple-400 mr-3" /> Custom Brand Keywords
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-purple-400 mr-3" /> Direct Meta Integration
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <Check size={16} className="text-purple-400 mr-3" /> 5 Team Seats
                </li>
              </ul>
              <button 
                 onClick={() => handlePlanSelect('agency')}
                 className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-colors"
              >
                Contact Sales
              </button>
            </div>

          </div>
          
          <p className="mt-8 text-slate-500 text-sm">
            Secure payment via Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};
