# BOOKSTORE NODE.JS API
A bookstore API created using node.js, typescript/javascript, mongodb, prisma orm, and jest.

## Requirements to run the project
Docker and docker compose (it is installed together with docker in the last versions)

## Development setup
```bash
# Copy the .env-example to .env
cp .env-example .env

# It will init all the containers required to run the project
docker compose up -d

# If you want to check the logs you can use
docker compose logs

# or if you want to check the logs of just one container
docker compose logs node
```

## Development setup: steps by step
1. Start the mongodb server
```bash
# Copy the .env-example to .env
cp .env-example .env

# Up the containers with mongodb working with replicas (it is required by prisma)
docker compose up -d mongo1 mongo2 mongo3
```
2. If you want, there is a web visual client for mongodb in the project:
```bash
# Up the containers with mongo-express (the web visual client)
docker compose up -d mongo-ui

# Now you can open the link http://localhost:8086 in your browser
```

3. Start the dev server container
```bash
docker compose up node
```

## Run commands inside the node container
```bash
docker compose exec node sh
```

### Seed the database
```bash
docker compose exec node sh -c 'npm run seed'
```

### Run lint
```bash
docker compose exec node sh -c 'npm run lint'
```

### Run tests
```bash
docker compose exec node sh -c 'npm run test'

# if you want you can run it in watch mode
docker compose exec node sh -c 'npm run test -- --watchAll'
```


### To improve developer experience - we recommend:
- Use in vscode the following extensions:
1. editorconfig
2. eslint
3. prisma
