RSC_LICENSE ?=

yarn-%:
	yarn $*

.PHONY: all
all: up yarn-lint yarn-build build-declaration yarn-test

.PHONY: build-declaration
build-declaration: dist/index.d.ts

dist/index.d.ts: $(wildcard src/**/*.ts)
	yarn build-declaration

.PHONY: clean
clean:
	rm -rf dist/

.PHONY: distclean
distclean: clean
	rm -rf __tests__/data/*

.PHONY: up
up: .require-license
	docker-compose port connect 3939 2>/dev/null | if ! grep -q ':23939$$'; then \
		docker-compose up -d; \
	fi

.PHONY: down
down:
	docker-compose down --remove-orphans

.PHONY: .require-license
.require-license:
ifndef RSC_LICENSE
	$(error Missing required RSC_LICENSE env var)
endif
