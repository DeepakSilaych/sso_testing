# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the project files
COPY . .

# Build the project
RUN pnpm build

# Stage 2: Run the application
FROM node:18-alpine AS runner

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Set environment variable
ENV NODE_ENV production

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
