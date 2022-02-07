cd ..\..\server\var\www\html
rmdir frontend /Q/S
mkdir frontend
cd ..\..\..\..\frontend\client
ng build --base-href "https://smcar.bayas.dev/"
xcopy dist\client ..\..\server\var\www\html\frontend\