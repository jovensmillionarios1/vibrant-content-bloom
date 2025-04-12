
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Tag as TagIcon } from 'lucide-react';

const MOCK_POSTS = [
  {
    _id: '1',
    slug: 'getting-started-with-nextjs-and-mdx',
    title: 'Getting Started with Next.js and MDX: A Comprehensive Guide',
    excerpt: 'Learn how to build a modern blog with Next.js and MDX. This guide covers everything from setup to deployment.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
    date: '2025-04-10',
    tags: ['Next.js', 'MDX', 'Tutorial'],
    readingTime: '8 min read'
  },
  {
    _id: '2',
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS: Tips and Tricks for Efficient Styling',
    excerpt: 'Discover advanced techniques to get the most out of Tailwind CSS in your web development projects.',
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-04-05',
    tags: ['CSS', 'Tailwind', 'Styling'],
    readingTime: '6 min read'
  },
  {
    _id: '3',
    slug: 'monetizing-your-blog',
    title: 'Monetizing Your Blog: Effective Strategies for 2025',
    excerpt: 'Explore various ways to monetize your blog content effectively while maintaining a great user experience.',
    coverImage: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbmV5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-28',
    tags: ['Monetization', 'AdSense', 'Affiliate'],
    readingTime: '10 min read'
  },
  {
    _id: '4',
    slug: 'seo-optimization-for-blogs',
    title: 'SEO Optimization for Blogs: A Step-by-Step Guide',
    excerpt: 'Learn how to optimize your blog posts for search engines to increase organic traffic and visibility.',
    coverImage: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-20',
    tags: ['SEO', 'Marketing', 'Traffic'],
    readingTime: '12 min read'
  },
  {
    _id: '5',
    slug: 'creating-engaging-content',
    title: 'Creating Engaging Content That Keeps Readers Coming Back',
    excerpt: 'Discover strategies for creating compelling blog content that engages readers and builds a loyal audience.',
    coverImage: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbnRlbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-15',
    tags: ['Content', 'Writing', 'Engagement'],
    readingTime: '7 min read'
  },
  {
    _id: '6',
    slug: 'responsive-design-principles',
    title: 'Responsive Design Principles for Modern Web Applications',
    excerpt: 'Learn key responsive design principles to create web applications that work beautifully across all devices.',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3BvbnNpdmUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-10',
    tags: ['Design', 'Responsive', 'CSS'],
    readingTime: '9 min read'
  },
  {
    _id: '7',
    slug: 'building-an-effective-content-strategy',
    title: 'Building an Effective Content Strategy for Your Blog',
    excerpt: 'Develop a strategic approach to content creation that aligns with your goals and resonates with your audience.',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbnRlbnQlMjBzdHJhdGVneXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-05',
    tags: ['Strategy', 'Content', 'Planning'],
    readingTime: '11 min read'
  },
  {
    _id: '8',
    slug: 'optimizing-images-for-web',
    title: 'Optimizing Images for Web: Best Practices and Tools',
    excerpt: 'Learn how to optimize images for your website to improve loading times and user experience.',
    coverImage: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW1hZ2UlMjBvcHRpbWl6YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-02-28',
    tags: ['Performance', 'Images', 'Optimization'],
    readingTime: '8 min read'
  }
];

const POPULAR_TAGS = [
  'Next.js', 'MDX', 'Tailwind', 'SEO', 'Monetization', 'Content', 'Writing', 'Tutorial'
];

const Blog = () => {
  const [posts, setPosts] = useState<typeof MOCK_POSTS>([]);
  const [filteredPosts, setFilteredPosts] = useState<typeof MOCK_POSTS>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  
  useEffect(() => {
    // In a real application, we would fetch posts from the API
    setPosts(MOCK_POSTS);
    setFilteredPosts(MOCK_POSTS);
  }, []);
  
  useEffect(() => {
    if (!posts.length) return;
    
    let results = [...posts];
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      results = results.filter(
        post => post.title.toLowerCase().includes(lowerCaseQuery) ||
               post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
               post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    if (activeTag) {
      results = results.filter(
        post => post.tags.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }
    
    setFilteredPosts(results);
  }, [searchQuery, activeTag, posts]);
  
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? '' : tag);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
              All Articles
            </h1>
            <div className="max-w-xl mx-auto">
              <div className="flex items-center border rounded-md bg-background px-3">
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                  <TagIcon className="h-4 w-4" /> Popular Tags:
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <Button
                      key={tag}
                      variant={activeTag === tag ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No articles found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
