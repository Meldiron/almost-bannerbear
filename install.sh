apk add curl

curl -fsSL https://imagemagick.org/archive/binaries/magick -o imagemagick

ls

chmod 777 ./imagemagick
chmod a+x ./imagemagick

./imagemagick convert -density 1200 -resize 1200x630 a.svg a.png

ls
