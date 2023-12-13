import Button from "./Button.js";

export default function Header({ title, onListClick, showListIcon, listIcon }) {
  return (
    <header>
      <h1>{title}</h1>
      {showListIcon === true && (
        <div className="list-view-btn-container">
          <Button icon={listIcon} onClick={onListClick} />
        </div>
      )}
    </header>
  );
}
