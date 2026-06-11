export const weddingDetails = {
  coupleNames: "Angel & Seun",
  dateDisplay: "August 29, 2026",
  dateLongDisplay: "Saturday, August 29, 2026",
  startDateTime: "2026-08-29T12:00:00",
  endDateTime: "2026-08-29T23:30:00",
  timeZone: "America/New_York",
  ceremonyVenue: {
    name: "Immaculate Conception Church",
    subtitle: "Ceremony venue",
    region: "Washington, DC",
    websiteUrl: "https://www.immaculateconceptionchurchdc.org/",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Immaculate%20Conception%20Church%20Washington%20DC",
    description:
      "A historic church setting in Washington, DC for the ceremony.",
  },
  venue: {
    name: "Beacon Hill Manor",
    subtitle: "Northern Virginia's boutique wedding venue",
    addressLine1: "41166 Canter Lane",
    addressLine2: "Paeonian Springs, VA 20129",
    region: "Paeonian Springs, Virginia",
    websiteUrl: "https://beaconhillmanor.com",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Beacon%20Hill%20Manor%2041166%20Canter%20Lane%20Paeonian%20Springs%20VA%2020129",
    description:
      "A private estate in Northern Virginia with rolling views, elegant spaces, and a timeless setting for the celebration.",
  },
  images: {
    venueHero:
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/blob-8af07e6.png/:/rs=w:2046,h:1535",
    manorExterior:
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/BHM3.jpg/:/cr=t:12.5%25,l:0%25,w:100%25,h:75%25/rs=w:960,h:480,cg:true",
    aerialView:
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/106-web-or-mls-DJI_20250605135748_0256_D.jpg/:/cr=t:16.67%25,l:0%25,w:100%25,h:66.67%25/rs=w:1200,h:600,cg:true",
    gallery: [
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/IMG_1231.jpg/:/rs=w:1023,h:1535",
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/BHM1.jpg/:/",
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/2-web-or-mls-DJI_20250605141135_0289_D.jpg/:/rs=w:2046,h:1535",
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/5-web-or-mls-DJI_20250605134516_0226_D.jpg/:/rs=w:2046,h:1535",
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/9-web-or-mls-DJI_20250605135127_0235_D.jpg/:/rs=w:2046,h:1535",
      "https://img1.wsimg.com/isteam/ip/525a4c78-c2f6-437f-878e-2bd3a3ecb499/56-web-or-mls-DSC00639.jpg/:/rs=w:1200,h:800",
    ],
  },
} as const;

function toGoogleCalendarDate(value: string) {
  return value.replace(/[-:]/g, "").replace("T", "T");
}

export function getGoogleCalendarUrl() {
  const { coupleNames, startDateTime, endDateTime, timeZone, ceremonyVenue, venue } =
    weddingDetails;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${coupleNames} Wedding`,
    dates: `${toGoogleCalendarDate(startDateTime)}/${toGoogleCalendarDate(endDateTime)}`,
    ctz: timeZone,
    details: `Join us to celebrate ${coupleNames}. Ceremony at ${ceremonyVenue.name}; reception at ${venue.name}.`,
    location: `${ceremonyVenue.name}, ${ceremonyVenue.region}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
