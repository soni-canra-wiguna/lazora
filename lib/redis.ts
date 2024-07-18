import { Redis } from "ioredis"

function getRedisURL() {
  const redisURL = process.env.REDIS_URL
  if (redisURL) {
    return redisURL
  }

  throw new Error("[REDIS URL IS NOT DEFINED]")
}

export const redis = new Redis(getRedisURL())
