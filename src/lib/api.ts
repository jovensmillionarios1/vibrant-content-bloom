
import { toast } from "sonner";

// Define types for blog posts
export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  readingTime?: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
}

// Base API URL - in a real app, you would use environment variables
const API_URL = "/api";

/**
 * Fetch all blog posts
 * @param limit Optional limit of posts to fetch
 * @param skip Optional number of posts to skip (for pagination)
 * @returns Array of posts
 */
export async function fetchPosts(limit?: number, skip?: number): Promise<Post[]> {
  try {
    let url = `${API_URL}/posts`;
    const params = new URLSearchParams();
    
    if (limit) params.append('limit', limit.toString());
    if (skip) params.append('skip', skip.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    toast.error("Failed to load posts");
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param slug The post slug
 * @returns The post or null if not found
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    toast.error("Failed to load the article");
    return null;
  }
}

/**
 * Create a new blog post
 * @param post The post to create (without _id)
 * @returns The created post
 */
export async function createPost(post: Omit<Post, '_id'>): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const createdPost = await response.json();
    toast.success("Post created successfully");
    return createdPost;
  } catch (error) {
    console.error("Failed to create post:", error);
    toast.error("Failed to create post");
    return null;
  }
}

/**
 * Update an existing blog post
 * @param id The post ID
 * @param post The updated post data
 * @returns The updated post
 */
export async function updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const updatedPost = await response.json();
    toast.success("Post updated successfully");
    return updatedPost;
  } catch (error) {
    console.error(`Failed to update post ${id}:`, error);
    toast.error("Failed to update post");
    return null;
  }
}

/**
 * Delete a blog post
 * @param id The post ID
 * @returns True if successful, false otherwise
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    toast.success("Post deleted successfully");
    return true;
  } catch (error) {
    console.error(`Failed to delete post ${id}:`, error);
    toast.error("Failed to delete post");
    return false;
  }
}

/**
 * Calculate estimated reading time for a post
 * @param content The post content
 * @returns Reading time string (e.g. "5 min read")
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}
