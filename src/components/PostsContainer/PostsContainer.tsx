'use client';
import { useState, useEffect } from 'react';
import { actions } from 'astro:actions';
import type { Post } from '../../types/Post';

export default function PostsContainer() {
  const [posts, setPosts] = useState<typeof Post[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await actions.getPosts();
        // setPosts(response);
        console.log(response);
        setPosts(response.data);
      } catch (err) {
        setError(err as unknown as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  console.log('Posts:', posts);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading posts: {error.message}</p>}
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Status: {post._status}</p>
            <p>First Published At: {new Date(post._firstPublishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}