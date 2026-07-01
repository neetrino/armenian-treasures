import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { truncateBlogDescription } from '@/lib/blog-description';
import { formatBlogDate } from '@/lib/format-blog-date';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { PublicBlogPostDTO } from '@/lib/dto';

interface BlogCardProps {
  post: PublicBlogPostDTO;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageSrc = post.image?.trim()
    ? resolvePublicAssetUrl(post.image)
    : resolvePublicAssetUrl('/images/culture/card-heritage.webp');
  const preview = truncateBlogDescription(post.content) || 'Read the full story from Armenian Treasures.';

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group">
      <div className="blog-card__image">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="blog-card__body">
        <time className="blog-card__date" dateTime={post.publishedAt}>
          {formatBlogDate(post.publishedAt)}
        </time>
        <h2 className="blog-card__title">{post.title}</h2>
        <p className="blog-card__excerpt">{preview}</p>
        <span className="blog-card__cta inline-flex items-center gap-1.5">
          Read article <ArrowRight size={12} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
