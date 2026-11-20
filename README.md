# 💍 Silver Jubilee — 25th Wedding Anniversary Interactive Invitation

An ultra-luxurious, cinematic, interactive digital invitation website designed to celebrate **25 Years of Togetherness** for our parents. Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, mobile-first for WhatsApp sharing, and ready for instant deployment to **Vercel**.

---

## 🎨 Theme & Visual Design
- **Theme**: Royal Silver Jubilee ("25 Years of Love – A Silver Jubilee Celebration")
- **Palette**:
  - Silver (`#C0C0C0`)
  - Champagne (`#E8DCC5`)
  - Ivory (`#FFFDF8`)
  - Deep Charcoal (`#171717`)
  - Soft White (`#FFFFFF`)
  - Midnight Velvet (`#0D0E12`)
- **Typography**: *Playfair Display* & *Cinzel* for headings, *Alex Brush* for romantic vows, *Plus Jakarta Sans* for clean body text.

---

## ⚙️ 1. Changing Names & Event Details

All configuration is centralized in **one single file**:
👉 **[`src/data/anniversaryConfig.ts`](./src/data/anniversaryConfig.ts)**

Open this file and replace the values in brackets `[LIKE_THIS]`:

```typescript
export const anniversaryConfig = {
  couple: {
    fatherName: "Pankaj Tokekar",
    motherName: "Mrunal Tokekar",
    heroImage: "/images/parents-hero.jpg"
  },

  event: {
    title: "Silver Jubilee Celebration",
    subTitle: "Celebrating 25 Years of Togetherness",
    date: "2026-11-28",
    formattedDate: "28 November 2026",
    day: "Saturday",
    time: "7:00 PM onwards",
    venue: "Grand Ballroom, The Oberoi",
    address: "Nariman Point, Mumbai, Maharashtra 400021",
    mapsUrl: "https://maps.google.com/?q=The+Oberoi+Mumbai",
    timezone: "Asia/Kolkata",
    dressCode: "Royal Silver, Champagne, or Black Tie",
    targetDateTimeIso: "2026-11-28T19:00:00+05:30"
  },

  hosts: {
    familyName: "The Sharma Family",
    contactPerson: "Aarav Sharma",
    whatsappNumber: "919876543210" // Digits only with country code
  },

  messages: {
    tagline: "Twenty-Five Years of Togetherness",
    subtitle: "A journey of love, laughter, memories and forever.",
    familyMessageHeading: "With Love From Our Family",
    familyMessage: "Twenty-five years of love, sacrifices, laughter and countless memories...",
    personalMessageFromChildren: "To our dearest parents...",
    closingBlessing: "25 Years Down, Forever To Go."
  }
};
```

---

## 📸 2. Adding Photographs

Simply drop your photos into the `public/images/` directory:

| Section | Image File Path | Recommended Dimensions |
| :--- | :--- | :--- |
| **Hero Photo** | `public/images/parents-hero.jpg` | 1920 × 1080 (High resolution) |
| **Open Graph (WhatsApp Preview)** | `public/images/og-anniversary.jpg` | 1200 × 630 |
| **Family Portrait** | `public/images/family-photo.jpg` | 1200 × 1600 or 1200 × 900 |
| **Story: The Beginning (2001)** | `public/images/story/wedding-day.jpg` | Landscape (16:9 or 4:3) |
| **Story: Milestone 1** | `public/images/story/memory-1.jpg` | Landscape (16:9 or 4:3) |
| **Story: Milestone 2** | `public/images/story/memory-2.jpg` | Landscape (16:9 or 4:3) |
| **Story: 25 Years of Love** | `public/images/story/family.jpg` | Landscape (16:9 or 4:3) |
| **Gallery (12 photos)** | `public/images/gallery/photo-01.jpg` to `photo-12.jpg` | Mixed (portrait/landscape) |

> **Graceful Fallbacks**: If any photograph is missing, an embossed silver jubilee monogram card with custom frame, caption, and year is displayed automatically. No broken image icons will ever show!

---

## 🎵 3. Adding Background Instrumental Music

Place your music track in:
`public/audio/anniversary-music.mp3` *(or `public/audio/anniversary-instrumental.mp3`)*

- Supports standard `.mp3` format.
- If no audio file is provided, an ambient harmonic chime pad plays via the Web Audio API so the music button is functional out of the box!
- Audio does not autoplay with sound before user interaction (browser policy compliant). It begins when the guest clicks **"Open Your Invitation"** or clicks the floating vinyl disc.

---

## 💬 4. WhatsApp Sharing

- Guests can click **"Share on WhatsApp"** in the closing section to share a formatted invitation message and website link directly with relatives and friends.

---

## 🚀 5. Deploying to Vercel

The project includes [`vercel.json`](./vercel.json) for smooth single-page application routing and asset caching.

### Step-by-Step Deployment:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: 25th Wedding Anniversary interactive invitation"
   git branch -M main
   git remote add origin https://github.com/your-username/anniversary-invitation.git
   git push -u origin main
   ```
2. **Open Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in.
   - Click **Add New** -> **Project**.
   - Select your GitHub repository.
3. **Configure Project**:
   - Framework Preset: **Vite** (auto-detected).
   - Root Directory: `./` (default).
4. **Deploy**:
   - Click **Deploy**. Vercel will build the project in ~30 seconds.
   - Your live website will be available at: `https://anniversary-invitation.vercel.app`.
5. **Share**:
   - Send the link to family and friends over WhatsApp!

---

## 📋 Quality & Verification Checklist

- [x] Production build passes cleanly: `npm run build` (`tsc -b && vite build`).
- [x] Bundle split into optimized chunks (`animations`, `icons`).
- [x] Opening wow moment with glowing "25" and "Open Your Invitation" transition.
- [x] Responsive navigation menu with Home, Our Story, Memories, Invitation, and Venue.
- [x] Real-time countdown to 28 November 2026 in Indian Standard Time (IST).
- [x] Add to Google Calendar generates valid date range URL with venue.
- [x] Dedicated Venue section with interactive Google Maps preview & "Get Directions" button.
- [x] Category filtering for photo gallery (Wedding Memories, Family Moments, Celebrations, Precious Memories).
- [x] Lightbox modal with touch swipe and keyboard arrow navigation.
- [x] Screenshot card modal formatted for mobile screen capture.
