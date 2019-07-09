import React, {Fragment, useState} from 'react';
import PageLayout from '../components/PageLayout'
import {UserAvatarIcon} from "../components/Svg";
import PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import {HttpService} from '../utilities/request';
import Apis from '../utilities/apis';
import Button from "../../node_modules/@material-ui/core/Button/Button";

const styles = theme => ({
    wrapper: {
        direction: 'rtl'
    },
    width: {
        width: 50,
    },
});

const PassCode = ({classes, history}) => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState([]);

    const handleChange = ({target: {value}}, index) => {
        let newCode = code;
        newCode[index] = value;
        setCode(newCode);
    };

    const handleSubmit = () => {
        const {location:{state:{isRegistered, fullPhoneNumber}}} = history;
        const fullCode = code[0] + code[1] + code[2] + code[3] + code[4];
        setLoading(true);

        HttpService.get(`${Apis.checkPasscode}?passcode=${fullCode}&mobile_number=${fullPhoneNumber}`).then(({data: {status_code, token}}) => {
            setLoading(false);
            localStorage.setItem('token', token);
            status_code === 200
                ? (isRegistered ? window.location.href = '/user' : window.location.href = '/register')
                : alert('خطایی رخ داده است.');
        })
    };

    return <PageLayout title='وارد کردن کدتایید'>
        <UserAvatarIcon/>
        <br/>
        <div className={classes.wrapper}>
            {
                [...new Array(5)].map((_, index) => <Fragment>
                    <TextField
                        key={index}
                        value={code[index] !== null ? code[index] : ''}
                        className={classes.width}
                        onChange={e => handleChange(e, index)}
                        margin="normal"
                        variant="outlined"
                    />{' '}
                </Fragment>)
            }
        </div>
        <Button disabled={loading} onClick={handleSubmit} color="primary" size="large" variant="contained" className={classes.submit}>
            {!loading ? 'ثبت کد' : 'لطفا صبر کنید...'}
        </Button>
    </PageLayout>;
};

PassCode.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withStyles(styles)(PassCode);