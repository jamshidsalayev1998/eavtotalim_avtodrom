import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import {
  Button,
  Card,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Chats from "./Tabs/Chats";
import Contacts from "./Tabs/Contacts";
import Groups from "./Tabs/Groups";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
import Pusher from "pusher-js";

const Message = () => {
  const [messages, setmessages] = useState([]);
  const [messageBox, setMessageBox] = useState(null);
  const [activeTab, setactiveTab] = useState("1");
  const [Chat_Box_Username, setChat_Box_Username] = useState("Steven Franklin");
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online");
  const [curMessage, setcurMessage] = useState("");
  const [active_chat_event, setactive_chat_event] = useState(null);
  const [readed_but_noreadeds, setreaded_but_noreadeds] = useState(0);
  const [sending, setsending] = useState(false);
  useEffect(() => {
    clear_local_storage();
    if (!isEmpty(messages)) scrollToBottom();
  }, []);
  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 100000000;
    }
  };

  const send_message = () => {
    const token = localStorage.getItem("token");
    const current_type = localStorage.getItem("current-type");
    const current_chat_id = localStorage.getItem("current-chat-id");
    const current_user_id = localStorage.getItem("current-user-id");
    const current_group_id = localStorage.getItem("current-group-id");
    const current_has_chat = localStorage.getItem("current-has-chat");
    const form_data = new FormData();
    form_data.append("current_type", current_type ? current_type : "");
    form_data.append("current_chat_id", current_chat_id ? current_chat_id : "");
    form_data.append("current_user_id", current_user_id ? current_user_id : "");
    form_data.append("body", curMessage ? curMessage : "");
    if (curMessage) {
      form_data.append(
        "current_group_id",
        current_group_id ? current_group_id : ""
      );
      form_data.append(
        "current_has_chat",
        current_has_chat ? current_has_chat : ""
      );
      if (
        (current_type == "contact" && current_user_id) ||
        (current_type == "group" && current_group_id) ||
        (current_type == "private" && current_chat_id)
      ) {
        setsending(true);
        setcurMessage("");
        axios({
          url: PATH_PREFIX + "/chat/message",
          method: "POST",
          params: {
            token,
          },
          data: form_data,
        }).then(res => {
          setmessages(messages => [...messages, res?.data?.new_message]);
          localStorage.setItem("current-type", "private");
          localStorage.setItem("current-chat-id", res?.data?.data?.chat_id);
          if (!isEmpty(messages)) scrollToBottom();
          setcurMessage("");
          setsending(false);
        });
      }
    }
  };

  const clear_local_storage = () => {
    localStorage.setItem("current-chat-id", "");
    localStorage.setItem("current-user-id", "");
    localStorage.setItem("current-type", "");
    localStorage.setItem("current-group-id", "");
    localStorage.setItem("current-has-chat", "");
  };

  const connect_pusher = () => {
    const my_user_id = localStorage.getItem("my-user-id");
    const pusher = new Pusher("6663dce616d56d1f6615", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("channel-" + my_user_id);
    channel.bind("event-" + my_user_id, bind_pusher_callback);
  };

  const bind_pusher_callback = data => {
    const current_type = localStorage.getItem("current-type");
    const current_chat_id = localStorage.getItem("current-chat-id");
    const current_user_id = localStorage.getItem("current-user-id");
    const current_group_id = localStorage.getItem("current-group-id");
    if (
      (current_type == "contact" && current_user_id == data?.sender_user_id) ||
      (current_type == "group" && current_group_id == data?.sender_chat_id) ||
      (current_type == "private" && current_chat_id == data?.sender_chat_id)
    ) {
      setmessages(messages => [...messages, data?.new_message]);
      let ii = readed_but_noreadeds;
      ii++;
      setreaded_but_noreadeds(ii);
    } else {
      setactive_chat_event(data?.chat);
    }
  };

  const i_am_read = () => {
    // alert('ds')
    if (readed_but_noreadeds) {
      const token = localStorage.getItem("token");
      const cur_chat_id = localStorage.getItem("current-chat-id");
      axios({
        url: PATH_PREFIX + "/chat/i-am-read",
        method: "GET",
        params: {
          token,
          chat_id: cur_chat_id,
        },
      }).then(res => {
        setreaded_but_noreadeds(0);
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Skote" breadcrumbItem="Chat" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar mr-lg-4">
                  <div className="">
                    <div className="chat-leftsidebar-nav">
                      <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1");
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Chatlar</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggleTab("2");
                            }}
                          >
                            <i className="bx bx-group font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Guruhlar</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggleTab("3");
                            }}
                          >
                            <i className="bx bx-book-content font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Foydalanuvchilar</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab} className="py-4">
                        <Chats
                          setmessages={setmessages}
                          scrollToBottom={scrollToBottom}
                          send_message={send_message}
                          clear_local_storage={clear_local_storage}
                          messages={messages}
                          connect_pusher={connect_pusher}
                          active_chat_event={active_chat_event}
                          setChat_Box_Username={setChat_Box_Username}
                        />

                        <Contacts
                          setmessages={setmessages}
                          send_message={send_message}
                          scrollToBottom={scrollToBottom}
                          clear_local_storage={clear_local_storage}
                          setChat_Box_Username={setChat_Box_Username}
                        />

                        <Groups
                          setmessages={setmessages}
                          send_message={send_message}
                          scrollToBottom={scrollToBottom}
                          clear_local_storage={clear_local_storage}
                          setChat_Box_Username={setChat_Box_Username}
                        />
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card
                    onClick={() => {
                      i_am_read();
                    }}
                  >
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {Chat_Box_Username}
                          </h5>

                          <p className="text-muted mb-0">
                            <i
                              className={
                                Chat_Box_User_Status === "online"
                                  ? "mdi mdi-circle text-success align-middle mr-1"
                                  : Chat_Box_User_Status === "intermediate"
                                  ? "mdi mdi-circle text-warning align-middle mr-1"
                                  : "mdi mdi-circle align-middle mr-1"
                              }
                            />
                            {Chat_Box_User_Status}
                          </p>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "470px" }}
                            containerRef={ref => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">Today</span>
                              </div>
                            </li>
                            {messages &&
                              map(messages, message => (
                                <li
                                  key={"test_k" + message.id}
                                  className={
                                    message.from_id ==
                                    localStorage.getItem("my-user-id")
                                      ? "right"
                                      : ""
                                  }
                                >
                                  <div className="conversation-list">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        className="btn nav-btn"
                                        tag="i"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu direction="right">
                                        <DropdownItem href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Forward
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message?.from_name?.name}
                                      </div>
                                      <p>{message.body}</p>
                                      <p className="chat-time mb-0">
                                        <i className="bx bx-time-five align-middle mr-1" />
                                        <i className="bx bx bx-comment-check align-middle mr-1" />
                                        {moment(message.createdAt).format(
                                          "hh:mm"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={curMessage}
                                onChange={e => setcurMessage(e.target.value)}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                                onKeyDown={e => {
                                  if (e?.keyCode == 13) {
                                    send_message();
                                  }
                                }}
                                readOnly={sending}
                              />
                              <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-emoticon-happy-outline"
                                        id="Emojitooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Emojitooltip"
                                      >
                                        Emojis
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col className="col-auto">
                            {sending ? (
                              <div className="d-flex justify-content-center align-items-center h-100">
                                <i
                                  className="bx bx-loader bx-spin font-size-25 align-middle text-success mr-2"
                                  style={{ fontSize: "40px" }}
                                />
                              </div>
                            ) : (
                              <Button
                                type="button"
                                color="primary"
                                className="btn-rounded chat-send w-md waves-effect waves-light"
                                onClick={send_message}
                              >
                                <span className="d-none d-sm-inline-block mr-2">
                                  Send
                                </span>{" "}
                                <i className="mdi mdi-send" />
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Message;
