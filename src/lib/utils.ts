import { anniversaryConfig } from '../data/anniversaryConfig';

/**
 * Generates an 'Add to Google Calendar' link with proper URL encoding.
 */
export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent(
    `${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName} - 25th Wedding Anniversary`
  );

  // 28 Nov 2026, 7:00 PM IST (13:30 UTC) to 11:30 PM IST (18:00 UTC)
  const startUtc = '20261128T133000Z';
  const endUtc = '20261128T180000Z';

  const details = encodeURIComponent(
    `Join us for the Silver Jubilee Celebration honoring 25 years of love and togetherness of ${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName}.\n\nDress Code: ${anniversaryConfig.event.dressCode}\n${anniversaryConfig.event.additionalDetails}`
  );

  const location = encodeURIComponent(
    `${anniversaryConfig.event.venue}, ${anniversaryConfig.event.address}`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}`;
}

/**
 * Generates a pre-filled WhatsApp RSVP message link.
 */
export function generateWhatsAppRsvpUrl(data: {
  guestName: string;
  mobileNumber?: string;
  guestCount: number;
  attendance: 'yes' | 'no' | 'maybe';
  message?: string;
}): string {
  // Clean phone number (digits only)
  const phone = anniversaryConfig.hosts.whatsappNumber.replace(/[^0-9]/g, '');

  let attendanceText = '✨ Yes, Joyfully Accept with pleasure!';
  if (data.attendance === 'no') {
    attendanceText = '💐 No, Regretfully Decline with warmest wishes';
  } else if (data.attendance === 'maybe') {
    attendanceText = '⏳ Maybe, Will confirm closer to date';
  }

  let text = `*RSVP for 25th Wedding Anniversary*\n`;
  text += `*Silver Jubilee Celebration*\n\n`;
  text += `*Guest Name:* ${data.guestName}\n`;
  if (data.mobileNumber && data.mobileNumber.trim()) {
    text += `*Mobile Number:* ${data.mobileNumber.trim()}\n`;
  }
  text += `*Attending:* ${attendanceText}\n`;
  if (data.attendance === 'yes') {
    text += `*Number of Guests:* ${data.guestCount}\n`;
  }
  if (data.message && data.message.trim().length > 0) {
    text += `*Message / Blessings:* "${data.message.trim()}"\n`;
  }
  text += `\nLooking forward to celebrating ${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName}'s 25 wonderful years!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Formatted WhatsApp invitation message for sharing
 */
export function getWhatsAppShareUrl(): string {
  const text =
    `💍 *Silver Jubilee — 25th Wedding Anniversary Invitation* 💍\n\n` +
    `You are warmly invited to celebrate 25 years of love, laughter, and togetherness of *${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName}*!\n\n` +
    `🗓 *Date:* ${anniversaryConfig.event.day}, ${anniversaryConfig.event.formattedDate}\n` +
    `⏰ *Time:* ${anniversaryConfig.event.time}\n` +
    `📍 *Venue:* ${anniversaryConfig.event.venue}, ${anniversaryConfig.event.address}\n\n` +
    `✨ Explore the interactive invitation, our love story, and memories here:\n${window.location.origin}`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

/**
 * Copies plain text to clipboard with fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}

/**
 * Formatted event text for easy copying/saving
 */
export function getFormattedEventDetails(): string {
  return (
    `💍 SILVER JUBILEE CELEBRATION 💍\n` +
    `Celebrating 25 Years of Togetherness\n` +
    `${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName}\n\n` +
    `🗓 Date: ${anniversaryConfig.event.day}, ${anniversaryConfig.event.formattedDate}\n` +
    `⏰ Time: ${anniversaryConfig.event.time}\n` +
    `📍 Venue: ${anniversaryConfig.event.venue}\n` +
    `🏛 Address: ${anniversaryConfig.event.address}\n` +
    `👔 Dress Code: ${anniversaryConfig.event.dressCode}\n\n` +
    `Hosted with love by: ${anniversaryConfig.hosts.familyName}\n` +
    `Website: ${window.location.origin}`
  );
}
