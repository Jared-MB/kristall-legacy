"use server";

import { POST } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";
import { redirect } from "next/navigation";

import type { LoginUser } from "@kristall/shared/domains/auth/types/login.public";
import { LoginSchema } from "@kristall/shared/domains/auth/validators/login-validator";
import { AUTH_PUBLIC_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/auth/public";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { setCookie } from "../../../../utils/cookies";
import { AvailableCookies } from "../../../../utils/cookies/available";
import type { Authorized, LoginResponse } from "../../types/auth/public";

export const login = async (
  _prevState: unknown,
  payload: FormData
): Promise<LoginResponse | undefined> => {
  const rawData = Object.fromEntries(payload.entries());

  const parsedData = LoginSchema.safeParse(rawData);

  const fields = new FormExtractor(rawData, parsedData.error);

  const inputs = fields.extractErrorsForFields(["username", "password"]);

  if (!parsedData.success) {
    return {
      fields: inputs,
    };
  }

  const { data, status, message } = await POST<Authorized, LoginUser>(
    AUTH_PUBLIC_ENDPOINTS.LOGIN,
    parsedData.data,
    {
      auth: false,
      revalidateTags: "never",
    }
  );

  if (status === STATUS.UNAUTHORIZED) {
    return {
      fields: {
        username: {
          value: inputs.username.value,
          message: "Usuario o contraseña incorrectos",
        },
        password: {
          value: inputs.password.value,
          message: "Usuario o contraseña incorrectos",
        },
      },
    };
  }

  if (status === STATUS.PAYMENT_REQUIRED) {
    return {
      message: {
        type: FORM_MESSAGE_TYPES.PAYMENT_REQUIRED,
        value: message,
      },
      fields: inputs,
    };
  }

  if (status !== STATUS.OK || !data) {
    return {
      message: {
        type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
        value:
          "Ha ocurrido un error interno, por favor intente de nuevo más tarde",
      },
      fields: inputs,
    };
  }

  const { access_token } = data;

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

  await setCookie(AvailableCookies.SESSION, access_token, {
    maxAge: ONE_DAY_IN_SECONDS,
  });

  redirect("/dashboard");
};
