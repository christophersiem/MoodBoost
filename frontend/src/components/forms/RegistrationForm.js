import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {useHistory} from "react-router";
import {addNewUser} from "../../utils/auth-utils";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    inputField: {
        width: "80%",
    },
}))



export default function RegistrationForm() {

    const history = useHistory();
    const classes = useStyles();
    const [passwordState, setPasswordState] = useState("");
    const [registerState, setRegisterState] = useState({
        firstName: "",
        username: "",
        password: "",
        email: "",
    })
    const validation = registerState.username.length > 5 && registerState.username.length > 0 &&
        registerState.password.length > 5 && registerState.password.length > 0 &&
        passwordState.length > 0 && registerState.password === passwordState &&
        registerState.email.length > 0 && ((registerState.email.includes("@")) && (registerState.email.includes(".de") ||
            registerState.email.includes(".com") || registerState.email.includes(".net")))



    function handleChange(event) {
        const {name, value} = event.target;
        setRegisterState({
            ...registerState,
            [name]: value
        });
    }

    function handleConfirmPassword(event) {
        setPasswordState(event.target.value);
    }


    function handleSubmit(event) {
        event.preventDefault();
        addNewUser(registerState)
            .catch((e) => console.error(e))
            .then(() => history.push(`/login`))
    }

    return (
        <>

            <TextField
                className={classes.inputField}
                margin={"normal"}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="Firstname"
                name="firstName"

            />

            <TextField
                className={classes.inputField}
                margin={"normal"}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                error={registerState.username.length < 6 && registerState.username.length > 0}
                helperText={registerState.username.length > 0 && registerState.username.length < 6 && "Please enter at least 6 characters"}
            />
            <TextField
                className={classes.inputField}
                margin={"normal"}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={registerState.password.length < 6 && registerState.password.length > 0}
                helperText={registerState.password.length > 0 && registerState.password.length < 6 && "Please enter at least 6 characters"}
            />
            <TextField
                className={classes.inputField}
                margin={"normal"}
                onChange={handleConfirmPassword}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Enter Password again"
                type="password"
                id="password2"
                error={passwordState.length > 0 && registerState.password !== passwordState}
                helperText={passwordState.length > 0 && registerState.password !== passwordState && "Passwords don't match"}

            />
            <TextField
                className={classes.inputField}
                margin={"normal"}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="email"
                label="E-Mail"
                type="email"
                id="email"
                error={registerState.email.length > 0 && ((!registerState.email.includes("@")) || !(registerState.email.includes(".de") || registerState.email.includes(".com") || registerState.email.includes(".net")))}
                helperText={registerState.email.length > 0 && ((!registerState.email.includes("@")) || !(registerState.email.includes(".de") || registerState.email.includes(".com") || registerState.email.includes(".net"))) && "Please enter a valid E-Mail address"}
            />
            <Button
                onClick={handleSubmit}
                disabled={!validation}
            >
                REGISTER</Button>
            <Button

                onClick={history.goBack}>Go back to login</Button>
        </>
    )
}