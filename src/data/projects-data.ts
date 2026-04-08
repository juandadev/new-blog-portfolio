import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'a2246b82-f4fa-48d7-a819-23d1b0d2adaa',
    name: 'Pokémon Stats',
    slug: 'pokemon-stats',
    shortDescription:
      "A web app to visualize a Pokémon's type and evolution chain details, plus an interactive chart to compare type weaknesses and strengths.",
    technologies: ['React', 'Next.js', 'Bootstrap', 'PokéAPI', 'Vercel'],
    applicationType: 'WEB',
    demoUrl: 'https://pokemonstats.com/',
    githubUrl: 'https://github.com/juandadev/pokemonstats',
    postTitle: 'Pokémon Stats: A Pokédex made for casual players',
    date: '2021-12-29T14:57:28Z',
    coverImage:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/projects/pokemon-stats/cover.webp',
    content: `## 🕹 Context and personal motivation

Throughout my life, I've played several Pokémon games (not competitively, just casually), and I often found myself pausing mid-game to look up type charts, Pokémon data, or evolution chains. Even though many websites gather this information, most of them aren't optimized to quickly find what I need, or show data that, as a *non-competitive player*, wasn't useful to me.

That's how **Pokémon Stats** was born, a web app built from scratch with the goal of having all this relevant info just a few clicks away, both on desktop and mobile. It was my first web project with a **real purpose and continuous personal use**.

:::default
##### Tech Stack

- **Frontend:** Next.js 12, React 17, Bootstrap 5 (for faster prototyping)
- **Data:** PokéAPI  
- **Deployment:** Vercel
:::

## 🎨 Main features

- Search by name or National Pokédex number  
- Type and weakness visualization through an **interactive table** with buttons  
- **Evolution chain** display  
- Support for Pokémon variants (Alola, Galar, etc.)  
- High-quality images from the official Pokémon site with 2D sprite fallback  
- **Search with suggestions and keyboard navigation**

## 🎓 What I learned (and struggled with)

### 1. Smart table rendering

One of the first lessons I learned was using **two-dimensional arrays** to build a type-effectiveness table. With interactive buttons that highlight on \`hover\`, it was a great exercise in relative positioning, \`event.target\` handling, and coordinate calculation within a grid.

### 2. Smart search suggestions

The search doesn't just match from the start of a word, it detects any substring in the name. I implemented a suggestion system using a local array of names to avoid overloading the API (balancing UX and performance).

### 3. Recursive evolution chain

One of the toughest challenges was fetching and displaying the evolution chain. The PokéAPI requires several nested calls, so I used a recursive function to navigate the data structure. This became a key moment in my learning about recursion in JavaScript.

### 4. Exception handling

I had to create custom conditional structures to support:

- Regional forms  
- Gender differences (e.g., Nidoran)  
- Evolution variants (Lycanroc, Oricorio, etc.)

### 5. API optimization and responsible usage

I realized the importance of minimizing unnecessary calls to free APIs. I moved some data to local arrays, like Pokémon names or alternate Pokédex numbers.

### 6. UI/UX focused on real usability

This project came from a genuine personal need, which gave me a more critical eye for designing user experiences. Even though I started with Bootstrap, I've iterated over many visual details that show progressive improvement.

## ✅ Things I still want to improve

- Reduce API calls for fetching evolution chains  
- Better handling of error/success states in the UI  
- Add extra info through tooltips or popups to avoid clutter  
- Include full visual support for variants within evolution chains

## 💬 Final thoughts

This isn't the most advanced or complex project I've built, but it's **the most meaningful**. It was made with passion, and above all, with the real need to solve an everyday problem for myself as a player. It helped me deepen my understanding of asynchronous data handling, recursion, API best practices, and user-centered interface design.

> "If you can build a tool that improves your gaming experience, why not do it?"

:::warning
##### Legal disclaimer

This site is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company. All images, names, and references are the property of their respective owners. This site is a non-profit fan project made by and for fans.
:::`,
    featured: true,
    createdAt: '2025-06-30T15:05:07Z',
    updatedAt: '2025-06-30T15:05:06Z',
  },
];
