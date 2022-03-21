const { v4: uuid } = require("uuid");

module.exports = (title) => {
  let slug = title.toLowerCase().split(" ").join("-");
  let id = uuid();

  slug = slug + "-" + id;

  return slug;
};
