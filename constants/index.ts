export const REDIS_EXPIRATION_TIME = 60 * 60
export const WEBSITE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_URL
    : process.env.PROD_URL
