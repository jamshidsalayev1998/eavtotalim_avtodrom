import React, { useEffect,useState } from "react";
import { withTranslation } from "react-i18next";
import { Divider,Table } from "antd";

const GoExaminationAddGroupTable = ({students , setSelectedStudents
}) => {

  const [selected_keys , set_selected_keys] = useState([]);

  useEffect(() => {
    let a = [];

    students?.map((item,index) => {
      a.push(item?.id);
    })
    set_selected_keys(a);
    setSelectedStudents(a)
    
  }, [students])
  const columns = [
    {
      title: "F.I.O",
      dataIndex: "fio",
    },
    {
      title: "Pasport",
      dataIndex: "passport",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];

  const data = students;
  const rowSelection = {
    selectedRowKeys: selected_keys,
    
    getCheckboxProps: (record) => ({
      // disabled: true,
    })
  };

  
  return (
    <>
     <div>
      <Divider />
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}  
        
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
    </>
  );
};

export default withTranslation()(GoExaminationAddGroupTable);
