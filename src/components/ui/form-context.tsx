import * as React from "react";
import { useFormContext } from "react-hook-form";

export const FormItemContext = React.createContext<{
  id: string;
}>({
  id: "",
});

export const useFormField = () => {
  const fieldContext = React.useContext(FormItemContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.id, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    id: fieldContext.id,
    name: fieldContext.id,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  };
};
