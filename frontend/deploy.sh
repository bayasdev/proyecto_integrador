#!/bin/bash

cd ../server/site-content
rm -rf frontend
mkdir frontend
cd ../../frontend
ng build --base-href "https://smcar.bayas.dev/" --prod
cp -r ./dist/client ../server/site-content/frontend