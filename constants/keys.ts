const endpoint = process.env.EXPO_PUBLIC_ENDPOINT_URL;
const platform = process.env.EXPO_PUBLIC_PLATFORM_URL;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
const databaseId = process.env.EXPO_PUBLIC_DATABASE_ID;
const userCollectionId = process.env.EXPO_PUBLIC_USER_COLLECTION_ID;
const videosCollectionId = process.env.EXPO_PUBLIC_VIDEOS_COLLECTION_ID;
const storageId = process.env.EXPO_PUBLIC_STORAGE_ID;

export default {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
};
