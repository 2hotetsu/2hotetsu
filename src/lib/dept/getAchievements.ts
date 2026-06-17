import { client } from "@/sanity/lib/client";
import { achievementsQuery } from "@/sanity/lib/queries";

export interface AchievementEntry {
  _id: string;
  title: string;
  category: "paper" | "grant";
}

export async function getAchievements(): Promise<AchievementEntry[]> {
  try {
    return await client.fetch(achievementsQuery, {}, { next: { revalidate: 3600 } });
  } catch {
    return [];
  }
}
