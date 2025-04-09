PROJECT_NAME := "mcenter"
MAIN_FILE_PAHT := "main.go"
PKG := "github.com/kade-chen/mcenter"
IMAGE_PREFIX := "github.com/kade-chen/mcenter"

.PHONY: all dep lint vet test test-coverage build clean

all: build

run: ## Get the dependencies
	@npm run dev
