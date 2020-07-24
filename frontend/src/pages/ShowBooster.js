import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {fetchBoosterById} from "../utils/booster-utils";
import {useParams} from "react-router";
import YouTube from '@u-wave/react-youtube';
import Grid from "@material-ui/core/Grid";
import DeleteDialog from "../components/DeleteDialog";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: theme.typography.subtitle.fontFamily,
        fontSize: theme.typography.subtitle2.fontSize,
        letterSpacing: theme.typography.subtitle.letterSpacing,

    },
    root: {
        flexGrow: "1",
        padding: "0px 20px"
    },
    info: {
        color: "#6675b8",
        fontStyle: "italic",
        display: "inline",
        fontSize: "24px",
    },
    video: {
        justifyContent: "center",
        margin: "20px, 20px",
    },
    text: {
        fontFamily: "Noto Sans",
        fontSize: "24px",
    },
    textContent: {
        fontFamily: "Noto Sans",
        fontSize: "14px",
        fontStyle: "italic",
    },
    delete: {
        color: "#c20909",
    }
}))

export default function ShowBooster() {
    const classes = useStyles();
    const [fetchStatus, setFetchStatus] = useState("")
    const [boosterToDisplay, setBoosterToDisplay] = useState([]);
    let {id} = useParams();

    useEffect(() => {

        fetchBoosterById(id)
            .then((data) => {
                setBoosterToDisplay(data)
                setFetchStatus("SUCCESS")
            })

    }, [id])

    return (

        <div className={classes.root}>

            {fetchStatus === "FETCH_BOOSTER_FAILED" && <p>no booster to display</p>}


            <p className={classes.title}>This is your Booster from</p>
            <p className={classes.info}>{boosterToDisplay.creatorName}</p>

            {boosterToDisplay.message &&

            <p className={classes.title}>Message:</p>}
            <div className={classes.textContent}> {boosterToDisplay.message}</div>

            {boosterToDisplay.image &&

            <p className={classes.title}>Yay! {boosterToDisplay.creatorName} sent you a picture> </p>}
            {boosterToDisplay.image &&
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="180"
                        image={boosterToDisplay.image}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>}

            {boosterToDisplay.youtubeLink &&
            <div>
                <p className={classes.title}>Watch this video now:</p>

                <YouTube
                    video={boosterToDisplay.youtubeLink}
                    allowFullscreen={true}
                    width={374}
                    height={260}
                    autoplay={false}
                />
            </div>
            }
            <Grid
                container
                direction="row"
                justify="center"

            >
                <Grid item>
                    <DeleteDialog value={boosterToDisplay.id}/>
                </Grid>
            </Grid>

        </div>
    )

}