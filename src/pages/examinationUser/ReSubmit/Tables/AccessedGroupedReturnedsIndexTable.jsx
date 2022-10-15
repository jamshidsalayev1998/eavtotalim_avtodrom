import React, {useState, useEffect} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";


import {Row, Col, Select, Input, Pagination, Tabs} from "antd";
import axios from "axios";
import useDebounce from "../../../../components/CustomHooks/useDebounce";

const AccessedGroupedReturnedsIndexTable = props => {
    const {TabPane} = Tabs;
    const {Option} = Select;
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filter_org_id, setfilter_org_id] = useState('all');
    const [isloading, setIsloading] = useState(false);
    const [word, setword] = useState('');
    const [page, setpage] = useState(1);
    const [total, settotal] = useState(0);
    const [show_count, setshow_count] = useState(10);
    const [reload, setreload] = useState(false);
    const [params, setParams] = useState({
        word: '',
        page: 1
    })
    const wait_word = useDebounce(params.word, 800);


    useEffect(() => {

    }, [filter_org_id, reload, wait_word]);

    const select_page = (value) => {
        setpage(value);
        setParams({...params, page: value})
        setreload(!reload)
    }

    const change_search = (value) => {
        setword(value);
        setParams({...params, word: value, page: 1});
    }
    const show_count_change = (value) => {
        setshow_count(value);
        setreload(!reload);
    }
    return (
        <>

        </>
    );
};

export default withTranslation()(AccessedGroupedReturnedsIndexTable);
