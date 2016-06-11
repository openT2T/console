export class GitHubUser {
  // The user name to sign to github
  userName: string;

  // Avatar URL
  avatarUrl: string;

  // Profile URL
  profileUrl: string;

  // Header to use for basic auth (base64 encoded based on username and password)
  basicAuthHeader: string;

  // Indicates whether the user is currently signed in.
  isSignedIn: boolean;
}