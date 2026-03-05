import React, { useState } from "react";
import { Timeline } from "../../ui/timeline.jsx";
import { motion } from "framer-motion";

const TimeLineDemo = () => {
  const [hoveredYug, setHoveredYug] = useState(null);

  const yugs = [
    {
      title: "Satyug",
      avatars: [
        {
          name: "Matsya",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707357/matsya_vd4j45.webp",
          description:
            "The first incarnation of Vishnu as a giant golden fish. He appeared to King Manu and warned him about an impending pralaya (great flood) that would submerge the world. Matsya instructed Manu to build a massive boat and gather the seven sages, seeds of plants, and living beings."
        },
        {
          name: "Kurma",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707349/kurma_a1xt0p.webp",
          description:
            "Vishnu took the form of a colossal tortoise to assist in the churning of the ocean (Samudra Manthan). He supported Mount Mandara on his back so the Devas and Asuras could churn the ocean to obtain Amrit."
        },
        {
          name: "Varah",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707368/varah_vp9bsv.webp",
          description:
            "When the demon Hiranyaksha submerged Earth in the cosmic ocean, Vishnu appeared as a mighty boar. Varah defeated the demon and lifted the Earth on his tusks, restoring balance to the universe."
        },
        {
          name: "Narsimha",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707360/narsimha_qh9cpt.webp",
          description:
            "To protect Prahlad and defeat the tyrant Hiranyakashipu, Vishnu took the form of half-man half-lion. Appearing at twilight on a palace threshold, he destroyed the demon without breaking the boon conditions."
        }
      ]
    },

    {
      title: "Tretayug",
      avatars: [
        {
          name: "Vaman",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707364/vaman_pnnsem.webp",
          description:
            "The dwarf Brahmin avatar of Vishnu appeared before King Bali and asked for three steps of land. Expanding to cosmic size, he covered earth and heaven in two steps and Bali offered his head for the third."
        },
        {
          name: "Parshuram",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707356/parshuram_xoe3h9.webp",
          description:
            "A warrior sage with an axe gifted by Shiva. Parshuram fought corrupt Kshatriya rulers and restored dharma. He also trained warriors like Bhishma, Dronacharya and Karna."
        },
        {
          name: "ShriRam",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707362/shriram_jvsy76.webp",
          description:
            "Prince of Ayodhya and hero of the Ramayana. During his exile his wife Sita was abducted by Ravana. With the help of Hanuman and the Vanara army he defeated Ravana and restored dharma."
        }
      ]
    },

    {
      title: "Dwaparyug",
      avatars: [
        {
          name: "ShriKrishna",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707360/shrikrishna_nd5u8o.webp",
          description:
            "Divine teacher and strategist of the Mahabharata. Krishna guided Arjuna and delivered the Bhagavad Gita. His life includes divine acts like lifting Govardhan hill and defeating Kansa."
        }
      ]
    },

    {
      title: "Kalyug",
      avatars: [
        {
          name: "BhagwanBuddha",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707354/bhagwanbuddha_bxx6yh.webp",
          description:
            "Born as Siddhartha Gautama, he attained enlightenment under the Bodhi tree and taught the Four Noble Truths and the Eightfold Path, guiding humanity toward wisdom and compassion."
        },
        {
          name: "Kalki",
          image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1772707352/kalki_mil9mp.webp",
          description:
            "The final avatar of Vishnu who will appear at the end of Kalyug riding a white horse and wielding a blazing sword to destroy evil and restore dharma."
        }
      ]
    }
  ];

  return (
    <div className="w-full">
      <Timeline
        data={yugs.map((yug) => ({
          title: yug.title,
          content: (
            <div
              onMouseEnter={() => setHoveredYug(yug.title)}
              onMouseLeave={() => setHoveredYug(null)}
              className="relative w-full"
            >
              {/* Images */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: hoveredYug === yug.title ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-2 gap-4"
              >
                {yug.avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar.image}
                    alt={avatar.name}
                    className="rounded-lg object-cover h-20 md:h-44 lg:h-100 w-full shadow-lg"
                  />
                ))}
              </motion.div>

              {/* Avatar Names & Descriptions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredYug === yug.title ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full p-4 bg-white dark:bg-black rounded-lg shadow-lg"
              >
                {yug.avatars.map((avatar, index) => (
                  <div key={index} className="mb-2 text-center">
                    <h3 className="text-3xl font-semibold">{avatar.name}</h3>
                    <p className="text-lg text-justify">{avatar.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          )
        }))}
      />
    </div>
  );
};

export default TimeLineDemo;