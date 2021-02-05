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
        console.log('Successfully connected to mongodb');
        return res
    } catch (err) {
        console.error(err)  
        return null
    }
}

dbc = connectMongoDB()

console.log(dbc)

// db = dbc.db("gunpladb")
// const collection = db.collection('review')
// collection.find({}).toArray((err, docs) => {
//     assert.equal(err, null)
//     console.log(docs)
// })
//----------------------------

const memoSchema = new mongoose.Schema({
    grade: String,
    description: String    
})

const Memo = mongoose.model('Memo', memoSchema)


const reviewSchema = new mongoose.Schema({
    name: String,
    model: String,
    manufacturer: String,
    height: String,
    weight: String,
    memo: [memoSchema]    
})

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
  }
`;

const resolvers = {
  Query: {
    reviews: async () => {
        try {
            res = await Review.find({})
            console.log(res)
            return res
        } catch (err) {
            console.log(err)
        }
    },
  },
};



const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  // NOTE: 따옴표 (') 아니고 backtick (`) 주의 (Template Literal)
  console.log(`Server ready at ${url}`);
});
