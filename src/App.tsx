import React from 'react';
import {Row, Col, Typography, Divider} from 'antd';
import 'antd/dist/antd.css';
import PaperForm from "./PaperForm";
import {Decryptor} from "./lib/decryptor";
import {GithubOutlined} from "@ant-design/icons";

const cheerio = require('cheerio');
const {Title, Paragraph} = Typography;


const layout = {
    xs: {span: 24},
    sm: {span: 22, offset: 1},
    md: {span: 20, offset: 2},
    lg: {span: 18, offset: 3}
};

function App() {
    const [decryptedPaper, setDecryptedPaper] = React.useState<string>("");
    const onSubmit = (content: string, key: string) => {
        const $ = cheerio.load(content);
        const data = $('#frm input[type="hidden"]').val();
        if (typeof data === 'undefined') {
            console.error('죄송합니다. 복호화에 실패했습니다.');
            return;
        }
        const result = Decryptor.decrypt(data, key);
        if (result.slice(0, 5) !== "<html") {
            console.error('복호화 실패');
            return;
        }
        setDecryptedPaper(result);
        console.log(result);
    };

    return (
        <>
            <Row>
                <Col {...layout} >
                    <Typography>
                        <Title>급여명세서 뷰어</Title>
                        <Paragraph>
                            <strong style={{color: 'red'}}>급여명세서, 주민등록번호를 포함한 그 어떠한 정보도 서버에 수집/저장하지 않습니다.</strong><br/>
                            모든 복호화 처리는 각자의 로컬에서 이루어집니다.<br/>
                            오프라인 상태에서도 동작합니다.<br/>
                            문제가 있으면 말씀해주세요.
                        </Paragraph>
                    </Typography>
                    <Divider/>
                    <PaperForm onSubmit={onSubmit}/>
                    <Divider/>
                </Col>
            </Row>
            <Row>
                {decryptedPaper && <Col {...layout}>
                    <iframe title={'view'} srcDoc={decryptedPaper} style={{display: 'block', width: '100%', height: '100vh'}}/>
                </Col>}
            </Row>
            <Row>
                <Col {...layout} >
                    <Typography>
                        해당 페이지는 오픈소스를 fork해서 작성되었습니다.
                        Developed by <a href="https://rajephon.dev">rajephon</a> / <a href="https://github.com/tnfhrnsss/douzone-payslip-viewer">깃허브 <GithubOutlined /></a> / <a href="https://github.com/tnfhrnsss/douzone-payslip-viewer/issues">버그 리포트</a>
                    </Typography>
                </Col>
            </Row>
        </>
    );
}

export default App;
