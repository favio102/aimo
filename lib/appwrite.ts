import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
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
    await SignIn(email, password);
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
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
