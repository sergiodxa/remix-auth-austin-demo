import { createCookieSessionStorage } from "remix";
import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";

let { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set");
}

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3ts"],
  },
});

export type User = {
  name: string;
  email: string;
};

export let auth = new Authenticator<User>(sessionStorage, {
  sessionKey: "user",
});

auth.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async ({ profile }) => {
      return {
        name: profile.displayName,
        email: profile.emails[0].value,
      };
    }
  )
);
