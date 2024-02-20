import { motion } from "framer-motion";

import MicrophoneIcon from "../assets/custom_icons/MicrophoneIcon";

/**
 * Renders a rotating loading spinner.
 */
export default function LoadingSpinner() {
  return (
    <div className="loader-spinner-container">
      <motion.div
        className="loader-spinner"
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
      >
        <MicrophoneIcon />
      </motion.div>
    </div>
  );
}
