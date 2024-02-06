import { motion, AnimatePresence } from "framer-motion";

export default function UserMessages({ messages }) {
  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.1 }}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="user-message-container"
      >
        <p className="user-message-content">{messages}</p>
      </motion.div>
    </AnimatePresence>
  );
}
