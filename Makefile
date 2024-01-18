all:
	bun build --entrypoints ./src/index.ts --outdir ./dist --target node
	bun ./dist/index.js

delete:
	@rm -rdf ./dist || true

test:
	bun test