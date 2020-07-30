import React, {useContext, useEffect, useState} from "react";

import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {UserStateContext} from "../context/user/UserContext";
import {addUserAsFriend} from "../utils/friends-utils";
import Paper from "@material-ui/core/Paper";
import {fetchUserNumbers} from "../utils/user-utils";
import Alert from "@material-ui/lab/Alert";
import FriendDeleteDialog from "../components/dialogs/FriendDeleteDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: "1",
        overflow: "scroll"
    },
    input: {
        width: "240px",
    },
    message: {
        fontFamily: theme.typography.subtitle2.fontFamily,
        fontSize: theme.typography.subtitle2.fontSize,
        letterSpacing: theme.typography.subtitle2.letterSpacing,
        lineHeight: theme.typography.subtitle2.lineHeight,
        paddingLeft: "16px",
    },

    paper: {
        margin: "10px 20px",
        backgroundColor: theme.palette.first,
        padding: "10px 20px",
        borderRadius:"10px"
    },
    text:{
        fontFamily:theme.typography.subtitle
    },
    addFriendButton:{
        margin: "24px 0px 16px",
        padding:"10px 15px",
        backgroundColor: "rgb(191,148,115)",
        fontFamily: 'Lora',
        color: "#47392d",
        letterSpacing: theme.typography.subtitle2.letterSpacing,
        [theme.breakpoints.up("sm")]: {
            width: "20%",
        },
    }


}))


export default function Friends() {
    const classes = useStyles();
    const {userData} = useContext(UserStateContext);
    const [friendToAdd, setFriendToAdd] = useState("")
    const [allFriends, setAllFriends] = useState([])


    const dataForFriendship = {
        userName: userData.userName,
        friend: friendToAdd,
    }


    useEffect(() => {

        fetchUserNumbers(userData.userName)
            .then((data) => setAllFriends(data.friends))

            .catch((e) => console.error(e))

    }, [userData.userName])

    function handleChangeUsernameToAdd(event) {
        setFriendToAdd(event.target.value)
    }

    const [friendExists, setFriendExists] = useState(true)
    const [userExists, setUserExists] = useState()

    function addFriend() {
        setFriendExists(true)
        if (allFriends.includes(friendToAdd)) {
            setFriendExists(false)
        } else {
            addUserAsFriend(dataForFriendship)
                .then(()=>setUserExists(true))
                .catch(() => setUserExists(false))
        }
    }



    return (

        <>


            {userExists === true && window.location.reload()}
            <div className={classes.root}>
                <p className={classes.message}>Add a Friend</p>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid>
                        <TextField
                            className={classes.input}
                            onChange={handleChangeUsernameToAdd}
                            id="userToAdd"
                            label="enter username"
                            variant="outlined"
                            helperText={friendToAdd.length > 0 && friendToAdd.length < 6 && "Please enter at least 6 characters"}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            className={classes.addFriendButton}
                            disabled={friendToAdd.length < 6}
                            onClick={() => {
                                addFriend()
                            }}>Add user as friend</Button>
                    </Grid>

                </Grid>
                {userExists === false && <Alert
                    variant="filled"
                    severity="error">User doesn't exist</Alert>}
                {!friendExists &&
                <Alert
                    variant="filled"
                    severity="error">User is already your friend</Alert>}

                <p className={classes.message}>Your friends</p>
                {
                    allFriends && allFriends.map((friend) => (
                        <Paper className={classes.paper} key={friend}>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item className={classes.text}>
                                    {friend}
                                </Grid>
                                <Grid item>
                                    <FriendDeleteDialog friend={friend}/>
                                </Grid>
                            </Grid>
                        </Paper>))}

            </div>
        </>
    )

}