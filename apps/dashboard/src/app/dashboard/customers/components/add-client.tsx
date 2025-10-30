"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { uploadClient } from "@kristall/client/services/user-management/use-cases/private/upload-client";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";

import { Button } from "@kristall/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@kristall/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { Input, InputContainer } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";

export function AddClient() {
  const [state, dispatch] = useActionState(uploadClient, undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
      toast.success(state.message.value);
      setOpen(false);
      return;
    }
    if (state?.message?.type === FORM_MESSAGE_TYPES.INTERNAL_ERROR) {
      toast.error(state.message.value);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">Agregar cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar cliente</DialogTitle>
        </DialogHeader>
        <form action={dispatch}>
          <InputContainer>
            <Label>Nombre</Label>
            <Input
              defaultValue={state?.fields.name.value}
              name="name"
              type="text"
              placeholder="Nombre del cliente"
            />
            {state?.fields.name.message && (
              <p className="text-red-500 text-sm">
                {state.fields.name.message}
              </p>
            )}
          </InputContainer>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <SubmitButton>Guardar</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
