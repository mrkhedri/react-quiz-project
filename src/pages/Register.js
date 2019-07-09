import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PageLayout from '../components/PageLayout'
import {UserAvatarIcon} from "../components/Svg";
import PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import {HttpService} from '../utilities/request';
import Apis from '../utilities/apis';
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";

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
    const [userData, setUserData] = useState({first_name: '', last_name: '', birth_year: '', relationship_type: ''});
    const [isShowPrifleBtn, setIsShowPrifleBtn] = useState(false);

    const handleChange = ({target: {value, name}}) => setUserData({...userData, [name]: value});

    const handleSubmit = () => {
        setLoading(true);
        HttpService.post(Apis.member, JSON.stringify(userData)).then(({data, status}) => {
            setLoading(false);
            if(status === 200) {
                setIsShowPrifleBtn(true);
                alert('ثبت نام انجام شد. می توانید پروفایل خودتان را مشاهده کنید.');
            } else {
                alert('خطایی رخ داده است.');
                history.push({pathname: '/'});
            }
        })
    };

    return <PageLayout title='ثبت نام'>
        <UserAvatarIcon/>
        <br/>
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        label="نام"
                        name='first_name'
                        value={userData.first_name}
                        onChange={e => handleChange(e)}
                        onKeyDown={e => e.keyCode === 13 && handleSubmit()}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="نام خانوادگی"
                        name='last_name'
                        value={userData.last_name}
                        onChange={e => handleChange(e)}
                        onKeyDown={e => e.keyCode === 13 && handleSubmit()}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="تاریخ تولد"
                        placeholder='1372'
                        name='birth_year'
                        value={userData.birth_year}
                        onChange={e => handleChange(e)}
                        onKeyDown={e => e.keyCode === 13 && handleSubmit()}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="نوع ارتباط"
                        placeholder='مثلا 0 یا 1'
                        name='relationship_type'
                        value={userData.relationship_type}
                        onChange={e => handleChange(e)}
                        onKeyDown={e => e.keyCode === 13 && handleSubmit()}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </div>
        <br/>
        <Button disabled={loading} onClick={handleSubmit} color="primary" size="large" variant="contained" className={classes.submit}>
            {!loading ? 'ثبت نام' : 'لطفا صبر کنید...'}
        </Button>
        {
            isShowPrifleBtn &&
            <Button to='/user' component={Link} color="secondary" size="large" variant="contained" className={classes.submit}>
                مشاهده پروفایل
            </Button>
        }
    </PageLayout>;
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);