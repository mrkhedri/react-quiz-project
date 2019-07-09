import React, {useState} from 'react';
import PageLayout from '../components/PageLayout'
import {UserAvatarIcon} from "../components/Svg";
import PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import {HttpService} from '../utilities/request';
import Apis from '../utilities/apis';
import Button from "../../node_modules/@material-ui/core/Button/Button";

const styles = theme => ({
    width: {
        width: 100,
    },
    direction: {
        direction: 'rtl'
    },
    submit: {
        width: 150
    }
});

const Login = ({classes, history}) => {
    const [loading, setLoading] = useState(false);
    const [prefixPhoneNumber, setPrefixPhoneNumber] = useState('+98');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChange = ({target: {value}}, type) => {
        type === 'number' && setPhoneNumber(value);
        type === 'prefix' && setPrefixPhoneNumber(value);
    };

    const handleSubmit = () => {
        const fullPhoneNumber = prefixPhoneNumber + phoneNumber;
        const matchResult = fullPhoneNumber.match(/^(\+98|0098)?9\d{9}$/i);
        setLoading(true);

        if (matchResult !== null){
            HttpService.get(`${Apis.generatePasscode}?mobile_number=${fullPhoneNumber}`).then(({data: {status_code, is_registered}}) => {
                setLoading(false);
                status_code === 200
                    // We can also use Redux store or sessionStorage for this case
                    ? history.push({
                        pathname: '/passcode',
                        state: {isRegistered: is_registered, fullPhoneNumber}
                    })
                    : alert('خطایی رخ داده است.')
            })
        } else {
            alert('شماره موبایل صحیح نیست.');
            setLoading(false);
        }

    };

    return <PageLayout title='ورود'>
        <UserAvatarIcon/>
        <br/>
        <div className={classes.margin}>
            <TextField
                label="شماره موبایل"
                className={classes.direction}
                value={phoneNumber}
                placeholder='9123456789'
                onChange={e => handleChange(e, 'number')}
                onKeyDown={e => e.keyCode === 13 && handleSubmit()}
                margin="normal"
                variant="outlined"
            /> {' '}
            <TextField
                value={prefixPhoneNumber}
                label="پیش شماره"
                className={`${classes.width} ${classes.direction}`}
                onChange={e => handleChange(e, 'prefix')}
                margin="normal"
                variant="outlined"
            />
        </div>
        <Button disabled={loading} onClick={handleSubmit} color="primary" size="large" variant="contained" className={classes.submit}>
            {!loading ? 'ورود' : 'لطفا صبر کنید...'}
        </Button>
    </PageLayout>;
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);