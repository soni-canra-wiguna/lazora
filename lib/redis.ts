import { Redis } from "ioredis"

function getRedisURL() {
  const redisURL = process.env.REDIS_URL
  if (redisURL) {
    return redisURL
  }

  throw new Error("[REDIS URL IS NOT DEFINED]")
}

export const redis = new Redis(getRedisURL())

// import { Redis } from "ioredis"
// import { Redis } from "@upstash/redis"

// export const redis = new Redis({
//   url: process.env.REDIS_URL,
//   token: process.env.REDIS_TOKEN,
// })
