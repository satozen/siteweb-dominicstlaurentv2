#!/bin/bash
# Régénère les découpes du hero (images/hero/*.webp) à partir des PNG sources.
#   ./build.sh              → toutes
#   ./build.sh rockabilly   → une seule
# Format « nom_final:source[:% de hauteur gardée] » — pour changer de pose, changer la source ici.
# Chaque image : rognée sur son alpha, posée au bas d'un canevas 1200x1536, et le bas
# fondu vers la transparence DANS le fichier (un masque CSS couperait le halo au rectangle).
cd "$(dirname "$0")"
SPECS="pirate:pirate_r1 cirque:cirque_m2 crooner:crooner_v2 dominic:dominic_v2 dj:dj_g1 disco:disco_r1 loufoque:diva_1"
for spec in $SPECS; do
  IFS=: read -r out src keep <<< "$spec"; keep=${keep:-100}
  [ -n "$1" ] && [ "$1" != "$out" ] && continue
  box=$(magick "$src.png" -alpha extract -threshold 8% -format "%@" info:)
  magick "$src.png" -crop "$box" +repage -gravity north -crop "100%x${keep}%+0+0" +repage \
    -resize 1200x1536 -background none -gravity south -extent 1200x1536 \
    \( +clone -alpha extract \( -size 1200x1260 xc:white -size 1200x276 gradient:white-black -append \) \
       -gravity center -compose multiply -composite \) \
    -alpha off -compose CopyOpacity -composite \
    -quality 86 -define webp:alpha-quality=92 -define webp:method=6 "../$out.webp" && echo "ok $out ← $src"
done
