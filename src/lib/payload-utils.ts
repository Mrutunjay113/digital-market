import { User } from "../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("payload-token")?.value;
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://digital-market-olive.vercel.app";

  const meRes = await fetch(`${serverUrl}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  console.log(meRes);

  const { user } = (await meRes.json()) as {
    user: User | null;
  };

  return { user };
};
