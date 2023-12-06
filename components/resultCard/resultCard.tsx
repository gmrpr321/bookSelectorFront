import { list } from "postcss";
import classes from "./ResultCard.module.css";
interface ResultCardProps {
  bookNames: string[];
}
export default function ResultCard(props: ResultCardProps) {
  return (
    <div className={classes.resultCard}>
      <p>Books that matches your Preference, Ranked</p>
      {props.bookNames.map((value, index) => {
        return (
          <div key={index}>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
}
