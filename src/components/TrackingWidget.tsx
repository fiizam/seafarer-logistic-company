import React, { useState, useEffect } from 'react';

export default function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');
  const [lang, setLang] = useState<'en'|'id'>('en');

  useEffect(() => {
    if (window.location.pathname.startsWith('/id')) {
      setLang('id');
    }
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setStatus('loading');
    setTimeout(() => {
      if (trackingNumber.toUpperCase().startsWith('SEA')) {
        setStatus('found');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  const steps = [
    { label: 'Origin Port', location: 'Shanghai, CN', date: 'Aug 01, 2026', time: '08:45 AM', completed: true },
    { label: 'Customs Cleared', location: 'Shanghai, CN', date: 'Aug 02, 2026', time: '14:20 PM', completed: true },
    { label: 'Ocean Transit', location: 'Pacific Ocean', date: 'In Progress', time: '--:--', completed: false, active: true },
    { label: 'Destination Port', location: 'Los Angeles, US', date: 'Est. Aug 15', time: '--:--', completed: false },
    { label: 'Final Delivery', location: 'Warehouse Facility', date: 'Pending', time: '--:--', completed: false }
  ];

  return (
    <div className={`transition-all duration-700 ease-in-out mx-auto shadow-2xl rounded-3xl border border-white/20 backdrop-blur-xl ${
      status === 'found' ? 'bg-white/95 max-w-4xl' : 'bg-white/80 max-w-3xl'
    }`}>
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-electric/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="p-6 md:p-10 relative z-10">
        
        {/* Header and Input Row */}
        <div className={`flex flex-col ${status === 'found' ? 'md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-6' : 'gap-6'}`}>
          <div className={status === 'found' ? 'mb-4 md:mb-0' : 'text-center mb-2'}>
            <h3 className="text-2xl font-extrabold text-navy-900 tracking-tight">
              {lang === 'id' ? 'Lacak Kiriman' : 'Track Shipment'}
            </h3>
            {status !== 'found' && (
              <p className="text-slate-500 text-sm mt-2 font-medium">
                {lang === 'id' ? 'Masukkan nomor resi atau bill of lading Anda' : 'Enter your tracking or bill of lading number'}
              </p>
            )}
          </div>

          <form onSubmit={handleTrack} className={`flex gap-3 ${status === 'found' ? 'w-full md:w-auto' : 'w-full'}`}>
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-electric">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="e.g., SEA-123456" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-electric focus:ring-4 focus:ring-electric/10 outline-none transition-all font-bold text-navy-900 placeholder:font-medium placeholder:text-slate-400 ${
                  status === 'found' ? 'md:w-64' : 'w-full'
                }`}
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-navy-900 hover:bg-electric text-white px-8 py-3.5 rounded-xl font-bold transition-all disabled:opacity-70 flex items-center justify-center min-w-[140px] shadow-lg shadow-navy-900/20"
            >
              {status === 'loading' ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Track'
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 rounded-xl flex items-center gap-3 animate-fade-in text-sm font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Tracking number not found. Please verify and try again.
          </div>
        )}

        {/* Result State */}
        {status === 'found' && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap justify-between items-end mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Waybill / Tracking No.</p>
                <h4 className="font-black text-navy-900 text-2xl tracking-tight">{trackingNumber.toUpperCase()}</h4>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  In Transit
                </div>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Estimated Arrival</p>
                <p className="font-black text-electric text-xl">Aug 15, 2026</p>
                <p className="text-sm font-semibold text-slate-500">By 18:00 Local Time</p>
              </div>
            </div>

            {/* Horizontal Timeline for Desktop, Vertical for Mobile */}
            <div className="relative pt-4 pb-8 overflow-x-auto hide-scrollbar">
              <div className="w-full md:min-w-[600px] relative">
                
                {/* Background Line */}
                <div className="absolute left-8 right-8 top-5 h-1 bg-slate-200 rounded-full"></div>
                {/* Active Progress Line */}
                <div className="absolute left-8 top-5 h-1 bg-electric rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>

                <div className="flex justify-between relative z-10">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center w-32 text-center group">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        step.completed 
                          ? 'bg-electric border-white shadow-md text-white' 
                          : step.active 
                            ? 'bg-white border-electric text-electric shadow-lg ring-4 ring-electric/20' 
                            : 'bg-white border-slate-200 text-slate-300'
                      }`}>
                        {step.completed ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : step.active ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className={`text-xs uppercase tracking-wider font-bold mb-1 ${step.completed || step.active ? 'text-navy-900' : 'text-slate-400'}`}>
                          {step.label}
                        </h4>
                        <p className={`text-sm font-semibold ${step.completed || step.active ? 'text-slate-600' : 'text-slate-400'}`}>
                          {step.location}
                        </p>
                        <div className="text-xs text-slate-400 font-medium mt-1">
                          <p>{step.date}</p>
                          <p>{step.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
