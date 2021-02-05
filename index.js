const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectMongoDB = async () => {
    try {
        res = await mongoose.connect("mongodb://localhost/gunpladb", 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true 
                })
        console.log('MongoDB Connected');
        return res
    } catch (err) {
        console.error(err)  
        return null
    }
}

connectMongoDB()

//----------------------------
const reviewSchema = new mongoose.Schema({
    name: String,
    model: String,
    manufacturer: String,
    height: String,
    weight: String,
    memo: [ {
        grade: String,
        description: String   
    }]    
})

// 세 번째 파라미터에 MongoDB의 컬렉션 이름인 'review' 전달하여 연결
const Review = mongoose.model('Review', reviewSchema, 'review')

//----------------------------
// NOTE: 따옴표 (') 아니고 backtick (`) 주의
const typeDefs = gql`
  type Memo {
    grade: String
    description: String
  }

  type Review {
    name: String
    model: String
    manufacturer: String
    height: Float
    weight: Float
    memo: [Memo]
  }

  # Review 들의 배열 반환
  type Query {
    reviews: [Review]
  }`

// POST Query Body
// {
//     reviews {
//         name
//         model
//         manufacturer
//         height
//         weight
//         memo {
//             grade
//             description
//         }
//     }
// }

const resolvers = {
  Query: {
    reviews: async () => {
        try {
            res = await Review.find({})
            //console.log(res)
            return res
        } catch (err) {
            console.log(err)
            return null
        }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  // NOTE: 따옴표 (') 아니고 backtick (`) 주의 (Template Literal)
  console.log(`Server ready at ${url}`);
});
