# For more information, please refer to https://aka.ms/vscode-docker-python
FROM node:22.2.0

EXPOSE 3000

WORKDIR /app
COPY package.json package.json 
COPY package-lock.json package-lock.json 

# Install npm dependencies
RUN npm install

# Add source code
COPY . .

CMD [ "npm", "run", "dev" ]

