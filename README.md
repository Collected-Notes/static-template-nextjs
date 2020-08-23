# Collected Notes - Static Site Template with Next.js

This template is based on the Next.js JavaScript framework, and allows you to build a static website that can be updated automatically when notes are added or updated on your Collected Notes account.

## Features

- **Incremental Regeneration** - Deploy once and get incremental updates on your site everytime you create or update notes.
- **Dark Mode Support** - Detect from system preference and per-site support user preference.
- **Search** - Search between all of your notes.
- **Links on the note** - List all the links used at the bottom of each note.
- **Easy to customize** - Create a new repo based on this one and start customizing the look & feel.

## How to create your static website

### Requirements

- A [Collected Notes](https://collectednotes.com/blog/premium) premium account.
- A [Vercel](https://vercel.com) account.

## Step 1: Create your deployment

Make sure you have created a Collected Notes premium account. Then go to your site settings and click on “Create static website” it should take you to the [static deployments page](https://collectednotes.com/sites/static).

**Click on the vercel button:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FCollected-Notes%2Fstatic-template-nextjs&env=CN_TOKEN,CN_EMAIL,CN_SITE_PATH&envDescription=These%20variables%2C%20are%20required%20to%20read%20your%20site%20data%20from%20the%20Collected%20Notes%20API.&envLink=https%3A%2F%2Fcollectednotes.com%2Faccounts%2Fme%2Ftoken)

Follow the steps. When prompted to enter your environmental variables use the ones that show up on the [static deployments page](https://collectednotes.com/sites/static).

These environment variables are:

- `CN_TOKEN` - Your Collected Notes API token, get it going to https://collectednotes.com/accounts/me/token (needs a Premium account).
- `CN_EMAIL` - The email address you are using for Collected Notes.
- `CN_SITE_PATH` - The path of your site in Collected Notes (e.g. for https://collectednotes.com/blog use `blog`).

---

## Customize your static website

If you want to customize the design of your static website, you can use this repository as a quick starter, in that case go to this URL https://github.com/Collected-Notes/static-template-nextjs/ and clone it.

Once you have the repo, you can start editing the files, below you can find more documentation on how the stack works:

### Stack

These are the main technologies used to build the project

- [TypeScript](https://www.typescriptlang.org)
- [React.js](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [SWR](https://swr.vercel.app)
- [React Icons](https://react-icons.github.io/react-icons/)
- [useDarkMode](https://github.com/donavon/use-dark-mode)

### File Structure

The code is inside two main folders

- `public`
- `src`

Inside `public` there is a single `dark-mode.js`, this file is loaded first and avoid a flash of different styles between the HTML generated and the correct color schema.

Inside `src` you can find the `style.css` with global styles and `types.d.ts` with the types the different pages and layouts uses.

Then, there are more folders inside `src`

- `component` - Hre live the few reusable components, all in TypeScript and using CSS Modules with Tailwind `@apply` directive to style them.
- `layouts` - Here you can edit the layouts of the three different type of pages (_article_, _home_ and _search_), they are also in TypeScript and CSS Modules with Tailwind.
- `pages` - Pages import the layouts and are in charge of fetching the required data for each one, inside this folder you can find a custom API endpoint used to support the search feature.
- `queries` - Here there is a single custom Hook built on top of SWR to request the `/api/search` endpoint.
