import styles from "./avatar.module.scss";

export const Avatar = ({ name, size, imgUrl }) => {
  const getInitials = (str) => {
    const names = str.split(" ");
    const firstName = names.at(0) ?? "";
    const lastName = names.length > 1 ? names.at(-1) : "";
    return firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
      : firstName.charAt(0);
  };

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {imgUrl ? (
        <img src={imgUrl} className={styles.image} />
      ) : (
        <div>{name ? getInitials(name).toLocaleUpperCase() : null}</div>
      )}
    </div>
  );
};
