# 1. Use a imagem base do Node, que já tem npm, npx, etc.
FROM node:18-alpine

# 2. Define o diretório de trabalho onde nossa aplicação vai viver
WORKDIR /app

# 3. Copia o package.json e package-lock.json para o container.
#    Fazemos isso em um passo separado para aproveitar o cache do Docker.
#    A instalação do npm só vai rodar de novo se estes arquivos mudarem.
COPY package*.json ./

# 4. Instala TODAS as dependências listadas no package.json,
#    incluindo as de desenvolvimento como 'react-scripts'.
RUN npm install

# --- FIM ---
# Não precisamos do comando COPY . . porque o nosso volume no docker-compose vai cuidar de espelhar o código.
# O comando CMD ["npm", "start"] também é opcional aqui, pois já o especificamos no docker-compose.yml.
# Manter o Dockerfile assim é uma prática limpa para desenvolvimento com hot-reloading.