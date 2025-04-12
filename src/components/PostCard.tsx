
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Clock, Tag } from 'lucide-react';

interface PostCardProps {
  post: {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    date: string;
    tags: string[];
    readingTime?: string;
  };
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className={`h-full overflow-hidden transition-shadow hover:shadow-md ${featured ? 'md:grid md:grid-cols-2 gap-4' : ''}`}>
        {post.coverImage && (
          <div className={`relative overflow-hidden ${featured ? 'h-full max-h-[300px]' : 'h-48'}`}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <time dateTime={new Date(post.date).toISOString()}>
                {formatDate(post.date)}
              </time>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readingTime}</span>
                  </div>
                </>
              )}
            </div>
            <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold line-clamp-2`}>
              {post.title}
            </h3>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          </CardContent>
          
          <CardFooter className="pt-2 mt-auto">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline">+{post.tags.length - 3}</Badge>
              )}
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;
