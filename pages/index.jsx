import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo();

  if (userInfoStatus === "loading") {
    return <div>Loading user info...</div>;
  } else if (userInfoStatus === "error") {
    return <div>Error loading user info...</div>;
  } else if (!userInfo?.username) {
    return <UsernameForm />;
  } else if (userInfo.username) {
    return <div>Logged in as {userInfo.username}</div>;
  }
}
