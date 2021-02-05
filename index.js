// 원본 출처: https://www.apollographql.com/docs/apollo-server/getting-started/

const { ApolloServer, gql } = require('apollo-server');

// NOTE: 따옴표 (') 아니고 backtick (`) 주의
const typeDefs = gql`
  # 아직 MongoDB를 연결하지 않아서 dummy 데이터 사용
  type Review {
    name: String
    description: String
  }

  # Review 들의 배열 반환
  type Query {
    reviews: [Review]
  }
`;

const gunpla = [
  {
    name: '자쿠II',
    description: 'SD지만 육중함은 그대로',
  },
  {
    name: '건담 5호기',
    description: '기대하지 않았는데 만족도가 높았던 킷',
  },
  {
    name: '스트라이크건담',
    description: '스트라이크 건담은 모든 등급이 다 잘 뽑힌듯',
  },
];

const resolvers = {
  Query: {
    reviews: () => gunpla,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  // NOTE: 따옴표 (') 아니고 backtick (`) 주의 (Template Literal)
  console.log(`Server ready at ${url}`);
});
