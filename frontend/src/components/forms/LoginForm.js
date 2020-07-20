import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from "../../context/user/UserContextProvider";
import {performLogin} from "../../utils/auth-utils";
import {getDecodedJWTToken, setJWTToken} from "../../utils/jwt-utils";
import {UserDispatchContext} from "../../context/user/UserContext";


const useStyles = makeStyles(() => ({
    inputField: {
        width: "80%",
    },
    submit: {
        margin: "24px 0px 16px",
        width: "80%"
    },

}))

export default function LoginForm() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useContext(UserDispatchContext);

    function login() {
        dispatch({type: LOGIN});
        performLogin(username, password)
            .then((response) => {
                setJWTToken(response);
                const userData = getDecodedJWTToken();
                dispatch({type: LOGIN_SUCCESS, payload: userData});
            })
            .catch(() => {
                dispatch({type: LOGIN_FAILED});

            })
        sessionStorage.setItem('UserName', username);
    }

    return (
        <>
            <TextField
                className={classes.inputField}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
            />
            <TextField
                className={classes.inputField}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={login}
            >
                Sign In
            </Button>

            <Link href="/register" variant="body2">
                {"No Account? Sign Up!"}
            </Link>
        </>
    )

}