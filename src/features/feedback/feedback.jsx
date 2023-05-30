"use client";
import styles from "./feedback.module.scss";
import Button from "../../components/button/button";
import { Pencil } from "../../icons/pencil";
import { Bulb } from "../../icons/bulb";

const FeedbackData = [
  {
    icon: <Bulb size={66} />,
    title: "Feature request",
    description: "Have an idea for a new feature? Click below to submit it",
    url: "https://github.com/Sheetal575/Daily-Dev",
    butttonText: "Contribute",
  },
  {
    icon: <Pencil size={60} />,
    title: "General feedback",
    description: "Anything else you’d like us to know? We’re listening!",
    url: "mailto:sheetaldadh9@gmail.com",
    butttonText: "Submit",
  },
];

export const FeedBack = () => {
  const handleButtonClick = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div className={styles["feedback"]}>
      <div className={styles["feedback__heading"]}>
        How can we make daily.dev better?
      </div>
      <span>
        Below, you’ll find all the options to directly communicate your needs to
        our team.
      </span>
      <div className={styles["feedback__container"]}>
        {FeedbackData.map((el) => (
          <div className={styles["feedback__content"]}>
            {el.icon}
            <div
              style={{
                marginTop: "2rem",
                height: "150px",
              }}
            >
              <div className={styles["feedback__content__title"]}>
                {el?.title}
              </div>
              <div className={styles["feedback__content__description"]}>
                {el?.description}
              </div>
            </div>
            <Button
              onClick={() => handleButtonClick(el?.url)}
              variant="secondary"
            >
              {el?.butttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
