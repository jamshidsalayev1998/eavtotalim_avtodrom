import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TabPane,
  Badge,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
import { isEmpty } from "lodash-es";
const Contacts = ({ setmessages,scrollToBottom ,clear_local_storage,setChat_Box_Username }) => {
  const [contacts, setcontacts] = useState([]);
  useEffect(() => {
    get_contacts();
    clear_local_storage();
  }, []);

  const get_contacts = () => {
    const token = localStorage.getItem('token');
    axios({
      url:PATH_PREFIX+'/chat/get-contacts',
      method:'GET',
      params:{
        token
      }
    }).then(res => {
      if(res?.data?.status == 1){
        setcontacts(res?.data?.data?.contacts);
      }
    })
  }

  const select_contact = (contact_id , index) => {
    setChat_Box_Username(contacts[index]?.name)
    clear_local_storage();
    localStorage.setItem('current-user-id' , contact_id);
    localStorage.setItem('current-type' , 'contact');
    const token = localStorage.getItem('token');
    setmessages([]);
    axios({
      url:PATH_PREFIX+'/chat/get-messages',
      method:'GET',
      params:{
        token,
        type:'contact',
        user_id:contact_id
      }
    }).then(res=>{
      if(res?.data?.status == 1){
        setmessages(res?.data?.data?.messages);
        localStorage.setItem('current-has-chat' , res?.data?.data?.has_chat);
        scrollToBottom();
      }
    })
  }
  return (
    <TabPane tabId="3">
      <h5 className="font-size-14 mb-3">Contact</h5>

      <div>
        <PerfectScrollbar style={{ height: "410px" }}>
          <div>
            <ul className="list-unstyled chat-list">
              {!isEmpty(contacts) &&
                contacts.map((contact, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      onClick={() => {
                        select_contact(contact?.id , index)
                      }}
                    >
                      <div
                        className="d-flex "
                        style={{ justifyContent: "space-between" }}
                      >
                        <h5 className="font-size-14 mb-0">{contact.name}</h5>
                        <Badge
                          color={'orange'}
                          className="py-1 px-2 badge badge-pill"
                        >
                          {contact?.role?.name}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </PerfectScrollbar>
      </div>
    </TabPane>
  );
};

export default Contacts;
