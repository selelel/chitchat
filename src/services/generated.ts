import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  Undefined = 'undefined'
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
  Undefined = 'undefined'
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountObjectEntity: ResolverTypeWrapper<AccountObjectEntity>;
  Audience: Audience;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: Category;
  ChangePasswordInput: ChangePasswordInput;
  Chat: ResolverTypeWrapper<Chat>;
  CommentContentInput: CommentContentInput;
  CommentContentObject: ResolverTypeWrapper<CommentContentObject>;
  Comments: ResolverTypeWrapper<Comments>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Gender: Gender;
  GetConversation: GetConversation;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  LoginUserInput: LoginUserInput;
  MbtiType: MbtiType;
  Message: ResolverTypeWrapper<Message>;
  MessageContentObject: ResolverTypeWrapper<MessageContentObject>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: Pagination;
  PersonalObjectEntity: ResolverTypeWrapper<PersonalObjectEntity>;
  PersonalObjectInput: PersonalObjectInput;
  Post: ResolverTypeWrapper<Post>;
  PostContentInput: PostContentInput;
  PostContentObject: ResolverTypeWrapper<PostContentObject>;
  PostOptionInput: PostOptionInput;
  Query: ResolverTypeWrapper<{}>;
  RequestObjectDto: ResolverTypeWrapper<RequestObjectDto>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountObjectEntity: AccountObjectEntity;
  Boolean: Scalars['Boolean']['output'];
  ChangePasswordInput: ChangePasswordInput;
  Chat: Chat;
  CommentContentInput: CommentContentInput;
  CommentContentObject: CommentContentObject;
  Comments: Comments;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  GetConversation: GetConversation;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginResponse: LoginResponse;
  LoginUserInput: LoginUserInput;
  Message: Message;
  MessageContentObject: MessageContentObject;
  Mutation: {};
  Pagination: Pagination;
  PersonalObjectEntity: PersonalObjectEntity;
  PersonalObjectInput: PersonalObjectInput;
  Post: Post;
  PostContentInput: PostContentInput;
  PostContentObject: PostContentObject;
  PostOptionInput: PostOptionInput;
  Query: {};
  RequestObjectDto: RequestObjectDto;
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
};

export type AccountObjectEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountObjectEntity'] = ResolversParentTypes['AccountObjectEntity']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  mbti?: Resolver<ResolversTypes['MbtiType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  isMuted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  usersId?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentContentObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentContentObject'] = ResolversParentTypes['CommentContentObject']> = {
  image?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comments'] = ResolversParentTypes['Comments']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['CommentContentObject'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  reaction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  accesstoken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chatId?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['MessageContentObject'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  editedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  reaction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageContentObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageContentObject'] = ResolversParentTypes['MessageContentObject']> = {
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFollowRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAcceptFollowRequestArgs, 'targetUserId'>>;
  addCommentToPost?: Resolver<ResolversTypes['Comments'], ParentType, ContextType, RequireFields<MutationAddCommentToPostArgs, 'commentContent' | 'postId'>>;
  cancelFollowRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCancelFollowRequestArgs, 'targetUserId'>>;
  createChatRoom?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatRoomArgs, 'recipientId'>>;
  createNewPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreateNewPostArgs, 'postContent' | 'postOption'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  editPostComment?: Resolver<ResolversTypes['Comments'], ParentType, ContextType, RequireFields<MutationEditPostCommentArgs, 'commentId' | 'updatedComment'>>;
  followUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'targetUserId'>>;
  getChatConversation?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationGetChatConversationArgs, 'conversationInput'>>;
  getRecommendedPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationGetRecommendedPostsArgs, 'pagination'>>;
  getUserFollowingPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationGetUserFollowingPostsArgs, 'pagination'>>;
  getUserPrivateChatRoom?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationGetUserPrivateChatRoomArgs, 'targetUser'>>;
  loginUser?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'userInput'>>;
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'userInput'>>;
  removePost?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'postId'>>;
  removePostComment?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationRemovePostCommentArgs, 'commentId'>>;
  removeUserFollower?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveUserFollowerArgs, 'targetUserId'>>;
  removeUserFollowing?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveUserFollowingArgs, 'targetUserId'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'postId' | 'postOption' | 'updatedPost'>>;
  updateUserPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'passwordInput'>>;
};

export type PersonalObjectEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonalObjectEntity'] = ResolversParentTypes['PersonalObjectEntity']> = {
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hide_name?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  audience?: Resolver<ResolversTypes['Audience'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comments']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['PostContentObject'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  shares?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostContentObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostContentObject'] = ResolversParentTypes['PostContentObject']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  logoutAllDevices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logoutDevice?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  testQuery?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RequestObjectDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestObjectDto'] = ResolversParentTypes['RequestObjectDto']> = {
  toFollowers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  toFollowings?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  following?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  requests?: Resolver<ResolversTypes['RequestObjectDto'], ParentType, ContextType>;
  rooms?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['PersonalObjectEntity'], ParentType, ContextType>;
  userInfo?: Resolver<ResolversTypes['AccountObjectEntity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccountObjectEntity?: AccountObjectEntityResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  CommentContentObject?: CommentContentObjectResolvers<ContextType>;
  Comments?: CommentsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageContentObject?: MessageContentObjectResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PersonalObjectEntity?: PersonalObjectEntityResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostContentObject?: PostContentObjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RequestObjectDto?: RequestObjectDtoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

