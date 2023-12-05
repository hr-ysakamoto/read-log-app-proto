import aspida from "@aspida/axios";
import axios, { CustomParamsSerializer } from "axios";
import factory from "@repo/models/api/aspida/client/$api";
import { stringify } from "qs";

export const api = factory(
  aspida(axios, {
    paramsSerializer: {
      serialize: stringify as unknown as CustomParamsSerializer,
    },
    baseURL: "http://localhost:8000",
  })
);
