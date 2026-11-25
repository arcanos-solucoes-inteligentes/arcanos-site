#!/bin/bash
# uso: comprimir.sh <cena> <largura>  -> final/<cena>.mp4, .webm, .jpg
set -e
F=node_modules/ffmpeg-static/ffmpeg
n=$1; W=$2
mkdir -p final
# depois: cp final/* ../../public/videos/
VF="scale=$W:-2:flags=lanczos,fps=30,format=yuv420p"
IN="-f concat -safe 0 -i bruto/$n.txt"
$F -v error -y $IN -vf "$VF" -an -c:v libx264 -preset slow -crf 25 -movflags +faststart final/$n.mp4
$F -v error -y $IN -vf "$VF" -an -c:v libvpx-vp9 -b:v 0 -crf 35 -row-mt 1 final/$n.webm
$F -v error -y -i final/$n.mp4 -frames:v 1 -q:v 3 final/$n.jpg
ls -la final/$n.*
