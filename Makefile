.SILENT: .dep setup dev test test-with-coverage lint build prod

.dep:
	chmod u+x ./etc/bin/*.sh

setup: .dep
	./etc/bin/setup.sh

setup-with-tests: .dep
	TESTS=y ./etc/bin/setup.sh

dev: .dep
	./etc/bin/dev.sh

test: .dep
	./etc/bin/test.sh

test-with-coverage: .dep
	COVERAGE=yes ./etc/bin/test.sh

lint: .dep
	./etc/bin/lint.sh

prod: .dep
	./etc/bin/production.sh

build: .dep
	./etc/bin/build.sh
