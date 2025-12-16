"use cache";

import { cacheLife } from "next/cache";

/**
 * Ejemplos de diferentes configuraciones de cache lifetime
 */

// Preset: "seconds" - 1s / 10s / 1min
export async function getCachedWithSeconds() {
  "use cache";
  cacheLife("seconds");

  console.log("[CACHE MISS] Fetching with seconds preset");
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    preset: "seconds",
    timestamp: new Date().toISOString(),
    config: "stale: 1s, revalidate: 10s, expire: 1min",
  };
}

// Preset: "minutes" - 1min / 10min / 1h
export async function getCachedWithMinutes() {
  "use cache";
  cacheLife("minutes");

  console.log("[CACHE MISS] Fetching with minutes preset");
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    preset: "minutes",
    timestamp: new Date().toISOString(),
    config: "stale: 1min, revalidate: 10min, expire: 1h",
  };
}

// Preset: "hours" - 1h / 2h / 1day
export async function getCachedWithHours() {
  "use cache";
  cacheLife("hours");

  console.log("[CACHE MISS] Fetching with hours preset");
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    preset: "hours",
    timestamp: new Date().toISOString(),
    config: "stale: 1h, revalidate: 2h, expire: 1day",
  };
}

// Preset: "days" - 1day / 7days / 30days
export async function getCachedWithDays() {
  "use cache";
  cacheLife("days");

  console.log("[CACHE MISS] Fetching with days preset");
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    preset: "days",
    timestamp: new Date().toISOString(),
    config: "stale: 1day, revalidate: 7days, expire: 30days",
  };
}

// Custom configuration
export async function getCachedWithCustom() {
  "use cache";
  cacheLife({
    stale: 300,      // 5 minutos fresh
    revalidate: 900, // 15 minutos stale (revalidate en background)
    expire: 3600,    // 1 hora máximo absoluto
  });

  console.log("[CACHE MISS] Fetching with custom config");
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    preset: "custom",
    timestamp: new Date().toISOString(),
    config: "stale: 5min, revalidate: 15min, expire: 1h",
  };
}
