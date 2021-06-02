/**
 * My user id for StackOverflow API queries.
 */
export const USER_ID = 10431574;
/**
 * Padding amount for the d3 circle pack layout.
 */
export const PACK_LAYOUT_PADDING = 3;
/**
 * The number of tags to show in the tag cloud. Can adjust this amount.
 * Note: >100 will not have any impact currently because only the
 * first page is fetched.
 */
export const TAG_COUNT = 100;
/**
 * The minimum font size for tag bubble texts,
 * after accounting for zoom scale.
 * This is a setting that can be adjusted.
 */
export const BUBBLE_MINIMUM_FONT_SIZE = 10;
/**
 * The approximate width of each character in a bubble title
 * as a fraction of its height. The height will be known but the width
 * must be approximated. Could use canvas measure to get the exact width,
 * but that level of accuracy is not required.
 * Actual number varies from around .37 to .42 depending on character.
 */
export const CHARACTER_WIDTH_RATIO = 0.43;
/**
 * Title to be appended to SEO title tags
 */
export const SITE_TITLE = "Linda Paiste";
