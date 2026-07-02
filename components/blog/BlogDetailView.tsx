import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { formatBlogDate } from '@/lib/format-blog-date';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { toBlogRenderHtml } from '@/lib/blog-content';
import type { PublicBlogPostDetailDTO } from '@/lib/dto';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/blog/blog.css';

interface BlogDetailViewProps {
  post: PublicBlogPostDetailDTO;
}

export function BlogDetailView({ post }: BlogDetailViewProps) {
  const imageUrl = post.image?.trim() || '/images/culture/card-heritage.webp';
  const resolvedImageUrl = resolvePublicAssetUrl(imageUrl);
  const contentHtml = toBlogRenderHtml(post.content);

  return (
    <div className="khndzoresk-page blog-detail-page">
      <section className="blog-detail-hero">
        <div className="blog-detail-hero__image">
          <Image
            src={resolvedImageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="blog-detail-hero__photo"
          />
          <div className="blog-detail-hero__shade" aria-hidden />
        </div>
        <Link href="/blog" className="blog-detail-back">
          <ArrowLeft size={14} aria-hidden /> Back to blog
        </Link>
        <div className="blog-detail-hero__content">
          <div className="blog-detail-hero__inner">
            <time className="blog-detail-date" dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <h1 className="blog-detail-title">{post.title}</h1>
          </div>
        </div>
      </section>

      <KhndzoreskDivider />

      <article className="blog-detail-article">
        <div className="blog-detail-prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}
