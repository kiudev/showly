import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getTopRatedSeries, getTrendingSeries } from "@/services/seriesService";
import { TopRatedData, TrendingData } from "@/types/seriesDataTypes";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BackgroundCarousel } from "../BackgroundCarousel";
import { SignInButton } from "./hero/SignInButton";
import { toast } from "sonner";

const BACKDROP_IMG_URL = import.meta.env.VITE_BACKDROP_IMG_URL;
const POSTER_IMG_URL = import.meta.env.VITE_POSTER_IMG_URL;

export const Hero = () => {
  const [trendingData, setTrendingData] = useState<TrendingData>({
    results: [],
  });
  const [topRatedData, setTopRatedData] = useState<TopRatedData[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getSeriesData = async () => {
      const trendingFunc = await getTrendingSeries();
      setTrendingData(trendingFunc);

      const topRatedFunc = await getTopRatedSeries();
      setTopRatedData(topRatedFunc);
    };

    getSeriesData();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCurrent();

    api.on("select", updateCurrent);
  }, [api]);

  return (
    <>
      <BackgroundCarousel
        trendingData={trendingData}
        backdropImgUrl={BACKDROP_IMG_URL}
      />

      <section className="absolute inset-0 flex flex-row justify-between items-center gap-20 w-[1400px] m-auto">
        <div className="w-[50%] flex flex-col gap-5 justify-center items-start">
          <h1 className="text-6xl font-semibold">
            Stay tuned with your favorites TV series
          </h1>

          <p className="text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit sit
            consequatur sed accusantium fuga possimus illo, architecto adipisci
            dicta, mollitia maxime labore repudiandae ipsum ipsam dolorum
            tempore et laboriosam neque!
          </p>
          <SignInButton />

          <div className="flex flex-row gap-5">
            <Dialog onOpenChange={setOpen} open={open}>
              <DialogTrigger className="border rounded-lg px-3 text-sm font-semibold cursor-pointer">
                Join Us
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Sign up to Showly</DialogTitle>
                  <DialogDescription>
                    <p>
                      Create an account to enjoy all the features of Showly.
                    </p>

                    <SignUpForm setOpen={setOpen}/>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button variant="outline">Sign In</Button>
          </div>
        </div>

        <div>
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="flex flex-row items-center">
              {topRatedData.map((data, index) => (
                <CarouselItem className={`w-14 h-full basis-1/3`} key={data.id}>
                  <img
                    className={`h-full rounded-lg ${
                      current !== index + 1
                        ? "m-auto blur-[1px] w-32 object-cover"
                        : "w-full"
                    }`}
                    src={POSTER_IMG_URL + data.poster_path}
                    alt=""
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </>
  );
};

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { updateFields, clearFields } from "@/state/form/formSlice";
import { FormState } from "@/types/form";
import { createUserWithEmailAndPassword } from "@/services/auth";

const SignUpForm = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const formState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFields({ field: name as keyof FormState, value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(formState);
    toast.success("User created successfully");
    dispatch(clearFields())
    setOpen(false)
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <CustomFormItem
                label="Email"
                placeholder="Email"
                name="email"
                type="text"
                field={field}
                onChange={handleChange}
                value={formState.email}
              />

              <CustomFormItem
                label="Password"
                name="password"
                placeholder="Password"
                type="text"
                field={field}
                onChange={handleChange}
                value={formState.password}
              />

              <CustomFormItem
                label="Password Confirmation"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                type="text"
                field={field}
                value={formState.passwordConfirmation}
                onChange={handleChange}
              />

              <CustomFormItem
                label="Username"
                name="username"
                placeholder="Username"
                type="text"
                field={field}
                onChange={handleChange}
                value={formState.username}
              />
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

import { CustomFormItemProps } from "@/types/form";

const CustomFormItem = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  name,
}: CustomFormItemProps) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </FormControl>
    <FormMessage />
  </FormItem>
);
