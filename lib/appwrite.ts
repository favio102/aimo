import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { keys } from "@/constants";

export const appWriteConfig = {
  endpoint: keys.endpoint,
  platform: keys.platform,
  projectId: keys.projectId,
  databaseId: keys.databaseId,
  userCollectionId: keys.userCollectionId,
  videosCollectionId: keys.videosCollectionId,
  storageId: keys.storageId,
};

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(appWriteConfig.endpoint as string)
  .setProject(appWriteConfig.projectId as string)
  .setPlatform(appWriteConfig.platform as string);
export default client;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      keys.databaseId as string,
      keys.userCollectionId as string,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      keys.databaseId as string,
      keys.userCollectionId as string,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
