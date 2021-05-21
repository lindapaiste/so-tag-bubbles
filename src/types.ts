// response for endpoint tag/top-answerers
export interface TopUser {
  user: {
    reputation: number;
    user_id: number;
    user_type: string;
    profile_image: string;
    display_name: string;
    link: string;
  };
  post_count: number;
  score: number;
}

// response for endpoint users/id/top-tags
export interface UserTag {
  user_id: number;
  answer_count: number;
  answer_score: number;
  question_count: number;
  question_score: number;
  tag_name: string;
}

type BadgeLevel = "Bronze" | "Silver" | "Gold";

export interface TagForPeriod {
  postCount: number;
  score: number;
  rank?: number;
}

export interface MeInTag {
  month?: TagForPeriod;
  allTime: TagForPeriod;
  badge?: BadgeLevel;
}
