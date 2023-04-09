import Layout from "@/components/Layout";
import TweetContent from "@/components/TweetContent";
import TweetForm from "@/components/TweetForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [tweets, setTweets] = useState([]);

  const fetchHomeTweets = async () => {
    const tweets = await axios
      .get("/api/posts")
      .then((response) => setTweets(response.data));
  };

  useEffect(() => {
    fetchHomeTweets();
  }, []);

  if (userInfoStatus === "loading") {
    return <div>Loading user info...</div>;
  } else if (userInfoStatus === "error") {
    return <div>Error loading user info...</div>;
  } else if (!userInfo?.username) {
    return <UsernameForm />;
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
              <TweetContent tweet={tweet} />
            </div>
          ))}
      </div>
    </Layout>
  );
}
