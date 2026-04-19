serve:
	bundle exec jekyll serve --config _config.yml,_config_dev.yml

build:
	bundle exec jekyll build

clean:
	bundle exec jekyll clean

build-verbose:
	bundle exec jekyll build --verbose

install:
	bundle config set --local path vendor/bundle
	bundle install
