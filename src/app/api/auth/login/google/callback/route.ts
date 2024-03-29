import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";
import { auth, googleAuth } from "~/lib/auth";
// import { sendMail } from "~/lib/resend";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("google_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          name: googleUser.name!,
          email: googleUser.email!,
          picture: googleUser.picture,
        },
      });
      // sendMail({
      //   toMail: user.email,
      //   data: {
      //     name: user.name,
      //   },
      // });
      return user;
    };

    const user = await getUser();

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/end-of-year",
      },
    });
  } catch (e) {
    console.log(e);

    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
