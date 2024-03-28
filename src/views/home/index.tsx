import {useState} from "react";
import cats from '../../assets/cats.json';
import {ICat} from "../../types";
import {chunk, shuffleArray} from "../../utils";
import classes from './styles.module.css';
import {VoteCard} from "./components/VoteCard.tsx";
import logo from '../../assets/logo.png';
import {Link} from "react-router-dom";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = chunk(shuffleArray(cats as ICat[]));

    const handleVote = (id: string) => {
        console.log(id);
        if (currentIndex === data.length - 1) {
            setCurrentIndex(0);
            return;
        }
        setCurrentIndex(currentIndex + 1);
    }

    const title = "Votez pour le plus beau chat en cliquant sur l'image"

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <img src={logo} className={classes.logo} alt="App logo"/>
                <h3>Cat Mash</h3>
                <p>
                    {title}
                </p>
            </div>

            <div className={classes.left}>
                <VoteCard
                    cat={data[currentIndex][0]}
                    handleVote={handleVote}
                />
            </div>
            <div className={classes.title_xs}>
                {title}
            </div>
            <div className={classes.right}>
                <VoteCard
                    cat={data[currentIndex][1]}
                    handleVote={handleVote}
                />
            </div>

            <Link to={'/result'}>
                <div
                    className={classes.result_cta}
                >
                    <h4>
                        Voir les plus beaux chats
                    </h4>

                    <h5>
                        {120} votes
                    </h5>
                </div>
            </Link>
        </div>
    );
}