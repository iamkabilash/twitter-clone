import Layout from "@/components/Layout";
import TweetContent from "@/components/TweetContent";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function TweetPage() {
  const router = useRouter();
  const { id } = router.query;

  const [tweet, setTweet] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/api/posts?id=" + id)
      .then((response) => setTweet(response.data.post));
  }, [id]);

  return (
    <Layout>
      {tweet && (
        <div className="p-5">
          <Link href={"/"}>
            <div className="flex flex-row items-center gap-[16px] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <p>Tweet</p>
            </div>
          </Link>
          <TweetContent tweet={tweet} detailed />
        </div>
      )}
    </Layout>
  );
}

export default TweetPage;
