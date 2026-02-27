import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = {
  variant?: "contained" | "outlined" | "ghost";
} & TouchableOpacityProps;

export const CustomButton = ({
  children,
  variant = "contained",
  className,
  ...props
}: ButtonProps) => {
  const buttonStyles = {
    contained: "bg-blue-600 py-5 rounded-2xl shadow-lg items-center flex-1",
    outlined: "border border-blue-600 py-5 rounded-2xl items-center flex-1",
    ghost: "bg-transparent py-5 rounded-2xl items-center flex-1",
  } as const;

  const textStyles = {
    contained: "text-white",
    outlined: "text-blue-600",
    ghost: "text-blue-600",
  } as const;

  return (
    <TouchableOpacity
      className={`${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={textStyles[variant]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
