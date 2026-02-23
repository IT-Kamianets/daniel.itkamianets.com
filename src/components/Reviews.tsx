import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Олександр М.",
    text: "Найкраща піца в Кам'янці! Справжня неаполітанська, тісто просто тане в роті. Дуже атмосферний заклад.",
    rating: 5,
  },
  {
    id: 2,
    name: "Марія К.",
    text: "Чудове місце для сімейної вечері. Обслуговування на вищому рівні, а інтер'єр дуже затишний. Обов'язково повернемося!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ігор В.",
    text: "Дуже смачно! Замовляли піцу та пасту — все ідеально. Ціни відповідають якості. Рекомендую всім друзям.",
    rating: 5,
  },
  {
    id: 4,
    name: "Анна С.",
    text: "Прекрасний вибір вин і неймовірна піца з дров'яної печі. Офіціанти дуже привітні та допомогли з вибором.",
    rating: 5,
  },
  {
    id: 5,
    name: "Дмитро П.",
    text: "Завжди замовляємо тут доставку. Привозять швидко, піца гаряча. Дуже подобається 'Чотири сири'.",
    rating: 5,
  },
  {
    id: 6,
    name: "Олена Т.",
    text: "Дуже затишно, смачна кава і десерти. Піца - топ! Рекомендую спробувати з грушею і горгонзолою.",
    rating: 5,
  },
  {
    id: 7,
    name: "Сергій Л.",
    text: "Чудовий заклад, приємна атмосфера. Піца як в Італії. Дякую за гарний вечір!",
    rating: 5,
  },
  {
    id: 8,
    name: "Вікторія Р.",
    text: "Найсмачніша піца в місті! Тісто тоненьке, начинки багато. Дуже привітний персонал.",
    rating: 5,
  },
  {
    id: 9,
    name: "Андрій К.",
    text: "Гарне місце для зустрічі з друзями. Смачна кухня, гарний вибір напоїв. Рекомендую!",
    rating: 5,
  },
  {
    id: 10,
    name: "Наталія Б.",
    text: "Дуже сподобалася піца з морепродуктами. Свіжі інгредієнти, чудовий смак. Обов'язково прийдемо ще.",
    rating: 5,
  },
  {
    id: 11,
    name: "Максим Д.",
    text: "Швидка подача, смачна їжа. Ціни помірні. Дуже задоволені відвідуванням.",
    rating: 5,
  },
  {
    id: 12,
    name: "Юлія В.",
    text: "Прекрасний інтер'єр, дуже чисто і охайно. Піца - просто космос! Дякую кухарям.",
    rating: 5,
  },
  {
    id: 13,
    name: "Олег Г.",
    text: "Затишне місце, смачна їжа. Дуже сподобалася атмосфера. Рекомендую для романтичної вечері.",
    rating: 5,
  },
  {
    id: 14,
    name: "Тетяна М.",
    text: "Найкраща піцерія в місті! Завжди свіжа і смачна піца. Дуже ввічливий персонал.",
    rating: 5,
  },
  {
    id: 15,
    name: "Володимир С.",
    text: "Чудовий заклад! Смачна кухня, гарне обслуговування. Обов'язково завітаємо ще.",
    rating: 5,
  },
];

export default function Reviews() {
  const { t } = useLanguage();

  return (
    <section
      id="reviews"
      className="py-10 md:py-16 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("reviewsTitle")}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex gap-4 md:gap-6 animate-scroll hover:pause-scroll w-max">
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[260px] md:w-[350px] flex-shrink-0 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl md:rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-lg"
            >
              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-orange-500 text-orange-500 md:w-4 md:h-4"
                  />
                ))}
              </div>
              <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-serif italic mb-4 md:mb-6 line-clamp-4">
                "{review.text.replace(/—/g, "-")}"
              </p>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs md:text-sm uppercase tracking-wider">
                {review.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
