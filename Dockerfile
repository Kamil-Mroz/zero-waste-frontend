# =========================================
# Stage 1: Build the React.js Application
# =========================================

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:24.17.0-alpine3.23 AS builder

# Set the working directory inside the container
WORKDIR /app

RUN corepack enable

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code into the container
COPY . .

# Build the React.js application (outputs to /app/dist)
RUN pnpm build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginx:stable-alpine3.23-slim AS runner

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/run
# Use a non-root user for security best practices
USER nginx

# Expose port 80 to allow HTTP traffic
EXPOSE 80

# Start Nginx directly with custom config
CMD ["nginx", "-g", "daemon off;"]
