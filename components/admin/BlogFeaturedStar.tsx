'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { toggleBlogPostFeaturedHomeAction } from '@/app/(admin)/admin/(panel)/blog/actions';
import { AdminSheet } from '@/components/admin/AdminSheet';
import { Button } from '@/components/ui/Button';
import { HOME_NEWS_POST_COUNT } from '@/lib/blog-featured-home';
import { cn } from '@/lib/utils';

export interface FeaturedPostChoice {
  id: string;
  title: string;
}

interface BlogFeaturedStarProps {
  postId: string;
  title: string;
  featuredOnHome: boolean;
  featuredPosts: FeaturedPostChoice[];
}

export function BlogFeaturedStar(props: BlogFeaturedStarProps) {
  const star = useFeaturedStar(props);
  return (
    <>
      <StarButton title={props.title} pending={star.pending} active={star.active} onClick={star.onStarClick} />
      <ReplaceFeaturedDialog
        postId={props.postId}
        open={star.replaceOpen}
        pending={star.pending}
        choiceId={star.choiceId}
        choices={star.choices}
        onClose={star.closeReplace}
        onChoice={star.setChoiceId}
        onConfirm={() => star.applyToggle(star.choiceId)}
      />
    </>
  );
}

function useFeaturedStar({ postId, featuredOnHome, featuredPosts }: BlogFeaturedStarProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [active, setActive] = useState(featuredOnHome);
  const [replaceOpen, setReplaceOpen] = useState(false);
  const [choiceId, setChoiceId] = useState('');

  useEffect(() => {
    setActive(featuredOnHome);
  }, [featuredOnHome]);

  const choices = featuredPosts.filter((post) => post.id !== postId);

  function applyToggle(replaceId?: string): void {
    startTransition(async () => {
      const previous = active;
      if (!replaceId) setActive(!previous);
      const result = await toggleBlogPostFeaturedHomeAction(postId, replaceId);
      if (!result.ok) {
        setActive(previous);
        if ('code' in result && result.code === 'replace') setReplaceOpen(true);
        return;
      }
      setActive(result.featuredOnHome);
      setReplaceOpen(false);
      setChoiceId('');
      router.refresh();
    });
  }

  return {
    pending,
    active,
    replaceOpen,
    choiceId,
    choices,
    setChoiceId,
    closeReplace: () => setReplaceOpen(false),
    applyToggle,
    onStarClick: () => {
      if (!active && choices.length >= HOME_NEWS_POST_COUNT) {
        setChoiceId('');
        setReplaceOpen(true);
        return;
      }
      applyToggle();
    },
  };
}

function StarButton({
  title,
  pending,
  active,
  onClick,
}: {
  title: string;
  pending: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-admin-row-action
      disabled={pending}
      aria-pressed={active}
      aria-label={active ? `Remove “${title}” from homepage` : `Show “${title}” on homepage`}
      title={active ? 'Shown on homepage' : 'Show on homepage'}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md transition',
        active
          ? 'text-bronze-500 hover:bg-bronze-50'
          : 'text-stone-300 hover:bg-stone-100 hover:text-bronze-400',
        pending && 'opacity-60',
      )}
      onClick={onClick}
    >
      <Star size={16} aria-hidden className={active ? 'fill-current' : undefined} />
    </button>
  );
}

interface ReplaceFeaturedDialogProps {
  postId: string;
  open: boolean;
  pending: boolean;
  choiceId: string;
  choices: FeaturedPostChoice[];
  onClose: () => void;
  onChoice: (id: string) => void;
  onConfirm: () => void;
}

function ReplaceFeaturedDialog({
  postId,
  open,
  pending,
  choiceId,
  choices,
  onClose,
  onChoice,
  onConfirm,
}: ReplaceFeaturedDialogProps) {
  return (
    <AdminSheet
      open={open}
      onClose={onClose}
      placement="center"
      size="md"
      titleId={`replace-featured-${postId}`}
      eyebrow="Homepage"
      title="Replace a starred story"
      description="The homepage keeps 4 stories: one large card and three smaller ones. Choose which star to remove so this post can take its place."
      footer={
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" size="sm" disabled={!choiceId || pending} onClick={onConfirm}>
            Replace
          </Button>
        </div>
      }
    >
      <fieldset className="space-y-2">
        <legend className="sr-only">Starred posts</legend>
        {choices.map((post) => (
          <label
            key={post.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 px-3 py-2 text-sm text-ink hover:bg-stone-50"
          >
            <input
              type="radio"
              name={`replace-${postId}`}
              value={post.id}
              checked={choiceId === post.id}
              onChange={() => onChoice(post.id)}
            />
            <span className="line-clamp-2">{post.title}</span>
          </label>
        ))}
      </fieldset>
    </AdminSheet>
  );
}
