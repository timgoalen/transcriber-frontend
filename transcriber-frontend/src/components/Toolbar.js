import Button from "./Button.js";

export default function Toolbar({
  tool1Name,
  tool1Icon,
  tool1OnClick,
  tool2Name,
  tool2Icon,
  tool2OnClick,
}) {
  return (
    <section className="toolbar">
      <div className="footer-left">
        <Button name={tool1Name} icon={tool1Icon} onClick={tool1OnClick} />
      </div>

      <div className="footer-right">
        <Button name={tool2Name} icon={tool2Icon} onClick={tool2OnClick} />
      </div>
    </section>
  );
}
