/**
 * Renders a confirmation prompt to the user when they try to delete a folder.
 */
export default function DeleteFolderConfirmationPrompt({
  folderTitle,
  setShowDeleteConfirmation,
  deleteFolder,
}) {
  return (
    <div className="delete-folder-confirmation-container">
      <div className="delete-folder-confirmation-content">
        <p>delete the folder '{folderTitle}' and all of its contents?</p>
        <div>
          <button
            onClick={() => deleteFolder()}
            className="delete-folder-confirmation-btn"
            id="confirm-delete"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="delete-folder-confirmation-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
