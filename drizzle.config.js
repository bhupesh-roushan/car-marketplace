/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:v4kgJeLAlpW0@ep-sparkling-frost-a5j7sxp3.us-east-2.aws.neon.tech/car-MarketPlace?sslmode=require'
    }
  };