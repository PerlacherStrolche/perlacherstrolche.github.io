#!/usr/bin/env sh

rm -r ./web/

bun run build

scp -O -r web strolche.prod:/kunden/homepages/29/d368972730/htdocs/
