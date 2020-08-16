#!/bin/sh

git pull origin master
while read f; do
    if [$f != ""]
    then
        echo "Backup file $f..."
        cp -rf $HOME/$f ./
    fi
done < Dotfiles
echo "Backup files done, please commit!"

git add . -A
git commit -m "Backup at $(date)"
git push origin master
