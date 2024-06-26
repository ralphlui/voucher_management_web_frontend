"use client";
import React, { useState } from "react";
import Heading from "../common/Heading";
import Input from "../common/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { registerUser } from "@/app/service/authentication";
import ListBox from "../common/ListBox";
import { CustomFilterTypeProps } from "@/type/customListBox";
import { isValidateEmail } from "@/utils";

const RegisterForm = () => {

  const userTypes: CustomFilterTypeProps[] = [
    { id: "0", value: "Choose user type" },
    { id: "1", value: "CUSTOMER" },
    { id: "2", value: "MERCHANT" },
  ];

  const [selectedUserType, setSelectedUserType] = useState(userTypes[0]);
  const [image, setImage] = useState<File>();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm<FieldValues>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        role: "",
      },
    });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    data.role = selectedUserType.value.toUpperCase();

    try {

      if (!isValidateEmail(data.email)) {
        alert("Please provide valid email");
        return;
      }
      if (selectedUserType.id == "0") {
        alert("Please choose user type");
        return;
      }

      if (data.password !== data.confirmPassword) {
        alert("Password and confirm password should be same");
        return;
      }

      registerUser(data.email, data.name, data.password, data.role).then(
        (callback) => {

          const { message, result } = callback;

          if (result.length > 0) {
            toast.success('Account created');
            toast.loading('Please verify your email!');
            router.push('/components/login');
            // signIn('credentials', {
            //   email: data.email,
            //   password: data.password,
            //   redirect: false,
            // }).then((callback) => {

            //   if (callback?.ok) {
            //     router.push('/');
            //     router.refresh();
            //     toast.success('Logged In');
            //   }

            //   if (callback?.error) {
            //     toast.error("Logged In failed.");
            //   }
            // });
          } else {
            toast.error(message);
          }
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImage(file);
  };

  return (
    <>
      <div data-testid="register-page" />
      <Heading title={"Welcome to IV Voucher Management"} center={true} />
      <hr className="bg-slate-300 w-full h-px" />
      <Input testId="name-textField-id" id="name" label="Name" disabled={isLoading} placeholder="" register={register} errors={errors} required />
      <Input testId="email-textField-id" id="email" label="Email" disabled={isLoading} placeholder="" register={register} errors={errors} required />
      <Input
        testId="password-textField-id"
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        placeholder=""
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <Input
        id="confirmPassword"
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        placeholder=""
      />

      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}

      {/* this is for dropdown error handling to show with red border if the user select nothing */}
      {/* <CustomListBox id="callCustomList" register={register}  errors={errors}
                required
          setFilter={setSelectedUserType}></CustomListBox> */}
      <div className="w-full">
        <div>Register as</div>
        <ListBox setFilter={setSelectedUserType} customFilterTypes={userTypes} defaultValue=""></ListBox>
      </div>

      {/* this is for file upload */}
      {/* <span>User Image</span>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={(e) => handleImageChange(e)}
          /> */}
      <Button label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />

      <p className="text-sm">Already have an account?
        <Link className="underline" href='/components/login'>Login</Link>
      </p>
    </>
  );
};

export default RegisterForm;
