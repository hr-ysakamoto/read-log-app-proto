import * as fs from 'fs'
import * as path from 'path'

import fastify, { FastifyBaseLogger, FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import {
  UserInputSchema,
  UserOutputSchema,
  GetBookInputSchema,
  GetBookOutputSchema,
} from '@repo/models/types'
import { Server, IncomingMessage, ServerResponse } from 'node:http'
import _aspida from 'openapi2aspida'
import cors from './lib/cors'
import { BookService } from './services'

export type AspidaOptions = Exclude<
  Parameters<typeof _aspida>[0],
  string | undefined
>

export type FastifyZodInstance = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  ZodTypeProvider
>

const host = '0.0.0.0' as const
const port = 8000 as const

export const fastifyApp = () =>
  fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>()

const main = async (app: FastifyZodInstance) => {
  try {
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)
    app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Reading log & memo API',
          description: 'Sample backend service',
          version: '1.0.0',
        },
        servers: [],
      },
      transform: jsonSchemaTransform,
    })

    app.register(fastifySwaggerUI, {
      routePrefix: '/documentation',
    })

    await app.register(cors)

    app.after(() => {
      app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/user',
        schema: {
          querystring: UserInputSchema,
          response: {
            200: UserOutputSchema,
          },
        },
        handler: (_, res) => {
          res.send({ userName: 'John Doe' })
        },
      })
      app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/books',
        schema: {
          querystring: GetBookInputSchema,
          response: {
            200: GetBookOutputSchema,
          },
        },
        handler: async (_, res) => {
          const service = new BookService()
          const response = await service.getBooks()
          console.log({ response })
          res.send(response)
        },
      })
    })

    await app.ready()
    const yaml = app.swagger({ yaml: true })
    const openApiDir = path.resolve(__dirname, '../../packages/models/api')
    const swaggerYamlPath = `${openApiDir}/swagger.yaml` as const
    const aspidaTypeDir = `${openApiDir}/aspida` as const

    const aspidaOption: AspidaOptions & {
      input: string
    } = {
      input: path.join(aspidaTypeDir, 'client'),
      openapi: {
        inputFile: swaggerYamlPath,
      },
    }

    if (!fs.existsSync(openApiDir)) {
      fs.mkdirSync(openApiDir, { recursive: true })
    }
    fs.writeFileSync(swaggerYamlPath, yaml)
    console.log(`generated routed >>> ${swaggerYamlPath}`)

    if (!fs.existsSync(aspidaTypeDir)) {
      fs.mkdirSync(aspidaTypeDir)
    }

    if (fs.existsSync(aspidaOption.input)) {
      fs.rmSync(aspidaOption.input, {
        recursive: true,
        force: true,
      })
    }

    await _aspida(aspidaOption)
    console.log(`generated aspida settings >>> ${aspidaOption.input}`)
    await app.listen({ port, host })
    console.log(`Server listining on port ${port}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main(fastifyApp())
