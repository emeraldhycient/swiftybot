const wiki = require("wikipedia");

const wikipedia = async (query) => {
  try {
    const summary = await wiki.summary("Batman");
    //console.log(summary);
    return summary;
    //Response of type @wikiSummary - contains the intro and the main image
  } catch (error) {
    console.log(error);
    return;
    //=> Typeof wikiError
  }
};

module.exports = wikipedia;
