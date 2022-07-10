import swaggerJsdoc from 'swagger-jsdoc'

// swagger config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping List API Documentation',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Stefan Kalan',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333/api/shopping-list',
      },
    ],
  },
  apis: ['./src/routes/*.{ts,js}'],
}

// swagger docs
const specs = swaggerJsdoc(options)

export default specs
