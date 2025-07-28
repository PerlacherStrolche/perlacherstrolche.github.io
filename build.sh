#!/usr/bin/env sh

rm -r ./web/
mkdir web
cp index.html ./web/index.html
cp -r js ./web/js
cp -r css ./web/css
cp -r images ./web/images


scp -O -r web u63488074@home368972730.1and1-data.host:/kunden/homepages/29/d368972730/htdocs/
