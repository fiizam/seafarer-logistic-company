import React, { useState, useEffect } from 'react';

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [freightType, setFreightType] = useState('ocean');
  const [cargoWeight, setCargoWeight] = useState(1000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  
  const [lang, setLang] = useState<'en'|'id'>('en');
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/id')) {
      setLang('id');
    }
  }, []);

  const calculatePrice = () => {
    setIsCalculating(true);
    setStep(3);
    
    // Fake calculation
    setTimeout(() => {
      let base = 500;
      if (freightType === 'air') base = 1500;
      if (freightType === 'land') base = 300;
      
      const total = base + (cargoWeight * 0.5);
      setEstimatedPrice(total);
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-navy-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 md:w-[500px] md:h-[500px] bg-electric/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">{lang === 'id' ? 'Kalkulator Penawaran Instan' : 'Instant Quote Calculator'}</h3>
          <p className="text-slate-400 mb-8 max-w-md">{lang === 'id' ? 'Dapatkan perkiraan biaya untuk kiriman Anda seketika berdasarkan data logistik global real-time.' : 'Get a precise estimate for your shipping needs instantly. Our algorithm calculates costs based on real-time global logistics data.'}</p>
          
          <div className="flex gap-2 mb-8">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-electric' : 'bg-slate-700'}`}></div>
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-electric' : 'bg-slate-700'}`}></div>
            <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-electric' : 'bg-slate-700'}`}></div>
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h4 className="text-xl font-bold mb-6">{lang === 'id' ? 'Pilih Jenis Angkutan' : 'Select Freight Type'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'ocean', en: 'Ocean', idLang: 'Laut' },
                  { id: 'air', en: 'Air', idLang: 'Udara' },
                  { id: 'land', en: 'Land', idLang: 'Darat' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFreightType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                      freightType === type.id ? 'border-electric bg-electric/10' : 'border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="capitalize font-semibold">{lang === 'id' ? type.idLang : type.en}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-electric hover:bg-electric-hover text-white py-4 rounded-xl font-bold transition-all"
              >
                {lang === 'id' ? 'Langkah Berikutnya' : 'Next Step'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h4 className="text-xl font-bold mb-6">{lang === 'id' ? 'Detail Kargo' : 'Cargo Details'}</h4>
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-400 mb-2">{lang === 'id' ? 'Total Berat (kg)' : 'Total Weight (kg)'}</label>
                <input 
                  type="range" 
                  min="100" max="10000" step="100"
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(Number(e.target.value))}
                  className="w-full accent-electric"
                />
                <div className="text-right text-electric font-bold mt-2 text-xl">{cargoWeight} kg</div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-xl font-bold border border-slate-700 hover:bg-slate-800 transition-all"
                >
                  {lang === 'id' ? 'Kembali' : 'Back'}
                </button>
                <button 
                  onClick={calculatePrice}
                  className="flex-1 bg-electric hover:bg-electric-hover text-white py-4 rounded-xl font-bold transition-all"
                >
                  {lang === 'id' ? 'Hitung Harga' : 'Calculate Price'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in text-center py-8">
              {isCalculating ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-slate-700 border-t-electric rounded-full animate-spin mb-6"></div>
                  <h4 className="text-xl font-bold animate-pulse">{lang === 'id' ? 'Menghitung rute optimal...' : 'Calculating optimal route...'}</h4>
                </div>
              ) : (
                <div>
                  <h4 className="text-slate-400 mb-2 uppercase tracking-wider font-semibold">{lang === 'id' ? 'Perkiraan Biaya' : 'Estimated Cost'}</h4>
                  <div className="text-6xl font-extrabold text-electric mb-6 flex items-start justify-center">
                    <span className="text-3xl mt-1 mr-1">$</span>
                    {estimatedPrice.toLocaleString()}
                  </div>
                  <p className="text-slate-400 mb-8">{lang === 'id' ? 'Ini adalah perkiraan. Harga akhir dapat bervariasi berdasarkan biaya bahan bakar tambahan dan biaya pabean.' : 'This is an estimate. Final pricing may vary based on fuel surcharges and customs fees.'}</p>
                  <button 
                    onClick={() => setStep(1)}
                    className="bg-white text-navy-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition-all"
                  >
                    {lang === 'id' ? 'Hitung Ulang' : 'Recalculate'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
