import useSWR from "swr";
import {fetcher} from "../../utils";
import {toast} from "react-toastify";
import classes from './styles.module.css';
import cats from '../../assets/cats.json';
import {ICat} from "../../types";
import {Logo} from "../../components";

export default function Results() {
    const {data: votes} = useSWR('/', fetcher, {
        onError: () => toast.error('Une erreur est survenue lors de la récupération des résultats.'),
        onSuccess: data => {
            if (data.length === 0) {
                toast.info('Aucun vote n\'a été enregistré pour le moment.')
            }
        }
    });

    const data = (votes ?? []).map((vote: { votes: number, id: string }) => {
        const cat = cats.find(cat => cat.id === vote.id);
        return {
            ...cat,
            votes: vote.votes
        }
    })

    const sortedData = data.sort((a: { votes: number }, b: { votes: number }) => b.votes - a.votes);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Logo/>
            </div>
            <div className={classes.title}>
                <h2>
                    Classement des chats les plus mignons
                </h2>
            </div>

            <div
                className={classes.result_container}
            >
                {sortedData.map((cat: ICat & { votes: number }) => {
                    return (
                        <div
                            key={cat.id}
                            className={classes.card}
                        >
                            <img
                                src={cat.url}
                                alt={cat.id}
                            />
                            <div className={classes.card_info}>
                                {cat.votes} {cat.votes > 1 ? 'votes' : 'vote'}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}