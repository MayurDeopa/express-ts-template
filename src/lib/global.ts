import RateLimiterClass from "./ratelimit";

export const GlobalRateLimiter = new RateLimiterClass(50, 15 * 60 * 1000)