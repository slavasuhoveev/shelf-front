# -----------------------------
# Export all vars to env
# -----------------------------
.EXPORT_ALL_VARIABLES:

# =========================
# Project configuration
# =========================

PROJECT_NAME         = shelf-front
IMAGE               ?= $(PROJECT_NAME):develop
COMPOSE              = docker compose

COMMON_COMPOSE_FILE=../infra/local/docker-compose.local.yml
COMMON_COMPOSE=$(COMPOSE) -f $(COMMON_COMPOSE_FILE)

# =========================
# Docker lifecycle
# =========================

.PHONY: up
up: ## Build and start all services
	$(COMPOSE) up --build

.PHONY: up-d
up-d: ## Start all services in detached mode
	$(COMPOSE) up -d --build

.PHONY: down
down: ## Stop and remove containers
	$(COMPOSE) down

.PHONY: down-v
down-v: ## Stop and remove containers + volumes
	$(COMPOSE) down -v

.PHONY: restart
restart: down up ## Restart all services

# =========================
# Logs & debug
# =========================

.PHONY: logs
logs: ## Show logs for all services
	$(COMPOSE) logs -f

.PHONY: logs-front
logs-front: ## Show frontend logs
	$(COMPOSE) logs -f frontend

.PHONY: logs-auth
logs-auth: ## Show auth service logs
	$(COMPOSE) logs -f auth

# =========================
# Frontend helpers
# =========================

.PHONY: install
install: ## Install frontend dependencies
	$(COMPOSE) exec frontend pnpm install

.PHONY: shell-front
shell-front: ## Open shell inside frontend container
	$(COMPOSE) exec frontend sh

.PHONY: dev
dev: up ## Alias for up (dev mode)

# =========================
# Cleanup
# =========================

.PHONY: clean
clean: ## Remove containers, volumes and build cache
	$(COMPOSE) down -v
	docker system prune -f

# =========================
# Help
# =========================

.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
