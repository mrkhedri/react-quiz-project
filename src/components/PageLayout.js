import React from 'react';
import PropTypes from 'prop-types';
import Paper from "../../node_modules/@material-ui/core/Paper/Paper";
import Typography from "../../node_modules/@material-ui/core/Typography/Typography";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'auto',
        maxWidth: 750,
        position: 'absolute',
        top: '50%',
        right: '50%',
        width: 750,
        transform: 'translateX(50%) translateY(-50%)',
    },
    heading: {
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
        paddingBottom: 8,
    },
    paragraph: {
        paddingTop: 16,
    },
    centerAlign: {
        textAlign: 'center',
    }
});

const PageLayout = ({classes, title = 'خوش آمدید', children, centerAlign = true}) => {
    return <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" className={classes.heading}>
            {title}
        </Typography>
        <Typography component="p" className={`${classes.paragraph} ${centerAlign ? classes.centerAlign : ''}`}>
            {children}
        </Typography>
    </Paper>
};

PageLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    centerAlign: PropTypes.bool,
};

export default withStyles(styles)(PageLayout);