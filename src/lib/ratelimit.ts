class RateLimiterClass {
    private maxRequests: number;
    private windowMs: number;
    private ipStore: { [ip: string]: { requests: number; timestamp: number } };
  
    constructor(maxRequests: number, windowMs: number) {
      this.maxRequests = maxRequests;
      this.windowMs = windowMs;
      this.ipStore = {}; 
    }
  
    async checkRateLimit(ip: string): Promise<void> {
      const now = Date.now();
      const ipData = this.ipStore[ip] || { requests: 0, timestamp: now };
  
      if (ipData.requests >= this.maxRequests) {
        const timeElapsed = now - ipData.timestamp;
        if (timeElapsed < this.windowMs) {
          throw new Error(`Rate limit exceeded for IP ${ip}`);
        } else {
          ipData.requests = 0;
          ipData.timestamp = now;
        }
      }
  
      ipData.requests++;
      this.ipStore[ip] = ipData;
    }
  }
  
  export default RateLimiterClass;