import { useState } from "react";

const Register = (props: any) => {
  
  let [regUser, setRegUser] = useState<String>("");
  let [error, setError] = useState<String>("");

  const submit = (e: any) => {
    e.preventDefault();

    if (regUser === "") return setError("Please fill in your username");

    let getGroupChat: string = localStorage.getItem("groupchat")!,
      aquiredGroupChat = JSON.parse(getGroupChat);
    if (!aquiredGroupChat) {
      let groupChat = { title: "My Group", users: 1, messages: [] };
      let groupchat = JSON.stringify(groupChat);
      localStorage.setItem("groupchat", groupchat);
    }

    let groupChat = {
      title: "My Group",
      users: aquiredGroupChat.users + 1,
      messages: [...aquiredGroupChat.messages],
    };
    let groupchat = JSON.stringify(groupChat);
    localStorage.setItem("groupchat", groupchat);
    setError("");
    props.setGroup(groupChat);
    props.setUserName(regUser);
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-slate-100 flex flex-col justify-center items-center p-5 h-[100vh] ">
      <div className="w-fit">
        <form onSubmit={submit} className="flex flex-col">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Username
            </span>
            <input
              type="text"
              name="text"
              onChange={(e) => {
                setError("");
                setRegUser(e.target.value);
              }}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="username"
            />
          </label>
          {error !== "" ? <small className="text-red-500">{error}</small> : ""}
          <button className="py-2 mt-2 cursor-pointer bg-indigo-500 ... h-fit rounded text-white">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
