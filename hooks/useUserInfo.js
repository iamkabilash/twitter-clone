import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useUserInfo() {
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState("loading");

  const getUserInfo = () => {
    if (sessionStatus !== "loading") {
      fetch("/api/users?id=" + session?.user?.id)
        .then((response) => response.json())
        .then((json) => {
          setUserInfo(json.user);
          setStatus("done");
        })
        .catch((err) => router.push("/login"));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [sessionStatus]);

  return { userInfo, status };
}
