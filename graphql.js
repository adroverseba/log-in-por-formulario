const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
// const ProductApi = require("./services/graphqlServices");
const ProductApi = require("./services/productServices");

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String
    price: Float
    thumbnail: String
  }
  input ProductInput {
    title: String!
    price: Int!
    thumbnail: String!
  }
  type Query {
    getOneProduct(id: ID!): Product,
    getProducts: [Product],
  }
  type Mutation{
    createProduct(datos:ProductInput):Product
  }

`);

class GraphQLController {
  constructor() {
    const api = new ProductApi();
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        getProducts: async () => {
          return await api.getAll();
        },
        getOneProduct: async (args) => {
          const { id } = args;
          console.log(id);
          return await api.findOne(id);
        },
        createProduct: async ({ datos }) => {
          return await api.save(datos);
        },
      },
      graphiql: true,
    });
  }
}

module.exports = GraphQLController;
