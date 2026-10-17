import type { PersonProfile, Memory, FlashbackExperience } from "../types";
import { DEMO_ASSETS } from "../assets/demoAssets";

export const SAVITRI_PROFILE: PersonProfile = {
  id: "demo-savitri-devi-sharma",
  name: "Savitri Devi Sharma",
  relationship: "Grandmother (Dadi)",
  portraitUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  caption: "Her stories lived in ordinary moments—the first cup of chai, the smell of rain on the courtyard, and the little traditions that made a house feel like home.",
  description: "Warm, thoughtful, patient, quietly humorous, fond of storytelling, gardening, cooking, music, and spending time with her family.",
  details: "Jaipur, Rajasthan, India (1946 — Present). Preserved 60 authentic memories spanning childhood courtyard games, recipes, festivals, and time with grandchildren.",
  isDemo: true,
  createdAt: "2026-10-01T08:00:00Z",
  voiceStatus: "ready",
  voiceId: "21m00Tcm4TlvDq8ikWAM",
  voiceName: "Dadi Savitri (Warm Storyteller)",
};

export const SAVITRI_FLASHBACK: FlashbackExperience = {
  id: "flashback-savitri-courtyard",
  profileId: "demo-savitri-devi-sharma",
  title: "A Walk Through Dadi's Courtyard (Aangan)",
  subtitle: "The earthen smell of wet sandstone, hot adrak chai, and sixty years of warmth in Jaipur.",
  createdAt: "2026-10-15T12:00:00Z",
  isDemo: true,
  coverImageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
  openingHeading: "A Lifetime Preserved in Little Moments",
  openingCaption: "Her stories lived in ordinary moments—the first cup of chai, the smell of rain on the courtyard, and the little traditions that made a house feel like home.",
  narratorVoiceId: "21m00Tcm4TlvDq8ikWAM",
  narratorName: "Dadi Savitri (Warm Storyteller)",
  shots: [
    {
      id: "shot-savitri-1",
      shotNumber: 1,
      title: "The Courtyard After the First Monsoon Rain",
      caption: "The earthen smell of wet sandstone and paper boats racing across the drain.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      audioUrl: DEMO_ASSETS.cabinMorningAudio,
      occurredAt: "1954 — Childhood",
      visualKind: "demo_image",
      reflectionText: "When that first rain hit the courtyard stones in Jaipur, the whole house smelled like heaven.",
    },
    {
      id: "shot-savitri-2",
      shotNumber: 2,
      title: "The First Cup of Chai at Sunrise",
      caption: "Simmering crushed ginger and cardamom while the pink city slowly rubs its eyes.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
      audioUrl: DEMO_ASSETS.recipeAudio,
      occurredAt: "1972 — Everyday Moments",
      visualKind: "demo_image",
      reflectionText: "That first cup of adrak-elaichi chai needs silence. You watch the sky turn pink, and remember to be grateful.",
    },
    {
      id: "shot-savitri-3",
      shotNumber: 3,
      title: "Lighting Diyas on Diwali Evening",
      caption: "Fifty clay lamps filled with golden mustard oil tracing every edge of the haveli.",
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
      occurredAt: "1985 — Festivals",
      visualKind: "demo_image",
      reflectionText: "When the whole parapet is glowing with warm yellow light, darkness doesn't stand a chance.",
    },
    {
      id: "shot-savitri-4",
      shotNumber: 4,
      title: "Watering the Tulsi Plant at Dawn",
      caption: "Pouring cool water from a copper lota around the holy basil before the city awakes.",
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
      audioUrl: DEMO_ASSETS.cabinMorningAudio,
      occurredAt: "1984 — Garden & Nature",
      visualKind: "demo_image",
      reflectionText: "Tulsi doesn't just purify the courtyard air; she purifies the thoughts in your head.",
    },
    {
      id: "shot-savitri-5",
      shotNumber: 5,
      title: "The Last Light Falling Across the Courtyard",
      caption: "Golden slant of late afternoon sunlight illuminating the carved stone arches.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      audioUrl: DEMO_ASSETS.recipeAudio,
      occurredAt: "2024 — Gratitude",
      visualKind: "demo_image",
      reflectionText: "When that evening light hits the stone, I know everything we loved is still here.",
    }
  ],
  closingText: "Her stories live in our hearts. Some moments never leave us.",
};

