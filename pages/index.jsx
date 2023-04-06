import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState();
  const [userInfoStatus, setUserInfoStatus] = useState("loading");

  const getUserInfo = () => {
    if (status !== "loading") {
      fetch("/api/users?id=" + session.user.id)
        .then((response) => response.json())
        .then((json) => {
          setUserInfo(json.user);
          setUserInfoStatus("done");
        })
        .catch((err) => setUserInfoStatus("error"));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [status]);

  if (userInfoStatus === "loading") {
    return <div>Loading user info...</div>;
  } else if (userInfoStatus === "error") {
    return <div>Error loading user info...</div>;
  } else if (!userInfo?.username) {
    return <div>No username</div>;
  } else if (userInfo.username) {
    return <div>{userInfo.username}</div>;
  }
}
