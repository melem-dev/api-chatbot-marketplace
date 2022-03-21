const RedisServer = require("ioredis");
const { log } = require("../utils");

const redis = new RedisServer();

const getAsync = async (key) => {
  const data = await redis.get(key);

  if (!data) return false;

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

const setAsync = async (key, value, ...options) => {
  const type = typeof value;
  let data;

  if (type === "object" || type === "array") {
    data = JSON.stringify(value);
  } else {
    data = value;
  }

  const result = await redis.set(key, data, ...options);

  return result === "OK" ? true : undefined;
};

const delAsync = async (key) => {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    log(error.message);
    return false;
  }
};

module.exports = {
  getAsync,
  delAsync,
  setAsync,
};
