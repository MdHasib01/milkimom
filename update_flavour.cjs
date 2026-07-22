const fs = require('fs');
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const targetToReplace = `                   {/* পছন্দের ফ্লেভার */}
                   <div>
                     <label className="block mb-3 text-base font-semibold text-gray-900">
                       পছন্দের ফ্লেভার <span className="text-red-500">*</span>
                     </label>
                     <div className="grid grid-cols-2 gap-3">
                       {FLAVOURS_DATA.map((f) => {
                         const isSelected = selectedFlavour === f.id;
                         return (
                           <div
                             key={f.id}
                             onClick={() => setSelectedFlavour(f.id)}
                             className={\`cursor-pointer rounded-xl p-3 border-2 transition-all duration-300 flex flex-col items-center justify-center text-center \${
                               isSelected 
                                 ? 'border-brand-magenta bg-brand-lightpink/10 shadow-sm scale-[1.02]' 
                                 : 'border-gray-100 hover:border-brand-magenta/20 bg-gray-50/50'
                             }\`}
                           >
                             <div className="scale-75 origin-center mb-1">
                               <f.IconComponent />
                             </div>
                             <span className={\`text-xs font-bold \${isSelected ? 'text-brand-magenta' : 'text-gray-700'}\`}>
                               {f.name}
                             </span>
                           </div>
                         );
                       })}
                     </div>
                   </div>`;

const replacement = `                   {/* Selected Flavour Display */}
                   <div>
                     <label className="block mb-3 text-base font-semibold text-gray-900">
                       Selected Flavour
                     </label>
                     <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                       {(() => {
                         const flavour = FLAVOURS_DATA.find(f => f.id === selectedFlavour);
                         return flavour ? (
                           <>
                             <div className="scale-75 origin-center shrink-0">
                               <flavour.IconComponent />
                             </div>
                             <div className="flex-1">
                               <span className="font-bold text-gray-900 text-sm">
                                 {flavour.name}
                               </span>
                               <p className="text-xs text-gray-500 mt-0.5">
                                 ফ্লেভার পরিবর্তন করতে উপরের ফ্লেভার সেকশন থেকে নির্বাচন করুন।
                               </p>
                             </div>
                           </>
                         ) : null;
                       })()}
                     </div>
                   </div>`;

if (code.includes(targetToReplace)) {
  code = code.replace(targetToReplace, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Successfully updated flavour selection');
} else {
  console.log('Could not find the target code block.');
}
