import * as fs from "fs";
import * as path from "path";

import fastify, { FastifyBaseLogger, FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { UserInputSchema, UserOutputSchema } from "@repo/models/types";
import { Server, IncomingMessage, ServerResponse } from "node:http";

export type FastifyZodInstance = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

const host = "0.0.0.0" as const;
const port = 8000 as const;

export const fastifyApp = () =>
  fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

const main = async (app: FastifyZodInstance) => {
  try {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
    app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Book Record API",
          description: "Sample backend service",
          version: "1.0.0",
        },
        servers: [],
      },
      transform: jsonSchemaTransform,
    });

    app.register(fastifySwaggerUI, {
      routePrefix: "/documentation",
    });

    app.after(() => {
      app.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/user",
        schema: {
          querystring: UserInputSchema,
          response: {
            200: UserOutputSchema,
          },
        },
        handler: (req, res) => {
          console.log({ id: req.query.userId });
          res.send({ userName: "John Doe" });
        },
      });
    });
    await app.ready();
    const swaggerJson = app
      .withTypeProvider<ZodTypeProvider>()
      .swagger({ yaml: false });

    const yaml = app.swagger({ yaml: true });
    const openApiDir = path.resolve(__dirname, "../../packages/models/api");
    const swaggerYamlPath = `${openApiDir}/swagger.yaml` as const;
    if (!fs.existsSync(openApiDir)) {
      fs.mkdirSync(openApiDir, { recursive: true });
    }
    fs.writeFileSync(swaggerYamlPath, yaml);
    console.log(`generated routed >>> ${swaggerYamlPath}`);

    await app.listen({ port, host });
    console.log(`Server listining on port ${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const app = fastifyApp();
main(app);
