import React from "react";
import { motion } from "framer-motion";

const steps = ["Choose Numbers", "Review Order", "Payment", "Success"];

const PaymentProgressBar = ({ currentStep }) => {
    return (
        <div className="w-fit max-w-xl mx-auto flex items-center justify-between ">
            {steps.map((step, idx) => (
                <React.Fragment key={step}>
                    <motion.div
                        initial={false}
                        animate={currentStep >= idx ? { scale: 1.15, backgroundColor: "#FFD700", color: "#232946" } : { scale: 1, backgroundColor: "#e5e7eb", color: "#a1a1aa" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 border-zinc-200"
                    >
                        {idx + 1}
                    </motion.div>
                    {idx < steps.length - 1 && (
                        <motion.div
                            initial={false}
                            animate={currentStep > idx ? { backgroundColor: "#FFD700", scaleX: 1.1 } : { backgroundColor: "#e5e7eb", scaleX: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="h-2 w-12 rounded-full mx-2"
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PaymentProgressBar;
