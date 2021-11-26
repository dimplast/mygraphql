const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GRaphQLList,
    GraphQLNonNull
} = require('graphql')

const customers = [
    {id: '1', name: 'Jim Plus', emai:'jim@gmail.com', age: 35},
    {id: '2', name: 'Frank Lone', emai:'frank@gmail.com', age: 43},
    {id: '3', name: 'Bill Fanshow', emai:'bill@gmail.com', age: 52},
    {id: '4', name: 'John Men', emai:'john@gmail.com', age: 29}
]

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: ()=> ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        age: { type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer : {
            type: CustomerType,
            args : {
                id: {type:GraphQLString}
            },
            resolve(parentValue, args){
                for (let i =0; i<customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
            }
        },
        customers: {
            type:new GraphQLList(CustomerType),
            resolve(parentValue,args){
                return customers
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})