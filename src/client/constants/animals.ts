const animals = [
	{
		info() {
			const utterThis = new SpeechSynthesisUtterance('Flamingos are cool');
			const chineseVoice = speechSynthesis.getVoices().find((voice) => voice.name === 'Google 粤語（香港）');
			if (chineseVoice) {
				utterThis.voice = chineseVoice;
			}
			speechSynthesis.speak(utterThis);
		},
		name: 'Flamingo',
		position: {
			lat: 32.740335054597914,
			lng: -96.8159068542667,
		},
		url: 'https://www.svgrepo.com/show/481497/flamingo-1.svg',
	},
	{
		info() {
			speechSynthesis.speak(new SpeechSynthesisUtterance('Giraffes are cool.'));
		},
		name: 'Giraffe',
		position: {
			lat: 32.73873228270228,
			lng: -96.81445996968739,
		},
		url: 'https://www.svgrepo.com/show/481377/giraffe-2.svg',
	},
	{
		info() {
			speechSynthesis.speak(new SpeechSynthesisUtterance('Penguins are cool.'));
		},
		name: 'Penguin',
		position: {
			lat: 32.738148692321744,
			lng: -96.8154984925185,
		},
		url: 'https://www.svgrepo.com/show/481492/penguin-1.svg',
	},
];

export default animals;

// Alligator
// Alpaca
// Anaconda
// Anteater
// Arctic Fox
// Bald Eagle
// Bison
// Black Bear
// Bonobo
// Camel
// Cheetah
// Chimpanzee
// Cobra
// Crocodile
// Dolphin
// Elephant
// Emu
// Flamingo
// Gazelle
// Gibbon
// Giraffe
// Gorilla
// Grizzly Bear
// Hippopotamus
// Hyena
// Indian Peafowl
// Jaguar
// Kangaroo
// Koala
// Komodo Dragon
// Lemur
// Leopard
// Lion
// Llama
// Manatee
// Mandrill
// Meerkat
// Mongoose
// Moose
// Otter
// Orangutan
// Ostrich
// Panda
// Penguin
// Polar Bear
// Prairie Dog
// Python
// Red Panda
// Red Fox
// Reindeer
// Rhinoceros
// Sea Lion
// Sea Turtle
// Spider Monkey
// Sun Bear
// Sting Ray
// Tasmanian Devil
// Tiger
// Tortoise
// Walrus
// Warthog
// Wolf
// Zebra

// /** */
// closely_related_species
// /** */
// conservation_status
// /** */
// diet
// /** */
// distinct_features
// /** */
// famous_fictional_or_mythical_members
// /** 3 to 5 interesting and unique characteristics or pieces of trivia about the animal */
// fun_facts
// /** */
// habitat
// /** */
// lifespan_in_captivity
// /** */
// lifespan_in_wild
// /** */
// name
// /** */
// native_distribution
// /** */
// predators
// /** */
// relationship_with_humans
// /** */
// traditional_beliefs_about_animal_held_by_indigenous_people_or_past_civilizations

