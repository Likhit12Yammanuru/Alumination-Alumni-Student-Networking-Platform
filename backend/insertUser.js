const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'alumination',
  password: 'Likhit12102003',
  port: 5432,
});

client.connect();

const insertUser = async () => {
  const hashedPassword = await bcrypt.hash('securepassword123', 10);
  await client.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    ['Arjun Rao', 'arjun@example.com', hashedPassword]
  );
  console.log('User inserted');
  client.end();
};

insertUser();
