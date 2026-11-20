/**
 * OUR LOVE STORY – 25 YEARS OF MEMORIES
 * 
 * Interactive storytelling timeline data.
 * All milestones and associated photographs are easily configurable here.
 */

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: "milestone-1",
    year: "2001",
    title: "The Beginning",
    subtitle: "Where two paths became one",
    description: "The beautiful beginning of a lifetime companionship. Two hearts joined hands with eternal promises and blessings from family.",
    image: "/images/story/wedding-day.jpg",
    imageAlt: "2001 – The Beginning",
  },
  {
    id: "milestone-2",
    year: "2001",
    title: "The Day Two Hearts Became One",
    subtitle: "Sacred vows & timeless promises",
    description: "Surrounded by sacred rituals, music, and tears of joy, a bond for seven lifetimes was sealed with grace and devotion.",
    image: "/images/story/wedding-day.jpeg",
    imageAlt: "The Day Two Hearts Became One",
  },
  {
    id: "milestone-3",
    year: "2009",
    title: "A Beautiful Memory",
    subtitle: "Laughter, family & new joys",
    description: "Welcoming new smiles, tiny footsteps, and cozy evenings. Every ordinary day turned into an extraordinary chapter of warmth.",
    image: "/images/story/memory-1.JPG",
    imageAlt: "A Beautiful Memory",
  },
  {
    id: "milestone-4",
    year: "2014",
    title: "Growing Together",
    subtitle: "Through every season of life",
    description: "Standing shoulder to shoulder through every challenge, triumph, celebration, and life transition. An unshakeable foundation of love.",
    image: "/images/story/memory-2.jpg",
    imageAlt: "Growing Together",
  },
  {
    id: "milestone-5",
    year: "2026",
    title: "25 Years of Togetherness",
    subtitle: "Our Silver Jubilee Celebration",
    description: "A quarter century of unconditional devotion, laughter, and family. Today we celebrate the beautiful story that brought us all together.",
    image: "/images/story/family.jpg",
    imageAlt: "2026 – 25 Years of Togetherness",
  },
];
