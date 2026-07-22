import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const target = `            </motion.div>
          </div>
        </div>
      )}</AnimatePresence>`;

const replacement = `            </motion.div>
          </div>
        )}
      </AnimatePresence>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Fixed extra div');
} else {
  console.log('Target not found');
}
