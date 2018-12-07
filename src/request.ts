import axios from 'axios'

export interface swaggerJson {
  definitions: swaggerDefinitions
  tags: { name: string, description: string }[]
  paths: {
    [key: string]: swaggerPath
  }
}

export interface swaggerPath {
  [key: string]: swaggerRequest
}

export interface swaggerRequest {
    tags: string[]
    summary: string
    description: string
    operationId: string
    parameters: swaggerParameter[]
    responses: {
      "200": {
        schema: swaggerSchema
      }
    }
}

export interface swaggerParameter {
  in: string
  name: string
  description: string
  required: boolean
  type: string
  items: {
    type: string
  }
  schema: {
    $ref: string
  }
}

export interface swaggerDefinitions {
    [key: string]: swaggerDefinition
}

export interface swaggerDefinition {
    type: string
    required: string[]
    properties: {
      [key: string]: swaggerProperty
    }
    title: string
    description: string
}



export interface swaggerSchema {
  type?: string
  description: string
  $ref?: string
  items: swaggerSchema,
  additionalProperties?: swaggerSchema
}

export type swaggerProperty = swaggerSchema

export default async function getSwaggerJson(url: string){
  const res = await axios.get(url)
  if(res.status === 200){
    return res.data as swaggerJson
  }
  return null
}