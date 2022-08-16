const googleDictionaryApi = require("google-dictionary-api");

const dictionary = async (word) => {
  try {
    meaning = await googleDictionaryApi.search(word, "en");
    // console.log(meaning);
    return meaning;
  } catch (error) {
    console.log(error);
    return;
  }
};
module.exports = dictionary;
