Corrigindo o problema gyp ERR! do npm install

Apague a pasta node_modules
Apague o arquivo package-lock.json
Apague a dependência da sqlite3: npm un sqlite3.
Instale tudo novamente: npm i
Instale a sqlite3 novamente: npm i sqlite3.


//instalando express
npm i express @types/express dotenv
npm i -D @types/supertest