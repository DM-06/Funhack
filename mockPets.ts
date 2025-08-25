import { Pet } from '@/lib/pawKundli';
import sirFluffington from '@/assets/sir-fluffington-realistic.jpg';
import princessZoomies from '@/assets/princess-zoomies-realistic.jpg';
import lordWhiskers from '@/assets/lord-whiskers-realistic.jpg';
import bubblesMcGee from '@/assets/bubbles-mcgee-realistic.jpg';
import snugglePotato from '@/assets/snuggle-potato-realistic.jpg';
import captainChaos from '@/assets/captain-chaos-realistic.jpg';
import mittensUserCat from '@/assets/mittens-user-cat.jpg';

export const mockPets: Pet[] = [
  {
    name: "Sir Fluffington III, Esq.",
    species: "cat",
    birthday: "2021-03-15",
    photoId: "fluffy-orange-cat-1",
    photo: sirFluffington,
    favorite_snack_score: 9,
    fluff_level: 10,
    snooze_level: 8,
    bio: "Professional nap taker and treat connoisseur. Currently accepting applications for a personal belly-rub assistant. Must enjoy long walks to the food bowl and romantic sunset window-watching sessions. Warning: May judge your choice in furniture. 🏰✨",
    owner_name: "Sarah 'The Treat Dispenser' Johnson",
    funnyQuirks: ["Knocks things off tables for sport", "Has a PhD in Dramatic Sighing", "Speaks fluent Side-Eye"]
  },
  {
    name: "Princess Zoomies von Barkington",
    species: "dog", 
    birthday: "2020-07-22",
    photoId: "energetic-golden-dog-1",
    photo: princessZoomies,
    favorite_snack_score: 8,
    fluff_level: 7,
    snooze_level: 3,
    bio: "HELLO! I LOVE EVERYTHING! Especially YOU! And treats! And that leaf! And EVERYTHING! Looking for someone to appreciate my 3am zoomie concerts and spontaneous sock-stealing performances. Can provide excellent couch-warming services! 🎾⚡",
    owner_name: "Mike 'Forever Tired' Chen",
    funnyQuirks: ["Believes every delivery person is here specifically for her", "Can sense a treat bag opening from 3 miles away", "Professional doorbell backup singer"]
  },
  {
    name: "Lord Whiskers McSnootington",
    species: "cat",
    birthday: "2019-11-08", 
    photoId: "distinguished-tuxedo-cat-1",
    photo: lordWhiskers,
    favorite_snack_score: 6,
    fluff_level: 6,
    snooze_level: 9,
    bio: "Sophisticated gentleman seeking cultured companion for intellectual discussions about the weather outside and the inferior quality of today's kibble. Must appreciate fine dining (from crystal bowls only) and classical music (preferably my own yowling at 4am). No peasants. 🎩👑",
    owner_name: "Elizabeth 'The Butler' Hartwell",
    funnyQuirks: ["Judges your life choices silently", "Only drinks water from the faucet", "Has written several strongly-worded meows about the service here"]
  },
  {
    name: "Bubbles 'The Gossip Queen' McGee",
    species: "bird",
    birthday: "2022-01-30",
    photoId: "colorful-parrot-1", 
    photo: bubblesMcGee,
    favorite_snack_score: 7,
    fluff_level: 8,
    snooze_level: 4,
    bio: "Chatty parrot who knows ALL the neighborhood tea ☕! Can sing opera, order pizza by phone, and provide running commentary on your life choices. Currently working on my standup comedy career. Seeking someone who appreciates my beautiful singing voice at 5am! 🎵🎭",
    owner_name: "Carlos 'The Audience' Rivera",
    funnyQuirks: ["Imitates the microwave beep to confuse humans", "Has memorized everyone's phone ringtone", "Can swear in 3 languages"]
  },
  {
    name: "Snuggle Potato Supreme",
    species: "dog",
    birthday: "2021-09-12",
    photoId: "sleepy-bulldog-1",
    photo: snugglePotato,
    favorite_snack_score: 10,
    fluff_level: 5,
    snooze_level: 10,
    bio: "Professional couch potato and expert cuddler with a PhD in Advanced Snoring. Hobbies include finding the exact spot you were about to sit, perfecting the art of drooling, and making adorable snorting sounds. Seeking fellow naptime enthusiast. Netflix & Snooze? 😴💤",
    owner_name: "Jennifer 'The Pillow' Liu",
    funnyQuirks: ["Can sleep through a tornado but wakes up for a treat wrapper", "Snores louder than a freight train", "Has claimed ownership of all furniture"]
  },
  {
    name: "Captain Chaos, Destroyer of Socks",
    species: "cat",
    birthday: "2023-02-14",
    photoId: "mischievous-tabby-1",
    photo: captainChaos,
    favorite_snack_score: 8,
    fluff_level: 6,
    snooze_level: 2,
    bio: "Young troublemaker with a heart of gold and paws of destruction! Specializes in 3am parkour exhibitions, advanced plant archaeology, and the ancient art of hair-tie disappearance. Warning: May steal your heart (and your favorite pen, and your socks, and...). 💕🌪️",
    owner_name: "Alex 'The Chaos Manager' Thompson",
    funnyQuirks: ["Can open any door, drawer, or sealed container", "Collects random objects under the couch", "Has never met a plant they didn't want to 'help' with"]
  },
  // Additional pets for more swiping options
  {
    name: "Duchess Sniffles McFluffernutter",
    species: "cat",
    birthday: "2020-04-20",
    photoId: "persian-cat-1",
    photo: sirFluffington, // Reusing realistic image
    favorite_snack_score: 10,
    fluff_level: 10,
    snooze_level: 9,
    bio: "Royal Persian princess seeking loyal subjects (aka treat suppliers). Expert in dramatic flopping and interpretive meowing. Currently auditioning butlers who can appreciate my sophisticated taste in cardboard boxes. Crown not included but heavily implied. 👑💎",
    owner_name: "Margaret 'Royal Staff' Pemberton",
    funnyQuirks: ["Only drinks from diamond-encrusted bowls", "Has personal fashion consultant for collar selection", "Writes daily reviews of her meals"]
  },
  {
    name: "Rocket 'The Tornado' Rodriguez",
    species: "dog",
    birthday: "2021-08-15",
    photoId: "jack-russell-1",
    photo: princessZoomies, // Reusing realistic image
    favorite_snack_score: 9,
    fluff_level: 4,
    snooze_level: 1,
    bio: "ENERGY INCARNATE! Can run 47 marathons before breakfast! Looking for adventure buddy who appreciates 5am jogs, impromptu digging projects, and my award-winning howling performances. Caffeine optional, enthusiasm MANDATORY! ⚡🏃‍♂️",
    owner_name: "Jake 'Forever Exhausted' Martinez",
    funnyQuirks: ["Can catch treats from supersonic speeds", "Believes every squirrel is a personal challenge", "Has memorized every delivery truck schedule"]
  },
  {
    name: "Professor Whiskers Von Smartypants",
    species: "cat",
    birthday: "2019-12-03",
    photoId: "maine-coon-1",
    photo: lordWhiskers, // Reusing realistic image
    favorite_snack_score: 5,
    fluff_level: 9,
    snooze_level: 7,
    bio: "Intellectual seeking equally sophisticated companion for philosophical discussions about the meaning of red dots and why cardboard boxes are superior to expensive cat beds. PhD in Advanced Judgmental Staring. 🎓🤓",
    owner_name: "Dr. Patricia 'The Research Assistant' Kim",
    funnyQuirks: ["Reads newspapers (by sitting on them)", "Critiques TV shows with thoughtful meows", "Has written several unpublished works on human behavior"]
  },
  {
    name: "Tiny 'The Giant' McTinypaws",
    species: "dog",
    birthday: "2022-01-10",
    photoId: "great-dane-1",
    photo: snugglePotato, // Reusing realistic image
    favorite_snack_score: 8,
    fluff_level: 3,
    snooze_level: 8,
    bio: "200-pound lapdog who doesn't understand why chairs collapse when I sit. Gentle giant seeking someone who appreciates my subtle approaches to cuddling (i.e., full-body pancaking). Warning: May accidentally step on your feelings. 🐘💕",
    owner_name: "Tom 'The Furniture Replacement Guy' Wilson",
    funnyQuirks: ["Thinks they're a purse dog", "Can clear a coffee table with one tail wag", "Believes personal space is a myth"]
  },
  {
    name: "Diva 'The Drama Queen' Precious",
    species: "bird",
    birthday: "2021-05-18",
    photoId: "macaw-1",
    photo: bubblesMcGee, // Reusing realistic image
    favorite_snack_score: 6,
    fluff_level: 9,
    snooze_level: 3,
    bio: "Award-winning prima donna seeking audience for my one-bird Broadway shows. Specializes in morning opera (5AM sharp), dramatic death scenes when cage needs cleaning, and interpretive dance. Standing ovations required. 🎭🎵",
    owner_name: "Sofia 'The Stage Manager' Rosetti",
    funnyQuirks: ["Can mimic opera singers perfectly", "Demands red carpet treatment for vet visits", "Has rider requirements for sunflower seed quality"]
  },
  {
    name: "Bandit 'The Sock Thief' McStealface",
    species: "cat",
    birthday: "2023-03-22",
    photoId: "tabby-kitten-1",
    photo: captainChaos, // Reusing realistic image
    favorite_snack_score: 7,
    fluff_level: 5,
    snooze_level: 4,
    bio: "Professional mischief-maker and part-time sock redistributor. Currently seeking partner-in-crime for midnight catnip heists and advanced human confusion tactics. Must appreciate artistic chaos and have good hiding spots. 🧦🔍",
    owner_name: "Emma 'Detective Missing Socks' Foster",
    funnyQuirks: ["Has underground sock smuggling operation", "Can open any container known to humankind", "Maps out human schedules for optimal chaos timing"]
  }
];

export const getCurrentUserPet = (): Pet => {
  return {
    name: "Mittens 'The Magnificent' McPawsome",
    species: "cat",
    birthday: "2022-06-01",
    photoId: "user-gray-cat-1",
    photo: mittensUserCat,
    favorite_snack_score: 7,
    fluff_level: 8,
    snooze_level: 6,
    bio: "Just your average world-class cat looking for love in all the right places (preferably near the treat jar). Hobbies include professional biscuit-making on your lap and providing unsolicited life advice through interpretive meowing. 🐾✨",
    owner_name: "You (The Chosen Human)",
    funnyQuirks: ["Thinks they're helping with your work", "Master of the guilt trip stare", "Can hear a treat bag from another dimension"]
  };
};