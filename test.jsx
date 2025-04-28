import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

export const chatSession = () => {
  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

  const config = {
    responseMimeType: 'text/plain', // 'application/json' if you want full structure
  };

  const model = 'gemini-2.5-pro-preview-03-25';

  // Return an object with sendMessage method
  return {
    sendMessage: async (prompt) => {
        const contents = [
            {
              role: 'user',
              parts: [
                {
                  text: `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotel options list with Hotel Name, Hotel address, Price hotel url, geo 	coordinates, rating, description and suggest itinerary with placeName, place Details, Place Image Url, Geo Coordinates, tickets Pricing, Time t travel each of the location for 3 days 	with each day with best time to visit in JSON format 
        `,
                },
              ],
            },
            {
              role: 'model',
              parts: [
                {
                  text: `Here's a breakdown of the thought process to generate the Las Vegas itinerary:
        
        1.  **Understand the Core Request:** The user wants a 3-day Las Vegas travel plan for a *couple* on a *cheap budget*. Key requirements include:
            *   Location: Las Vegas
            *   Duration: 3 Days
            *   Target Audience: Couple
            *   Budget: Cheap/Budget-friendly
            *   Output Format: JSON
            *   Specific JSON fields required:
                *   Hotel Options: Name, Address, Price, URL, Geo Coordinates, Rating, Description
                *   Itinerary: Day-wise (Day 1, Day 2, Day 3)
                *   Itinerary Items (for each day): Place Name, Place Details, Place Image URL, Geo Coordinates, Tickets Pricing, Time to Travel, Best Time to Visit
        
        2.  **Deconstruct the "Cheap Budget" Constraint:** What does "cheap" mean in Las Vegas?
            *   **Accommodation:** Avoid prime Strip hotels (Bellagio, Venetian, Wynn). Focus on:
                *   Off-Strip hotels (still accessible)
                *   Downtown/Fremont Street hotels
                *   Older, less luxurious Strip hotels (Excalibur, Luxor, Flamingo, Harrah's, LINQ - sometimes have deals)
                *   Look for hotels *without* excessive resort fees, or factor those in.
            *   **Activities:** Prioritize free or low-cost activities:
                *   Walking the Strip (window shopping, people-watching, free shows like Bellagio Fountains, Mirage Volcano - *though note the volcano is being removed*)
                *   Exploring Fremont Street Experience (free light show, street performers)
                *   Visiting unique free attractions (Welcome sign, Conservatory at Bellagio, Flamingo Wildlife Habitat)
                *   Finding happy hour deals for drinks/food.
                *   Using public transport (Deuce bus, Monorail - although monorail can be pricey) or ride-sharing strategically, rather than taxis everywhere.
                *   Avoiding expensive shows, high-end restaurants, and excessive gambling (unless that's the specific goal, but budget-conscious suggests limiting it).
            *   **Food:** Look for food courts, casual eateries, buffets (though check prices, they aren't always cheap anymore), happy hour deals, and potentially buying some snacks/drinks from convenience stores/supermarkets.
        
        3.  **Structure the JSON Output:** Create the main JSON object structure first.
            \`\`\`json
            {
              "travelPlan": {
                "location": "Las Vegas",
                "duration": "3 Days",
                "targetAudience": "Couple",
                "budget": "Cheap",
                "hotelOptions": [],
                "itinerary": {
                  "day1": [],
                  "day2": [],
                  "day3": []
                }
              }
            }
            \`\`\`
        
        4.  **Populate Hotel Options:**
            *   **Brainstorm Budget Hotels:** Ellis Island, The LINQ, Flamingo, Harrah's, Excalibur, Luxor, Oyo, Downtown Grand, Golden Nugget (sometimes deals), El Cortez.
            *   **Select a Few Representative Options:** Aim for variety (Strip-ish, Off-Strip, Downtown). Let's pick:
                *   *The LINQ:* Central Strip, often reasonable, modern vibe.
                *   *Excalibur:* South Strip, very budget, kitschy theme.
                *   *Downtown Grand:* Fremont area, often good value, recently renovated parts.
            *   **Gather Information for Each Hotel:**
                *   Name: (Easy)
                *   Address: Use Google Maps/Hotel Website.
                *   Price: *Crucial point.* Real-time pricing is impossible. State clearly this is an *estimate* and varies wildly. Use placeholder like "$50-$150+" and add a disclaimer. Mention resort fees.
                *   Hotel URL: Link to a general booking site (like Booking.com or Expedia) or the hotel's own site. Using a general booking site link is often easier for users to compare.
                *   Geo Coordinates: Use Google Maps (right-click -> "What's here?").
                *   Rating: Get an approximate rating from Google Maps or TripAdvisor (e.g., 3.5, 4.0). State the source isn't live.
                *   Description: Write a brief, honest description highlighting pros/cons relevant to the budget traveler (location, vibe, value).
        
        5.  **Design the 3-Day Itinerary:**
            *   **Goal:** Mix free activities, iconic sights, and some low-cost options. Balance walking with potential transport. Group locations geographically each day to minimize travel time.
            *   **Day 1: Arrival & South/Mid-Strip Exploration**
                *   *Afternoon:* Arrive, check into the hotel.
                *   *Late Afternoon:* "Welcome to Fabulous Las Vegas" Sign (Iconic, free photo op). Needs transport (bus/rideshare).
                *   *Evening:* Walk the South/Mid-Strip. See Excalibur/Luxor exteriors. Head north.
                *   *Highlight:* Bellagio Fountains (Free, iconic). Bellagio Conservatory (Free, beautiful).
                *   *Dinner:* Budget option (e.g., food court nearby, Ocean One Bar & Grille in Miracle Mile Shops - known for lunch deals, maybe dinner too).
                *   *Optional:* Mirage Volcano (Free - *Check if still running!* - it's being removed, so this needs a note or removal).
            *   **Day 2: Downtown & Fremont Street Experience**
                *   *Morning/Afternoon:* Head Downtown (Bus/Rideshare). Explore Fremont Street during the day (different vibe).
                *   *Activity:* Maybe visit The Mob Museum (Paid, but interesting - mention cost). Or Neon Museum (Paid, unique - mention cost). *Self-correction: Need cheaper options.* How about just exploring Fremont, Container Park (free to enter)?
                *   *Lunch:* Cheap eats Downtown (many options).
                *   *Evening:* Fremont Street Experience Light Show (Free, must-do). Soak in the atmosphere, street performers.
                *   *Dinner:* Budget Downtown dinner. Maybe Heart Attack Grill (gimmicky, but an experience, not *super* cheap but memorable). Or cheaper casino cafes.
            *   **Day 3: Mid/North Strip & Departure Prep**
                *   *Morning:* Flamingo Wildlife Habitat (Free, relaxing).
                *   *Late Morning/Afternoon:* Explore Venetian/Palazzo interiors (Grand Canal Shoppes - free to walk through, gondolas cost money). Explore Forum Shops at Caesars (free to walk through). Window shopping.
                *   *Lunch:* Food court or budget spot in one of the malls/casinos.
                *   *Afternoon:* Last minute souvenir shopping (e.g., ABC Stores, Walgreens/CVS for cheaper options than hotel gift shops). Pack up.
                *   *Evening:* Depending on flight time, maybe a final cheap dinner or head to the airport.
        
        6.  **Flesh out Itinerary Details for Each Place:**
            *   **Place Name:** (Easy)
            *   **Place Details:** Brief description of what it is and why it's relevant (especially the budget aspect - free, iconic, etc.).
            *   **Place Image URL:** Find representative images online (use Google Images, Pexels, Unsplash - *important note:* use placeholder URLs or clearly state these are examples, as direct linking can be problematic/copyrighted. A search query URL might be safer). *Self-correction: For this request, I'll just provide placeholder URLs or descriptions of what the image should be.* Let's use placeholder URLs like \`https://example.com/image_placeholder_description.jpg\`.
            *   **Geo Coordinates:** Use Google Maps.
            *   **Tickets Pricing:** Specify "Free" or provide an *estimated* range (e.g., "$20-$30") for paid attractions, emphasizing that prices change. Mention where free viewing is possible.
            *   **Time to Travel:** Estimate travel time *from the previous location* or a central point (like the hotel). Mention walking times or recommended transport (walk, bus, rideshare).
            *   **Best Time to Visit:** Consider crowds, lighting (for photos), show times (Fountains, Fremont), and opening hours. E.g., Fountains at night, Fremont at night for the show, Welcome Sign during the day for photos (or dusk).
        
        7.  **Refine and Format as JSON:**
            *   Carefully place all collected data into the JSON structure defined in step 3.
            *   Ensure correct syntax: quotes around keys and string values, commas between elements, correct nesting of brackets \`[]\` and braces \`{}\`.
            *   Add Disclaimers: Crucial for pricing, availability, opening hours, and image URLs. State that prices are estimates and subject to change, recommend checking official websites, and note that image URLs are placeholders. Mention resort fees again.
            *   Review: Read through the generated JSON. Does it make sense? Is it logical? Does it meet all the user's requirements? Is the budget aspect consistently addressed? Is the flow of the itinerary reasonable? *Self-correction: Ensure the "Time to Travel" makes sense sequentially within each day.*
        
        8.  **Final Output Generation:** Present the validated JSON code block.`,
                },
                {
                  text: `\`\`\`json
        {
          "travelPlan": {
            "location": "Las Vegas",
            "duration": "3 Days",
            "targetAudience": "Couple",
            "budget": "Cheap",
            "notes": [
              "Prices (hotels, tickets, food) are estimates and can vary significantly based on booking time, day of the week, and special events. Always check official websites for current pricing and availability.",
              "Hotel prices listed are rough nightly estimates before taxes and mandatory resort fees. Resort fees ($25-$50+ per night) are common in Las Vegas and add significantly to the cost.",
              "Travel times are estimates and depend on traffic and mode of transport (walking, bus, rideshare). The Deuce bus runs 24/7 along the Strip and to Downtown.",
              "Image URLs are placeholders representing the type of image. Actual images require sourcing.",
              "Consider purchasing snacks and drinks from convenience stores (like CVS or Walgreens on the Strip) to save money."
            ],
            "hotelOptions": [
              {
                "hotelName": "Excalibur Hotel & Casino",
                "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
                "price": "$40 - $120+ per night (estimate, pre-fees/taxes)",
                "hotelUrl": "https://excalibur.mgmresorts.com/",
                "geoCoordinates": {
                  "latitude": 36.1048,
                  "longitude": -115.1746
                },
                "rating": "3.5-star (approx)",
                "description": "Iconic castle-themed hotel on the South Strip. Offers basic, budget-friendly rooms and easy access to Luxor and Mandalay Bay via tram. Good value option, but expect large crowds and older facilities."
              },
              {
                "hotelName": "The LINQ Hotel + Experience",
                "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
                "price": "$50 - $150+ per night (estimate, pre-fees/taxes)",
                "hotelUrl": "https://www.caesars.com/linq",
                "geoCoordinates": {
                  "latitude": 36.1176,
                  "longitude": -115.1710
                },
                "rating": "4-star (approx)",
                "description": "Centrally located on the Strip with modern, compact rooms. Good access to the LINQ Promenade, High Roller observation wheel, and numerous dining/entertainment options. Often has competitive pricing."
              },
              {
                "hotelName": "Downtown Grand Hotel & Casino",
                "hotelAddress": "206 N 3rd St, Las Vegas, NV 89101",
                "price": "$60 - $160+ per night (estimate, pre-fees/taxes)",
                "hotelUrl": "https://www.downtowngrand.com/",
                "geoCoordinates": {
                  "latitude": 36.1708,
                  "longitude": -115.1411
                },
                "rating": "4-star (approx)",
                "description": "Located in Downtown Las Vegas, a short walk from the Fremont Street Experience. Offers renovated rooms, a rooftop pool (Citrus Grand Pool Deck), and often better value than Strip hotels. Less hectic than the Strip."
              },
              {
                "hotelName": "Ellis Island Hotel Casino & Brewery",
                "hotelAddress": "4178 Koval Ln, Las Vegas, NV 89109",
                "price": "$40 - $100+ per night (estimate, pre-fees/taxes)",
                "hotelUrl": "https://www.ellisislandcasino.com/hotel",
                "geoCoordinates": {
                  "latitude": 36.1160,
                  "longitude": -115.1654
                },
                "rating": "3-star (approx)",
                "description": "Located just off the Strip (behind Bally's/Paris). Known for its budget-friendly rooms, cheap food (especially steak special), karaoke, and on-site brewery. A local favorite offering great value."
              }
            ],
            "itinerary": {
              "day1": {
                "theme": "Arrival & South/Mid-Strip Exploration",
                "schedule": [
                  {
                    "placeName": "Hotel Check-in",
                    "placeDetails": "Arrive in Las Vegas, pick up rental car or take shuttle/rideshare to your chosen budget hotel. Check in and leave luggage.",
                    "placeImageUrl": "https://example.com/hotel_lobby.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "N/A",
                    "timeToTravel": "Variable (from airport)",
                    "bestTimeVisit": "Afternoon (standard check-in time is usually 3 PM)"
                  },
                  {
                    "placeName": "Welcome to Fabulous Las Vegas Sign",
                    "placeDetails": "Iconic photo opportunity at the famous sign. There's usually a small parking lot. Expect a line for photos, especially during peak times.",
                    "placeImageUrl": "https://example.com/welcome_sign_vegas.jpg",
                    "geoCoordinates": {
                      "latitude": 36.0820,
                      "longitude": -115.1728
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "10-20 mins drive/rideshare from South Strip hotels",
                    "bestTimeVisit": "Daytime for best photos, or dusk. Early morning avoids crowds."
                  },
                  {
                    "placeName": "Walk the South/Mid Strip",
                    "placeDetails": "Stroll north from the sign (or your hotel). See the exterior architecture of Luxor (pyramid), Excalibur (castle), New York-New York (NYC skyline), Park MGM.",
                    "placeImageUrl": "https://example.com/south_strip_walk.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1023,
                      "longitude": -115.1745
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "Variable (walking)",
                    "bestTimeVisit": "Late Afternoon / Early Evening"
                  },
                  {
                    "placeName": "Bellagio Conservatory & Botanical Gardens",
                    "placeDetails": "Explore the stunning, free seasonal floral displays inside the Bellagio. Themes change several times a year.",
                    "placeImageUrl": "https://example.com/bellagio_conservatory.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1126,
                      "longitude": -115.1740
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "15-25 mins walk from New York-New York area",
                    "bestTimeVisit": "Anytime during opening hours, less crowded mornings/late nights."
                  },
                  {
                    "placeName": "Fountains of Bellagio",
                    "placeDetails": "Watch the spectacular free water show synchronized to music in the lake in front of the Bellagio. Shows run frequently in the afternoons and evenings.",
                    "placeImageUrl": "https://example.com/bellagio_fountains.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1124,
                      "longitude": -115.1738
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "Located just outside the Conservatory",
                    "bestTimeVisit": "Evening/Night for the best visual effects with lights."
                  },
                  {
                    "placeName": "Budget Dinner",
                    "placeDetails": "Find affordable eats. Options: Ocean One Bar & Grille (Miracle Mile Shops - check for lunch/dinner deals), food courts (e.g., in Miracle Mile Shops, Harrah's, Venetian), In-N-Out Burger, Ellis Island Cafe (if staying nearby or willing to walk off-strip).",
                    "placeImageUrl": "https://example.com/budget_food_vegas.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "$10-$20 per person",
                    "timeToTravel": "Walking distance from Bellagio/Mid-Strip",
                    "bestTimeVisit": "Evening"
                  }
                ]
              },
              "day2": {
                "theme": "Downtown Discovery & Fremont Street",
                "schedule": [
                  {
                    "placeName": "Travel to Downtown Las Vegas",
                    "placeDetails": "Take the Deuce bus (economical) or a rideshare to the Fremont Street area.",
                    "placeImageUrl": "https://example.com/deuce_bus_vegas.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1700,
                      "longitude": -115.1461
                    },
                    "ticketsPricing": "Deuce Bus: ~$6 for 2 hours, $8 for 24 hours",
                    "timeToTravel": "25-45 mins depending on traffic and origin point on Strip",
                    "bestTimeVisit": "Morning"
                  },
                  {
                    "placeName": "Explore Fremont Street (Daytime)",
                    "placeDetails": "Walk under the Viva Vision canopy, see the classic casinos (Golden Nugget, Binion's, Four Queens), street art, and unique shops. Different vibe than at night.",
                    "placeImageUrl": "https://example.com/fremont_daytime.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1700,
                      "longitude": -115.1445
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "Located upon arrival Downtown",
                    "bestTimeVisit": "Late Morning / Early Afternoon"
                  },
                  {
                    "placeName": "Downtown Container Park",
                    "placeDetails": "Unique open-air shopping center and entertainment venue made from shipping containers. Features boutique shops, restaurants, and a playground with a giant praying mantis sculpture that shoots fire at night.",
                    "placeImageUrl": "https://example.com/container_park.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1676,
                      "longitude": -115.1367
                    },
                    "ticketsPricing": "Free to enter",
                    "timeToTravel": "5-10 mins walk from central Fremont Street",
                    "bestTimeVisit": "Afternoon or Evening (for fire show)"
                  },
                  {
                    "placeName": "Budget Lunch Downtown",
                    "placeDetails": "Many cheap eats options: Pizza Rock, Evel Pie, White Castle, cheap casino cafes (check Binion's Cafe or Magnolia's Veranda at Four Queens for specials).",
                    "placeImageUrl": "https://example.com/downtown_lunch.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "$10-$20 per person",
                    "timeToTravel": "Walking distance",
                    "bestTimeVisit": "Lunchtime"
                  },
                  {
                    "placeName": "Optional: The Mob Museum",
                    "placeDetails": "(Paid Option) Explore the history of organized crime and law enforcement in Las Vegas and beyond. Engaging exhibits. Allow 2-3 hours.",
                    "placeImageUrl": "https://example.com/mob_museum.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1722,
                      "longitude": -115.1406
                    },
                    "ticketsPricing": "~$30-$35 per person (check website for discounts)",
                    "timeToTravel": "5-10 mins walk from Fremont Street",
                    "bestTimeVisit": "Afternoon"
                  },
                  {
                    "placeName": "Fremont Street Experience (Evening)",
                    "placeDetails": "Witness the dazzling Viva Vision light show on the overhead canopy, enjoy free concerts on multiple stages, street performers, and the energetic atmosphere. Shows typically start hourly after dusk.",
                    "placeImageUrl": "https://example.com/fremont_night.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1700,
                      "longitude": -115.1445
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "Located in Downtown",
                    "bestTimeVisit": "Evening / Night (after 6 PM for shows)"
                  },
                  {
                    "placeName": "Dinner in Downtown",
                    "placeDetails": "Grab dinner from one of the many casual spots or casino cafes. Consider Heart Attack Grill for a unique (and unhealthy!) experience or check for dinner specials at hotel cafes.",
                    "placeImageUrl": "https://example.com/downtown_dinner.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "$15-$30 per person",
                    "timeToTravel": "Walking distance",
                    "bestTimeVisit": "Evening"
                  },
                  {
                    "placeName": "Return to Hotel",
                    "placeDetails": "Take the Deuce bus or a rideshare back to your hotel.",
                    "placeImageUrl": "https://example.com/vegas_night_travel.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "Deuce Bus or Rideshare cost",
                    "timeToTravel": "25-45 mins",
                    "bestTimeVisit": "Late Night"
                  }
                ]
              },
              "day3": {
                "theme": "Mid/North Strip Wonders & Departure Prep",
                "schedule": [
                  {
                    "placeName": "Flamingo Wildlife Habitat",
                    "placeDetails": "A tranquil, free attraction located within the Flamingo hotel grounds. See Chilean flamingos, ducks, turtles, and fish in a lush garden setting.",
                    "placeImageUrl": "https://example.com/flamingo_habitat.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1167,
                      "longitude": -115.1710
                    },
                    "ticketsPricing": "Free",
                    "timeToTravel": "Variable walk/bus/rideshare depending on hotel location",
                    "bestTimeVisit": "Morning (animals are often more active)"
                  },
                  {
                    "placeName": "Explore The Venetian & The Palazzo",
                    "placeDetails": "Walk through the stunning interiors, see the Grand Canal Shoppes with gondolas (rides are paid, watching is free), St. Mark's Square replica, and elaborate Italian-themed architecture. Window shopping is free!",
                    "placeImageUrl": "https://example.com/venetian_interior.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1244,
                      "longitude": -115.1717
                    },
                    "ticketsPricing": "Free to explore (Gondola rides are extra ~ $34-$39 pp)",
                    "timeToTravel": "10-15 mins walk north from Flamingo",
                    "bestTimeVisit": "Anytime during the day"
                  },
                  {
                    "placeName": "Explore The Forum Shops at Caesars Palace",
                    "placeDetails": "Another impressive themed shopping mall with high-end stores, Roman statues, the 'Fall of Atlantis' animatronic show (free, check schedule), and a sky-painted ceiling.",
                    "placeImageUrl": "https://example.com/forum_shops.jpg",
                    "geoCoordinates": {
                      "latitude": 36.1171,
                      "longitude": -115.1746
                    },
                    "ticketsPricing": "Free to explore",
                    "timeToTravel": "10-15 mins walk across the street or south from Venetian",
                    "bestTimeVisit": "Anytime during the day"
                  },
                  {
                    "placeName": "Budget Lunch on the Strip",
                    "placeDetails": "Utilize food courts within the malls/casinos (e.g., Venetian, Forum Shops, Fashion Show Mall slightly north) or grab something quick like pizza or a sandwich.",
                    "placeImageUrl": "https://example.com/strip_food_court.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "$10-$20 per person",
                    "timeToTravel": "Walking distance",
                    "bestTimeVisit": "Lunchtime"
                  },
                  {
                    "placeName": "Last Minute Souvenirs / Relaxation",
                    "placeDetails": "Grab any last-minute souvenirs (check ABC Stores or Walgreens/CVS for cheaper options than hotel gift shops). Alternatively, relax by the hotel pool if time permits before check-out.",
                    "placeImageUrl": "https://example.com/vegas_souvenirs.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "Variable (Shopping)",
                    "timeToTravel": "Variable",
                    "bestTimeVisit": "Afternoon"
                  },
                  {
                    "placeName": "Hotel Check-out & Departure",
                    "placeDetails": "Check out from your hotel (standard check-out is often 11 AM, confirm with hotel). Head to the airport via shuttle, rideshare, or taxi.",
                    "placeImageUrl": "https://example.com/airport_departure.jpg",
                    "geoCoordinates": null,
                    "ticketsPricing": "N/A",
                    "timeToTravel": "20-40 mins to LAS airport depending on traffic",
                    "bestTimeVisit": "Afternoon/Evening depending on flight schedule"
                  }
                ]
              }
            }
          }
        }
        \`\`\``,
                },
              ],
            },
            {
              role: 'user',
              parts: [
                {
                  text: `INSERT_INPUT_HERE`,
                },
              ],
            },
          ];

      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let fullText = '';
      for await (const chunk of response) {
        fullText += chunk.text;
      }

      return fullText;
    }
  };
};
