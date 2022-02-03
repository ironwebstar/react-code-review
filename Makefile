CI_COMMIT_SHORT_SHA=HEAD
VERSION=1.0-SNAPSHOT

LEVANT_VERSION=0.3.0

define deploy
	docker run --rm -v $(CURDIR)/nomad:/jobs:ro --network=host \
		hashicorp/levant:${LEVANT_VERSION} levant deploy \
			-address $(NOMAD_ADDR) \
			-ignore-no-changes \
			-force-count \
			-var 'version=${VERSION}' \
			-var-file /jobs/env-$2.yml \
			/jobs/$1.nomad
endef

.PHONY:	install
install:
	npx yarn install --immutable

.PHONY:	lint
lint: install
	npx yarn lint

.PHONY:	test
test: install
	npx yarn test

.PHONY:	acceptance
acceptance: install
	docker build --rm -t registry.noumenadigital.com/noumena/ckw-ui/adminportal-acceptance-v2:$(VERSION) --file cypress/Dockerfile --build-arg VERSION=$(VERSION) --build-arg GIT_REV=$(CI_COMMIT_SHORT_SHA) --build-arg BUILD_DATE="$(shell date)" .
	docker image rm registry.noumenadigital.com/noumena/ckw-ui/adminportal-acceptance-v2:$(VERSION)

.PHONY:	build
build: install
	npx yarn build

.PHONY:	image
image: build
	docker build -t registry.noumenadigital.com/noumena/ckw-ui/adminportal-v2:$(VERSION) --build-arg VERSION=$(VERSION) --build-arg GIT_REV=$(CI_COMMIT_SHORT_SHA) --build-arg BUILD_DATE="$(shell date)" .

.PHONY:	deploy
deploy:	image
	docker tag registry.noumenadigital.com/noumena/ckw-ui/adminportal-v2:$(VERSION) registry.noumenadigital.com/noumena/ckw-ui/adminportal-v2:latest
	docker push registry.noumenadigital.com/noumena/ckw-ui/adminportal-v2:$(VERSION)
	docker push registry.noumenadigital.com/noumena/ckw-ui/adminportal-v2:latest

.PHONY: deploy-dev
deploy-dev:	export NOMAD_ADDR=https://nomad.ckw-dev.noumenadigital.com
deploy-dev:
	$(call deploy,adminportal,dev)

.PHONY: deploy-test
deploy-test:	export NOMAD_ADDR=https://nomad.ckw-test.noumenadigital.com
deploy-test:
	$(call deploy,adminportal,test)