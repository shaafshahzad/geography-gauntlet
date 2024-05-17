import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { type CarouselApi } from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";

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
  const [loadedFlags, setLoadedFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!api) return;
    setCurrentFlagIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrentFlagIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleImageLoad = (countryId: string) => {
    setLoadedFlags((prevState) => ({
      ...prevState,
      [countryId]: true,
    }));
  };

  return (
    <Carousel setApi={setApi} className="h-1/2">
      <CarouselPrevious>Previous</CarouselPrevious>
      <CarouselContent>
        {countryFlags.map((country) => (
          <CarouselItem
            key={country.country_id}
            className="flex items-center justify-center"
          >
            {!loadedFlags[country.country_id] && (
              <Skeleton className="h-auto w-auto align-middle" />
            )}
            <Image
              src={country.flag_url}
              alt={country.name}
              width={750}
              height={750}
              className="h-auto w-auto align-middle"
              onLoad={() => handleImageLoad(country.country_id)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext>Next</CarouselNext>
    </Carousel>
  );
}
