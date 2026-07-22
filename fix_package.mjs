import fs from 'fs';
let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

packageJson.scripts.dev = "tsx server.ts";
packageJson.scripts.build = "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs";
packageJson.scripts.start = "node dist/server.cjs";

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json updated');
