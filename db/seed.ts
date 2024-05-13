import { db, Comment } from 'astro:db';

// https://astro.build/db/seed
export default async function () {
  await db.insert(Comment).values([
    { author: 'ali', body: 'Hope you like Astro DB!' },
    { author: 'karim', body: 'Enjoy!' },
  ]);
}
