const { Client } = require('pg')

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Opa_SuaSenha',
    database: process.env.DB_NAME || 'crud_node'
})

client
.connect()
    .then(() => {
        console.log("Conexão feita com o banco de dados!\n")
    })
    .catch((msgError) => {
        console.error("ERROR ao se conectar com o banco de dados\n")
        console.log(msgError)
    })

exports.query = async (query, valores) => {
    const { rows } = await client.query(query, valores)
    return rows
}
