import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import Link from "next/link";
import TweetButtons from "./TweetButtons";

function TweetContent({ tweet, detailed = false }) {
  return (
    <>
      {!detailed && (
        <div className="flex">
          <div>
            <Avatar src={tweet?.author?.image} />
          </div>
          <div className="pl-2">
            <div className="flex flex-row items-center gap-[10px]">
              <span className="font-bold">{tweet.author.name}</span>
              <span className="pl-1 text-twitterLightGray">
                @{tweet.author.username}
              </span>
              {tweet.createdAt && (
                <span className="pl-1 text-twitterLightGray">
                  <ReactTimeAgo date={tweet.createdAt} timeStyle={"twitter"} />
                </span>
              )}
            </div>
            <Link
              className="cursor-pointer"
              href={`/${tweet.author.username}/status/${tweet._id}`}
            >
              {tweet.text}
            </Link>
            <br />
            <TweetButtons />
          </div>
          <br />
        </div>
      )}
      {/* detailed true starts */}
      {detailed && (
        <div className="flex flex-col mt-[24px]">
          <div className="flex flex-row gap-[16px]">
            <div>
              <Avatar src={tweet?.author?.image} />
            </div>
            <div className="flex flex-col items-center gap-[1px]">
              <span className="font-bold">{tweet.author.name}</span>
              <span className="text-twitterLightGray">
                @{tweet.author.username}
              </span>
            </div>
          </div>
          <div className="mt-[24px]">
            <p className="text-xl">{tweet.text}</p>
          </div>
          <div className="mt-[24px] flex flex-row items-center gap-[16px] text-twitterLightGray">
            {tweet.createdAt && (
              <span className="">
                <ReactTimeAgo date={tweet.createdAt} />
              </span>
            )}
            <p>Twitter for Desktop</p>
          </div>
          <TweetButtons />
        </div>
      )}
    </>
  );
}

export default TweetContent;
