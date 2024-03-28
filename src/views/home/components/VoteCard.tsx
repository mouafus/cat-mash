import {ICat} from "../../../types";

import classes from './vote-card.module.css';


type Props = {
    cat: ICat;
    handleVote: (id: string) => void;
}

export const VoteCard = ({cat, handleVote}: Props) => {

    return (
        <div
            className={classes.root}
            onClick={()=>handleVote(cat.id)}
        >
            <img src={cat.url} alt={cat.id}/>
        </div>
    )

}