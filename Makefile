.SILENT: .dep setup dev build

.dep:
	chmod u+x ./etc/bin/*.sh

setup: .dep
	./etc/bin/setup.sh

dev: .dep
	./etc/bin/dev.sh

build: .dep
	./etc/bin/build.sh
