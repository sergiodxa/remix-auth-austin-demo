import { useState } from "react";
import { Form, json, LoaderFunction, useLoaderData } from "remix";
import { auth, User } from "~/services/auth.server";

type LoaderData = {
  user: User | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await auth.isAuthenticated(request);
  return json<LoaderData>({ user });
};

export default function Index() {
  let { user } = useLoaderData<LoaderData>();
  let [state] = useState(user?.name ?? "Remix");
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to {state}</h1>
      {user === null ? (
        <Form method="post" action="/login">
          <button>Sign in with GitHub</button>
        </Form>
      ) : (
        <Form method="post" action="/logout" reloadDocument>
          <button>Sign out</button>
        </Form>
      )}
    </div>
  );
}
