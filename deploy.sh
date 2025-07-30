#!/usr/bin/env sh

rm -r ./web/

bun run build

scp -O -r web u63488074@home368972730.1and1-data.host:/kunden/homepages/29/d368972730/htdocs/
