APP_PORT ?= 3009
PORT ?= $(APP_PORT)
SITE_URL ?= http://127.0.0.1:$(PORT)

.PHONY: install dev build start check fix typecheck ci

install:
	npm install

dev:
	npm run dev -- -p $(PORT) -H 0.0.0.0

build:
	npm run build

start:
	npm run start -- -p $(PORT) -H 0.0.0.0

check:
	npm run check

fix:
	npm run check:fix

typecheck:
	npm run typecheck

ci: check typecheck build
	@echo "-> All checks passed"
