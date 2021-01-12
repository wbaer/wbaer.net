#!/bin/bash

set -e

printf "\033[0;32mRemoving previous build\033[0m\n"

rm -rf public

printf "\033[0;32mCompiling Saas\033[0m\n"

sass assets/css/style.scss assets/css/style.css

printf "\033[0;32mGenerating site\033[0m\n"

hugo serve --disableFastRender --noHTTPCache