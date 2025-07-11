import React from "react";
import { motion } from "framer-motion";

const LoteriaResultados = () => {
  const numerosGanadores = [15, 23, 42, 58, 73];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Header */}
      <header className="text-center">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Resultados de la Lotería
        </motion.h1>
        <motion.p
          className="mt-2 text-base sm:text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sorteo del{" "}
          <span className="font-semibold text-gray-900">15 de Julio, 2025</span>
        </motion.p>
      </header>

      {/* Winning Numbers */}
      <section className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <motion.h2
          className="text-xl sm:text-2xl font-semibold text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Números Ganadores
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {numerosGanadores.map((numero, index) => (
            <motion.div
              key={index}
              className="bg-blue-600 text-white py-3 px-7 rounded-full text-2xl sm:text-3xl font-bold shadow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15 * index,
                type: "spring",
                stiffness: 100,
              }}
              aria-label={`Número ganador: ${numero}`}
            >
              {numero}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-lg text-gray-700 font-medium">
            Premio Mayor:{" "}
            <span className="text-blue-700 font-bold">$500,000</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Fecha del sorteo: 15 Julio, 2025
          </p>
        </motion.div>
      </section>

      {/* Action Button */}
      <div className="text-center">
        <motion.button
          type="button"
          className="inline-block px-8 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 rounded-full shadow transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          onClick={() => alert("Próximamente: Resultados anteriores")}
        >
          Ver Resultados Anteriores
        </motion.button>
      </div>
    </div>
  );
};

export default LoteriaResultados;
