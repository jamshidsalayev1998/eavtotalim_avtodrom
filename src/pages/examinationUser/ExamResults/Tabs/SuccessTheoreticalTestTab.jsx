import React, {useState, useEffect, useRef} from "react";
import {Row, Col, Select, Input, Pagination, DatePicker, Tabs, Button} from "antd";
import ExamResultIndexTable from "../ExamResultIndexTable";
import moment from "moment";
import {
    getExaminationUserResultByStudent,
    getReportByStudent
} from "../../../../services/api_services/examination_user_api";
import useDebounce from "../../../../components/CustomHooks/useDebounce";
import {DataLoader} from "../../../Loaders/Loaders";
import {exportExamResult} from "../../../../services/exports/exam_result_export";
import {printReportByDay} from "../../../../services/api_services/print/print_by_day";
import "../print/print.css"
import PrintReportByDay from "../print/PrintReportByDay";
import ReactToPrint from "react-to-print";

const SuccessTheoreticalTestTab = (props) => {
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
    const {RangePicker} = DatePicker;
    const [intervalDate, setIntervalDate] = useState({
        from_date: localStorage.getItem(window.location.pathname + '-success-filter-from_date') ? moment(localStorage.getItem(window.location.pathname + '-success-filter-from_date')) : null,
        to_date: localStorage.getItem(window.location.pathname + '-success-filter-to_date') ? moment(localStorage.getItem(window.location.pathname + '-success-filter-to_date')) : moment()
    });
    let printReportRef = useRef();


    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            setIsloading(true)
            let params = {
                status_filter: 'only_theoretical_success',
                token,
                organization_id: filter_org_id,
                show_count,
                page: page,
                word: word,
                from_date: intervalDate?.from_date ? moment(intervalDate?.from_date).format('YYYY-MM-DD') : '',
                to_date: intervalDate?.to_date ? moment(intervalDate?.to_date).format('YYYY-MM-DD') : ''
            }
            const response = await getReportByStudent(params);
            if (response?.data?.status == 1) {
                setData(response?.data?.data?.data);
                setFilters(response?.data?.filters)
                settotal(response?.data?.data?.total)
                setIsloading(false)
            }
        })()
    }, [filter_org_id, reload, wait_word, intervalDate]);

    const select_page = (value) => {
        setpage(value);
        setParams({...params, page: value})
        setreload(!reload)
    }

    const change_search = (value) => {
        setword(value);
        setpage(1)
        setParams({...params, word: value, page: 1});
    }
    const show_count_change = (value) => {
        setshow_count(value);
        setreload(!reload);
    }
    const changeOrganizationId = (value) => {
        setfilter_org_id(value)
    }
    const disabledDate = (current) => {
        return current && current > moment().endOf('day');
    };
    const changeIntervalDate = (value) => {
        console.log('k', value)
        if (value?.length > 0) {
            setIntervalDate({
                from_date: value[0],
                to_date: value[1]
            })
            localStorage.setItem(window.location.pathname + '-success-filter-from_date', value[0]);
            localStorage.setItem(window.location.pathname + '-success-filter-to_date', value[1]);
        } else if (value == null) {
            setIntervalDate({
                from_date: null,
                to_date: moment()
            })
            localStorage.removeItem(window.location.pathname + '-success-filter-from_date');
            localStorage.removeItem(window.location.pathname + '-success-filter-to_date');
        }
    }
    console.log('interval', intervalDate)
    const exportExamResultFunction = () => {
        const token = localStorage.getItem('token');

        let params = {
            status_filter: 'only_theoretical_success',
            token,
            organization_id: filter_org_id,
            show_count: 'all',
            word: word,
            from_date: intervalDate?.from_date ? moment(intervalDate?.from_date).format('YYYY-MM-DD') : '',
            to_date: intervalDate?.to_date ? moment(intervalDate?.to_date).format('YYYY-MM-DD') : ''
        }
        exportExamResult('Testdan o`tganlar', params)
    }
    return (
        <>
            <div className="crypto-buy-sell-nav mt-3">
                <Row className="d-flex justify-content-between">
                    <Col xl={6}>
                        <Select
                            showSearch
                            style={{width: '100%'}}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={filter_org_id != 'all' ? Number(filter_org_id) : 'all'}
                            onChange={changeOrganizationId}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="all">Barchasi</Option>
                            {
                                filters?.organizations?.map((element, index) => {

                                    return (
                                        <Option
                                            value={element?.id}>{element?.name_uz || element?.name_ru || element?.name_en || element?.name_qq || element?.name_kiril}</Option>

                                    )
                                })
                            }
                        </Select>
                    </Col>
                    <Col xl={6}>
                        <RangePicker disabledDate={disabledDate}
                                     defaultValue={[intervalDate?.from_date, intervalDate?.to_date]}
                                     onChange={changeIntervalDate} className={'w-100'}/>
                    </Col>
                    <Col xl={8}>
                        <Button onClick={exportExamResultFunction}>Excel ga chiqarish</Button>


                    </Col>
                    <Col xl={4}>
                        <Input allowClear={true} value={word}
                               onChange={e => change_search(e?.target?.value)}
                               placeholder={'Qidirish'}/>
                    </Col>
                </Row>
                {
                    !isloading ?
                        <Row>
                            <Col xl={24}>
                                <ExamResultIndexTable tableData={data} reload={reload} setreload={setreload}/>
                            </Col>
                        </Row>
                        : <DataLoader/>
                }
                <Row className="d-flex justify-content-end mt-2">
                    <Pagination defaultCurrent={1} current={params.page} defaultPageSize={10}
                                total={total} onChange={e => select_page(e)}
                                onShowSizeChange={(page, e) => show_count_change(e)}/>
                </Row>
                <div className={'print-box'} ref={(element) => printReportRef = element}>
                    <PrintReportByDay intervalDate={intervalDate} reload={reload} dataPrint={data} statusPrint={'success'}
                                      fromDate={intervalDate?.from_date ? moment(intervalDate?.from_date).format('YYYY-MM-DD') : ''}
                                      toDate={intervalDate?.to_date ? moment(intervalDate?.to_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}/>
                </div>

            </div>
        </>
    )
}
export default SuccessTheoreticalTestTab