export const SAVITRI_MEMORIES: Memory[] = [
  {
    "id": "savitri-mem-01",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Courtyard After the First Monsoon Rain",
    "description": "The moment the dark clouds rolled over the Aravalli hills, Ma would open the heavy wooden doors to the inner aangan. When the first heavy drops hit the sun-baked sandstone, a fragrance rose that no perfume in the world could match—mitti ki khushboo. My brothers and I would tear old notebook pages to fold little paper boats and watch them spin along the courtyard water drain.",
    "occurredAt": "1954-06-15",
    "type": "photo",
    "tags": [
      "Monsoon",
      "Courtyard",
      "Aangan",
      "Rain",
      "Childhood"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "When that first rain hit the courtyard stones in Jaipur, the whole house smelled like heaven. We didn't care about getting wet or catching a cold; we just wanted our paper boats to reach the gate first.",
    "sourceLabel": "Courtyard (Aangan), Johari Bazar, Jaipur",
    "location": "Courtyard (Aangan), Johari Bazar, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Childhood",
    "lifeStage": "Childhood (1950s)",
    "quote": "When that first rain hit the courtyard stones in Jaipur, the whole house smelled like heaven.",
    "reflection": "In Savitri's memory, the first monsoon rain wasn't merely weather—it was a sacred sensory awakening. The earthen scent rising from the sun-warmed courtyard stones bound the entire household in spontaneous joy.",
    "sfx": "distant thunder rumbling over Jaipur hills, gentle rain drops pattering on stone floor, splashing water, and soft sitar notes"
  },
  {
    "id": "savitri-mem-02",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Mother's Warm Rotis on Winter Mornings",
    "description": "December mornings in Jaipur were bitterly cold. We would wrap ourselves in thick woollen quilts and run straight to the kitchen where Ma sat by the clay chulha. She would roll out rotis that puffed up like little pillows, slather them with fresh homemade safed makhan, and sprinkle coarse jaggery. Eating them straight from the fire warmed our fingers and hearts.",
    "occurredAt": "1956-06-15",
    "type": "story",
    "tags": [
      "Winter",
      "Mother",
      "Rotis",
      "Ghee",
      "Morning"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Ma would say, 'Eat while they are puffing, beti.' That white butter melting right into the hot roti was better than any feast in any palace.",
    "sourceLabel": "Old Kitchen Hearth, Jaipur",
    "location": "Old Kitchen Hearth, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Childhood (1950s)",
    "quote": "Ma would say, 'Eat while they are puffing, beti.' That white butter melting right into the hot roti was better than any feast.",
    "reflection": "Savitri recalls her mother's hearth as the undisputed center of comfort during chilly Rajasthani winters. The warmth of fresh phulkas and melting makhan was the family's shared language of love.",
    "sfx": "crackling wooden embers in clay stove, gentle rolling pin rhythm on wooden board, winter morning breeze"
  },
  {
    "id": "savitri-mem-03",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Running Barefoot Through the Courtyard",
    "description": "During the long summer holidays, before the afternoon heat became unbearable, the courtyard belonged entirely to us children. We played stapoo (hopscotch) and hide-and-seek behind the heavy cotton purdahs. Dadi would shout from the verandah to put on our chappals because the stones were getting hot, but our soles were tough and our spirits completely free.",
    "occurredAt": "1955-06-15",
    "type": "story",
    "tags": [
      "Play",
      "Courtyard",
      "Summer",
      "Siblings",
      "Freedom"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Dadi would call out, 'Put your sandals on, the stones are burning!' But none of us listened. The courtyard felt as wide as the whole universe.",
    "sourceLabel": "Ancestral Haveli Courtyard, Jaipur",
    "location": "Ancestral Haveli Courtyard, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Childhood",
    "lifeStage": "Childhood (1950s)",
    "quote": "Dadi would call out, 'Put your sandals on, the stones are burning!' But none of us listened.",
    "reflection": "The inner courtyard served as an untamed playground where boundaries dissolved into carefree foot races and childish laughter, sheltered safely within family walls.",
    "sfx": "echoing giggles of children, quick barefoot patter across stone tiles, distant noon pigeon coos"
  },
  {
    "id": "savitri-mem-04",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Learning to Make Rangoli",
    "description": "My grandmother held my small seven-year-old wrist in hers, teaching me how to let dry rice flour trickle evenly between thumb and forefinger. 'Never rush the lines, Savitri,' she would whisper. 'The design is not just for the eyes; it is an invitation for peace to enter our deori.' By evening, our symmetrical peacock pattern welcomed every visitor at the front door.",
    "occurredAt": "1957-06-15",
    "type": "photo",
    "tags": [
      "Rangoli",
      "Art",
      "Tradition",
      "Colors",
      "Festivals"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Dadi told me to hold the flour loose in my fingers. 'Let the design breathe,' she said. I was so proud when the neighbours stopped to admire it.",
    "sourceLabel": "Threshold Steps, Jaipur",
    "location": "Threshold Steps, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Home and traditions",
    "lifeStage": "Childhood (1950s)",
    "quote": "Dadi told me to hold the flour loose in my fingers. 'Let the design breathe,' she said.",
    "reflection": "Rangoli was Savitri's first lesson in patience and artistic heritage, passed tenderly through the guiding hands of her grandmother on the front doorstep.",
    "sfx": "soft sweeping of broom on stone, fine sand rustling through fingers, distant morning temple chant"
  },
  {
    "id": "savitri-mem-05",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The First School Bag",
    "description": "Pitaji bought a thick piece of olive-green canvas from the bazaar and stitched my very first school bag on his pedal machine. Inside went my slate, a stick of chalk, and a smooth wooden takhti washed with white clay. I walked down the narrow street holding Pitaji's hand, feeling taller than the haveli gates, so proud to be going to school.",
    "occurredAt": "1953-06-15",
    "type": "story",
    "tags": [
      "School",
      "Childhood",
      "Books",
      "Jaipur",
      "Milestone"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Pitaji stitched that canvas bag with his own hands. Every night I would pack my wooden slate and polish it, waiting for sunrise.",
    "sourceLabel": "Maharani Girls School, Jaipur",
    "location": "Maharani Girls School, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Childhood",
    "lifeStage": "Childhood (1950s)",
    "quote": "Pitaji stitched that canvas bag with his own hands. Every night I would pack my wooden slate and polish it.",
    "reflection": "Education was a cherished prize, and the handmade canvas satchel represented her father's quiet encouragement of her curiosity and learning.",
    "sfx": "pedal sewing machine rhythm, chalk scratching on slate, distant school bell ringing"
  },
  {
    "id": "savitri-mem-06",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Favourite Childhood Story",
    "description": "On summer nights we dragged our wooden charpais up to the rooftop terrace where the night air was cool. Dadi would sit with her betel-nut box, telling stories of Rani Padmini, the stars in the Saptarishi constellation, and the clever bird who outwitted the desert fox. Her voice rose and fell with the desert breeze until all of us drifted off to sleep.",
    "occurredAt": "1958-06-15",
    "type": "story",
    "tags": [
      "Storytelling",
      "Grandmother",
      "Fables",
      "Bedtime",
      "Courtyard"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Dadi knew hundreds of stories by heart. She never needed a book. She would point up at the stars and make the sky come alive for us.",
    "sourceLabel": "Rooftop Charpai, Jaipur",
    "location": "Rooftop Charpai, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Childhood",
    "lifeStage": "Childhood (1950s)",
    "quote": "Dadi knew hundreds of stories by heart. She never needed a book. She would point up at the stars and make the sky come alive for us.",
    "reflection": "Storytelling was oral folklore woven into bedtime rituals under Jaipur's expansive night canopy, laying the bedrock of Savitri's own gift for narrative.",
    "sfx": "night crickets humming, gentle rooftop desert wind, soft creaking of jute cot"
  },
  {
    "id": "savitri-mem-07",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Evening Call of the Vegetable Seller",
    "description": "Around four in the afternoon, Ramu Kaka would push his wooden wooden cart down the narrow lane. His musical singsong voice announcing fresh fenugreek, coriander, and round red tomatoes brought all the women to their balconies with wicker baskets tied to long jute ropes. Ma would bargain good-naturedly, asking after his family while he weighed the greens on iron scales.",
    "occurredAt": "1959-06-15",
    "type": "story",
    "tags": [
      "Bazaar",
      "Sabzi",
      "StreetLife",
      "Everyday",
      "Jaipur"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "You didn't need a clock; when Ramu Kaka called out for fresh coriander, you knew tea time was half an hour away.",
    "sourceLabel": "Street Outside Haveli, Jaipur",
    "location": "Street Outside Haveli, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Childhood (1950s)",
    "quote": "You didn't need a clock; when Ramu Kaka called out for fresh coriander, you knew tea time was half an hour away.",
    "reflection": "The rhythm of neighborhood vendors was the communal clockwork of the old city, where commerce was always secondary to personal connection and news.",
    "sfx": "street vendor singsong call, iron scale weights clinking, bicycle bell ringing"
  },
  {
    "id": "savitri-mem-08",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Listening to the Radio with Family",
    "description": "Wednesday at eight in the evening was sacred. Pitaji would turn the amber-lit dial of our bulky valve radio to Radio Ceylon. As Ameen Sayani's booming voice said 'Namaskar bhaiyo aur behno!', the whole living room fell completely silent. We would hum along to Lata Mangeshkar and Mohammed Rafi songs, tapping our knees and debating which tune would reach number one.",
    "occurredAt": "1960-06-15",
    "type": "photo",
    "tags": [
      "Radio",
      "Music",
      "AmeenSayani",
      "BinacaGeetmala",
      "Family"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.cabinMorningAudio,
    "transcript": "Wednesday night Binaca Geetmala was the one hour nobody in the house argued. We sat shoulder-to-shoulder waiting to hear which song was number one.",
    "sourceLabel": "Central Baithak, Jaipur",
    "location": "Central Baithak, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Childhood (1950s)",
    "quote": "Wednesday night Binaca Geetmala was the one hour nobody in the house argued. We sat shoulder-to-shoulder waiting.",
    "reflection": "The glowing wooden radio was a hearth of collective wonder, gathering generations together in harmonious stillness and musical anticipation.",
    "sfx": "vintage valve radio static dial tuning, warm acoustic radio intro, family murmurs"
  },
  {
    "id": "savitri-mem-09",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Festival Dress Mother Sewed",
    "description": "For Diwali when I was twelve, Ma spent three weeks hand-stitching a bright yellow and red tie-dye bandhej skirt for me. She salvaged silver gota lace from her own bridal dupatta to sew along the border. When I twirled in the courtyard, the silver lace caught the light of the oil lamps. I felt like the most blessed girl in Rajasthan.",
    "occurredAt": "1959-06-15",
    "type": "story",
    "tags": [
      "Mother",
      "Sewing",
      "Dress",
      "Bandhej",
      "Festivals"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Ma worked on that yellow skirt late into the night under a kerosene lamp. She said, 'My daughter should shine as bright as any diya tonight.'",
    "sourceLabel": "Inner Verandah, Jaipur",
    "location": "Inner Verandah, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Home and traditions",
    "lifeStage": "Childhood (1950s)",
    "quote": "Ma worked on that yellow skirt late into the night under a kerosene lamp. She said, 'My daughter should shine as bright as any diya tonight.'",
    "reflection": "Maternal devotion transformed modest fabric into heirlooms of regal pride, where silver trims stitched by kerosene lamp created lifelong memories of warmth.",
    "sfx": "gentle snip of dressmaking scissors, thimble tapping, rustling of silk fabric"
  },
  {
    "id": "savitri-mem-10",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Flying Kites from the Rooftop",
    "description": "On Makar Sankranti, every rooftop in Jaipur awoke at dawn with blaring trumpets and song. Pitaji would hold the bamboo reel (charkhi) while my brother maneuvered the paper patang high into the pale blue sky. Whenever their string cut down a rival kite, all of us jumped up and down, yelling 'Woh kata!' until our throats were hoarse, all while eating sweet sesame til-gud laddoos.",
    "occurredAt": "1961-06-15",
    "type": "photo",
    "tags": [
      "MakarSankranti",
      "Kites",
      "Rooftop",
      "Patang",
      "Winter"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "The January wind on the rooftop was freezing, but you forgot the cold the moment your kite caught the high breeze. The whole city looked up together.",
    "sourceLabel": "Rooftop Terrace, Jaipur",
    "location": "Rooftop Terrace, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Childhood",
    "lifeStage": "Childhood (1950s)",
    "quote": "The January wind on the rooftop was freezing, but you forgot the cold the moment your kite caught the high breeze.",
    "reflection": "Makar Sankranti on Jaipur's rooftops united the entire skyline in joyous airborne rivalry, sweetened by homemade sesame confections.",
    "sfx": "crisp winter breeze fluttering paper kites, distant shouts of 'Kai Po Che', fluttering string"
  },
  {
    "id": "savitri-mem-11",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The First Cup of Chai at Sunrise",
    "description": "Before the rest of the household stirred, I would wake up at five and light the kitchen gas. Crushing fresh ginger, green cardamom pods, and lemongrass in the small brass mortar was my morning meditation. Sitting alone on the terrace watching the morning sun illuminate the ramparts of Nahargarh fort with that steaming cup in both hands—that was the hour that gave me strength for the day.",
    "occurredAt": "1972-06-15",
    "type": "photo",
    "tags": [
      "Chai",
      "Morning",
      "Sunrise",
      "Ginger",
      "Jaipur"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "People rush into their mornings, but that first cup of adrak-elaichi chai needs silence. You take one sip, watch the sky turn from grey to pink, and remember to be grateful.",
    "sourceLabel": "Balcony Facing Nahargarh, Jaipur",
    "location": "Balcony Facing Nahargarh, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "People rush into their mornings, but that first cup of adrak-elaichi chai needs silence. You take one sip, watch the sky turn pink, and remember to be grateful.",
    "reflection": "For Savitri, the dawn cup of chai was not a habit but a sacred quiet anchor, brewed with patience before the demands of a bustling household began.",
    "sfx": "brass pestle crushing ginger in mortar, gentle bubbling of tea on low flame, morning birds chirping"
  },
  {
    "id": "savitri-mem-12",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Sunday Aloo Parathas",
    "description": "Sunday mornings had no schedules. I would boil potatoes with a pinch of turmeric, mash them with chopped green chillies, fresh coriander, roasted cumin, and dry mango powder. The kids would sit cross-legged with their brass thalis waiting for parathas hot off the tawa, asking for extra spoons of fresh churned curd. No matter how many I made, the plates were always licked clean.",
    "occurredAt": "1975-06-15",
    "type": "story",
    "tags": [
      "Food",
      "AlooParatha",
      "Family",
      "Sunday",
      "Breakfast"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "The secret is roasting the cumin seeds dry before grinding them into the potato mash. A Sunday without parathas didn't feel like Sunday at all.",
    "sourceLabel": "Kitchen Dining Table, Jaipur",
    "location": "Kitchen Dining Table, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "The secret is roasting the cumin seeds dry before grinding them into the potato mash. A Sunday without parathas didn't feel like Sunday at all.",
    "reflection": "Food in the Sharma home was nourishment blended with joyful ritual, cementing lazy Sunday mornings into foundational family memories.",
    "sfx": "sizzle of ghee on hot iron skillet, gentle clink of brass spoons on metal thali, laughter"
  },
  {
    "id": "savitri-mem-13",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Secret to Her Mango Pickle",
    "description": "Every May, my mother-in-law and I would buy fifty kilos of raw green mangoes. We would salt them, dry the firm wedges on clean cotton sheets on the rooftop, and mix them with fenugreek seeds, fennel, nigella, and hot mustard oil. We sealed the big ceramic barnis with clean white muslin. People said our achaar could last five years without spoiling.",
    "occurredAt": "1978-06-15",
    "type": "story",
    "tags": [
      "Pickle",
      "AamKaAchaar",
      "Recipe",
      "Summer",
      "MustardOil"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Everyone asks for the recipe, but it's not the spices—it's the patience. You have to let the sun do half the cooking on the rooftop.",
    "sourceLabel": "Spice Room, Jaipur",
    "location": "Spice Room, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "Everyone asks for the recipe, but it's not the spices—it's the patience. You have to let the sun do half the cooking on the rooftop.",
    "reflection": "Preserving raw mangoes in earthen jars under the Rajasthan sun was an annual masterclass in patience, transforming summer bounty into year-round sustenance.",
    "sfx": "knife chopping firm green mangoes, mustard seeds crackling, jar lid clinking shut"
  },
  {
    "id": "savitri-mem-14",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Papad Drying Under the Summer Sun",
    "description": "Before the monsoon hit, all the women in our mohalla would gather on our terrace to roll out papads. We had wooden rolling pins and brass thalis, rolling urad dal dough seasoned with crushed black pepper and hing. We had to keep a long bamboo stick nearby to shoo away opportunistic crows who thought our drying papads were made for them.",
    "occurredAt": "1974-06-15",
    "type": "story",
    "tags": [
      "Papad",
      "Rooftop",
      "Summer",
      "Tradition",
      "Community"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Rolling papads was hard work for the wrists, but with four neighbours gossiping and singing songs, two hundred papads were finished before noon.",
    "sourceLabel": "Rooftop Terrace, Jaipur",
    "location": "Rooftop Terrace, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Home and traditions",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "With four neighbours gossiping and singing songs, two hundred papads were finished before noon.",
    "reflection": "Collective homemaking turned exhausting physical chores into joyful communal gatherings where stories and recipes flowed without pause.",
    "sfx": "wooden rolling pin on wooden board, distant crow cawing, breezy rooftop chatter"
  },
  {
    "id": "savitri-mem-15",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Spice Box in the Kitchen",
    "description": "My brass masala box has seven small inner cups: cumin, mustard seeds, turmeric, coriander powder, Kashmiri chilli, garam masala, and fenugreek. My mother received it at her wedding in 1935, and passed it to me when I moved to Jaipur. Opening its heavy lid is like opening the heart of Indian cooking—a burst of earthy fragrance that tells you lunch is going to be honest and good.",
    "occurredAt": "1970-06-15",
    "type": "story",
    "tags": [
      "MasalaDabba",
      "Kitchen",
      "Spices",
      "Home",
      "Heirloom"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "I don't need measuring spoons. My hand knows exactly how much turmeric goes into the dal just by feeling the weight of the little brass spoon.",
    "sourceLabel": "Kitchen Shelf, Jaipur",
    "location": "Kitchen Shelf, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "I don't need measuring spoons. My hand knows exactly how much turmeric goes into the dal just by feeling the weight.",
    "reflection": "The heirloom brass spice box is a repository of generational culinary instinct, where measurements are measured by intuition and memory rather than scales.",
    "sfx": "brass lid sliding open, tiny brass spoon tapping rim, sizzling tadka in hot oil"
  },
  {
    "id": "savitri-mem-16",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Fresh Marigold Garlands Before a Festival",
    "description": "On festival eve, the house would be filled with baskets of fresh orange and saffron marigolds bought at dawn from Chhoti Chaupar. We would thread them one by one onto long thick strings with dull needles, hanging torans over every wooden doorway and arch. The rich, pungent, floral aroma told everyone who walked past that celebration had arrived.",
    "occurredAt": "1976-06-15",
    "type": "photo",
    "tags": [
      "Marigold",
      "GendaPhool",
      "Festivals",
      "Flowers",
      "Fragrance"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "That smell of fresh marigold and mango leaves on the doorframe is the real face of our festivals. It welcomes both God and guests.",
    "sourceLabel": "Phool Mandi, Chhoti Chaupar, Jaipur",
    "location": "Phool Mandi, Chhoti Chaupar, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Festivals",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "That smell of fresh marigold and mango leaves on the doorframe is the real face of our festivals.",
    "reflection": "Floral decoration was a tactile, scented greeting of welcome, sanctifying doorways with vibrant saffron blooms woven together by family hands.",
    "sfx": "rustle of fresh flower petals, needle pulling cotton thread through blossoms, temple bells"
  },
  {
    "id": "savitri-mem-17",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Folding Sarees with Care",
    "description": "Every autumn before the festive season, I would open the dark steel Godrej almirah to air out my sarees. My daughter and I would stand at opposite ends of a six-yard length of silk, pulling it taut, smoothing out creases, and folding it with military precision. We tucked dried neem leaves and dried cloves between the folds to keep them fresh without chemicals.",
    "occurredAt": "1979-06-15",
    "type": "story",
    "tags": [
      "Saree",
      "Handloom",
      "Silk",
      "Trunk",
      "Tradition"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Every saree has a story—where you bought it, which nephew's wedding you wore it to. You don't just fold cloth; you fold memories.",
    "sourceLabel": "Upstairs Bedroom, Jaipur",
    "location": "Upstairs Bedroom, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Home and traditions",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "Every saree has a story—where you bought it, which wedding you wore it to. You don't just fold cloth; you fold memories.",
    "reflection": "Textiles in Savitri's care were woven archives of family occasions, each fold preserving the dignity of past celebrations.",
    "sfx": "smooth rustle of crisp silk fabric, soft thud of wooden almirah door closing"
  },
  {
    "id": "savitri-mem-18",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Old Recipe Notebook",
    "description": "I started this diary the year after my wedding. It has recipes written in my hurried Hindi handwriting: the exact proportion of mawa for gulab jamun, how to make the batter for ghewar on Teej, and remedies for coughs using tulsi, black pepper, and honey. The page for ker-sangri has yellow oil stains from forty years ago, which is how you know it's the most trustworthy page in the book.",
    "occurredAt": "1981-06-15",
    "type": "story",
    "tags": [
      "Recipe",
      "Notebook",
      "Handwritten",
      "Heirloom",
      "Cooking"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "My grandchildren laugh that I keep this torn old notebook, but if you want that festival ghewar to turn out porous and crisp, those faded notes are pure gold.",
    "sourceLabel": "Kitchen Desk, Jaipur",
    "location": "Kitchen Desk, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "The page for ker-sangri has yellow oil stains from forty years ago, which is how you know it's the most trustworthy page.",
    "reflection": "The stained, handwritten culinary journal serves as a living document of familial sustenance, containing decades of tested wisdom.",
    "sfx": "paper page turning gently, scratching fountain pen nib, soft kitchen hum"
  },
  {
    "id": "savitri-mem-19",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Sharing Sweets with Neighbours",
    "description": "In our mohalla, you never returned an empty bowl. When Mrs. Mathur brought over her delicious carrot halwa in winter, I would clean the brass katori and return it filled with roasted besan laddoos or spiced kachoris. We didn't need festival occasions to share food; making something sweet was reason enough to send the children running next door.",
    "occurredAt": "1977-06-15",
    "type": "story",
    "tags": [
      "Neighbours",
      "Community",
      "Mithai",
      "Kindness",
      "Jaipur"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Our mothers taught us that an empty dish returned to a neighbour brings bad luck. It was an excuse to keep the cycle of sweetness going forever.",
    "sourceLabel": "Mohalla Lane, Jaipur",
    "location": "Mohalla Lane, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "Our mothers taught us that an empty dish returned to a neighbour brings bad luck. It kept the cycle of sweetness going.",
    "reflection": "Neighborly bonds were sustained through an unbroken etiquette of reciprocal generosity, where sweet dishes bridged families across doorways.",
    "sfx": "metal thali clinking against gate latch, friendly greeting across the courtyard"
  },
  {
    "id": "savitri-mem-20",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Stories Told During Power Cuts",
    "description": "When the summer load-shedding struck and the electric fans wound down to a slow stop, nobody complained. We brought out hand-held khus fans soaked in water, lit a brass hurricane lantern, and sat in a circle on the cool stone floor. With no television to distract us, my husband would sing old Ghazals and I would quiz the children with traditional riddles (paheliyan) until the lights flickered back on.",
    "occurredAt": "1983-06-15",
    "type": "story",
    "tags": [
      "PowerCut",
      "Candlelight",
      "Storytelling",
      "Monsoon",
      "Family"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.cabinMorningAudio,
    "transcript": "Those power cuts were a blessing in disguise. As soon as the room went pitch dark, we gathered close, lit one candle, and talked from our hearts.",
    "sourceLabel": "Central Courtyard, Jaipur",
    "location": "Central Courtyard, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Those power cuts were a blessing in disguise. As soon as the room went pitch dark, we gathered close and talked from our hearts.",
    "reflection": "Technological outages brought rare, unscripted intimacy, re-illuminating family connection beneath the gentle glow of candlelight.",
    "sfx": "whirring fan slowing to silence, match striking, soft rustle of vetiver hand fan"
  },
  {
    "id": "savitri-mem-21",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Lighting Diyas on Diwali Evening",
    "description": "On Amavasya night, we soaked two hundred small earthen diyas in water all afternoon so they wouldn't drink up the oil. At dusk, after the Lakshmi pooja, all the women and girls went around with brass thalis of burning lamps, placing them along the staircase, the terrace parapet, and the well. Standing on the roof and seeing thousands of little flames glowing across the entire city of Jaipur made you feel the world was fundamentally good.",
    "occurredAt": "1985-06-15",
    "type": "photo",
    "tags": [
      "Diwali",
      "Diyas",
      "Light",
      "Evening",
      "Sacred"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "You have to watch that the flame doesn't flutter in the breeze. When the whole parapet is glowing with warm yellow light, darkness doesn't stand a chance.",
    "sourceLabel": "Courtyard and Parapet, Jaipur",
    "location": "Courtyard and Parapet, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Festivals",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "When the whole parapet is glowing with warm yellow light, darkness doesn't stand a chance.",
    "reflection": "Diwali was an act of communal renewal, dispelling winter darkness with hand-poured oil lamps along every stone threshold.",
    "sfx": "gentle night wind, crackle of earthen diya wick, distant festive firecrackers"
  },
  {
    "id": "savitri-mem-22",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Colours of Holi in the Courtyard",
    "description": "We only used natural colours made from dried tesu flowers that we soaked overnight in big brass buckets until the water turned deep orange. By ten in the morning, uncles, aunts, cousins, and neighbours were drenched from head to toe. Nobody was spared. Even the strictest elders had a smear of gulal placed gently on their foreheads, followed by crisp gujiyas and glasses of cold almond thandai.",
    "occurredAt": "1982-06-15",
    "type": "photo",
    "tags": [
      "Holi",
      "Gulal",
      "Colours",
      "Courtyard",
      "Spring"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Holi in Jaipur washed away every old grudge. You put gulal on someone's cheeks, hugged them, and started fresh.",
    "sourceLabel": "Courtyard (Aangan), Jaipur",
    "location": "Courtyard (Aangan), Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Festivals",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Holi in Jaipur washed away every old grudge. You put gulal on someone's cheeks, hugged them, and started fresh.",
    "reflection": "Holi was the ultimate equalizer, dissolving formal social hierarchies in clouds of scented crimson powder and sweet seasonal confections.",
    "sfx": "splashing water buckets, joyous laughter, rhythmic dholak drum beats"
  },
  {
    "id": "savitri-mem-23",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Raksha Bandhan and the Family Gathering",
    "description": "Every Shravan full moon, my brothers would come to Jaipur no matter how busy their work was. I prepared a silver thali with roli, rice grains, sweet pedas, and silk rakhis with red tassels. Tying the thread around their wrists and touching their feet was emotional, but within ten minutes we were teasing each other like we were ten years old again in the village courtyard.",
    "occurredAt": "1984-06-15",
    "type": "story",
    "tags": [
      "Rakhi",
      "Brothers",
      "Family",
      "Sweets",
      "Bond"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "No matter how old my brothers got with their gray hair and spectacles, on Rakhi day they were still my little protective brothers.",
    "sourceLabel": "Main Living Room, Jaipur",
    "location": "Main Living Room, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Festivals",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "No matter how old my brothers got with their gray hair, on Rakhi day they were still my little protective brothers.",
    "reflection": "Raksha Bandhan preserved an enduring sibling sanctuary, cutting across decades of geographic separation with a simple strand of silk.",
    "sfx": "silver thali bell tinkling, sweet rustle of silk ribbon, joyous greetings"
  },
  {
    "id": "savitri-mem-24",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Quiet Morning of Teej",
    "description": "Teej is Jaipur's favourite celebration of love and green monsoon showers. The men tied a sturdy rope swing to the old neem tree, wrapping the ropes with fresh jasmine vines. We dressed in emerald green leheriya sarees with red borders, sang folk songs while soaring high on the swing, and shared fresh, honeycomb ghewar drenched in saffron sugar syrup.",
    "occurredAt": "1980-06-15",
    "type": "story",
    "tags": [
      "Teej",
      "Monsoon",
      "Swing",
      "Ghewar",
      "Rajasthan"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "When you swing high into the neem branches wearing your green leheriya, the cool breeze makes you feel like you are flying into the monsoon clouds.",
    "sourceLabel": "Garden Courtyard, Jaipur",
    "location": "Garden Courtyard, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Festivals",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "When you swing high into the neem branches wearing your green leheriya, you feel like you are flying into the monsoon clouds.",
    "reflection": "Teej celebrated the desert's lush monsoon awakening with vibrant green silks, swaying tree swings, and centuries-old Rajasthani folk lyrics.",
    "sfx": "rope swing creaking gently on sturdy branch, women singing Rajasthani folk harmony, monsoon breeze"
  },
  {
    "id": "savitri-mem-25",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Preparing Sweets Before a Family Wedding",
    "description": "Ten days before my nephew's wedding, the halwai arrived with his team and set up huge iron cauldrons in the courtyard. All of us aunts sat around rolling out thousands of tiny kachoris and helping stir huge mounds of badam halwa. The sweet aroma of pure ghee, pistachios, and saffron hung over the entire street, letting everyone know a wedding was in the air.",
    "occurredAt": "1987-06-15",
    "type": "story",
    "tags": [
      "Wedding",
      "Mithai",
      "Halwai",
      "Celebration",
      "Family"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Wedding preparations were more fun than the wedding day itself. We sang teasing songs late into the night while the syrup was bubbling.",
    "sourceLabel": "Back Courtyard Kitchen, Jaipur",
    "location": "Back Courtyard Kitchen, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Wedding preparations were more fun than the wedding day itself. We sang teasing songs late into the night.",
    "reflection": "The communal sweet-making marathon ahead of a wedding bonded extended relatives in joyous labor, sweetened by teasing songs and golden ghee.",
    "sfx": "heavy wooden spatula stirring sweet milk in cauldron, rhythmic wedding dholak, women singing"
  },
  {
    "id": "savitri-mem-26",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Decorating the House for a Birthday",
    "description": "When my eldest granddaughter turned five, we spent all morning making handmade decorations. We cut strips of pink, turquoise, and yellow crepe paper, looped them together using a sticky paste made from boiling wheat flour, and hung them across the living room chandelier. She ran into the room with wide eyes, clapping her hands in wonder.",
    "occurredAt": "1989-06-15",
    "type": "story",
    "tags": [
      "Birthday",
      "Grandchildren",
      "Decorations",
      "PaperChains",
      "Celebration"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "We didn't buy fancy plastic decorations from the market. Making those paper chains with our own hands made the celebration feel real.",
    "sourceLabel": "Drawing Room, Jaipur",
    "location": "Drawing Room, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Making those paper chains with our own hands made the celebration feel real.",
    "reflection": "Simple homemade birthday decorations carried immense sentimental care, demonstrating that handmade effort always outshines commercial plastic.",
    "sfx": "paper rustling, scissors snipping, child clapping hands in delight"
  },
  {
    "id": "savitri-mem-27",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Family Photograph After a Festival",
    "description": "After Diwali lunch, Pitaji insisted on the annual family photograph. Uncle brought his tripod and mechanical camera with a red timer button. Trying to fit all four generations—from octogenarian grandmothers down to squirming toddlers—was pandemonium. Just before the shutter clicked, someone made a silly joke, capturing everyone mid-laugh with honest, unposed joy.",
    "occurredAt": "1986-06-15",
    "type": "photo",
    "tags": [
      "Photograph",
      "Family",
      "Festival",
      "BlackAndWhite",
      "Memory"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Look at this picture—everyone is looking in a different direction and someone's dupatta is falling off, but you can feel the love jumping off the paper.",
    "sourceLabel": "Front Verandah Steps, Jaipur",
    "location": "Front Verandah Steps, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Letters and photographs",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Everyone is looking in a different direction, but you can feel the love jumping off the paper.",
    "reflection": "The sprawling post-festival family portrait captured the vibrant, chaotic reality of multigenerational kinship in its purest form.",
    "sfx": "mechanical camera shutter click, laughter erupting from large crowd"
  },
  {
    "id": "savitri-mem-28",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Winter Evening Around the Heater",
    "description": "January in Jaipur had crisp, sharp nights. After dinner, we all crowded into the bedroom around the single electric coil heater, its red wires glowing warmly. We cracked hot roasted peanuts, tossing the shells into a wicker basket, while discussing politics, neighbourhood news, and old family history under heavy wool blankets.",
    "occurredAt": "1988-06-15",
    "type": "story",
    "tags": [
      "Winter",
      "Heater",
      "Peanuts",
      "Ghazals",
      "Cozy"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "The heater only warmed about two feet of space, so all six of us had to sit knee-to-knee. That physical closeness brought a closeness in our hearts too.",
    "sourceLabel": "Master Bedroom, Jaipur",
    "location": "Master Bedroom, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "The heater only warmed about two feet of space, so all six of us sat knee-to-knee. That brought closeness in our hearts.",
    "reflection": "Cramped winter warmth around a tiny coil heater became a cozy sanctuary where multigenerational conversations flourished unhurriedly.",
    "sfx": "cracking open roasted peanut shells, soft hum of electric heating element, muted winter wind"
  },
  {
    "id": "savitri-mem-29",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Sound of Wedding Dhol",
    "description": "You can hear a Rajasthani wedding dhol from three streets away. When the groom's procession arrived with brass trumpets and percussionists beating heavy wooden dholaks, the courtyard stones literally vibrated. Even my quietest mother-in-law would lift her pallu and step out to clap her hands in time with the rhythm, welcoming the baraat with rosewater and sweets.",
    "occurredAt": "1990-06-15",
    "type": "story",
    "tags": [
      "Wedding",
      "Dhol",
      "Baraat",
      "Dance",
      "Rajasthan"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    "transcript": "That dhol beat doesn't enter through your ears; it enters through your chest. When it starts playing, you can't keep your feet still.",
    "sourceLabel": "Haveli Entrance, Jaipur",
    "location": "Haveli Entrance, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Festivals",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "That dhol beat doesn't enter through your ears; it enters through your chest.",
    "reflection": "The thundering wedding dhol was the primal heartbeat of Rajasthani celebration, calling every generation into rhythmic unity and joy.",
    "sfx": "booming acoustic dhol percussion crescendo, festive cheers, brass horn fanfare"
  },
  {
    "id": "savitri-mem-30",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Sending Homemade Sweets to Relatives",
    "description": "Every Diwali, I prepared special besan ke laddoo and gond ke laddoo for my cousins living in Delhi and Mumbai. We packed them in round Dalda tins lined with greaseproof paper, wrapped the tins in white cotton cloth, and stitched the seams with needle and twine before sealing them with hot red wax at the post office. It was a labour of love.",
    "occurredAt": "1991-06-15",
    "type": "story",
    "tags": [
      "Mithai",
      "Post",
      "Laddoo",
      "Care",
      "Relatives"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "When they opened that parcel a week later, they would say they could smell Jaipur the moment the wax broke.",
    "sourceLabel": "Jaipur Post Office, Jaipur",
    "location": "Jaipur Post Office, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "When they opened that parcel a week later, they could smell Jaipur the moment the wax broke.",
    "reflection": "Carefully wrapped tin containers of handmade confections carried hometown scent and familial blessing across interstate borders.",
    "sfx": "packing tape pulling and tearing, wax dripping on fabric, postal stamp thud"
  },
  {
    "id": "savitri-mem-31",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Wedding Photograph Kept in a Trunk",
    "description": "In our 1964 wedding photo, neither my husband nor I are smiling—the photographer warned us that smiling in formal studio portraits was uncultured! I was wearing a heavy gota-embroidered red poshak, barely nineteen, looking down shyly, while he sat stiffly in an achkan and saffron turban. Looking at that faded photograph sixty years later, I remember the nervous excitement of stepping into an unknown life that turned out so rich and full.",
    "occurredAt": "1964-06-15",
    "type": "story",
    "tags": [
      "Wedding",
      "Photograph",
      "Vintage",
      "Love",
      "Heirloom"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "We looked so serious in that photograph, almost frightened! But beneath that formal pose was sixty years of unwavering companionship.",
    "sourceLabel": "Trunk Room, Jaipur",
    "location": "Trunk Room, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Letters and photographs",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "We looked so serious in that photograph! But beneath that formal pose was sixty years of unwavering companionship.",
    "reflection": "A sepia bridal portrait preserves the solemn threshold of marriage, where nervous beginnings blossomed into six decades of shared devotion.",
    "sfx": "creak of antique brass trunk latch opening, delicate paper rustle, soft nostalgic violin melody"
  },
  {
    "id": "savitri-mem-32",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The First Day in a New Home",
    "description": "The day we moved into our own home in C-Scheme was unforgettable. We performed the Griha Pravesh pooja at dawn, carrying a pot of Ganga water and an idol of Lord Ganesha over the threshold. The first thing we did in the kitchen was boil fresh milk until it spilled over the sides of the brass vessel, a symbol that our new home would always overflow with abundance and peace.",
    "occurredAt": "1968-06-15",
    "type": "story",
    "tags": [
      "GrihaPravesh",
      "NewHome",
      "MilkBoiling",
      "Jaipur",
      "Milestone"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Watching that milk boil over and hearing the pandit chant mantras made those bare brick walls feel instantly like our own sacred shelter.",
    "sourceLabel": "New Haveli, C-Scheme, Jaipur",
    "location": "New Haveli, C-Scheme, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Home and traditions",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "Watching that milk boil over made those bare walls feel instantly like our own sacred shelter.",
    "reflection": "The ceremonial boiling over of milk consecrated empty masonry into a sanctuary of generational security and spiritual warmth.",
    "sfx": "conch shell blowing, Sanskrit pooja chanting, milk bubbling over pan rim"
  },
  {
    "id": "savitri-mem-33",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Letter Received from a Loved One",
    "description": "When my younger brother went abroad to study engineering in 1973, telephone calls were unthinkable luxuries. Every three weeks, the postman would slide a light blue airmail letter under our door. His handwriting covered every single millimetre of margin space to save on postage. I read his descriptions of cold English fog while sitting in the Jaipur sun, feeling his voice right in the room.",
    "occurredAt": "1973-06-15",
    "type": "story",
    "tags": [
      "Letter",
      "InlandLetter",
      "Postcard",
      "BlueInk",
      "Distance"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "I kept all his blue airmail letters tied with a red ribbon. You could hold someone's heart in a piece of paper back then.",
    "sourceLabel": "Verandah Armchair, Jaipur",
    "location": "Verandah Armchair, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Letters and photographs",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "I kept all his blue airmail letters tied with a red ribbon. You could hold someone's heart in a piece of paper back then.",
    "reflection": "Handwritten aerogrammes bridged continents with tangible tactile devotion, preserving spoken cadences across weeks of sea travel.",
    "sfx": "envelope tearing open gently, light paper unfolding, distant fountain pen scratching"
  },
  {
    "id": "savitri-mem-34",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Her First Journey by Train",
    "description": "The journey to Haridwar after our wedding was my first time boarding an express train. The station was a whirlwind of red-shirted porters with brass armbands carrying steel trunks. Sitting beside the window as the steam engine whistled and chugged through the Rajasthan countryside was pure magic. At every junction, vendors handed up earthen kulhads of boiling tea through the iron window bars.",
    "occurredAt": "1965-06-15",
    "type": "story",
    "tags": [
      "TrainJourney",
      "IndianRailways",
      "WindowSeat",
      "Chai",
      "Travel"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Drinking sweet chai from a clay cup while looking out the train window as the yellow mustard fields flew past—that was the thrill of a lifetime.",
    "sourceLabel": "Jaipur Junction Railway Station",
    "location": "Jaipur Junction Railway Station",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Travel",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "Drinking sweet chai from a clay cup while looking out the train window as the yellow mustard fields flew past—that was the thrill of a lifetime.",
    "reflection": "Savitri's maiden rail voyage opened the expansive beauty of rural India, punctuated by steaming clay cups and the rhythmic clatter of tracks.",
    "sfx": "steam train whistle echoing, rhythmic chugging on tracks, platform vendor calling 'Chai garam'"
  },
  {
    "id": "savitri-mem-35",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Day the Family Bought Its First Television",
    "description": "In 1982 for the Asian Games, my husband brought home a brand new wooden-cabinet black-and-white television. We had to fix a tall aluminium antenna on the roof, with someone yelling down 'Did the picture clear up yet?' Every Sunday evening for Chitrahaar and the Mahabharat serial, half the neighbourhood would gather in our living room with cups of chai.",
    "occurredAt": "1982-06-15",
    "type": "photo",
    "tags": [
      "Television",
      "Doordarshan",
      "Community",
      "Antenna",
      "Milestone"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Our living room became like a village theatre. Nobody cared where they sat—on the sofa, on the floor, on the doorstep—as long as we watched together.",
    "sourceLabel": "Front Baithak, Jaipur",
    "location": "Front Baithak, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Our living room became like a village theatre. Nobody cared where they sat, as long as we watched together.",
    "reflection": "The introduction of television acted not as an isolator but as a community magnet, turning a private living room into an open neighborhood hall.",
    "sfx": "old TV dial clicking, static buzz turning to clear Doordarshan theme tune, collective murmur"
  },
  {
    "id": "savitri-mem-36",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Teaching a Grandchild to Knead Dough",
    "description": "My grandson Rohan was only seven when he pulled up a wooden stool to help make dinner. I gave him a small ball of wholewheat dough in a brass parat. He punched it with all his might, sending white flour all over his nose and cheeks. I held his small wrists, showing him how to fold and press with his knuckles. His first roti was shaped like Australia, but we roasted it proudly and ate every crumb.",
    "occurredAt": "1998-06-15",
    "type": "story",
    "tags": [
      "Grandchildren",
      "Baking",
      "Rotis",
      "Patience",
      "Teaching"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.cabinMorningAudio,
    "transcript": "I told him, 'Cooking isn't about perfection, beta; it's about putting warmth into the food so whoever eats it feels cared for.'",
    "sourceLabel": "Kitchen Counter, Jaipur",
    "location": "Kitchen Counter, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Grandchildren",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Cooking isn't about perfection, beta; it's about putting warmth into the food so whoever eats it feels cared for.",
    "reflection": "Imparting culinary basics to a grandchild was an exercise in unconditional affection, where misshapen rotis were celebrated like five-star banquets.",
    "sfx": "soft patter of flour on wood, child laughing, grandmother's encouraging chuckle"
  },
  {
    "id": "savitri-mem-37",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Helping a Grandchild with Homework",
    "description": "My granddaughter struggled with her high school Hindi poetry. We sat on the verandah in the afternoon sun with a plate of pink guavas sprinkled with chaat masala. I recited Kabir's couplet—'Bura jo dekhan main chala, bura na milya koy'—and explained that poets didn't write to torture students on exams; they wrote to help us understand human hearts. Her eyes lit up with sudden understanding.",
    "occurredAt": "2001-06-15",
    "type": "story",
    "tags": [
      "Grandchildren",
      "Homework",
      "Hindi",
      "Poetry",
      "Patience"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Once she understood what Kabir was really saying about looking inside your own heart, she didn't just pass her test—she fell in love with literature.",
    "sourceLabel": "Courtyard Verandah, Jaipur",
    "location": "Courtyard Verandah, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Grandchildren",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Poets didn't write to torture students on exams; they wrote to help us understand human hearts.",
    "reflection": "Bridging classical verse with everyday empathy, Savitri turned intimidating homework into profound spiritual conversations over sliced fruit.",
    "sfx": "pencil scribbling on lined notebook, gentle recitation of Hindi verse, rustling courtyard leaves"
  },
  {
    "id": "savitri-mem-38",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Birthday Cake Made at Home",
    "description": "Before we had modern ovens, baking a birthday cake was a mechanical adventure. I filled our large Hawkins pressure cooker with dry river sand, removed the whistle weight, and placed a round tin of vanilla batter inside. When the kitchen filled with the aroma of caramelized sugar and warm vanilla, the children waited outside the door like little puppies. It came out golden, tender, and delicious.",
    "occurredAt": "1995-06-15",
    "type": "story",
    "tags": [
      "Cake",
      "PressureCooker",
      "Birthday",
      "Grandchildren",
      "Baking"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    "transcript": "No bakery cake in the world can match the pride of opening that pressure cooker lid and seeing the cake risen tall and golden.",
    "sourceLabel": "Kitchen, Jaipur",
    "location": "Kitchen, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "No bakery cake can match the pride of opening that pressure cooker lid and seeing the cake risen tall and golden.",
    "reflection": "Ingenuity transformed a pressure cooker into an impromptu bakery, turning resource constraints into triumphant celebrations of love.",
    "sfx": "hiss of warm steam from cooker valve, children clapping, cake knife sliding through sponge"
  },
  {
    "id": "savitri-mem-39",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Family Reunion After Many Years",
    "description": "For my 70th birthday, my children secretly coordinated a reunion that brought forty-five relatives back to the Jaipur home. When the gates opened and cousins who hadn't seen each other in fifteen years fell into each other's arms with tears and laughter, the old walls seemed to breathe with gratitude. We cooked seventy rotis at every meal and stayed up until three in the morning reminiscing.",
    "occurredAt": "2004-06-15",
    "type": "photo",
    "tags": [
      "Reunion",
      "Family",
      "Cousins",
      "Haveli",
      "Homecoming"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Seeing our courtyard full of all the children and grandchildren, hearing all those voices speaking Hindi and English together—my heart was full.",
    "sourceLabel": "Main Haveli Courtyard, Jaipur",
    "location": "Main Haveli Courtyard, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Seeing our courtyard full of all the children and grandchildren, hearing all those voices—my heart was full.",
    "reflection": "The milestone reunion reconstituted ancestral roots across continents, re-centering the sprawling family around Savitri's nurturing presence.",
    "sfx": "waves of joyful conversation and laughter, clattering dinner plates, emotional greetings"
  },
  {
    "id": "savitri-mem-40",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Photograph Everyone Laughed About",
    "description": "We were having a family picnic beside Ramgarh Lake. Uncle sat pompously adjusting his tie for a formal portrait, holding a fresh potato samosa. Exactly as the camera timer went off, a cheeky langur monkey swung down from the branch above, snatched the samosa straight out of his fingers, and left him with a stunned expression. That photograph still sits in our living room album and still makes us weep with laughter.",
    "occurredAt": "1993-06-15",
    "type": "photo",
    "tags": [
      "Humour",
      "Photograph",
      "Laughter",
      "Family",
      "Picnic"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Uncle tried to look so dignified, and that monkey completely stole the show! Life is best when it doesn't go according to plan.",
    "sourceLabel": "Ramgarh Lake, Jaipur",
    "location": "Ramgarh Lake, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Letters and photographs",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Uncle tried to look so dignified, and that monkey completely stole the show! Life is best when it doesn't go according to plan.",
    "reflection": "A candid moment of picnic mischief reminded the family that spontaneous imperfection makes for the most enduring comedic treasures.",
    "sfx": "sudden monkey chatter and branch rustle, burst of hearty family laughter"
  },
  {
    "id": "savitri-mem-41",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Watering the Tulsi Plant at Dawn",
    "description": "Every single morning of my life began at the central tulsi planter. With freshly washed hands, I carried a polished copper lota of clean water, circled the sacred plant three times, and chanted the Gayatri Mantra. Crushing a small green leaf between my fingers released that sharp, sacred, medicinal aroma that cleared the mind and greeted the new day.",
    "occurredAt": "1984-06-15",
    "type": "photo",
    "tags": [
      "Tulsi",
      "Dawn",
      "Prayer",
      "Garden",
      "Devotion"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "Tulsi doesn't just purify the courtyard air; she purifies the thoughts in your head. When you water her at dawn, you begin the day with pure humility.",
    "sourceLabel": "Courtyard Center, Jaipur",
    "location": "Courtyard Center, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Tulsi doesn't just purify the courtyard air; she purifies the thoughts in your head.",
    "reflection": "The daily watering of the courtyard tulsi was Savitri's spiritual cornerstone, infusing routine with sacred mindfulness and natural reverence.",
    "sfx": "water trickling gently from copper lota onto earthen soil, quiet Sanskrit chant, morning songbirds"
  },
  {
    "id": "savitri-mem-42",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Jasmine Plant Outside the Window",
    "description": "I planted a cutting of white mogra (jasmine) right beneath our ground-floor bedroom window. In the sweltering heat of May and June, when the night breeze started blowing after sunset, hundreds of tiny star-like white blossoms opened simultaneously. The scent drifted through the wooden window shutters, cooling the room better than any modern air conditioner.",
    "occurredAt": "1986-06-15",
    "type": "photo",
    "tags": [
      "Jasmine",
      "Mogra",
      "Fragrance",
      "Evening",
      "Flowers"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Whenever I smell fresh mogra flowers, I am immediately transported back thirty years to those calm, balmy summer nights.",
    "sourceLabel": "Bedroom Window Garden, Jaipur",
    "location": "Bedroom Window Garden, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Whenever I smell fresh mogra flowers, I am transported back thirty years to those calm summer nights.",
    "reflection": "The intoxicating perfume of night-blooming mogra provided natural cooling and gentle solace throughout scorching desert summer nights.",
    "sfx": "soft rustling of jasmine leaves, gentle evening summer breeze, crickets"
  },
  {
    "id": "savitri-mem-43",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Peacocks After the Monsoon",
    "description": "Living near the foothills of the Aravallis meant wildlife visited often. The day after the heaviest monsoon downpour, a pair of wild peacocks flew onto our stone garden wall. The male suddenly fanned out his breathtaking turquoise and emerald feathers, shivering them in the misty afternoon light while calling out with that piercing, lonely cry. My heart stood completely still.",
    "occurredAt": "1992-06-15",
    "type": "photo",
    "tags": [
      "Peacock",
      "Monsoon",
      "Nature",
      "Jaipur",
      "Aravalli"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "transcript": "When a peacock dances right in your garden with water drops dripping from the trees, you feel like royalty in your own home.",
    "sourceLabel": "Garden Wall, Jaipur",
    "location": "Garden Wall, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "When a peacock dances right in your garden, you feel like royalty in your own home.",
    "reflection": "The sight of a wild peacock unfurling its rain-washed plumage on the garden parapet was nature's supreme blessing over the Jaipur home.",
    "sfx": "peacock calling in the distance, dripping rainwater from garden foliage, soft thunder"
  },
  {
    "id": "savitri-mem-44",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Walk Through Jaipur's Old Streets",
    "description": "Walking through the Walled City on a crisp November morning was my favourite leisure. Passing under Ajmeri Gate into the pink-hued bazaars, seeing the artisans polishing lac bangles over charcoal fires, and smelling fresh hing kachoris frying at the corner sweet shop—every stone of this city has a soul. You never feel lonely walking through Jaipur's gallis.",
    "occurredAt": "1994-06-15",
    "type": "photo",
    "tags": [
      "Jaipur",
      "PinkCity",
      "Bazaar",
      "Streets",
      "Heritage"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "These pink walls have stood for three hundred years. When you touch the warm sandstone, you feel the thousands of footsteps that walked here before you.",
    "sourceLabel": "Bapu Bazar & Johari Bazar, Jaipur",
    "location": "Bapu Bazar & Johari Bazar, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Travel",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "These pink walls have stood for three hundred years. When you touch the sandstone, you feel the thousands of footsteps.",
    "reflection": "Jaipur's pink terracotta corridors were Savitri's extended home, rich with artisanal heritage, friendly shopkeepers, and timeless architecture.",
    "sfx": "bangles clinking in brass displays, lively bazaar chatter, bicycle rickshaw horn"
  },
  {
    "id": "savitri-mem-45",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Visit to Hawa Mahal",
    "description": "When my sister visited from Agra, we climbed the gentle ramps of Hawa Mahal (Palace of Winds). Looking out through the tiny honeycomb carved lattice screens down at the bustling street life of Badi Chaupar, with camels, tongas, and merchants below, while a constant cool breeze circulated through the stone chambers, made us appreciate the genius of our ancient architects.",
    "occurredAt": "1975-06-15",
    "type": "photo",
    "tags": [
      "HawaMahal",
      "Jaipur",
      "Architecture",
      "Breeze",
      "History"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "You stand behind those pink carved screens and you are invisible, yet you see the entire life of the city moving below you.",
    "sourceLabel": "Hawa Mahal, Badi Chaupar, Jaipur",
    "location": "Hawa Mahal, Badi Chaupar, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Travel",
    "lifeStage": "Family & Traditions (1960s-1970s)",
    "quote": "You stand behind those pink carved screens and you are invisible, yet you see the entire life of the city moving below you.",
    "reflection": "Hawa Mahal represented architectural wonder where stone lattices transformed desert wind into cool breezes, offering panoramic views of city life.",
    "sfx": "wind whispering through carved stone lattices, distant bazaar hubbub below"
  },
  {
    "id": "savitri-mem-46",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Quiet Afternoon in the Garden",
    "description": "Around three in the afternoon, when the house fell into its post-lunch slumber, I would take my cane basket of sewing out to the shaded bench beneath the guava tree. A flock of seven-sister babblers hopped through the dry leaves, squabbling noisily over biscuit crumbs. In that gentle shade, watching dragonflies hover over the watering trough, time seemed to stand completely still.",
    "occurredAt": "2006-06-15",
    "type": "story",
    "tags": [
      "Garden",
      "Peace",
      "Afternoon",
      "Birds",
      "Nature"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "transcript": "People look for peace in temples, but peace is sitting under a guava tree watching little birds without any hurry in your heart.",
    "sourceLabel": "Back Garden Bench, Jaipur",
    "location": "Back Garden Bench, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "People look for peace in temples, but peace is sitting under a guava tree without any hurry in your heart.",
    "reflection": "The quiet afternoon garden offered restorative sanctuary, where the chatter of visiting songbirds provided tranquil company.",
    "sfx": "birds chirping and hopping on dry leaves, gentle breeze through fruit tree, distant temple chime"
  },
  {
    "id": "savitri-mem-47",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Cool Breeze Before Summer Rain",
    "description": "After weeks of blistering June heat where the stone floors burned your feet, the sudden arrival of the pre-monsoon wind was like a miracle. The sky would turn indigo, the dust would swirl in little tornadoes, and suddenly a cool, moist breeze would lift the pallu of your saree. Everyone in the house would rush to the terrace just to feel that miraculous temperature drop against their skin.",
    "occurredAt": "1997-06-15",
    "type": "story",
    "tags": [
      "Monsoon",
      "Breeze",
      "Summer",
      "Courtyard",
      "Relief"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "transcript": "That first cool gust of wind before the rain breaks—you close your eyes and you can feel your entire soul sigh with relief.",
    "sourceLabel": "Rooftop Terrace, Jaipur",
    "location": "Rooftop Terrace, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "That first cool gust of wind before the rain breaks—you close your eyes and feel your entire soul sigh with relief.",
    "reflection": "The dramatic pre-monsoon wind provided visceral relief from desert heat, celebrated by entire households standing expectant on their rooftops.",
    "sfx": "sudden gust of cool wind whistling through arches, distant thunder roll, rustle of trees"
  },
  {
    "id": "savitri-mem-48",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Watching the Sky Turn Pink at Sunset",
    "description": "Evening tea on the roof was our daily gratitude ritual. As the sun sank behind the battlements of Jaigarh Fort, the vast desert sky exploded in shades of apricot, violet, and deep rose pink. The city below started switching on its golden streetlights, temple bells began their evening aarti, and the flock of home-bound pigeons circled one final time.",
    "occurredAt": "2008-06-15",
    "type": "photo",
    "tags": [
      "Sunset",
      "Rooftop",
      "Sky",
      "PinkCity",
      "Quiet"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Jaipur isn't called the Pink City just because of the sandstone; at sunset, even the heavens wear pink.",
    "sourceLabel": "Rooftop Balcony, Jaipur",
    "location": "Rooftop Balcony, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Jaipur isn't called the Pink City just because of the sandstone; at sunset, even the heavens wear pink.",
    "reflection": "Rooftop twilight provided a breathtaking horizon where sandstone architecture and evening skies merged into shared tones of rose and gold.",
    "sfx": "evening temple conch and aarti bells in distance, gentle evening wind, distant pigeon wings"
  },
  {
    "id": "savitri-mem-49",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Train Window Full of Changing Landscapes",
    "description": "Traveling across North India by train with the family was our greatest adventure. We packed steel tiffin carriers stacked with pooris, spiced dry potato curry, and mango pickle wrapped in newspaper. As the train moved from the sand dunes of Rajasthan into the lush green agricultural plains of Punjab, we sat mesmerized by the changing colours of the soil and the endless horizons.",
    "occurredAt": "1983-06-15",
    "type": "story",
    "tags": [
      "Travel",
      "Train",
      "India",
      "Landscapes",
      "Journey"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "You never know how vast and beautiful our country is until you sit by a train window for twelve hours with the people you love.",
    "sourceLabel": "Delhi-Jaipur Intercity Express",
    "location": "Delhi-Jaipur Intercity Express",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Travel",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "You never know how vast our country is until you sit by a train window with the people you love.",
    "reflection": "Long rail journeys were extended familial feasts, with layered tiffin carriers and changing geographic vistas providing hours of shared contemplation.",
    "sfx": "rhythmic railway track clatter, click-clack, distant diesel train horn"
  },
  {
    "id": "savitri-mem-50",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Picnic Beneath a Shady Tree",
    "description": "Every February when the spring sun was warm and kind, we gathered all the cousins for a picnic at Kanak Ghati at the base of Amer fort. We spread a thick striped durrie under an ancient banyan tree. The men played card games like satte pe satta, the children chased butterflies, and we passed around thermoses of cardamom tea and sweet gujiyas until the afternoon shadows grew long.",
    "occurredAt": "1989-06-15",
    "type": "story",
    "tags": [
      "Picnic",
      "Family",
      "Nature",
      "Outdoors",
      "Weekend"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Sitting under that banyan tree with everyone laughing and eating together, you wished you could freeze the clock right there.",
    "sourceLabel": "Kanak Ghati Gardens, Jaipur",
    "location": "Kanak Ghati Gardens, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Festivals & Milestones (1980s-1990s)",
    "quote": "Sitting under that banyan tree with everyone laughing, you wished you could freeze the clock right there.",
    "reflection": "Spring picnics at the foot of historic forts created pastoral memories of unhurried togetherness, card games, and outdoor feasting.",
    "sfx": "breeze rustling banyan leaves, laughter of family playing cards, tea pouring into cup"
  },
  {
    "id": "savitri-mem-51",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Her Favourite Bhajan on a Quiet Morning",
    "description": "Every morning after lighting the sandalwood incense in the pooja room, I sat before Lord Krishna with my small brass manjira cymbals. My voice was no longer young and clear, but singing Mirabai's bhajan—'Payoji maine Ram ratan dhan payo'—brought a quiet stillness into the house. Even when the world outside was noisy and uncertain, those verses reminded me of what truly lasts.",
    "occurredAt": "2012-06-15",
    "type": "audio",
    "tags": [
      "Bhajan",
      "Devotion",
      "Morning",
      "Music",
      "Spirituality"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "Singing for Krishna in the morning isn't performance; it's just speaking to an old friend. It sets your heart at peace before the world wakes up.",
    "sourceLabel": "Pooja Room, Jaipur",
    "location": "Pooja Room, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Singing in the morning isn't performance; it's speaking to an old friend. It sets your heart at peace.",
    "reflection": "Savitri's morning devotional singing grounded the home in spiritual serenity, chanting verses that sustained generations through times of change.",
    "sfx": "brass manjira cymbals gently chiming, sweet soft hum of devotional hymn, morning silence"
  },
  {
    "id": "savitri-mem-52",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Teaching the Family Her Favourite Recipe",
    "description": "For my granddaughter's engagement, I insisted on teaching her and her cousins how to make proper Rajasthani Dal Baati Churma. We rolled the wheat-flour balls tight, baked them in the clay tandoor until the crusts cracked with a hollow sound, and crushed them with our hands before drowning them in melted golden ghee. 'Don't be shy with the ghee, beti,' I told her. 'Ghee is generosity.'",
    "occurredAt": "2015-06-15",
    "type": "story",
    "tags": [
      "Recipe",
      "DalBaatiChurma",
      "Heirloom",
      "Teaching",
      "Tradition"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    "transcript": "Anyone can read a recipe online, but feeling the dough crack under your thumb to know it is properly baked inside—that has to be learned from your grandmother.",
    "sourceLabel": "Kitchen, Jaipur",
    "location": "Kitchen, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Food and recipes",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Feeling the dough crack under your thumb to know it is properly baked—that has to be learned from your grandmother.",
    "reflection": "Passing down authentic Rajasthani Dal Baati Churma was an initiation into cultural pride and the generous hospitality of desert heritage.",
    "sfx": "cracking hot crusty baati by hand, sizzle of ghee poured over hot bread, happy conversation"
  },
  {
    "id": "savitri-mem-53",
    "profileId": "demo-savitri-devi-sharma",
    "title": "An Old Photograph Album Reopened",
    "description": "On a rainy Sunday afternoon, my teenage granddaughter pulled down our massive 1970s velvet-bound photo album. We spent three hours turning the brittle black pages, pointing out bell-bottom trousers, vintage scooters, and long-departed relatives. She asked about every face, and with every story, those who had passed away felt alive again right there beside us.",
    "occurredAt": "2018-06-15",
    "type": "story",
    "tags": [
      "Album",
      "Photographs",
      "Memories",
      "Grandchildren",
      "Past"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.recipeAudio,
    "transcript": "As long as you tell their stories, the people in the photographs never truly leave. They are still here in every word you speak.",
    "sourceLabel": "Living Room Sofa, Jaipur",
    "location": "Living Room Sofa, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Letters and photographs",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "As long as you tell their stories, the people in the photographs never truly leave. They are still here.",
    "reflection": "Reviewing archival albums with younger generations revived ancestors into active memory, proving that storytelling keeps family legacies immortal.",
    "sfx": "heavy leather album cover opening, cellophane pages turning softly, quiet rain outside"
  },
  {
    "id": "savitri-mem-54",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The First Video Call with Family",
    "description": "When my youngest grandson was born in America, my son held up his tablet in our courtyard. Suddenly there was my grandson's tiny face, yawning ten thousand miles away in real time. I touched the cold glass screen with trembling fingers, half expecting to feel his soft warm cheek. Tears filled my eyes at how miracles can bridge the oceans.",
    "occurredAt": "2019-06-15",
    "type": "story",
    "tags": [
      "VideoCall",
      "Technology",
      "Grandchildren",
      "Abroad",
      "Love"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "I asked my son, 'Can he hear me from across the world?' And when the baby smiled at my voice, the whole ocean between us vanished.",
    "sourceLabel": "Courtyard Verandah, Jaipur",
    "location": "Courtyard Verandah, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Grandchildren",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "When the baby smiled at my voice from across the world, the ocean between us vanished.",
    "reflection": "Modern digital video brought emotional intimacy across global divides, allowing Savitri to bestow ancestral blessings in real time.",
    "sfx": "digital call chime, baby cooing through tablet speaker, emotional grandmother's blessing"
  },
  {
    "id": "savitri-mem-55",
    "profileId": "demo-savitri-devi-sharma",
    "title": "Laughing Over an Old Family Story",
    "description": "Over post-dinner cups of fennel tea, someone brought up the infamous 1979 cinema trip when my husband's Bajaj Chetak scooter sputtered out of petrol right in front of Golcha Cinema. All five of us—including two children tucked on the footboard—had to push it three kilometres home in our Sunday best clothes. We laughed so hard our sides ached, wiping tears with the corners of our dupattas.",
    "occurredAt": "2017-06-15",
    "type": "story",
    "tags": [
      "Humour",
      "Laughter",
      "Family",
      "Reminiscing",
      "Storytelling"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "At the time it happened, we were furious and exhausted! But forty years later, it's the funniest, sweetest memory of our whole marriage.",
    "sourceLabel": "Dining Table, Jaipur",
    "location": "Dining Table, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "At the time it happened, we were furious! But forty years later, it's the funniest memory of our whole marriage.",
    "reflection": "Time transformed stressful domestic mishaps into the family's most cherished comedic lore, celebrated with tears of collective laughter.",
    "sfx": "hearty uncontainable laughter of elderly woman and grown children, tea cup clattering"
  },
  {
    "id": "savitri-mem-56",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Warm Shawl on a Cold Evening",
    "description": "On cold January evenings, when the sun dipped and the Rajasthan chill crept into older bones, my daughter would wrap a soft, walnut-dyed pashmina shawl around my shoulders. My husband had bought that shawl in Srinagar during our silver anniversary trip. It was light as a feather yet warm as a mother's embrace, smelling faintly of sandalwood and old cedar wood.",
    "occurredAt": "2020-06-15",
    "type": "story",
    "tags": [
      "Shawl",
      "Pashmina",
      "Winter",
      "Comfort",
      "Gift"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80",
    "transcript": "A good shawl isn't just wool; it's a hug from forty years ago that you can still pull around your shoulders whenever you feel cold.",
    "sourceLabel": "Balcony Easy Chair, Jaipur",
    "location": "Balcony Easy Chair, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "A good shawl is a hug from forty years ago that you can still pull around your shoulders.",
    "reflection": "The heirloom pashmina shawl served as wearable affection, wrapping fragile elderly evenings in decades of marital tenderness and warmth.",
    "sfx": "gentle drape of soft wool over shoulders, warm deep breath, crackle of evening fireplace"
  },
  {
    "id": "savitri-mem-57",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Handwritten Message Kept for Years",
    "description": "In my bedside drawer beneath my prayer beads lies a tiny torn slip of paper from 1988. My husband had scribbled it on his office notepad before leaving for the high court in the morning. He was never a man of dramatic poetry, but his quiet reminders to take care of myself spoke louder than any grand declarations. I touch that ink every evening before I sleep.",
    "occurredAt": "2016-06-15",
    "type": "story",
    "tags": [
      "Note",
      "Handwritten",
      "Husband",
      "Love",
      "Keepsake"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "transcript": "He didn't write love poems, but he never left the house without making sure my tea was made and my medicines were kept out. That is real love.",
    "sourceLabel": "Bedside Drawer, Jaipur",
    "location": "Bedside Drawer, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Letters and photographs",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "He didn't write love poems, but he never left without making sure my tea was made. That is real love.",
    "reflection": "A brief utilitarian note left by her late husband encapsulated a lifetime of steadfast, attentive devotion, treasured beyond fine jewels.",
    "sfx": "wooden drawer sliding open, paper rustling gently, quiet evening contemplation"
  },
  {
    "id": "savitri-mem-58",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Garden Plant That Finally Bloomed",
    "description": "I had brought a sapling of sacred parijat (night-blooming jasmine) from a pilgrimage seven years ago. Season after season, the leaves remained green but no flowers appeared. My children suggested replacing it, but I kept watering it with mustard-cake manure and patience. One autumn morning, the ground beneath was carpeted with hundreds of delicate white blooms with vivid orange stems. Good things take their own sweet time.",
    "occurredAt": "2021-06-15",
    "type": "story",
    "tags": [
      "Garden",
      "Parijat",
      "NightJasmine",
      "Flowers",
      "Patience"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    "transcript": "You cannot force a flower to bloom before its season, just like you cannot force life. Keep watering with love, and when the right time comes, it will surprise you.",
    "sourceLabel": "Courtyard Garden Corner, Jaipur",
    "location": "Courtyard Garden Corner, Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Garden and nature",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "You cannot force a flower to bloom before its season. Keep watering with love, and it will surprise you.",
    "reflection": "The delayed blossoming of the parijat tree was a living metaphor for patience, rewarding seven years of quiet faith with celestial fragrance.",
    "sfx": "gentle autumn wind, soft flutter of delicate blossoms dropping to stone, birdsong"
  },
  {
    "id": "savitri-mem-59",
    "profileId": "demo-savitri-devi-sharma",
    "title": "A Family Meal with Everyone at the Table",
    "description": "Last Diwali, every single chair around our long dining table was occupied. Four generations: my great-granddaughter in a high chair, my sons arguing good-naturedly about work, and the smell of hot pooris, paneer korma, and saffron kheer filling the room. Sitting at the head of the table watching them eat and laugh, I closed my eyes and whispered a silent prayer of gratitude for a life so richly blessed.",
    "occurredAt": "2023-06-15",
    "type": "story",
    "tags": [
      "Family",
      "Meal",
      "Dinner",
      "Thali",
      "Blessing"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    "transcript": "When your table is full, your food is shared, and your house is loud with family voices—there is no greater wealth on this earth.",
    "sourceLabel": "Dining Hall, Jaipur Haveli",
    "location": "Dining Hall, Jaipur Haveli",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": false,
    "visualKind": "demo_image",
    "category": "Family",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "When your table is full and your house is loud with family voices—there is no greater wealth on this earth.",
    "reflection": "The sprawling multigenerational dinner was the crowning harvest of Savitri's 78 years, proving that love shared across a table is life's highest wealth.",
    "sfx": "clinking of brass water cups and thalis, warm hum of chatter, laughter, spoon scraping bowl"
  },
  {
    "id": "savitri-mem-60",
    "profileId": "demo-savitri-devi-sharma",
    "title": "The Last Light Falling Across the Courtyard",
    "description": "Every day at five-thirty, the sun casts long golden beams through the carved sandstone arches of our aangan. The dust motes dance in the golden light like little stars. I sit on my wooden chair, hearing the distant bells of the evening aarti from the corner temple, knowing that every stone of this home has absorbed our prayers, our tears, and our laughter. It is a peaceful, complete feeling.",
    "occurredAt": "2024-06-15",
    "type": "photo",
    "tags": [
      "Courtyard",
      "Light",
      "Evening",
      "Gratitude",
      "Home"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "audioUrl": DEMO_ASSETS.cabinMorningAudio,
    "transcript": "Her stories lived in ordinary moments—the first cup of chai, the smell of rain on the courtyard, and the little traditions that made a house feel like home. When that evening light hits the stone, I know everything we loved is still here.",
    "sourceLabel": "Central Courtyard (Aangan), Jaipur",
    "location": "Central Courtyard (Aangan), Jaipur",
    "people": [
      "Savitri Devi Sharma (Grandmother)"
    ],
    "isFavorite": true,
    "visualKind": "demo_image",
    "category": "Everyday moments",
    "lifeStage": "Gardens & Later Life (2000s-Present)",
    "quote": "Her stories lived in ordinary moments—the first cup of chai, the smell of rain on the courtyard, and the little traditions that made a house feel like home.",
    "reflection": "In the quiet warmth of late afternoon sunlight filtering through sandstone arches, Savitri Devi Sharma's life rests in serene gratitude—anchored forever in the ordinary beauty that transforms a house into an eternal home.",
    "sfx": "distant evening temple bells, gentle courtyard breeze rustling tulsi leaves, quiet acoustic sitar"
  }
];
