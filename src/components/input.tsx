import { useState } from "react";
import moment from "moment";


 interface messageType {
    username: string,
    text: string,
    createdAt: string
 }


const Input = (props:any) => {
  let [message, setMessage] = useState<messageType>({username: "",text:"", createdAt:""});

  const postSubmit = (e:any) => {
    e.preventDefault();
    //getting data
    let getGroupChat: string = localStorage.getItem("groupchat")!,
    aquiredGroupChat = JSON.parse(getGroupChat);

    //setting or updating data
    let groupChat = { title: "My Group", users: aquiredGroupChat.users, messages: [...aquiredGroupChat.messages, message] };
    let groupchat = JSON.stringify(groupChat);
    localStorage.setItem("groupchat", groupchat);

    //re getting the data
    let getUpdatedGroupChat: string = localStorage.getItem("groupchat")!,
    aquiredUpdatedGroupChat = JSON.parse(getUpdatedGroupChat);
    props.setGroup(aquiredUpdatedGroupChat);
  }

  return (
    <div className="bg-white w-full flex items-center shadow py-4 px-2 rounded-xl absolute bottom-0">
     
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            onChange={(e)=>setMessage({username: props.username,text:e.target.value, createdAt: moment().format('LT')})}
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 focus:border-2 pl-4 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        <button onClick={postSubmit} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-2 flex-shrink-0">
          
          <span>
            <svg
              className="w-6 h-6 transform rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Input;
