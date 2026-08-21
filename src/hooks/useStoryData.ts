import { useMemo } from 'react';
import type { Story } from '../validation/schema';

export function useStoryData(stories: Record<string, Story>) {
  const storyList = useMemo(() => Object.values(stories), [stories]);

  const getStoryById = (id: string): Story | undefined => {
    return stories[id];
  };

  const getRelatedStories = (monsterId: string): Story[] => {
    return storyList.filter(story =>
      story.monsterIds.includes(monsterId)
    );
  };

  const nextStoryCache = useMemo(() => {
    const cache: Record<string, Story | undefined> = {};
    for (const story of storyList) {
      const others = storyList.filter(s => s.id !== story.id);
      cache[story.id] = others.length > 0
        ? others[Math.floor(Math.random() * others.length)]
        : undefined;
    }
    return cache;
  }, [storyList]);

  const getNextStory = (currentId: string): Story | undefined => {
    return nextStoryCache[currentId];
  };

  return {
    stories: storyList,
    getStoryById,
    getRelatedStories,
    getNextStory,
  };
}
