/**
 * PHOTO GALLERY DATA: A JOURNEY THROUGH MEMORIES
 * 
 * Categories:
 * - "wedding": Wedding Memories
 * - "family": Family Moments
 * - "celebrations": Celebrations
 * - "precious": Precious Memories
 */

export type GalleryCategory = 'all' | 'wedding' | 'family' | 'celebrations' | 'precious';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'wedding' | 'family' | 'celebrations' | 'precious';
  year?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Memories' },
  { id: 'wedding', label: 'Wedding Memories' },
  { id: 'family', label: 'Family Moments' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'precious', label: 'Precious Memories' },
];

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: "photo-01",
    src: "/images/gallery/photo-01.jpeg",
    title: "The Sacred Vows",
    caption: "The beginning of a timeless story, blessed by holy chants and family love.",
    category: "wedding",
    year: "2001",
    aspect: "portrait",
  },
  {
    id: "photo-02",
    src: "/images/gallery/photo-02.jpeg",
    title: "Golden Beginnings",
    caption: "Early smiles, shared dreams, and the quiet comfort of being together.",
    category: "precious",
    year: "2002",
    aspect: "landscape",
  },
  {
    id: "photo-03",
    src: "/images/gallery/photo-03.jpeg",
    title: "First Steps of Parenthood",
    caption: "Welcoming little footsteps and endless warmth into our home.",
    category: "family",
    year: "2005",
    aspect: "square",
  },
  {
    id: "photo-04",
    src: "/images/gallery/photo-04.jpeg",
    title: "Wanderlust",
    caption: "Carefree holidays, exploring new horizons together.",
    category: "precious",
    year: "2008",
    aspect: "landscape",
  },
  {
    id: "photo-05",
    src: "/images/gallery/photo-05.jpg",
    title: "Diwali Lights",
    caption: "Festive laughter surrounded by clay lamps, sweets, and family warmth.",
    category: "celebrations",
    year: "2010",
    aspect: "portrait",
  },
  {
    id: "photo-06",
    src: "/images/gallery/photo-06.JPG",
    title: "A Decade of Harmony",
    caption: "Ten years in, their bond shone even brighter with trust and devotion.",
    category: "wedding",
    year: "2011",
    aspect: "portrait",
  },
  {
    id: "photo-07",
    src: "/images/gallery/photo-07.JPG",
    title: "Family Reunions",
    caption: "A heart full of laughter, music, and home-cooked feasts.",
    category: "family",
    year: "2014",
    aspect: "landscape",
  },
  {
    id: "photo-08",
    src: "/images/gallery/photo-08.JPG",
    title: "Satyanaran Pooja",
    caption: "The sweetest moments are often unexpected.",
    category: "precious",
    year: "2016",
    aspect: "square",
  },
  {
    id: "photo-09",
    src: "/images/gallery/photo-09.jpeg",
    title: "Milestone Celebrations",
    caption: "Anniversaries and achievements cheered with love and gratitude.",
    category: "celebrations",
    year: "2019",
    aspect: "portrait",
  },
  {
    id: "photo-10",
    src: "/images/gallery/photo-10.jpeg",
    title: "Proud Parents",
    caption: "Beaming with pride celebrating their children's milestones.",
    category: "family",
    year: "2022",
    aspect: "landscape",
  },
  {
    id: "photo-11",
    src: "/images/gallery/photo-11.jpeg",
    title: "Love That Deepens",
    caption: "Through thick and thin, standing hand in hand as best friends.",
    category: "precious",
    year: "2024",
    aspect: "portrait",
  },
  {
    id: "photo-12",
    src: "/images/gallery/photo-12.jpeg",
    title: "The Silver Jubilee",
    caption: "25 years down, ready for the golden road ahead.",
    category: "celebrations",
    year: "2026",
    aspect: "landscape",
  },
];
