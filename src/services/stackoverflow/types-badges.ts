export interface User {
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
}

export type BadgeType = "named" | "tag_based";

export type BadgeRank = "gold" | "silver" | "bronze";

export interface Badge {
  /**
   * When accessed from a user endpoint, this is the number of times
   * that I have received this badge.  From the badge endpoint it is the
   * number of times awarded across all users.
   */
  award_count: number;
  badge_id: number;
  badge_type: BadgeType;
  description?: string; // presence depends on filters
  link: string;
  name: string;
  rank: BadgeRank;
}

export interface UserBadge extends Badge {
  user: User;
}
