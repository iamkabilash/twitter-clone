import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UsernameForm() {
  const router = useRouter();

  const { userInfo, status } = useUserInfo();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (status !== "loading" && username === "") {
      setUsername(userInfo?.email?.split("@")[0]);
    }
  }, [status]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    await fetch("/api/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    router.reload();
  };

  if (status === "loading") {
    return "";
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex flex-col gap-[16px] text-center"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h1 className="text-xl">Pick a username.</h1>
        <div className="flex flex-row gap-[16px]">
          <input
            className="p-[10px] text-black rounded-xl"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-twitterBlue text-white hover:bg-white hover:text-twitterBlue p-[10px] rounded-xl font-semibold">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default UsernameForm;
