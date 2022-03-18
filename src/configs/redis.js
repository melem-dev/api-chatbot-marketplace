const RedisServer = require("ioredis");

const redis = new RedisServer();

const getAsync = async (key) => {
  const data = await redis.get(key);

  if (data.startsWith("[") && data.endsWith("]")) {
    return JSON.parse(data);
  }

  if (data.startsWith("{") && data.endsWith("}")) {
    return JSON.parse(data);
  }

  if (data.toLowerCase() === "true") {
    return true;
  }

  if (data.toLowerCase() === "false") {
    return false;
  }

  return data;
};

const setAsync = async (key, value) => {
  const type = typeof value;
  let data;

  if (type === "object" || type === "array") {
    data = JSON.stringify(value);
  } else {
    data = value;
  }

  const result = await redis.set(key, data);

  return result === "OK" ? true : undefined;
};

module.exports = {
  getAsync,
  setAsync,
};
