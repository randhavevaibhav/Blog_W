# Live website link - https://blog-w-three.vercel.app/
## Client
##### test cmd - npm run cy:open
## Features

1. Authentication
2. Authorization
3. Session based Authentication
4. Pre-fetching
5. Optimistic updates
6. Infinite scroll
7. CRUD operations
8. User stats Dashboard
9. Followers and User followings
10. Search
11. Nested comments and replies

### 1. Authentication (login/signup)

> Note - new signups are disabled.

User authentication (login) is done using JWT token. User will get two tokens auth token and refresh token. Auth token will expire in 5 min and refresh token will expire in 10 hr. User will get new auth token after every 5 min by using refresh token. Auth token is send as response but the refresh token is send as res cookie.

### 2. Authorization

Authorization is done to any delete or update action.
(i.e., user who created post/comment will be only one able to delete or update that post/comment).

### 3. Session based Authentication

Session based Authentication is implemented using JWT such that if a user tried to login from another browser or machine "Terminate session" window will show up. If user enters correct credentials then the previous session will be terminated and user can continue with new session

### 4. Pre-fetching

Prefetching is implemented to improve the performance and responsiveness of app.

> file : src\hooks\prefetch\usePrefetch.js

### 5. Optimistic updates

Optimistic updates are implemented to improve the performance and responsiveness of app.

#### Areas where optimistic updates are performed -

#### 1. like/dislike post -

> file : src\hooks\postLikes\useLikePost.js

> file : src\hooks\postLikes\useDisLikePost.js

#### 2. add/remove bookmark -

#### On individual post -

> file : src\hooks\bookmark\useCreateIndividualPostBookmark.js

> file : src\hooks\bookmark\useRemoveIndividualPostBookmark.js

#### On Discover and following page -

> file : src\hooks\bookmark\useCreateHomePageBookmark.js

> file : src\hooks\bookmark\useRemoveHomePageBookmark.js

#### 3. like/dislike comment -

> file : src\hooks\commentLikes\useLikeComment.js

> file : src\hooks\commentLikes\useDisLikeComment.js

### 6. Infinite scroll and pagination-

> Infinite scroll is implemented on following page

#### 1 Home page

> file : src\pages\Home\Home.jsx

#### 2. Dashboard user own posts.

> file : src\pages\Dashboard\Dashboard.jsx

#### 3. search results page.

> file : src\pages\SearchPost\SearchPost.jsx

#### pagination is implemented for post comments

> file : src\components\IndividualPost\CommentSection

### 7. CRUD operations -

CRUD (create read update delete) operations are implemented for posts and comments. for now posts have been limited to 20.

#### for posts - markdown and uploading post image is supported.

### 8. User stats Dashboard

Dashboard to show -

1. Total likes on user posts.
2. Total count of user posts.
3. Total comment count on user posts.
4. Total count of user followers.
5. Total count of people user following.
6. Users posts list.

Features -

1. Edit/Delete post.
2. sort posts.
3. Jump to followers/following users page.

### 9. Followers and User followings

User can follow/unfollow other users from user profile page.
user can check his followers/following users from dashboard or user profile page.

### 10. Search

Search functionality is implemented to search posts. while searching recent 5 posts which match search will be shown.If user wants all posts matching search query then user can press "enter" or click "search" icon to get full search results.

#### search posts page -

> file : src\pages\SearchPost\SearchPost.jsx

#### search suggestions -

> file : src\components\Navbar\SearchPostForm

### 11. Nested comments and replies

Nested comments and replies are supported up to 4 level.
i.e., single comment can have up to 4 nested replies (Note nested not consecutive, one comment can have as many as consecutive replies.).
