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
 * all API responses follow a standard format
 */
export interface SoResponse<T> {
  items: T[];
  has_more: boolean;
  /**
   * These are always present, but I am marking them as optional because
   * they are not needed.
   */
  quota_max?: number;
  quota_remaining?: number;
}

/**
 * the full response
 */
export type TopTagsJson = SoResponse<UserTag>;
