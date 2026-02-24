import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: { uk: "Олександр М.", en: "Alexander M." },
    text: {
      uk: "Найкраща піца в Кам'янці! Справжня неаполітанська, тісто просто тане в роті. Дуже атмосферний заклад.",
      en: "The best pizza in Kamianets! Authentic Neapolitan, the dough just melts in your mouth. Very atmospheric place.",
    },
    rating: 5,
  },
  {
    id: 2,
    name: { uk: "Марія К.", en: "Maria K." },
    text: {
      uk: "Чудове місце для сімейної вечері. Обслуговування на вищому рівні, а інтер'єр дуже затишний. Обов'язково повернемося!",
      en: "A great place for a family dinner. Service is top-notch, and the interior is very cozy. We will definitely be back!",
    },
    rating: 5,
  },
  {
    id: 3,
    name: { uk: "Ігор В.", en: "Igor V." },
    text: {
      uk: "Дуже смачно! Замовляли піцу та пасту — все ідеально. Ціни відповідають якості. Рекомендую всім друзям.",
      en: "Very delicious! We ordered pizza and pasta — everything was perfect. Prices match the quality. I recommend it to all my friends.",
    },
    rating: 5,
  },
  {
    id: 4,
    name: { uk: "Анна С.", en: "Anna S." },
    text: {
      uk: "Прекрасний вибір вин і неймовірна піца з дров'яної печі. Офіціанти дуже привітні та допомогли з вибором.",
      en: "A wonderful choice of wines and incredible pizza from a wood-fired oven. The waiters are very friendly and helped with the choice.",
    },
    rating: 5,
  },
  {
    id: 5,
    name: { uk: "Дмитро П.", en: "Dmytro P." },
    text: {
      uk: "Завжди замовляємо тут доставку. Привозять швидко, піца гаряча. Дуже подобається 'Чотири сири'.",
      en: "We always order delivery here. It's delivered quickly, and the pizza is hot. I really like 'Quattro Formaggi'.",
    },
    rating: 5,
  },
  {
    id: 6,
    name: { uk: "Олена Т.", en: "Olena T." },
    text: {
      uk: "Дуже затишно, смачна кава і десерти. Піца - топ! Рекомендую спробувати з грушею і горгонзолою.",
      en: "Very cozy, delicious coffee and desserts. Pizza is top! I recommend trying the one with pear and gorgonzola.",
    },
    rating: 5,
  },
  {
    id: 7,
    name: { uk: "Сергій Л.", en: "Serhiy L." },
    text: {
      uk: "Чудовий заклад, приємна атмосфера. Піца як в Італії. Дякую за гарний вечір!",
      en: "A great place, pleasant atmosphere. Pizza like in Italy. Thanks for a nice evening!",
    },
    rating: 5,
  },
  {
    id: 8,
    name: { uk: "Вікторія Р.", en: "Victoria R." },
    text: {
      uk: "Найсмачніша піца в місті! Тісто тоненьке, начинки багато. Дуже привітний персонал.",
      en: "The most delicious pizza in the city! The dough is thin, and there's plenty of topping. Very friendly staff.",
    },
    rating: 5,
  },
  {
    id: 9,
    name: { uk: "Андрій К.", en: "Andriy K." },
    text: {
      uk: "Гарне місце для зустрічі з друзями. Смачна кухня, гарний вибір напоїв. Рекомендую!",
      en: "A nice place to meet friends. Delicious cuisine, a good selection of drinks. Recommended!",
    },
    rating: 5,
  },
  {
    id: 10,
    name: { uk: "Наталія Б.", en: "Natalia B." },
    text: {
      uk: "Дуже сподобалася піца з морепродуктами. Свіжі інгредієнти, чудовий смак. Обов'язково прийдемо ще.",
      en: "I really liked the seafood pizza. Fresh ingredients, great taste. We will definitely come back.",
    },
    rating: 5,
  },
  {
    id: 11,
    name: { uk: "Максим Д.", en: "Maxim D." },
    text: {
      uk: "Швидка подача, смачна їжа. Ціни помірні. Дуже задоволені відвідуванням.",
      en: "Fast service, delicious food. Prices are reasonable. Very satisfied with the visit.",
    },
    rating: 5,
  },
  {
    id: 12,
    name: { uk: "Юлія В.", en: "Julia V." },
    text: {
      uk: "Прекрасний інтер'єр, дуже чисто і охайно. Піца - просто космос! Дякую кухарям.",
      en: "A beautiful interior, very clean and tidy. Pizza is just out of this world! Thanks to the chefs.",
    },
    rating: 5,
  },
  {
    id: 13,
    name: { uk: "Олег Г.", en: "Oleh H." },
    text: {
      uk: "Затишне місце, смачна їжа. Дуже сподобалася атмосфера. Рекомендую для романтичної вечері.",
      en: "A cozy place, delicious food. I really liked the atmosphere. Recommended for a romantic dinner.",
    },
    rating: 5,
  },
  {
    id: 14,
    name: { uk: "Тетяна М.", en: "Tetiana M." },
    text: {
      uk: "Найкраща піцерія в місті! Завжди свіжа і смачна піца. Дуже ввічливий персонал.",
      en: "The best pizzeria in the city! Always fresh and delicious pizza. Very polite staff.",
    },
    rating: 5,
  },
  {
    id: 15,
    name: { uk: "Володимир С.", en: "Volodymyr S." },
    text: {
      uk: "Чудовий заклад! Смачна кухня, гарне обслуговування. Обов'язково завітаємо ще.",
      en: "A wonderful place! Delicious cuisine, good service. We will definitely visit again.",
    },
    rating: 5,
  },
];

export default function Reviews() {
  const { t, language } = useLanguage();

  return (
    <section
      id="reviews"
      className="py-10 md:py-16 bg-white dark:bg-zinc-950 relative overflow-hidden"
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
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex gap-4 md:gap-6 animate-scroll hover:pause-scroll w-max">
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[260px] md:w-[350px] flex-shrink-0 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl md:rounded-3xl border border-zinc-100 dark:border-zinc-800"
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
                "{review.text[language as keyof typeof review.text].replace(/—/g, "-")}"
              </p>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs md:text-sm uppercase tracking-wider">
                {review.name[language as keyof typeof review.name]}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
