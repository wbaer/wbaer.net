#!/bin/bash

set -e

printf "\033[0;32mBuilding css\033[0m\n"

sass assets/css/style.scss assets/css/style.min.css

printf "\033[0;32mBuilding site\033[0m\n"

hugo serve