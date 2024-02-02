import Button from "./Button.js";

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
      <div className="footer-left">
        <Button
          name={tool1Label}
          icon={tool1Icon}
          onClick={tool1OnClick}
          ariaLabel={tool1Label}
        />
      </div>

      <div className="footer-right">
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
