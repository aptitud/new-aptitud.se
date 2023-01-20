require('dotenv').config()
const contentTypeGenerator = require('cf-content-types-generator')

const { CONTENTFUL_MANAGEMENT_API_TOKEN } = process.env
//()
console.log({ CONTENTFUL_MANAGEMENT_API_TOKEN })
const client = new contentTypeGenerator()
client.argv = ['-s', 'kqhdnxbobtly', '-t', CONTENTFUL_MANAGEMENT_API_TOKEN]
client.run()
