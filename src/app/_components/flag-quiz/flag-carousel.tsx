import Image from "next/image";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { type CarouselApi } from "~/components/ui/carousel";

interface Flag {
  country_id: number;
  name: string;
  flag_url: string;
}

interface FlagCarouselProps {
  countryFlags: Flag[];
  setApi: (api: CarouselApi) => void;
  api: CarouselApi;
  setCurrentFlagIndex: (index: number) => void;
}

export function FlagCarousel({
  countryFlags,
  setApi,
  api,
  setCurrentFlagIndex,
}: FlagCarouselProps) {
  useEffect(() => {
    if (!api) return;
    setCurrentFlagIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrentFlagIndex(api.selectedScrollSnap() + 1);
    });
  }, [api, setCurrentFlagIndex]);

  return (
    <Carousel setApi={setApi} className="h-1/2 items-center justify-center">
      <CarouselPrevious>Previous</CarouselPrevious>
      <CarouselContent>
        {countryFlags.map((country) => (
          <CarouselItem
            key={country.country_id}
            className="relative flex h-full min-h-64 w-full items-center justify-center"
          >
            <Image
              src={country.flag_url}
              alt={country.name}
              layout="fill"
              objectFit="contain"
              className="align-middle"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext>Next</CarouselNext>
    </Carousel>
  );
}
