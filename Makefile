MODULESDIR = ./node_modules/.bin
build: clean
	$(MODULESDIR)/webpack -p

start:
	$(MODULESDIR)/webpack-dev-server

clean:
	@rm -rf dist

.PHONY: clean
