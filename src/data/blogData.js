import axios from 'axios';

// Function to transform WordPress post data to match our existing structure
const transformWordPressPost = post => ({
  id: post.id,
  title: post.title?.rendered || "Untitled",
  category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Lead Generation",
  image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/default-image.jpg", // Fallback image
  author: post._embedded?.['wp:term']?.[0]?.[0]?.author || "B2B inDemand",
  date: post.date ? new Date(post.date).toLocaleDateString() : "Unknown Date",
  readTime: "5 min read",
  content: post.content?.rendered || "No content available."
});

// Fetch blog posts from WordPress API
export const fetchBlogPosts = async () => {
  try {
    const response = await axios.get('https://b2b-oldbackup.b2bindemand.com/wp-json/wp/v2/posts?_embed&per_page=100');
    const posts = response.data.map(transformWordPressPost);
    
    if (posts.length === 0) {
      console.warn("⚠️ No blog posts found.");
      return blogData; // Return empty structure
    }

    return {
      latestReads: {
        posts: posts.slice(0, 3),
        featured: posts[0] || null
      },
      mostPopular: {
        posts: posts.slice(3, 6),
        featured: posts[3] || null
      },
      leadGeneration: {
        posts: posts.slice(6, 9),
        featured: posts[6] || null
      },
      demandGeneration: {
        posts: posts.slice(9, 12),
        featured: posts[9] || null
      },
      allPosts: posts
    };
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error?.response?.status, error?.message);
    return blogData; // Return empty structure on error
  }
};

// Default empty state for blog data
export const blogData = {
  latestReads: { posts: [], featured: null },
  mostPopular: { posts: [], featured: null },
  leadGeneration: { posts: [], featured: null },
  demandGeneration: { posts: [], featured: null },
  allPosts: []
};
