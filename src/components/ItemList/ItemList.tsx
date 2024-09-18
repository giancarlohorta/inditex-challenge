import { ListNormalizedPodcasts } from "../../types";
import Item from "../Item";
import styles from "./ItemList.module.css";

const ItemList = ({ list }: ListNormalizedPodcasts) => {
  if (!list || list.length === 0) {
    return <div>No Podcasts found.</div>;
  }

  return (
    <div className={styles.list}>
      {list?.map(({ name, id, author, image }) => {
        return <Item key={id} name={name} id={id} author={author} image={image} />;
      })}
    </div>
  );
};

export default ItemList;
