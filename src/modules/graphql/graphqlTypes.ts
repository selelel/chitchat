export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AccountObjectEntity = {
  __typename?: 'AccountObjectEntity';
  age: Scalars['Int']['output'];
  avatar: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  gender: Gender;
  mbti: MbtiType;
};

export enum Audience {
  Friends = 'FRIENDS',
  OnlyMe = 'ONLY_ME',
  Public = 'PUBLIC'
}

export enum Category {
  Private = 'PRIVATE',
  Room = 'ROOM'
}

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['ID']['output'];
  avatar: Scalars['String']['output'];
  category: Category;
  isMuted: Scalars['Boolean']['output'];
  messages: Array<Message>;
  title: Scalars['String']['output'];
  usersId: Array<User>;
};

export type CommentContentInput = {
  image?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type CommentContentObject = {
  __typename?: 'CommentContentObject';
  image?: Maybe<Array<Scalars['String']['output']>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type Comments = {
  __typename?: 'Comments';
  _id: Scalars['String']['output'];
  content: CommentContentObject;
  postId: Post;
  reaction: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Scalars['String']['output'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Undefined = 'UNDEFINED',
}

export type GetConversation = {
  chatId: Scalars['String']['input'];
  pagination?: InputMaybe<Pagination>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accesstoken: Scalars['String']['output'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum MbtiType {
  Enfj = 'ENFJ',
  Enfp = 'ENFP',
  Entj = 'ENTJ',
  Entp = 'ENTP',
  Esfj = 'ESFJ',
  Esfp = 'ESFP',
  Estj = 'ESTJ',
  Estp = 'ESTP',
  Infj = 'INFJ',
  Infp = 'INFP',
  Intj = 'INTJ',
  Intp = 'INTP',
  Isfj = 'ISFJ',
  Isfp = 'ISFP',
  Istj = 'ISTJ',
  Istp = 'ISTP',
  Undefined = 'UNDEFINED',
}

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID']['output'];
  chatId: User;
  content: MessageContentObject;
  createdAt: Scalars['DateTime']['output'];
  editedAt: Scalars['DateTime']['output'];
  reaction: Scalars['String']['output'];
  seen: Scalars['Boolean']['output'];
  userId: User;
};

export type MessageContentObject = {
  __typename?: 'MessageContentObject';
  images?: Maybe<Array<Scalars['String']['output']>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFollowRequest: User;
  addCommentToPost: Comments;
  cancelFollowRequest: User;
  createChatRoom: Chat;
  createNewPost: Post;
  createUser: User;
  editPostComment: Comments;
  followUser: User;
  getChatConversation: Array<Message>;
  getRecommendedPosts: Array<Post>;
  getUserFollowingPosts: Array<Post>;
  getUserPrivateChatRoom: Chat;
  loginUser: LoginResponse;
  registerUser: User;
  removePost: User;
  removePostComment: Post;
  removeUserFollower: User;
  removeUserFollowing: User;
  updatePost: Post;
  updateUserPassword: Scalars['Boolean']['output'];
};


export type MutationAcceptFollowRequestArgs = {
  targetUserId: Scalars['String']['input'];
};


export type MutationAddCommentToPostArgs = {
  commentContent: CommentContentInput;
  postId: Scalars['String']['input'];
};


export type MutationCancelFollowRequestArgs = {
  targetUserId: Scalars['String']['input'];
};


export type MutationCreateChatRoomArgs = {
  recipientId: Scalars['String']['input'];
};


export type MutationCreateNewPostArgs = {
  postContent: PostContentInput;
  postOption: PostOptionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: UserInput;
};


export type MutationEditPostCommentArgs = {
  commentId: Scalars['String']['input'];
  updatedComment: CommentContentInput;
};


export type MutationFollowUserArgs = {
  targetUserId: Scalars['String']['input'];
};


export type MutationGetChatConversationArgs = {
  conversationInput: GetConversation;
};


export type MutationGetRecommendedPostsArgs = {
  pagination: Pagination;
};


export type MutationGetUserFollowingPostsArgs = {
  pagination: Pagination;
};


export type MutationGetUserPrivateChatRoomArgs = {
  targetUser: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  userInput: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  userInput: UserInput;
};


export type MutationRemovePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationRemovePostCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationRemoveUserFollowerArgs = {
  targetUserId: Scalars['String']['input'];
};


export type MutationRemoveUserFollowingArgs = {
  targetUserId: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  postId: Scalars['String']['input'];
  postOption: PostOptionInput;
  updatedPost: PostContentInput;
};


export type MutationUpdateUserPasswordArgs = {
  passwordInput: ChangePasswordInput;
};

export type Pagination = {
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type PersonalObjectEntity = {
  __typename?: 'PersonalObjectEntity';
  firstname: Scalars['String']['output'];
  hide_name: Scalars['Boolean']['output'];
  lastname: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type PersonalObjectInput = {
  firstname: Scalars['String']['input'];
  hide_name: Scalars['Boolean']['input'];
  lastname: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String']['output'];
  audience: Audience;
  author: User;
  comments: Array<Comments>;
  content: PostContentObject;
  createdAt: Scalars['DateTime']['output'];
  likes: Array<User>;
  shares: Scalars['Float']['output'];
  tags: Array<User>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PostContentInput = {
  description: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type PostContentObject = {
  __typename?: 'PostContentObject';
  description: Scalars['String']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type PostOptionInput = {
  audience: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  getUserById: User;
  logoutAllDevices: Scalars['Boolean']['output'];
  logoutDevice: Scalars['Boolean']['output'];
  testQuery: Array<User>;
};

export type RequestObjectDto = {
  __typename?: 'RequestObjectDto';
  toFollowers: Array<User>;
  toFollowings: Array<User>;
};

export enum Status {
  Idle = 'IDLE',
  Invincible = 'INVINCIBLE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  chats: Array<Chat>;
  email: Scalars['String']['output'];
  followers: Array<User>;
  following: Array<User>;
  isPrivate: Scalars['Boolean']['output'];
  posts: Array<Post>;
  requests: RequestObjectDto;
  rooms: Array<Chat>;
  status: Status;
  tags: Array<Scalars['String']['output']>;
  user: PersonalObjectEntity;
  userInfo: AccountObjectEntity;
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  user: PersonalObjectInput;
};
