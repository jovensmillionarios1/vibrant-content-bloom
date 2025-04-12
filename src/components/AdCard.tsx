
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface AdCardProps {
  type: 'google' | 'amazon';
  title?: string;
  productId?: string;
  slot?: string;
  client?: string;
}

const AdCard = ({ type, title, productId, slot, client }: AdCardProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (type === 'google') {
    return (
      <div className="ad-container">
        <div className="text-xs text-muted-foreground mb-2">Advertisement</div>
        <div className="min-h-[250px] flex items-center justify-center bg-muted/50 rounded">
          {!loaded ? (
            <p className="text-sm text-muted-foreground">Loading advertisement...</p>
          ) : (
            <div className="text-center p-4">
              <p className="text-sm">[Google AdSense Ad]</p>
              <p className="text-xs text-muted-foreground mt-2">
                Client: {client || 'ca-pub-1234567890'} | Slot: {slot || '1234567890'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (type === 'amazon') {
    return (
      <div className="ad-container">
        <Card>
          <CardHeader className="pb-2">
            <div className="text-xs text-muted-foreground">Amazon Affiliate</div>
            <CardTitle className="text-lg">{title || 'Recommended Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 w-full md:w-1/3">
                <div className="bg-muted aspect-square rounded flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">[Product Image]</p>
                </div>
              </div>
              <div>
                <CardDescription className="mb-2 line-clamp-3">
                  This is a carefully selected product that we believe will interest you based on the content you're reading.
                </CardDescription>
                <div className="text-sm font-medium">$XX.YY</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <a 
              href={`https://amazon.com/dp/${productId || 'B0EXAMPLE'}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              View on Amazon <ExternalLink className="h-3 w-3" />
            </a>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return null;
};

export default AdCard;
