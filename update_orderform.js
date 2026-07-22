const fs = require('fs');
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const startMarker = '{/* My Milkimom Summary Card (Ownership Effect) */}';
const endMarker = '{/* Form Area */}';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found');
  process.exit(1);
}

const replacement = `{step >= 7 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-16 bg-brand-cream/50 border border-brand-peach/20 rounded-2xl p-5 sm:p-6 text-center shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              <span className="text-rose-500 mr-1.5">❤️</span>
              আপনার যাত্রা প্রায় সম্পন্ন।
            </h3>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              শুধু আপনার তথ্য দিলেই<br/>
              আপনার Milkimom সংরক্ষণ করা হবে।
            </p>
          </motion.div>
        )}

        `;

const newCode = code.slice(0, startIndex) + replacement + code.slice(endIndex);
fs.writeFileSync('src/components/OrderForm.tsx', newCode);
console.log('Successfully replaced');
