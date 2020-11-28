import { GetRegisteredUsers } from "../API/API";
import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import Loader from "./Loader";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        };
    }
    componentDidMount() {
        this.getRegisteredUsers();
    }
    getRegisteredUsers = async () => {
      this.setState({
        loading:true
      });
        const res = await GetRegisteredUsers();
        if (res.status) {
            this.setState({
                data: res.data,
                loading: false,
            });
        }
    };
    render() {
        const { data, loading } = this.state;
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">
                                        Registration Table
                                        <span style={{ float: "right", fontSize: "1rem", cursor: "pointer" }}>
                                        <i className="fas fa-sync-alt" onClick={ this.getRegisteredUsers.bind(this) }/> 
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {loading && <Loader />}
                                    {!loading && (
                                        <Table responsive>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Telephone Number</th>
                                                    <th>Full Address</th>
                                                    <th>SSN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.length > 0 &&
                                                    data.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {
                                                                        item?.FirstName
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item?.LastName
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item?.TelephoneNumber
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item?.FullAddress
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {item?.SSN}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </Table>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Dashboard;
