/**
 * Takes an integer value for number of cents, and returns a string formatted
 * @param {number} cents
 */
export function formatPrice(cents) {
   return (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
   });
}

/**
 * Returns a random element of a given array
 * @param {Array} arr
 */
export function rando(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Transforms a string of text into a URL slug
 * @param {string} text
 */
export function slugify(text) {
   return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
}

/**
 * Generates a random fun for a store, using two adjectives and a noun
 */
export function getFunName() {
   const adjectives = [
      "adorable",
      "beautiful",
      "clean",
      "drab",
      "elegant",
      "fancy",
      "glamorous",
      "handsome",
      "long",
      "magnificent",
      "old-fashioned",
      "plain",
      "quaint",
      "sparkling",
      "ugliest",
      "unsightly",
      "angry",
      "bewildered",
      "clumsy",
      "defeated",
      "embarrassed",
      "fierce",
      "grumpy",
      "helpless",
      "itchy",
      "jealous",
      "lazy",
      "mysterious",
      "nervous",
      "obnoxious",
      "panicky",
      "repulsive",
      "scary",
      "thoughtless",
      "uptight",
      "worried"
   ];

   const nouns = [
      "women",
      "men",
      "children",
      "teeth",
      "feet",
      "people",
      "leaves",
      "mice",
      "geese",
      "halves",
      "knives",
      "wives",
      "lives",
      "elves",
      "loaves",
      "potatoes",
      "tomatoes",
      "cacti",
      "foci",
      "fungi",
      "nuclei",
      "syllabuses",
      "analyses",
      "diagnoses",
      "oases",
      "theses",
      "crises",
      "phenomena",
      "criteria",
      "data"
   ];

   return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
