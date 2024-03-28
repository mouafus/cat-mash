import {useState} from "react";
import cats from '../../assets/cats.json';
import {ICat} from "../../types";
import {chunk, fetcher, postVote, shuffleArray} from "../../utils";
import classes from './styles.module.css';
import {VoteCard} from "./components/VoteCard.tsx";
import {Link} from "react-router-dom";
import useSWR from "swr";
import {toast} from 'react-toastify';
import {endpoints} from "../../endpoints.ts";
import {Logo} from "../../components";

export default function Home() {
    const {data: totalVotes, error, mutate} = useSWR('/total-votes', fetcher, {
        onError: () => toast.error('Une erreur est survenue lors de la récupération des votes'),
    });

    console.log("totalVotes", totalVotes);

    const [currentIndex, setCurrentIndex] = useState(0);
    const data = chunk(shuffleArray(cats as ICat[]));
    const handleVote = (id: string) => {
        postVote(id)
            .then((data) => {
                mutate();
                if (currentIndex === data.length - 1) {
                    setCurrentIndex(0);
                    return;
                } else {
                    setCurrentIndex(currentIndex + 1);
                }
            })
            .catch((error) => {
                toast.error(error.message || 'Une erreur est survenue lors du vote');
            });
    }

    const title = "Votez pour le plus beau chat en cliquant sur l'image"

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Logo/>
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

            {
                !error && totalVotes?.data > 0 && (
                    <Link to={endpoints.results}>
                        <div
                            className={classes.result_cta}
                        >
                            <h4>
                                Voir les plus beaux chats
                            </h4>

                            {
                                !error && totalVotes && (
                                    <h5>
                                        {totalVotes.data} votes
                                    </h5>
                                )
                            }
                        </div>
                    </Link>
                )
            }
        </div>
    );
}