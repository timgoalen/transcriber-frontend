import Button from "./Button.js";

export default function Header({ title, onNavIconClick, showNavIcon, navIcon }) {
  return (
    <header>
      <h1>{title}</h1>
      {showNavIcon === true && (
        <div className="list-view-btn-container">
          <Button icon={navIcon} onClick={onNavIconClick} />
        </div>
      )}
    </header>
  );
}
