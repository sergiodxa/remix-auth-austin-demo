import { ActionFunction, LoaderFunction } from "remix";
import { auth } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.authenticate("github", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export let action: ActionFunction = async ({ request }) => {
  return await auth.authenticate("github", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
