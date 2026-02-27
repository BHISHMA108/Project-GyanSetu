import React, { useState } from "react";
import { Timeline } from "../../ui/timeline2.jsx";
import { motion } from "framer-motion";

const SikhGurusTimeline = () => {
  const [hoveredGuru, setHoveredGuru] = useState(null);

  const gurus = [
  {
    title: "Guru Nanak Dev Ji (1469-1539)",
    description: "Founder of Sikhism, emphasized the oneness of God, equality, and the importance of truthful living.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775328/9_gmqvtr.jpg",
  },
  {
    title: "Guru Angad Dev Ji (1504-1552)",
    description: "Developed Gurmukhi script, emphasized physical fitness, and continued Guru Nanak's teachings.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775314/1_mft2vv.jpg",
  },
  {
    title: "Guru Amar Das Ji (1479-1574)",
    description: "Started the tradition of Langar (community kitchen) and promoted social equality.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775315/2_qo1ami.jpg",
  },
  {
    title: "Guru Ram Das Ji (1534-1581)",
    description: "Founded the city of Amritsar and composed many hymns in Guru Granth Sahib.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775315/3_ap0j3w.jpg",
  },
  {
    title: "Guru Arjan Dev Ji (1563-1606)",
    description: "Compiled the Adi Granth, built Harmandir Sahib (Golden Temple), and was martyred for his faith.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775315/4_egcsf2.jpg",
  },
  {
    title: "Guru Hargobind Ji (1595-1644)",
    description: "Introduced the concept of Miri and Piri (spiritual and temporal authority), established Akal Takht.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775315/5_ypblmo.jpg",
  },
  {
    title: "Guru Har Rai Ji (1630-1661)",
    description: "Promoted environmental consciousness, maintained Sikh military strength, and continued Guru Nanak's teachings.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775315/6_utwdmj.jpg",
  },
  {
    title: "Guru Har Krishan Ji (1656-1664)",
    description: "Known as the child Guru, served humanity by curing the sick during a smallpox epidemic.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775316/7_iwxe3d.jpg",
  },
  {
    title: "Guru Tegh Bahadur Ji (1621-1675)",
    description: "Sacrificed his life to protect religious freedom, martyred by the Mughal emperor Aurangzeb.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775320/8_atezu7.jpg",
  },
  {
    title: "Guru Gobind Singh Ji (1666-1708)",
    description: "Founded the Khalsa, gave Sikhs their identity, and declared Guru Granth Sahib as the eternal Guru.",
    image: "https://res.cloudinary.com/dst3yuj1w/image/upload/v1771775328/10_nasj4b.jpg",
  },
];


  return (
    <div className="w-full">
      <Timeline
        data={gurus.map((guru) => ({
          title: guru.title,
          content: (
            <div
              onMouseEnter={() => setHoveredGuru(guru.title)}
              onMouseLeave={() => setHoveredGuru(null)}
              className="relative w-full"
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: hoveredGuru === guru.title ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
       
                <img
                  src={`${guru.image}`}
                  alt={guru.title}
                  className="translate-x-[5rem] rounded-lg object-cover h-44 md:h-64 lg:h-80 w-auto shadow-lg"
                />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredGuru === guru.title ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full p-4 bg-white dark:bg-black rounded-lg shadow-lg"
              >
                <h3 className="text-3xl font-semibold text-center">{guru.title}</h3>
                <p className="text-lg text-justify mt-2">{guru.description}</p>
              </motion.div>
            </div>
          ),
        }))}
      />
    </div>
  );
};

export default SikhGurusTimeline;