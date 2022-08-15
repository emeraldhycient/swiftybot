const ud = require("urban-dictionary");

const Urban = async (word) => {
  try {
    meaning = await ud.define(word);
    console.log(meaning);
    return meaning;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = Urban;
