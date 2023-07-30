const credentials = "include";
const _ = require("lodash");

const option = {
  GET: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Pragma: "no-cache",
    },
    cache: "no-cache",
  },
};

export default {
  GET: () => _.cloneDeep(option.GET),
};
