import { useState } from "react";

import AddAuxItemBtn from "./AddAuxItemBtn";
import NewPromptForm from "./NewPromptForm";

export default function CustomPrompts() {
  const [showNewPromptForm, setShowNewPromptForm] = useState(false);

  return (
    <section id="note-detail-modal-container">
      <div id="note-detail-modal-content">
        <div id="note-detail-modal-text">
          <h2>custom prompts</h2>
          {showNewPromptForm ? (
            <NewPromptForm setShowNewPromptForm={setShowNewPromptForm} />
          ) : (
            <AddAuxItemBtn
              onClick={() => setShowNewPromptForm(true)}
              text="new prompt"
            />
          )}
        </div>
      </div>
    </section>
  );
}
