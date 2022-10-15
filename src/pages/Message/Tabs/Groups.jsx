import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import {
  Media,
  TabPane,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
const Groups = ({scrollToBottom, setmessages, clear_local_storage,setChat_Box_Username}) => {
  const [groups, setgroups] = useState([]);

  useEffect(() => {
    get_groups();
    clear_local_storage();
  }, []);

  const get_groups = () => {
    const token = localStorage.getItem('token');
    axios({
      url:PATH_PREFIX+'/chat/get-groups',
      method:'GET',
      params:{
        token
      }
    }).then(res => {
      if(res?.data?.status == 1){
        setgroups(res?.data?.data?.groups);
      }
    })
  }

  const select_group = (group_id,index) => {
    if (group_id) {
      setChat_Box_Username(groups[index]?.name_uz)
      clear_local_storage();
      localStorage.setItem('current-group-id', group_id);
      localStorage.setItem('current-type', 'group');
      const token = localStorage.getItem('token');
      setmessages([]);
      axios({
        url: PATH_PREFIX + '/chat/get-messages',
        method: 'GET',
        params: {
          token,
          type: 'group',
          group_id
        }
      }).then(res => {
        if (res?.data?.status == 1) {
          setmessages(res?.data?.data?.messages);
          localStorage.setItem('current-has-chat', res?.data?.data?.has_chat);
          scrollToBottom();
        }
      })
    }

  }

  return (
    <TabPane tabId="2">
      <h5 className="font-size-14 mb-3">Group</h5>
      <ul className="list-unstyled chat-list">
        <PerfectScrollbar style={{ height: "410px" }}>
          {
            groups?.map((group , index) => {
              return (
                <li key={group.id}
              className={localStorage.getItem('current-group-id') == group.id ? "active" : ""}
              >
                <Link
                  to="#"
                  onClick={() => {
                    select_group(group?.id, index)
                  }}
                >
                  <Media className="align-items-center">
                    <div className="avatar-xs mr-3">
                      <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                        {group.image}
                      </span>
                    </div>

                    <Media body>
                      <h5 className="font-size-14 mb-0">{group.name_uz || group.name_ru || group.name_en || group.name_qq || group.name_kiril}</h5>
                    </Media>
                  </Media>
                </Link>
              </li>
              )
            })
          }
          
        </PerfectScrollbar>
      </ul>
    </TabPane>
  );
};

export default Groups;
