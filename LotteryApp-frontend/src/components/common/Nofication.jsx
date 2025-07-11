import { motion, AnimatePresence } from "motion/react"

const Notification = ({ message, show, type = "info", onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            fixed top-6 left-1/2 -translate-x-1/2 z-50
            px-6 py-3 rounded-lg shadow-lg flex items-center gap-2
            ${type === "success" ? "bg-green-500 text-white" : ""}
            ${type === "error" ? "bg-red-500 text-white" : ""}
            ${type === "info" ? "bg-[#232946] text-white" : ""}
          `}
        >
          <span>{message}</span>
          {onClose && (
            <button
              className="ml-4 text-lg font-bold focus:outline-none"
              onClick={onClose}
              aria-label="Close notification"
            >
              ×
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notification