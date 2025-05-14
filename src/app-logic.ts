import fs from 'node:fs';
import { yarg } from './config/plugins/yargs.plugin';

const {b: base, l: limit, s: showTable} = yarg;
const headerMessage =`
=====================================
         Tabla del ${base}
=====================================\n`;

const multiplicationTable = () => {
  let content = '';
    content = headerMessage;
    if (showTable) console.log(headerMessage);
    for (let i = 1; i <= limit; i++) {
      if (showTable) console.log(`${base} x ${i} = ${base * i}`);
      content += `${base} x ${i} = ${base * i} \n`;
    }

    const outputPath = `outputs`

    try {
      fs.mkdirSync(outputPath, {recursive: true});
      fs.writeFileSync(`./${outputPath}/tabla-${base}.txt`, content);
    } catch (err) {
      console.error(err);
    }
    console.log('File created!');
    
}

multiplicationTable();







