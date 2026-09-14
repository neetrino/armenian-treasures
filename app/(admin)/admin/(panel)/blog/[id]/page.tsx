import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { BlogPostForm } from '@/components/admin/blog-editor/BlogPostForm';
import { ButtonLink } from '@/components/ui/Button';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { fetchFeaturedBlogByIds } from '@/lib/queries/featured-blog-sql';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit blog post', robots: { index: false, follow: false } };

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EditBlogPostPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const [item, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id: params.id } }),
    prisma.blogCategory.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: { id: true, title: true },
    }),
  ]);
  if (!item) notFound();

  const featured = (await fetchFeaturedBlogByIds([item.id])).get(item.id);

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Edit post"
      title=""
      size="full"
      beforeHeader={<AdminBackLink href="/admin/blog" label="All blog posts" />}
      actions={
        item.isPublished ? (
          <ButtonLink href={`/blog/${item.slug}`} variant="secondary" external>
            View public page
          </ButtonLink>
        ) : null
      }
    >
      <BlogPostForm
        mode="edit"
        itemId={item.id}
        categories={categories.map((category) => ({
          id: category.id,
          title: getAdminLocaleValue(category.title),
        }))}
        initial={{
          title: item.title,
          slug: item.slug,
          content: item.content,
          shortDescription: item.shortDescription,
          image: item.image ?? '',
          headerImage: item.headerImage ?? '',
          backgroundImage: item.backgroundImage ?? '',
          galleryContent: item.galleryContent,
          contentBlocks: item.contentBlocks,
          publishedAt: item.publishedAt.toISOString(),
          isPublished: item.isPublished,
          featuredOnHome: featured?.featuredOnHome ?? false,
          featuredOrder: featured?.featuredOrder ?? null,
          categoryId: item.categoryId,
        }}
      />
    </AdminPageShell>
  );
}

export default EditBlogPostPage;
