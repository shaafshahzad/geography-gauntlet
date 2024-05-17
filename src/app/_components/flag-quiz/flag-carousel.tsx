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
  country_id: string;
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
  }, [api]);

  return (
    <Carousel setApi={setApi} className="h-1/2">
      <CarouselPrevious>Previous</CarouselPrevious>
      <CarouselContent>
        {countryFlags.map((country) => (
          <CarouselItem
            key={country.country_id}
            className="flex items-center justify-center"
          >
            <Image
              src={country.flag_url}
              alt={country.name}
              width={750}
              height={750}
              className="h-auto w-auto align-middle"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext>Next</CarouselNext>
    </Carousel>
  );
}