// [
//   {
//     "name": "Tortoise",
//     "closely_related_species": "Tortoises are closely related to turtles.",
//     "conservation_status": "Some species of tortoises are threatened or endangered.",
//     "diet": "Tortoises are herbivores and mainly eat plants, grasses, and fruits.",
//     "distinct_features": "Tortoises have a sturdy, dome-shaped shell and feet adapted for walking on land. They do not have flippers like turtles.",
//     "famous_fictional_or_mythical_members": "One famous fictional tortoise is the character 'Franklin' from children's books.",
//     "fun_facts": "Tortoises are known for their long lifespans and can live over 100 years. They also retreat inside their shells when they feel threatened.",
//     "habitat": "Tortoises live in various habitats such as deserts, grasslands, and forests.",
//     "lifespan_in_captivity": "Tortoises can live up to 50-100 years or more in captivity.",
//     "lifespan_in_wild": "Tortoises can live up to 50-150 years in the wild.",
//     "native_distribution": "Tortoises are found on every continent except Antarctica.",
//     "predators": "Adult tortoises have few natural predators, but some may be hunted by large birds or mammals.",
//     "relationship_with_humans": "Tortoises are often kept as pets and are loved for their calm and gentle nature.",
//     "traditional_beliefs_about_animal_held_by_indigenous_people_or_past_civilizations": "In some cultures, tortoises are seen as symbols of wisdom, patience, and longevity."
//   },
//   {
//     "name": "Walrus",
//     "closely_related_species": "Walruses are closely related to seals and sea lions.",
//     "conservation_status": "Some species of walruses are threatened due to habitat loss and hunting.",
//     "diet": "Walruses are carnivores and mainly eat clams, mollusks, and other marine invertebrates.",
//     "distinct_features": "Walruses have long tusks, which are actually elongated canine teeth. They also have thick blubber and prominent whiskers.",
//     "famous_fictional_or_mythical_members": "The walrus is a character in Lewis Carroll's poem 'The Walrus and the Carpenter' from 'Alice's Adventures in Wonderland'.",
//     "fun_facts": "Walruses are excellent swimmers and can dive to great depths. They use their tusks to pull themselves out of the water and onto ice or rocks.",
//     "habitat": "Walruses inhabit Arctic regions and can be found on ice floes, shorelines, and near shallow waters.",
//     "lifespan_in_captivity": "Walruses can live up to 30-40 years or more in captivity.",
//     "lifespan_in_wild": "Walruses can live up to 30-40 years in the wild.",
//     "native_distribution": "Walruses are native to the Arctic regions, including the coasts of North America and Russia.",
//     "predators": "Adult walruses have few natural predators, but polar bears and killer whales are known to hunt them.",
//     "relationship_with_humans": "Walruses have been historically hunted by indigenous communities for their meat, blubber, and ivory.",
//     "traditional_beliefs_about_animal_held_by_indigenous_people_or_past_civilizations": "In some indigenous cultures, the walrus is considered a symbol of strength, adaptability, and survival in harsh environments."
//   },
//   {
//     "name": "Warthog",
//     "closely_related_species": "Warthogs are closely related to pigs.",
//     "conservation_status": "Warthogs are not currently listed as threatened or endangered.",
//     "diet": "Warthogs are omnivores and eat grass, roots, fruits, and occasionally small animals.",
//     "distinct_features": "Warthogs have long, curved tusks, large warty protrusions on their faces, and a bristly mane along their backs.",
//     "famous_fictional_or_mythical_members": "Pumbaa, a warthog, is a beloved character in Disney's 'The Lion King'.",
//     "fun_facts": "Warthogs use their tusks for defense and to dig burrows. They can also run very fast and have a peculiar habit of kneeling on their front knees while feeding.",
//     "habitat": "Warthogs inhabit grasslands, savannas, and woodland areas in Africa.",
//     "lifespan_in_captivity": "Warthogs can live up to 15-20 years or more in captivity.",
//     "lifespan_in_wild": "Warthogs can live up to 10-15 years in the wild.",
//     "native_distribution": "Warthogs are native to sub-Saharan Africa.",
//     "predators": "Warthogs are preyed upon by large carnivores such as lions, leopards, and crocodiles.",
//     "relationship_with_humans": "Warthogs are not commonly kept as pets, but they are frequently encountered in wildlife reserves and national parks.",
//     "traditional_beliefs_about_animal_held_by_indigenous_people_or_past_civilizations": "In some African cultures, warthogs are associated with courage, tenacity, and perseverance."
//   },
//   {
//     "name": "Wolf",
//     "closely_related_species": "Wolves are closely related to dogs.",
//     "conservation_status": "Some species of wolves are threatened or endangered due to habitat loss and hunting.",
//     "diet": "Wolves are carnivores and primarily eat ungulates (hoofed animals) like deer, elk, and moose.",
//     "distinct_features": "Wolves have sharp teeth, keen senses, and long legs built for endurance. They are known for their haunting howls.",
//     "famous_fictional_or_mythical_members": "The Big Bad Wolf is a well-known character in fairy tales like 'Little Red Riding Hood' and 'The Three Little Pigs'.",
//     "fun_facts": "Wolves are highly social animals and live in family groups called packs. They have a complex communication system and work together when hunting.",
//     "habitat": "Wolves can be found in various habitats including forests, tundra, mountains, and grasslands.",
//     "lifespan_in_captivity": "Wolves can live up to 10-15 years or more in captivity.",
//     "lifespan_in_wild": "Wolves can live up to 6-8 years in the wild, although some individuals have been known to live longer.",
//     "native_distribution": "Wolves are native to many parts of the world, including North America, Europe, Asia, and Africa.",
//     "predators": "Adult wolves have few natural predators, but they may occasionally be targeted by larger predators such as bears or other packs of wolves.",
//     "relationship_with_humans": "Wolves have been both feared and admired throughout history, and their relationship with humans varies across cultures.",
//     "traditional_beliefs_about_animal_held_by_indigenous_people_or_past_civilizations": "In some indigenous cultures, wolves are revered as symbols of loyalty, teamwork, and spiritual connection with nature."
//   },
//   {
//     "name": "Zebra",
//     "closely_related_species": "Zebras are closely related to horses and donkeys.",
//     "conservation_status": "Some species of zebras are threatened or endangered due to habitat loss and poaching.",
//     "diet": "Zebras are herbivores and mainly eat grass and leaves.",
//     "distinct_features": "Zebras have black and white stripes covering their bodies, and each zebra's stripe pattern is unique. They also have a horse-like body shape with a mane and long legs.",
//     "famous_fictional_or_mythical_members": "Marty, the zebra from the 'Madagascar' animated film series, is a famous fictional zebra.",
//     "fun_facts": "Zebras are known for their distinctive stripes, which help to confuse predators and regulate body temperature. They also have excellent hearing and vision.",
//     "habitat": "Zebras inhabit grasslands, savannas, and open woodlands in Africa.",
//     "lifespan_in_captivity": "Zebras can live up to 25-30 years or more in captivity.",
//     "lifespan_in_wild": "Zebras can live up to 20-25 years in the wild.",
//     "native_distribution": "Zebras are native to various regions of Africa.",
//     "predators": "Zebras are preyed upon by large carnivores such as lions, hyenas, and crocodiles.",
//     "relationship_with_humans": "Zebras are wild animals and are not typically domesticated or kept as pets. However, they are popular attractions in zoos and wildlife parks.",
//     "traditional_beliefs_about_animal_held_by_indigenous_people_or_past_civilizations": "In some African cultures, zebras are associated with freedom, unity, and the balance of nature."
//   }
// ]
