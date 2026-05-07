const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const nodeModulesDir = path.join(projectRoot, 'node_modules');

function walkDirectory(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(entryPath, callback);
    } else if (entry.isFile()) {
      callback(entryPath);
    }
  }
}

function fixFile(filePath) {
  const ext = path.extname(filePath).slice(1); // 'mjs' or 'cjs'
  const content = fs.readFileSync(filePath, 'utf8');
  const wrongSourceMap = `//# sourceMappingURL=vision_bundle_${ext}.js.map`;
  const correctSourceMap = `//# sourceMappingURL=vision_bundle.${ext}.map`;
  let didChange = false;

  if (content.includes(wrongSourceMap)) {
    fs.writeFileSync(filePath, content.replace(new RegExp(wrongSourceMap, 'g'), correctSourceMap), 'utf8');
    didChange = true;
  }

  const goodMapPath = `${filePath}.map`;
  const badMapPath = path.join(path.dirname(filePath), `vision_bundle_${ext}.js.map`);

  if (fs.existsSync(goodMapPath) && !fs.existsSync(badMapPath)) {
    fs.copyFileSync(goodMapPath, badMapPath);
    didChange = true;
  }

  return didChange;
}

let fixedCount = 0;
let scannedCount = 0;

walkDirectory(nodeModulesDir, (filePath) => {
  if (/vision_bundle\.(mjs|cjs)$/.test(filePath)) {
    scannedCount += 1;
    if (fixFile(filePath)) {
      fixedCount += 1;
      console.log(`Fixed ${filePath}`);
    }
  }
});

console.log(`Scanned ${scannedCount} vision_bundle files.`);
console.log(`Fixed ${fixedCount} files.`);

if (fixedCount === 0) {
  console.log('No fixes were required.');
}