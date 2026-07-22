import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const target = `                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Product:</span>
                            <span className="font-bold text-gray-900">Milkimom Complete Dose</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Selected Flavour:</span>
                            <span className="font-bold text-gray-900">{FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-bold text-gray-900">Cash on Delivery</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Product Price:</span>
                            <span className="font-bold text-gray-900 bengali-num">৳৪৯৯০</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Delivery:</span>
                            <span className="font-bold text-gray-900">{isFreeDelivery ? 'FREE' : '৳১৫০'}</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-gray-900 font-bold">Total:</span>
                            <span className="font-bold text-brand-magenta bengali-num text-lg">৳{toBengaliNum(totalPrice)}</span>
                          </div>
                        </div>`;

const replacement = `                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Product:</span>
                            <span className="font-bold text-gray-900">Milkimom Complete Dose</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Flavour:</span>
                            <span className="font-bold text-gray-900">{FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Payment:</span>
                            <span className="font-bold text-gray-900">Cash on Delivery</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-gray-900 font-bold">Total:</span>
                            <span className="font-bold text-brand-magenta bengali-num text-lg">৳{toBengaliNum(totalPrice)}</span>
                          </div>
                        </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Fixed COD details.');
} else {
  console.log('Target not found for COD details.');
}
