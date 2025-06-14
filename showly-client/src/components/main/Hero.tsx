import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BackgroundCarousel } from "../BackgroundCarousel";
import { SignInButtonWithGoogle } from "./hero/SignInButtonWithGoogle";
import { toast } from "sonner";
import { useLanguageContext } from "@/context/LanguageContext";
import { TrendingProvider } from "@/context/TrendingContext";

const BACKDROP_IMG_URL = import.meta.env.VITE_BACKDROP_IMG_URL;

export const Hero = () => {
  // const [topRatedData, setTopRatedData] = useState<TopRatedData[]>([]);
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState<number>(0);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const { t } = useLanguageContext();

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   // const updateCurrent = () => {
  //   //   setCurrent(api.selectedScrollSnap() + 1);
  //   // };

  //   // updateCurrent();

  //   // api.on("select", updateCurrent);
  // }, [api]);

  return (
    <>
    <TrendingProvider>
      <BackgroundCarousel
        backdropImgUrl={BACKDROP_IMG_URL}
      />
    </TrendingProvider>

      <section className="flex flex-col gap-5 justify-center items-start px-40 absolute bottom-40">
        <h1 className="text-6xl font-semibold font-dela">{t("welcome")}</h1>

        <p className="text-white text-lg">{t("description")}</p>

        <div className="flex flex-row gap-5">
          <SignInButtonWithGoogle />

          <Dialog onOpenChange={setSignUpOpen} open={signUpOpen}>
            <DialogTrigger className="rounded-lg px-3 bg-background text-foreground text-sm font-semibold cursor-pointer">
              {t("signUpBtn")}
            </DialogTrigger>
            <DialogContent className="bg-primary-500 text-neutral-100">
              <DialogHeader>
                <DialogTitle>{t("signUpTitle")}</DialogTitle>
                <DialogDescription>
                  <p>{t("signUpSubtitle")}</p>

                  <SignUpForm setOpen={setSignUpOpen} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog onOpenChange={setSignInOpen} open={signInOpen}>
            <DialogTrigger className="border rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer">
              {t("signInBtn")}
            </DialogTrigger>
            <DialogContent className="bg-primary-500 text-neutral-100">
              <DialogHeader>
                <DialogTitle>{t("signInTitle")}</DialogTitle>
                <DialogDescription>
                  <p>{t("signInSubtitle")}</p>

                  <SignInForm setOpen={setSignInOpen} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
import {
  updateSignUpFields,
  updateSignInFields,
  clearFields,
} from "@/state/form/formSlice";
import { AuthFormState } from "@/types/auth";
import { createUserWithEmailAndPassword, fetchSignIn } from "@/services/auth";

const SignUpForm = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { t } = useLanguageContext();

  const authFormState = useSelector((state: RootState) => state.authForm);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      updateSignUpFields({
        field: name as keyof AuthFormState["signUp"],
        value,
      })
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(authFormState);
    toast.success("User created successfully");
    dispatch(clearFields());
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <CustomFormItem
                label={t("signEmail")}
                placeholder={t("signEmailPlaceholder")}
                name="email"
                type="text"
                signUpField={field}
                onChange={handleChange}
                value={authFormState.signUp.email}
              />

              <CustomFormItem
                label={t("signPassword")}
                name="password"
                placeholder={t("signPasswordPlaceholder")}
                type="password"
                signUpField={field}
                onChange={handleChange}
                value={authFormState.signUp.password}
              />

              <CustomFormItem
                label={t("signUpPasswordConfirmation")}
                name="passwordConfirmation"
                placeholder={t("signUpPasswordConfirmationPlaceholder")}
                type="password"
                signUpField={field}
                value={authFormState.signUp.passwordConfirmation}
                onChange={handleChange}
              />

              <CustomFormItem
                label={t("signUpUsername")}
                name="username"
                placeholder={t("signUpUsernamePlaceholder")}
                type="text"
                signUpField={field}
                onChange={handleChange}
                value={authFormState.signUp.username}
              />
            </>
          )}
        />
        <Button
          className="bg-neutral-100 text-neutral-900 cursor-pointer"
          type="submit"
        >
          {t("signUpBtn")}
        </Button>
      </form>
    </Form>
  );
};

const SignInForm = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { t } = useLanguageContext();
  const nav = useNavigate();

  const authFormState = useSelector((state: RootState) => state.authForm);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      updateSignInFields({
        field: name as keyof AuthFormState["signIn"],
        value,
      })
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = authFormState.signIn;

    signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();

        await fetchSignIn({ token, nav, t });
      }
    );

    dispatch(clearFields());
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <CustomFormItem
              label={t("signEmail")}
              name="email"
              placeholder={t("signEmailPlaceholder")}
              type="text"
              signInField={field}
              onChange={handleChange}
              value={authFormState.signIn.email}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <CustomFormItem
              label={t("signPassword")}
              name="password"
              placeholder={t("signPasswordPlaceholder")}
              type="password"
              signInField={field}
              onChange={handleChange}
              value={authFormState.signIn.password}
            />
          )}
        />

        <Button
          className="bg-neutral-100 text-neutral-900 cursor-pointer"
          type="submit"
        >
          {t("signInBtn")}
        </Button>
      </form>
    </Form>
  );
};

import { CustomFormItemProps } from "@/types/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/auth";
import { useNavigate } from "react-router";

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
        className="bg-neutral-100 text-neutral-900 border-none  focus-visible:outline-none focus-visible:ring-[0px]"
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
