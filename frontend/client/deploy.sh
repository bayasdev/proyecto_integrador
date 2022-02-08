#!/bin/bash

cd ../../server/html
rm -rf frontend
mkdir frontend
cd ../../frontend/client
ng build --base-href "https://smcar.bayas.dev/"
cp -r ./dist/client ../../server/html/frontend
