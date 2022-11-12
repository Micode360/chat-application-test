import { useEffect, useState } from "react";
import Input from "./input";
import Register from "./register";

interface groupInt {
  title: string;
  users: number;
  messages: Array<any>;
}

const Darshboard = () => {
  let [username, setUserName] = useState<String>("");
  let [firstime, setFirstime] = useState<Boolean>(true);

  let [group, setGroup] = useState<groupInt>({
    title: "My Group",
    users: 0,
    messages: [],
  });

  useEffect(() => {
    const theElement: any = document.getElementById("chat_container");
    let getGroupChat: string = localStorage.getItem("groupchat")!,
      aquiredGroupChat = JSON.parse(getGroupChat);

    const scrollToBottom = (node: any, status: string) => {
      node.scrollTop = node.scrollHeight;
    };

    window.addEventListener("storage", () => {
      let getGroupChat: string = localStorage.getItem("groupchat")!,
        aquiredGroupChat = JSON.parse(getGroupChat);
      setGroup(aquiredGroupChat);
    });

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      let groupChat = {
        title: "My Group",
        users: group.users < 0 ? 1 : group.users - 1,
        messages: [...aquiredGroupChat.messages],
      };
      let groupchat = JSON.stringify(groupChat);
      localStorage.setItem("groupchat", groupchat);
    });

    if (group.messages.length > 3 && firstime) {
      scrollToBottom(theElement, "intial");
      setFirstime(false);
    }
  }, [firstime, group.messages, group.messages.length, group.users]);

  return (
    <section className="flex flex-col items-center m-5 border-[1px] border-gray-200 rounded-xl overflow-hidden absolute top-0 bottom-0 left-0 right-0">
      <div className="flex items-center justify-start shadow w-full">
        <div className="p-3 rounded-lg">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              M
            </div>
            <div className="relative ml-2 text-sm bg-white px-4">
              <div>{group.title}</div>
              <div className="text-xs mr-2 text-gray-500">
                {group.users} users
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full pb-[8.5rem]">
        <div
          id="chat_container"
          className="flex flex-col h-full overflow-x-auto mb-4"
        >
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {group.messages.length === 0
                ? ""
                : group.messages.map((message: any, index: any) => {
                    let usernameTrue = message.username === username;
                    return (
                      <div
                        className={
                          usernameTrue
                            ? "col-start-1 col-end-12 md:col-end-8 p-3 rounded-lg"
                            : "col-start-1 md:col-start-6 col-end-13 p-3 rounded-lg"
                        }
                        key={index}
                      >
                        <div
                          className={
                            usernameTrue
                              ? "flex flex-row items-center"
                              : "flex items-center justify-start flex-row-reverse"
                          }
                        >
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.username.charAt(0)}
                          </div>
                          <div
                            className={
                              usernameTrue
                                ? "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl max-w-[15rem]"
                                : "relative mr-3 text-sm bg-orange-100 py-2 px-4 shadow rounded-xl max-w-[15rem]"
                            }
                          >
                            <div className="font-bold">{message.username}</div>
                            <div className="break-words">{message.text}</div>
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500 w-full">
                              {message.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      <Input username={username} setGroup={setGroup} />
      {username !== "" ? (
        ""
      ) : (
        <Register setUserName={setUserName} setGroup={setGroup} />
      )}
    </section>
  );
};

export default Darshboard;
