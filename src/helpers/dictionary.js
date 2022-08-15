const googleDictionaryApi = require("google-dictionary-api");

const dictionary = async () => {
  try {
    meaning = await googleDictionaryApi.search("price", "en");
    console.log(meaning);
    return meaning;
  } catch (error) {
    console.log(error);
    return;
  }
};
module.exports = dictionary;
