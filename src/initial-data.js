import Database from './database';
import fetch from 'unfetch';

export default async () => {
  let data;
  let cache;

  try {
    data = await fetch('issues.json');
    cache = await data.json();
  } catch (e) {
    return console.error('Fetching initial data failed', e);
  }

  await Database.putCardsAndRepos(cache.issues, cache.repositories);

  for (const repo of cache.repoLabels) {
    await Database.putRepoLabels(repo.repoOwner, repo.repoName, repo.labels);
  }
};
