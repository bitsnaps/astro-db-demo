# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## AstroDB
Installation:
```
npx astro add db
````

There are two ways to create a project in Astro Studio:

1- Use the Astro Studio web UI to create from a new or existing GitHub repository.
To get started, click the “create project” button in the header and follow the instructions. Astro Studio will connect to your GitHub repository and create a new hosted database for your project.

2- Use the Astro Studio CLI to create from any local Astro project. You can run the following commands to get started:
``` 
# Log in to Astro Studio with your GitHub account
npx astro login

# Link to a new project by following the prompts
npx astro link

# (Optional) Push your local db configuration to the remote database
npx astro db push
```

Define a DB at `db/config.ts`:
```js
import { defineDb } from 'astro:db';

export default defineDb({
  tables: { },
})
```

You can also create tables:
```js
import { defineDb, defineTable, column } from 'astro:db';

const Comment = defineTable({
  columns: {
    author: column.text(),
    body: column.text(),
  }
})

export default defineDb({
  tables: { Comment },
})
```

Seed data `db/seed.ts`:
```js
import { db, Comment } from 'astro:db';

export default async function() {
  await db.insert(Comment).values([
    { authorId: 1, body: 'Hope you like Astro DB!' },
    { authorId: 2, body: 'Enjoy!'},
  ])
}
```

Select data `src/pages/index.astro`:
```js
---
import { db, Comment } from 'astro:db';

const comments = await db.select().from(Comment);
---

<h2>Comments</h2>

{
  comments.map(({ author, body }) => (
    <article>
      <p>Author: {author}</p>
      <p>{body}</p>
    </article>
  ))
}
```

Insert data `src/pages/index.astro`:
```js
---
import { db, Comment } from 'astro:db';

if (Astro.request.method === 'POST') {
  // parse form data
  const formData = await Astro.request.formData();
  const author = formData.get('author');
  const content = formData.get('content');
  if (typeof author === 'string' && typeof content === 'string') {
    // insert form data into the Comment table
    await db.insert(Comment).values({ author, content });
  }
}

// render the new list of comments on each request
const comments = await db.select().from(Comment);
---

<form method="POST" style="display: grid">
  <label for="author">Author</label>
  <input id="author" name="author" />

  <label for="content">Content</label>
  <textarea id="content" name="content"></textarea>

  <button type="submit">Submit</button>
</form>

<!--render `comments`-->
```


Push table schema:
```
npm run astro db push --remote

# or

npm run astro db push --remote --force-reset
```


Connect to Astro Studio:
```
# Build with a remote connection
astro build --remote

# Develop with a remote connection
astro dev --remote
```


Read more at [AstroDB](https://docs.astro.build/en/guides/astro-db/).