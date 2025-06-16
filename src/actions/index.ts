import { defineAction } from 'astro:actions';

export const server = {
  getPosts: defineAction({
    handler: async () => {
      const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.PUBLIC_DATOCMS_API_KEY}`, // Use a private env var here
        },
        body: JSON.stringify({
          query: `query PostsQuery {
            allPosts {
              id
              title
              content
              _status
              _firstPublishedAt
            }
            _allPostsMeta {
              count
            }
          }`,
        }),
      });

      const json = await response.json();
      return json.data.allPosts;
    },
  }),
};
