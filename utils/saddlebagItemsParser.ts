import fs from 'fs';
fs.readFile('./utils/items.json', 'utf8', (err, data) => {
  const jsonItemData = JSON.parse(data);
  console.log(jsonItemData);
});
