## BOOKSTORE NODE.JS API
A bookstore API created using node.js, typescript/javascript, mongodb, prisma orm, and jest.

## Requirements to run the project
Node.js 19+ and docker

## Setup the database
```bash
# Up the containers with mongodb working with replicas (it is required by prisma)
docker-compose up -d

# add the dns alias to the mongodb containers
sudo cat << EOF >> /etc/hosts
127.0.0.1 mongodb1
127.0.0.1 mongodb2
127.0.0.1 mongodb3
EOF
```

## Developer server
```bash
npx prisma generate
npm run dev
```

## Others
- If you want there is a visual client for mongodb in the project, you just need to open in the browser the link:
http://localhost:8086
