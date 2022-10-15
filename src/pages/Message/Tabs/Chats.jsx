import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import { Media, TabPane } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import images from "assets/images";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
import Pusher from "pusher-js";

const Chats = ({
  scrollToBottom,
  setmessages,
  clear_local_storage,
  connect_pusher,
  active_chat_event,
  setChat_Box_Username
}) => {
  const [chats, setchats] = useState([]);

  useEffect(() => {
    get_chats();
    localStorage.setItem("current-chat-id", "");
    localStorage.setItem("current-user-id", "");
  }, []);
  useEffect(() => {
    if (active_chat_event) {
      change_chat_no_reads(active_chat_event);
    }
  }, [active_chat_event]);

  const get_chats = () => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/chat/get-chats",
      method: "GET",
      params: {
        token,
      },
    }).then(res => {
      if (res?.data?.status == 1) {
        setchats(res?.data?.data?.chats);
        localStorage.setItem("my-user-id", res?.data?.my_user_id);
        connect_pusher();
      }
    });
  };
  const select_chat = (chat_id, type , index) => {
    if (chat_id) {
      if(chats[index]?.type == 'private'){
        setChat_Box_Username(chats[index]?.my_chat?.chat_name)
      }
      else{
        setChat_Box_Username(chats[index]?.name)

      }
      clear_local_storage();
      localStorage.setItem("current-chat-id", chat_id);
      localStorage.setItem("current-type", "private");
      const token = localStorage.getItem("token");
      setmessages([]);
      axios({
        url: PATH_PREFIX + "/chat/get-messages",
        method: "GET",
        params: {
          token,
          type: type,
          chat_id,
        },
      }).then(res => {
        if (res?.data?.status == 1) {
          setmessages(res?.data?.data?.messages);
          localStorage.setItem("current-has-chat", res?.data?.data?.has_chat);
          scrollToBottom();
          selected_chat_noread_change(chat_id);
        }
      });
    }
  };

  const change_chat_no_reads = chat => {
    const exists = chats.filter(item_chat => item_chat?.id == chat?.id);
    if (exists.length) {
      const nimadir = {
        ...exists[0],
        my_chat: {
          ...exists[0]?.my_chat,
          noread_messages_count: chat?.my_chat?.noread_messages_count,
        },
      };
      const noo = chats.filter(item_chat => item_chat?.id != chat?.id);
      setchats([nimadir, ...noo]);
    } else {
      setchats(chats => [chat, ...chats]);
    }
  };
  const selected_chat_noread_change = chat_id => {
    let ttt = chats;
    ttt.forEach(element => {
      if (element["id"] == chat_id) {
        element["my_chat"]["noread_messages_count"] = 0;
      }
    });
    setchats([...ttt]);
  };

  return (
    <TabPane tabId="1">
      <div>
        <h5 className="font-size-14 mb-3">Recent</h5>
        <ul className="list-unstyled chat-list">
          <PerfectScrollbar style={{ height: "410px" }}>
            {chats?.map((chat,index) => {
              return (
                <li
                  key={chat?.id}
                  className={
                    localStorage.getItem("current-chat-id") == chat?.id
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to="#"
                    onClick={() => {
                      select_chat(chat?.id, chat?.type , index);
                    }}
                  >
                    <Media>
                      <div className="align-self-center mr-3">
                        <i
                          className={
                            chat?.status === "online"
                              ? "mdi mdi-circle text-success font-size-10"
                              : chat?.status === "intermediate"
                              ? "mdi mdi-circle text-warning font-size-10"
                              : "mdi mdi-circle font-size-10"
                          }
                        />
                      </div>
                      <div className="align-self-center mr-3">
                        <img
                          src={images[chat?.image]}
                          className="rounded-circle avatar-xs"
                          alt=""
                        />
                      </div>

                      <Media className="overflow-hidden" body>
                        <h5 className="text-truncate font-size-14 mb-1">
                          {chat?.type == "private"
                            ? chat?.my_chat?.chat_name
                            : chat?.name}
                        </h5>
                      </Media>
                      {chat?.my_chat?.noread_messages_count ? (
                        <div
                          className="font-size-11 bg-success p-1"
                          style={{ borderRadius: "10px", color: "white" }}
                        >
                          {chat?.my_chat?.noread_messages_count}
                        </div>
                      ) : (
                        ""
                      )}
                    </Media>
                  </Link>
                </li>
              );
            })}
            {/* {map(chats, chat => (
              
            ))} */}
          </PerfectScrollbar>
        </ul>
      </div>
    </TabPane>
  );
};

export default Chats;
