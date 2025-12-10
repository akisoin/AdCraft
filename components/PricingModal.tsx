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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Unlock High-Converting Ads
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your growth. Upgrade now to remove limits and access advanced AI models.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-10">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors border border-slate-300 hover:border-slate-400"
            >
              <div 
                className={`w-5 h-5 bg-indigo-600 rounded-full shadow-sm transform transition-transform duration-300 ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`} 
              />
            </button>
            <span className={`text-sm font-medium flex items-center ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual
              <span className="ml-2 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide">
                Save ~20%
              </span>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            
            {/* Free Plan */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
              <div className="mb-4 p-3 bg-white border border-slate-100 rounded-xl w-fit shadow-sm">
                <Zap className="text-slate-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <div className="mt-2 mb-6 h-14">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                <div className="text-xs text-transparent select-none">Forever free</div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-slate-400 mr-3" /> 2 Generations / day
                </li>
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-slate-400 mr-3" /> Standard Speed
                </li>
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-slate-400 mr-3" /> Image & Video Support
                </li>
              </ul>
              <button 
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-gradient-to-b from-indigo-50 to-white border border-indigo-200 rounded-2xl p-6 flex flex-col relative ring-1 ring-indigo-200 transform md:-translate-y-4 shadow-xl shadow-indigo-100">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                Most Popular
              </div>
              <div className="mb-4 p-3 bg-white border border-indigo-100 rounded-xl w-fit shadow-sm">
                <Crown className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pro Creator</h3>
              <div className="mt-2 mb-6 h-14">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900">
                    {billingCycle === 'monthly' ? '$29' : '$24'}
                  </span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="text-xs text-emerald-600 font-medium mt-1">
                    Billed $288 yearly (Save $60)
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-slate-700 text-sm">
                  <Check size={16} className="text-indigo-600 mr-3" /> <span className="font-semibold text-slate-900 mr-1">Unlimited</span> Generations
                </li>
                <li className="flex items-center text-slate-700 text-sm">
                  <Check size={16} className="text-indigo-600 mr-3" /> Video & Image Support
                </li>
                <li className="flex items-center text-slate-700 text-sm">
                  <Check size={16} className="text-indigo-600 mr-3" /> <span className="text-indigo-700 font-medium">Custom AI Instructions</span>
                </li>
                <li className="flex items-center text-slate-700 text-sm">
                  <Check size={16} className="text-indigo-600 mr-3" /> Export to CSV
                </li>
              </ul>
              <button 
                onClick={() => handlePlanSelect('pro')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
              >
                Start Free Trial
              </button>
            </div>

            {/* Agency Plan */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
              <div className="mb-4 p-3 bg-white border border-slate-100 rounded-xl w-fit shadow-sm">
                <Building2 className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Agency</h3>
              <div className="mt-2 mb-6 h-14">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900">
                    {billingCycle === 'monthly' ? '$99' : '$79'}
                  </span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                {billingCycle === 'annual' && (
                   <div className="text-xs text-emerald-600 font-medium mt-1">
                    Billed $948 yearly (Save $240)
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-purple-500 mr-3" /> Unlimited Generations
                </li>
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-purple-500 mr-3" /> Custom Brand Keywords
                </li>
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-purple-500 mr-3" /> Direct Meta Integration
                </li>
                <li className="flex items-center text-slate-600 text-sm">
                  <Check size={16} className="text-purple-500 mr-3" /> 5 Team Seats
                </li>
              </ul>
              <button 
                 onClick={() => handlePlanSelect('agency')}
                 className="w-full py-3 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
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