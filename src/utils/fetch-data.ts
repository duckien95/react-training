import { log } from "./log"

function delay(ms: number) {
    return new Promise((res) => {
        setTimeout(() => {
            res(undefined)
        }, ms)
    })
}

export async function fetchData(query: string): Promise<string[]> {
    log('fetching', query)
    await delay(500 + Math.floor(Math.random() * 2000))
    log('return filter for query', query)
    const shouldThrow = Math.random() < 0.2
    if(shouldThrow) {
        log('throw error for query', query)
        throw `${cuteErrors[Math.floor(Math.random() * 10)]} - query: ${query}`
    }
    return randomNames.filter(name => name.includes(query))
}

const randomNames = [
    "Whiskers McFluff",
    "Shadow Paws",
    "Bella Blue",
    "Luna Snow",
    "Charlie Moon",
    "Max Thunder",
    "Daisy Breeze",
    "Rocky River",
    "Molly Sunbeam",
    "Buddy Lightning",
    "Chloe Sparkle",
    "Cooper Sky",
    "Ruby Mist",
    "Sophie Twilight",
    "Milo Frost",
    "Oliver Storm",
    "Lola Meadow",
    "Oscar Cloud",
    "Sadie Ember",
    "Toby Firefly",
    "Nala Rain",
    "Bailey Rose",
    "Leo Blaze",
    "Lucy Star",
    "Zoe Frostbite",
    "Jack Frost",
    "Coco Shine",
    "Lilly Brook",
    "Sammy Drift",
    "Riley Shine",
    "Penny Moonlight",
    "Henry Snowball",
    "Ellie Blaze",
    "Winston Stormy",
    "Rosie Whisper",
    "Rex Dusk",
    "Finn Spark",
    "Misty Dawn",
    "Lucky Twilight",
    "Smokey Horizon",
    "Sasha Comet",
    "Jake Thunderbolt",
    "Princess Breeze",
    "Marley Snowflake",
    "Bluebell Sky",
    "Roxy Sunshine",
    "Apollo Shade",
    "Hazel Glow",
    "Ginger Sparkle",
    "Duke Firestorm",
    "Honey Cloud",
    "Bandit Frostfire",
    "Poppy Nova",
    "Kingston Thunder",
    "Rusty Mist",
    "Cinnamon Twilight",
    "Scout Shimmer",
    "Lady Frostlight",
    "Zeus Starfall",
    "Tigger Flame",
    "Bella Nightshade",
    "Simba Moonstone",
    "Freddie Raindrop",
    "Maggie Stormcloud",
    "Oliver Blazeheart",
    "Daisy Sunray",
    "Boomer Skyfall",
    "Hazelwood Storm",
    "Rufus Lightpaw",
    "Ellie Sunstorm",
    "Whisker Lightning",
    "Charlie Emberglow",
    "Muffin Stardust",
    "Raven Fireburst",
    "Buster Shadow",
    "Mocha Raindance",
    "Pepper Snowstorm",
    "Tiger Shadowfire",
    "Sparky Moonbright",
    "Mittens Firelight",
    "Snowball Starlight",
    "Zelda Stormcloud",
    "Bolt Emberflame",
    "Cuddles Moonbeam",
    "Patches Snowfall",
    "Oreo Firecracker",
    "Echo Sunflare",
    "Sassy Cloudwhisper",
    "Tigerlily Starfall",
    "Casper Frostclaw",
    "Milo Firewing",
    "Pumpkin Twilightwhisker",
    "Harley Starlight",
    "Chewy Cloudburst",
    "Gizmo Frostfang",
    "Bruno Lightpaw",
    "Snickers Sunshadow",
    "Peanut Moonshadow",
    "Scooter Cloudfire",
    "Toby Firewhisker"
];

const cuteErrors = [
    "Oops! Our cat walked over the keyboard 🐾",
    "Uh-oh! The server is taking a catnap 😴",
    "Oh no! The dog ate our data 🐶",
    "Hmm... Looks like we misplaced the cookies 🍪",
    "Yikes! Our hamster stopped running the wheel 🐹",
    "Whoops! Something went wrong, but don’t worry, it's not your fault 🐱",
    "Uh-oh! Looks like the server is chasing its tail 🐕",
    "Oopsie! We spilled the code everywhere 💻",
    "Oh dear, the internet squirrels are on strike 🐿️",
    "Well, this is awkward... let's pretend this never happened 🙈"
  ];