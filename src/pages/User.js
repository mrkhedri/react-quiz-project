import React, {Component} from 'react';
import PageLayout from '../components/PageLayout'
import {UserAvatarIcon} from "../components/Svg";
import PropTypes from "prop-types";
import {HttpService} from '../utilities/request';
import Apis from '../utilities/apis';
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";

class Login extends Component {
    state = {loading: false, userData: null};

    componentDidMount() {
        this.setState({loading: true});
        HttpService.get(Apis.member).then(({data: {active_status_type, id, mobile_number, ...userData}, status}) => {
            this.setState({loading: false});
            if (status === 200) {
                this.setState({userData})
            } else {
                alert('خطایی رخ داده است.');
                this.props.history.push({pathname: '/'});
            }
        })
    }

    deleteUser = () => {
        this.setState({loading: true});
        HttpService.delete(Apis.member).then(({status}) => {
            this.setState({loading: false});
            if (status === 200) {
                localStorage.removeItem('token');
                alert('کاربر حذف شد.');
                window.location.href = '/';
            }
        })
    };

    render() {
        const {loading, userData} = this.state;

        return <PageLayout title='پروفایل کاربر'>
            <UserAvatarIcon/>
            <br/><br/>
            <div>
                {
                    !loading && userData !== null ? <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <h3>نام: {userData.first_name}</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>نام خانوادگی: {userData.last_name}</h3>
                        </Grid>
                        <br/><br/>
                        <Grid item xs={6}>
                            <h3>تاریخ تولد: {userData.birth_year}</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>نوع ارتباط: {userData.relationship_type}</h3>
                        </Grid>
                    </Grid> : 'لطفا صبر کنید...'
                }
                {!loading && userData !== null && <Button onClick={this.deleteUser}>حذف کاربر</Button>}
            </div>
        </PageLayout>;
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Login;