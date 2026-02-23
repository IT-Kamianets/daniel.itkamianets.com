import { motion } from "motion/react";

export default function SectionSeparator() {
  return (
    <div className="w-full flex justify-center items-center py-0 bg-transparent overflow-hidden">
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent max-w-7xl w-full"
      ></motion.div>
    </div>
  );
}
