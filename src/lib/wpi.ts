// ─── WordPress REST API Client ────────────────────────────────────────────────
const WP_BASE_URL = 'https://alicatechnologies.com/wp-json/wp/v2';

export const POSTS_PER_PAGE = 6;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    sizes: {
      medium?: { source_url: string };
      large?: { source_url: string };
      full?: { source_url: string };
      'liquid-style16-lb'?: { source_url: string };
    };
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: WPCategory[][];
    author?: { name: string; avatar_urls: Record<string, string> }[];
  };
}

export interface PostsResponse {
  posts: WPPost[];
  totalPages: number;
  total: number;
}

// ─── Cache ────────────────────────────────────────────────────────────────────

const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) { cache.delete(key); return null; }
  return entry.data as T;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL_MS });
}

// ─── Minimal _fields for list views (fast) vs full post ──────────────────────

// Only the fields needed to render a card — keeps payload tiny & fast
const LIST_FIELDS = [
  'id', 'date', 'slug', 'title', 'excerpt',
  'featured_media', 'categories', 'tags', '_links', '_embedded',
].join(',');

// Full fields needed for a single post detail view
const POST_FIELDS = [
  'id', 'date', 'slug', 'title', 'excerpt', 'content',
  'featured_media', 'author', 'categories', 'tags', '_links', '_embedded',
].join(',');

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function wpFetch<T>(
  path: string,
  params: Record<string, string | number> = {},
  signal?: AbortSignal,
): Promise<{ data: T; headers: Headers }> {
  const url = new URL(`${WP_BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`WP API ${res.status}: ${res.statusText}`);
  }

  const data = await res.json() as T;
  return { data, headers: res.headers };
}

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Fetch paginated list of posts with only card-needed fields (fast).
 */
export async function getPosts(
  page = 1,
  perPage = POSTS_PER_PAGE,
  signal?: AbortSignal,
): Promise<PostsResponse> {
  const cacheKey = `posts-${page}-${perPage}`;
  const cached = getCached<PostsResponse>(cacheKey);
  if (cached) return cached;

  const { data, headers } = await wpFetch<WPPost[]>(
    '/posts',
    {
      page,
      per_page: perPage,
      _embed: 'wp:featuredmedia,wp:term',   // skip author embed for cards
      _fields: LIST_FIELDS,
    },
    signal,
  );

  const totalPages = parseInt(headers.get('X-WP-TotalPages') || '1', 10);
  const total = parseInt(headers.get('X-WP-Total') || '0', 10);

  const result: PostsResponse = { posts: data, totalPages, total };
  setCache(cacheKey, result);
  return result;
}

/**
 * Fetch a single post by slug (full content + author).
 */
export async function getPostBySlug(slug: string, signal?: AbortSignal): Promise<WPPost | null> {
  const cacheKey = `post-slug-${slug}`;
  const cached = getCached<WPPost>(cacheKey);
  if (cached) return cached;

  const { data } = await wpFetch<WPPost[]>(
    '/posts',
    {
      slug,
      _embed: 'wp:featuredmedia,wp:term,author',
      _fields: POST_FIELDS,
    },
    signal,
  );

  if (!data.length) return null;
  const post = data[0];
  setCache(cacheKey, post);
  return post;
}

/**
 * Prefetch the first page of posts in the background (call on app init).
 */
export function prefetchPosts(): void {
  if (getCached(`posts-1-${POSTS_PER_PAGE}`)) return;
  getPosts(1, POSTS_PER_PAGE).catch(() => { /* silent */ });
}

// ─── Helper Utilities ─────────────────────────────────────────────────────────

export function getFeaturedImageUrl(
  post: WPPost,
  size: 'medium' | 'large' | 'full' | 'liquid-style16-lb' = 'large',
): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return '';
  return (
    media.media_details?.sizes?.[size]?.source_url ||
    media.media_details?.sizes?.large?.source_url ||
    media.media_details?.sizes?.full?.source_url ||
    media.source_url
  );
}

export function getPostCategories(post: WPPost): WPCategory[] {
  return (post._embedded?.['wp:term']?.[0] as WPCategory[]) || [];
}

export function getPostTags(post: WPPost): WPTag[] {
  return (post._embedded?.['wp:term']?.[1] as WPTag[]) || [];
}

/**
 * Decode ALL HTML entities and strip tags.
 *
 * Strategy:
 *  - Browser: use a hidden <textarea> — the browser's own HTML parser decodes
 *    every entity (&#038;, &amp;, &rsquo;, &#8217;, &nbsp;, …) perfectly.
 *  - SSR / Node: fall back to an extended regex map.
 */
export function decodeEntities(text: string): string {
  if (typeof document !== 'undefined') {
    const el = document.createElement('textarea');
    el.innerHTML = text;
    return el.value;
  }
  // SSR fallback — covers the most common WP entities
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => {
      const map: Record<string, string> = {
        amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
        hellip: '\u2026', mdash: '\u2014', ndash: '\u2013', nbsp: '\u00A0',
        rsquo: '\u2019', lsquo: '\u2018', ldquo: '\u201C', rdquo: '\u201D',
        bull: '\u2022', trade: '\u2122', reg: '\u00AE', copy: '\u00A9',
        middot: '\u00B7', raquo: '\u00BB', laquo: '\u00AB',
      };
      return map[name] ?? m;
    });
}

export function stripHtml(html: string): string {
  // Strip all HTML tags first, then decode remaining entities
  return decodeEntities(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(htmlContent: string): string {
  const wordCount = stripHtml(htmlContent).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}
