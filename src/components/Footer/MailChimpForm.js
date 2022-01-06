import IconButton from '@material-ui/core/IconButton';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MailchimpSubscribe from "react-mailchimp-subscribe"

import React from 'react';


const MailChimpForm = () => {
    let email;
    const url = "https://gmail.us6.list-manage.com/subscribe/post?u=e75ed010770bbcb2fc38f3af6&amp;id=533636dffe";
    const CustomForm = ({ status, message, onValidated }) => {
        const submit = () =>
            email &&
            onValidated({
                EMAIL: email.value,
            });
        return (
            <Typography component='div' >
                <Typography component='div' className='email-input-box'>
                    <InputBase
                        className='email-input'
                        placeholder='Enter your email'
                        inputRef={node => (email = node)}
                    />
                    <IconButton aria-label='delete' size='small' onClick={submit}>
                        <ArrowRightAltRoundedIcon fontSize='inherit' />
                    </IconButton>
                </Typography>
                <Typography component='div' className='subscribe-form-sending'>
                    {status === "sending" && <div>sending...</div>}
                    {status === "error" && <div dangerouslySetInnerHTML={{ __html: message }} />}
                    {status === "success" && <div>Subscribed !</div>}
                </Typography>
            </Typography>
        )
    }
    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className='stay-connected-section'
        >
            <Typography
                component='span'
                className='title'
            >
                Join Newsletter
            </Typography>
            <Typography component='div' className='email-input-section'>
                <Typography
                    component='span'
                    className='description'
                >
                    Subscribe our newsletter to get more free design course and resource
                </Typography>
                <MailchimpSubscribe
                    url={url}
                    render={({ subscribe, status, message }) => (
                        <CustomForm
                            status={status}
                            message={message}
                            onValidated={formData => subscribe(formData)}
                        />
                    )}
                />

            </Typography>
        </Grid>
    )
}

export default MailChimpForm;
