import styles from "../styles/Toolbar.module.css";
import Button from "./Button.js";

/**
 * Renders the toolbar footer.
 */
export default function Toolbar({
  tool1Label,
  tool1Icon,
  tool1OnClick,
  tool2Label,
  tool2Icon,
  tool2OnClick,
}) {
  return (
    <>
      <div className={styles.FooterLeft}>
        <Button
          name={tool1Label}
          icon={tool1Icon}
          onClick={tool1OnClick}
          ariaLabel={tool1Label}
        />
      </div>

      <div className={styles.FooterRight}>
        <Button
          name={tool2Label}
          icon={tool2Icon}
          onClick={tool2OnClick}
          ariaLabel={tool2Label}
        />
      </div>
    </>
  );
}
