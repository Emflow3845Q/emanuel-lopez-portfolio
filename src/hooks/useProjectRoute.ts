import { useSyncExternalStore } from 'react'
import { closeProjectRoute, getCurrentSlug, getServerSlug, openProjectRoute, subscribeToRoute } from '@/lib/hashRoute'

export function useProjectRoute() {
  const slug = useSyncExternalStore(subscribeToRoute, getCurrentSlug, getServerSlug)
  return { slug, open: openProjectRoute, close: closeProjectRoute }
}
