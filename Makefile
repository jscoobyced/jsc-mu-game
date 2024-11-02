.SILENT: .dep setup dev build prod

.dep:
	chmod u+x ./etc/bin/*.sh

setup: .dep
	./etc/bin/setup.sh

dev: .dep
	./etc/bin/dev.sh

prod: .dep
	./etc/bin/production.sh

build: .dep
	./etc/bin/build.sh
