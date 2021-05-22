/**
 * response item for endpoint users/id/top-tags
 */
export interface UserTag {
  user_id: number;
  answer_count: number;
  answer_score: number;
  question_count: number;
  question_score: number;
  tag_name: string;
}

/**
 * the full response
 */
export interface TopTagsJson {
  items: UserTag[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
