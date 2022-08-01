import { readdir, readFile, mkdir, copyFile, writeFile } from 'fs/promises';
import { exec } from 'child_process';
import Item from '../src/types/Item';

const allItems: Item[] = [];

const gameDataDirs = await readdir('./data/');

await Promise.all(
  gameDataDirs.map(async gameId => {
    const items = JSON.parse(
      await readFile(`./data/${gameId}/items.json`, 'utf-8')
    ) as Item[];

    await Promise.all(
      items.map(async item => {
        console.log('item', item.name);
        item.sprite = `./items/img/${gameId}/${item.name}.png`;

        await mkdir(`./items/img/${gameId}`, { recursive: true });
        await copyFile(`./data/${gameId}/img/${item.name}.png`, item.sprite);
      })
    );

    allItems.push(...items);
  })
);

await writeFile('./items/items.json', JSON.stringify(allItems));

exec('chmod +r ./items/**/*');

console.log('Done.');
