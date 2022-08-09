const generateRandomGreetings = () => {
  // array of greetings in english, spanish, french,igbo, and yoruba upto 7 each
  const greetings = [
    "Hello",
    "Hola",
    "Bonjour",
    "Ndewo",
    "Nnigba",
    "good day",
    "ogee te mii",
    "my gee",
    "howdy",
    "how are you",
    "how is it going",
    "how is life",
    "how is it going",
  ];
  // random number between 0 and the length of the array
  const randomNumber = Math.floor(Math.random() * greetings.length);
  // return the random greeting
  return greetings[randomNumber];
};

module.exports = generateRandomGreetings;
