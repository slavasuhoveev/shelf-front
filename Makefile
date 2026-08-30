# -----------------------------
# Export all vars to env
# -----------------------------
.EXPORT_ALL_VARIABLES:

# =========================
# Project configuration
# =========================

REGISTRY ?= ghcr.io
PROJECT_NAME ?= shelf-front
TEST_SERVICE ?= shelf-front-test

IMAGE_NAME ?= $(REGISTRY)/slavasuhoveev/$(PROJECT_NAME)
AUTH_IMAGE ?= $(REGISTRY)/slavasuhoveev/shelf-auth:develop
SHELF_API_IMAGE ?= $(REGISTRY)/slavasuhoveev/shelf-api:develop

# Development keys
KEYS_DIR ?= ./devkeys
SIGNING_KEY_KID ?= k1-2025-08-30

# Default local tag
TAG ?= develop

# Frontend public URLs.
# CI can override these values for dev/prod builds.
NEXT_PUBLIC_AUTH_API_URL ?= http://localhost:8081
NEXT_PUBLIC_SHELF_API_URL ?= http://localhost:8082

IMAGE = $(IMAGE_NAME):$(TAG)

COMPOSE ?= docker compose


# =========================
# Docker lifecycle
# =========================

.PHONY: generate-dev-key
generate-dev-key:
	@mkdir -p $(KEYS_DIR)

	@if [ ! -f "$(KEYS_DIR)/$(SIGNING_KEY_KID).pem" ]; then \
		echo "Generating development RSA key..."; \
		openssl genpkey \
			-algorithm RSA \
			-pkeyopt rsa_keygen_bits:2048 \
			-out "$(KEYS_DIR)/$(SIGNING_KEY_KID).pem"; \
	fi

.PHONY: up
up: generate-dev-key docker-build ## Build and start services
	@$(COMPOSE) up

.PHONY: up-d
up-d: generate-dev-key docker-build ## Start services in detached mode
	@$(COMPOSE) up -d

.PHONY: down
down: ## Stop services
	@$(COMPOSE) down

.PHONY: down-v
down-v: ## Stop services and remove volumes
	@$(COMPOSE) down -v

.PHONY: restart
restart: ## Restart services
	@$(COMPOSE) restart


# =========================
# Logs & debug
# =========================

.PHONY: logs
logs: ## Show all logs
	@$(COMPOSE) logs -f

.PHONY: logs-front
logs-front: ## Show frontend logs
	@$(COMPOSE) logs -f $(PROJECT_NAME)

.PHONY: shell
shell: ## Open frontend shell
	@$(COMPOSE) exec $(PROJECT_NAME) sh

.PHONY: test-shell
test-shell: test-build ## Open test container shell
	@$(COMPOSE) run --rm $(TEST_SERVICE) sh


# =========================
# Frontend quality
# =========================

.PHONY: test-build
test-build: ## Build test/lint image
	@$(COMPOSE) build $(TEST_SERVICE)

.PHONY: lint
lint: test-build ## Run ESLint
	@$(COMPOSE) run --rm $(TEST_SERVICE) pnpm lint

.PHONY: test
test: test-build ## Run tests
	@$(COMPOSE) run --rm $(TEST_SERVICE) pnpm test

.PHONY: test-watch
test-watch: test-build ## Run tests in watch mode
	@$(COMPOSE) run --rm $(TEST_SERVICE) pnpm test:watch

.PHONY: typecheck
typecheck: test-build ## Run TypeScript type check
	@$(COMPOSE) run --rm $(TEST_SERVICE) pnpm exec tsc --noEmit

.PHONY: check
check: lint test typecheck ## Run all quality checks


# =========================
# Application build
# =========================

.PHONY: build
build: docker-build ## Build Next.js production image


# =========================
# Docker image
# =========================

.PHONY: docker-build
docker-build: ## Build production Docker image
	@$(COMPOSE) build $(PROJECT_NAME)

.PHONY: docker-build-no-cache
docker-build-no-cache: ## Build production Docker image without cache
	@$(COMPOSE) build --no-cache $(PROJECT_NAME)

.PHONY: docker-push
docker-push: ## Push Docker image
	@docker push $(IMAGE)


# =========================
# Cleanup
# =========================

.PHONY: clean
clean: ## Remove containers and cache
	@$(COMPOSE) down -v
	@docker system prune -f


# =========================
# Help
# =========================

.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
