import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import { usePage } from "@inertiajs/react"

// const items = [
//   { name: "Theses", image: "/assets/demo-images/rule-images/image2.webp" },
//   { name: "E-Publications", image: "/assets/demo-images/rule-images/image3.webp" },
//   { name: "Audios", image: "/assets/demo-images/rule-images/image2.webp" },
//   { name: "Journals", image: "/assets/demo-images/rule-images/image3.webp" },
//   { name: "Videos", image: "/assets/demo-images/rule-images/image2.webp" },
//   // Add more items here if needed
// ]

const MyDatabase = () => {
  const { dataBase } = usePage().props;
  return (
    <div className="max-w-screen-2xl mx-auto px-3 lg:px-20 mt-10">
       <div className="flex">
        <h2
          className="text-xl md:text-2xl text-center lg:text-2xl text-black my-5 tracking-wide 
          after:content-[''] after:block after:w-24 md:after:w-32 after:h-1 after:bg-red-500 
          after:mx-auto after:mt-2 after:transition-all after:duration-300 
          hover:after:w-28 md:hover:after:w-36"
        >
          Our Databases
        </h2>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {dataBase?.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Card className="bg-slate-400 border-dashed hover:cursor-pointer text-white hover:text-black hover:bg-white transition-colors duration-300">
                <CardContent className="flex flex-col items-center justify-center">
                  <img
                    src={`/assets/images/links/${item.image}`}
                    className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] mb-2 object-cover"
                    alt={item.title}
                  />
                  <p className="text-center text-[12px] md:text-sm">{item.title}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MyDatabase
