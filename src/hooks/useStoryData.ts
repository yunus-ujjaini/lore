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

  const getNextStory = (currentId: string): Story | undefined => {
    const otherStories = storyList.filter(s => s.id !== currentId);
    if (otherStories.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * otherStories.length);
    return otherStories[randomIndex];
  };

  return {
    stories: storyList,
    getStoryById,
    getRelatedStories,
    getNextStory,
  };
}
