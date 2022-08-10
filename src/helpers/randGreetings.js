const generateRandomGreetings = () => {
  // array of greetings in english, spanish, french,igbo, and yoruba upto 7 each
  const greetings = [
    "Hello",
    "Hola",
    "Bonjour",
    "Ndewo",
    "Nnigba",
    "Good day",
    "Ogee te mii",
    "My gee",
    "Howdy",
    "How are you",
    "How is it going",
    "How is life",
    "How is it going",
  ];
  // random number between 0 and the length of the array
  const randomNumber = Math.floor(Math.random() * greetings.length);
  // return the random greeting
  return greetings[randomNumber];
};

module.exports = generateRandomGreetings;
