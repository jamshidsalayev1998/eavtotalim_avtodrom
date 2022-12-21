import React,{useState,useEffect} from "react";
import {Modal,Button,Form} from "antd";

const AddStudentModal = props =>{
    const {addModalVisible , cancelModal , } = props;
    return  (
        <Modal
            visible={addModalVisible}
            onCancel={cancelModal}
            onOk={}
        >

        </Modal>
    )
};

export default AddStudentModal;
