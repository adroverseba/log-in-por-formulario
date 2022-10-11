const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const ProductApi = require("./services/graphqlServices");

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String
    price: Float
    thumbnail: String
  }
  input ProductInput {
    title: String
    price: Int
    thumbnail: String
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts: [Product],
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
      },
      graphiql: true,
    });
  }
}

module.exports = GraphQLController;
