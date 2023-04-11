import Layout from "@/components/Layout";
import TweetContent from "@/components/TweetContent";
import TweetForm from "@/components/TweetForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [tweets, setTweets] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);

  const fetchHomeTweets = async () => {
    const tweets = await axios.get("/api/posts").then((response) => {
      setTweets(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  };

  const logout = async () => {
    setUserInfo(null);
    await signOut();
  };

  useEffect(() => {
    fetchHomeTweets();
  }, []);

  if (userInfoStatus === "loading") {
    return <div>Loading user info...</div>;
  }
  if (userInfoStatus === "error") {
    router.push("/login");
    return <div>Error loading user info...</div>;
  }
  if (!userInfo?.username) {
    return <UsernameForm />;
  }
  if (!userInfo) {
    router.push("/login");
    return <div>Error loading user info...</div>;
  }

  return (
    <Layout>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <TweetForm
        onPost={() => {
          fetchHomeTweets();
        }}
      />
      <div>
        {tweets.length > 0 &&
          tweets.map((tweet) => (
            <div className="border-t border-twitterBorder p-5">
              <TweetContent
                tweet={tweet}
                likedByMe={idsLikedByMe?.includes(tweet._id)}
              />
            </div>
          ))}
      </div>
      <div className="p-5 text-center border-t border-twitterBorder">
        <button
          onClick={() => logout()}
          className="bg-twitterWhite text-black px-5 py-2 rounded-full"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}
