const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('.');
files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.jsx')) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    if (content.includes('\`')) {
      content = content.replace(/\`/g, '`');
      modified = true;
    }
    if (content.includes('\${')) {
      content = content.replace(/\\${/g, '${');
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed', file);
    }
  }
});
