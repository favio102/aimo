import config from "react-native-config";

export const appWriteConfig = {
  endpoint: config.ENDPOINT_URL,
  platform: config.PLATFORM_URL,
  projectId: config.PROJECT_ID,
  databaseId: config.DATABASE_ID,
  userCollectionId: config.USER_COLLECTION_ID,
  videosCollectionId: config.VIDEOS_COLLECTION_ID,
  storageId: config.STORAGE_ID,
};
