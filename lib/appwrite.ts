import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
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
const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint as string)
  .setProject(appWriteConfig.projectId as string)
  .setPlatform(appWriteConfig.platform as string);
export default client;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
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
    throw new Error(error.message);
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Get Account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
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
    return null;
  }
};

// Get all video posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get latest created video posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get video posts that matches search query
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string,
      [Query.search("title", query)]
    );
    if (!posts) throw new Error("Something went wrong");
    return posts.documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get video posts created by user
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      keys.databaseId as string,
      keys.videosCollectionId as string,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign Out
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Upload File
export const uploadFile = async (file, type) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  console.log("Uploading file: ", asset);

  try {
    const uploadedFile = await storage.createFile(
      appWriteConfig.storageId as string,
      ID.unique(),
      asset
    );
    console.log("file uploaded success: ", uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    console.log("file url generated: ", fileUrl);

    return fileUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get File Preview
export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appWriteConfig.storageId as string, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storageId as string,
        fileId,
        2000,
        20000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type.");
    }
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Create Video Post
export const createVideoPost = async (form) => {
  try {
    console.log("starting file upload....");

    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    console.log("file upload successful: ", { thumbnailUrl, videoUrl });
    console.log("creating video post document...");

    const newPost = await databases.createDocument(
      appWriteConfig.databaseId as string,
      appWriteConfig.videosCollectionId as string,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    console.log("video post created successfully: ", newPost);

    return newPost;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
