export const SelectTravelList = [
    {
        id:1,
        title:'just Me',
        desc:'A sole travels in exploration',
        icon:'🚁',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 pepole'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'🚢',
        people:'3 to 10 pepole'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]

export const AI_PROMPT = `
Generate a travel plan with the following details:
- Location: {location}
- Duration: {totalDays} days
- Number of Travelers: {traveler}
- Budget: {budget}

Requirements:
1. Suggest a list of 5-10 hotel options. Each hotel should include:
   - "name", "address", "price", "url", "geoCoordinates", "rating", "description"
2. Provide a day-wise itinerary for {totalDays} days. Each day's plan must include:
   - "dayNumber"
   - "places": an array of 3-5 places to visit, where each place must include:
     - "placeName", "details", "imageUrl", "geoCoordinates", "ticketPrice", "travelTime", "bestTimeToVisit"

⚠️ Please respond ONLY with a valid JSON object:
- Use **double quotes** for all keys and string values
- Do **not include** any markdown, comments, explanations, or text outside the JSON
- Return only the raw JSON object
`.trim();
