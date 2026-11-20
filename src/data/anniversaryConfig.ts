/**
 * ==============================================================================
 * CENTRALIZED ANNIVERSARY CONFIGURATION
 * ==============================================================================
 * 
 * This is the SINGLE SOURCE OF TRUTH for the entire invitation website.
 * Update all names, dates, venue details, messages, and feature toggles here.
 * Any modification here automatically updates every section across the site!
 */

export interface AnniversaryConfig {
  couple: {
    fatherName: string;
    motherName: string;
    heroImage: string;
  };

  event: {
    title: string;
    subTitle: string;
    date: string; // YYYY-MM-DD
    formattedDate: string;
    day: string;
    time: string;
    venue: string;
    address: string;
    mapsUrl: string;
    timezone: string;
    dressCode: string;
    additionalDetails: string;
    /** Target ISO string for Countdown & Calendar in IST (+05:30) */
    targetDateTimeIso: string;
  };

  hosts: {
    familyName: string;
    contactPerson: string;
    whatsappNumber: string; // Digits only with country code, e.g. "919876543210"
  };

  messages: {
    tagline: string;
    subtitle: string;
    invitationGreeting: string;
    familyMessageHeading: string;
    familyMessage: string;
    personalMessageFromChildren: string;
    closingBlessing: string;
  };

  features: {
    musicEnabled: boolean;
    countdownEnabled: boolean;
    galleryEnabled: boolean;
    mapsEnabled: boolean;
  };

  audio: {
    title: string;
    src: string;
  };
}

export const anniversaryConfig: AnniversaryConfig = {
  couple: {
    fatherName: "Pankaj",
    motherName: "Mrunal Tokekar",
    heroImage: "/images/parents-hero.JPG",
  },

  event: {
    title: "Silver Jubilee Celebration",
    subTitle: "Celebrating 25 Years of Togetherness",
    date: "2026-11-28",
    formattedDate: "28 November 2026",
    day: "Saturday",
    time: "7:00 PM onwards", // e.g. "7:00 PM onwards"
    venue: "Dutt Gurukripa",
    address: "Dutt Gurukripa Restaurant, 10, Nath Mandir Road, Indore, MP, India",
    mapsUrl: "https://www.bing.com/maps/search?ty=0&v=2&sV=1&style=r&ss=id.local_ypid%3A%22YNCF45F99A563F2C40%22&q=Dutt+Gurukripa+Restaurant%2C+10%2C+Nath+Mandir+Road%2C+Indore%2C+MP%2C+India&st=Dutt+Gurukripa+Restaurant&sfa=10%2C+Nath+Mandir+Road%2C+Indore%2C+MP%2C+India&FORM=QBMV&cp=22.719732%7E75.876831&lvl=16", // e.g. "https://maps.google.com/?q=..."
    timezone: "Asia/Kolkata",
    dressCode: "Anything and everything of your choice", // e.g. "Royal Silver, Champagne, or Black Tie"
    additionalDetails: "Cocktails, dinner, music & memories", // e.g. "Cocktails, dinner, music & memories"
    targetDateTimeIso: "2026-11-28T19:00:00+05:30",
  },

  hosts: {
    familyName: "Kushagra Tokekar",
    contactPerson: "9039089588",
    whatsappNumber: "9039089588", // Format: "919876543210"
  },

  messages: {
    tagline: "Twenty-Five Years of Togetherness",
    subtitle: "A journey of love, laughter, memories and forever.",
    invitationGreeting:
      "With immense joy and gratitude, we invite you to celebrate a beautiful milestone of love, commitment and togetherness. Join us as we celebrate 25 wonderful years of marriage and the journey that continues to make every moment special.",
    familyMessageHeading: "With Love From Our Family",
    familyMessage:
      "Twenty-five years of love, sacrifices, laughter and countless memories. We are grateful to celebrate this beautiful milestone with everyone who has been a part of our journey.",
    personalMessageFromChildren:
      "To our dearest parents — thank you for teaching us what unconditional love, mutual respect, and family truly mean. We celebrate you today and always.",
    closingBlessing: "25 Years Down, Forever To Go.",
  },

  features: {
    musicEnabled: true,
    countdownEnabled: true,
    galleryEnabled: true,
    mapsEnabled: true,
  },

  audio: {
    title: "Silver Jubilee Instrumental Melody",
    src: "/audio/anniversary-music.mp3",
  },
};

/**
 * Backward compatibility helper for existing references
 */
export const EVENT_CONFIG = {
  eventTitle: anniversaryConfig.event.title,
  subTitle: anniversaryConfig.event.subTitle,
  fatherName: anniversaryConfig.couple.fatherName,
  motherName: anniversaryConfig.couple.motherName,
  eventDate: anniversaryConfig.event.formattedDate,
  eventDay: anniversaryConfig.event.day,
  eventTime: anniversaryConfig.event.time,
  targetDateTimeIso: anniversaryConfig.event.targetDateTimeIso,
  venueName: anniversaryConfig.event.venue,
  venueAddress: anniversaryConfig.event.address,
  googleMapsLink: anniversaryConfig.event.mapsUrl,
  hostNames: anniversaryConfig.hosts.familyName,
  contactPerson: anniversaryConfig.hosts.contactPerson,
  whatsappNumber: anniversaryConfig.hosts.whatsappNumber,
  dressCode: anniversaryConfig.event.dressCode,
  additionalDetails: anniversaryConfig.event.additionalDetails,
  personalMessageFromChildren: anniversaryConfig.messages.personalMessageFromChildren,
  audioTrackTitle: anniversaryConfig.audio.title,
  audioTrackSrc: anniversaryConfig.audio.src,
};

export const isPlaceholder = (val: string): boolean => {
  return !val || (val.startsWith("[") && val.endsWith("]"));
};
