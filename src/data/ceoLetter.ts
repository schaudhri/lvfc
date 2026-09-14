/**
 * The CEO's letter, shown in full on the "New to LVFC" page.
 *
 * Supplied by the client (Sept 2026) and reproduced verbatim — edit only with
 * the club's sign-off. The portrait is Hamza's own photo (supplied Sept 2026 as
 * `assets/images/hamza-letter.jpg`, served as a resized WebP).
 */

import type { Image } from "@/data/clubPhotos";

export const ceoLetter: {
  author: { name: string; role: string; image: Image };
  paragraphs: string[];
} = {
  author: {
    name: "Hamza Syed",
    role: "Chief Executive Officer, Lahore Virgil FC",
    image: {
      src: "/images/hamza-letter.webp",
      alt: "Hamza Syed, Chief Executive Officer of Lahore Virgil FC",
    },
  },
  paragraphs: [
    "Growing up, visiting Pakistan as a kid, nana nani, dada dadi, as you do, I saw a gigantic opportunity waiting to be closed.",
    "Every cousin, every friend I used to hang out and play with, everyone my age, they all watched football, kept up to date with the Champions League, the Premier League, who's playing well, who's not, who's in form. Just like my friends back home in Britain.",
    "What there was, was no platform. No clubs, no youth tournaments, no leagues, no weekend fixtures. It was just a complete darkness. The love for the game was real, it was visceral, but there was nowhere to take it.",
    "That observation never left me.",
    "We started with a simple belief: young footballers in Pakistan deserve the same structure, coaching quality, and opportunity that kids get at proper clubs anywhere else in the world. A complete pathway for players aged 2 to 18, a curriculum that takes the best of European development standards and combines them with local knowledge, local understanding, and local brilliance, because the talent and the football intelligence here is real.",
    "And that brings me to what matters most to me. Bringing in international coaches was never just about what they could do with the kids in front of them. One international coach can work with 15 kids. But 10 empowered, well-trained Pakistani coaches can reach 100. My key mission is to develop Pakistani coaches into the best versions of themselves, so they can go on to coach the next generation with the same quality and care you would find anywhere in the world. We are here to build a coaching culture that outlasts any single person or programme.",
    "The real measure of success is not just what happens on the pitch today, but whether we leave behind something rooted in best practice, child pedagogy, and child safeguarding, areas that have for too long been overlooked in Pakistani football.",
    "Every child that walks through our gates is a whole, well-rounded individual first, and a footballer second. That principle sits behind every decision we make.",
  ],
};
