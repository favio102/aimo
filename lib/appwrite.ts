import { Account, Client, ID } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT_URL,
  platform: process.env.EXPO_PUBLIC_PLATFORM_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_VIDEOS_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
};

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(appWriteConfig.endpoint as string)
  .setProject(appWriteConfig.projectId as string)
  .setPlatform(appWriteConfig.platform as string);
export default client;

const account = new Account(client);

export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
